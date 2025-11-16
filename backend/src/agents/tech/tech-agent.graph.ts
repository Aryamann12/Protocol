import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';
import { StreamingApp, SocialPlatform } from '../../types/collections.types';

export interface TechAgentState extends AgentState {
  streamingApps?: StreamingApp[];
  socialPlatforms?: SocialPlatform[];
  analysis?: string;
  recommendations?: string;
}

export class TechAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private graph: StateGraph<TechAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;
    
    this.graph = new StateGraph<TechAgentState>({
      channels: {
        messages: {
          reducer: (x: any[], y: any[]) => x.concat(y),
          default: () => [],
        },
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        streamingApps: {
          reducer: (x: StreamingApp[], y: StreamingApp[]) => y ?? x,
          default: () => [],
        },
        socialPlatforms: {
          reducer: (x: SocialPlatform[], y: SocialPlatform[]) => y ?? x,
          default: () => [],
        },
        analysis: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        recommendations: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        result: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
      },
    });

    this.setupGraph();
  }

  private setupGraph() {
    this.graph.addNode('fetchData', this.fetchTechData.bind(this));
    this.graph.addNode('analyze', this.analyzeTechUsage.bind(this));
    this.graph.addNode('recommend', this.generateRecommendations.bind(this));
    this.graph.addNode('respond', this.generateResponse.bind(this));

    this.graph.addEdge(START, 'fetchData' as any);
    this.graph.addEdge('fetchData' as any, 'analyze' as any);
    this.graph.addEdge('analyze' as any, 'recommend' as any);
    this.graph.addEdge('recommend' as any, 'respond' as any);
    this.graph.addEdge('respond' as any, END);
  }

  private async fetchTechData(state: TechAgentState): Promise<TechAgentState> {
    try {
      const [streamingApps, socialPlatforms] = await Promise.all([
        this.collectionsService.findDocuments('streamingapps', {}, 50),
        this.collectionsService.findDocuments('socialplatforms', {}, 50),
      ]);

      return {
        ...state,
        streamingApps: streamingApps as unknown as StreamingApp[],
        socialPlatforms: socialPlatforms as unknown as SocialPlatform[],
      };
    } catch (error) {
      return {
        ...state,
        error: `Failed to fetch tech data: ${error.message}`,
      };
    }
  }

  private async analyzeTechUsage(state: TechAgentState): Promise<TechAgentState> {
    const prompt = `Analyze the following tech platform data:

Streaming Apps: ${JSON.stringify(state.streamingApps, null, 2)}
Social Platforms: ${JSON.stringify(state.socialPlatforms, null, 2)}

Query: ${state.query}

Provide insights on platform usage, subscriptions, and digital habits.`;

    try {
      const response = await this.model.invoke([new HumanMessage(prompt)]);
      return {
        ...state,
        analysis: response.content as string,
        messages: [...state.messages, response],
      };
    } catch (error) {
      return {
        ...state,
        error: `Analysis failed: ${error.message}`,
      };
    }
  }

  private async generateRecommendations(state: TechAgentState): Promise<TechAgentState> {
    const prompt = `Based on this analysis:
    
${state.analysis}

And the original query: ${state.query}

Provide recommendations for optimizing tech usage, managing subscriptions, or improving digital habits.`;

    try {
      const response = await this.model.invoke([new HumanMessage(prompt)]);
      return {
        ...state,
        recommendations: response.content as string,
        messages: [...state.messages, response],
      };
    } catch (error) {
      return {
        ...state,
        error: `Recommendation generation failed: ${error.message}`,
      };
    }
  }

  private async generateResponse(state: TechAgentState): Promise<TechAgentState> {
    const finalResponse = `## Tech Usage Analysis
${state.analysis}

## Recommendations
${state.recommendations}`;

    return {
      ...state,
      result: finalResponse,
    };
  }

  async run(query: string): Promise<string> {
    const initialState: TechAgentState = {
      messages: [new HumanMessage(query)],
      query,
      streamingApps: [],
      socialPlatforms: [],
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.result || result.error || 'No result generated';
  }
}

