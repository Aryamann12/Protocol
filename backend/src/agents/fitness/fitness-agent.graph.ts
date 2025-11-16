import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';
import { GymProgress } from '../../types/collections.types';

export interface FitnessAgentState extends AgentState {
  gymData?: GymProgress[];
  analysis?: string;
  recommendations?: string;
}

export class FitnessAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private graph: StateGraph<FitnessAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;
    
    this.graph = new StateGraph<FitnessAgentState>({
      channels: {
        messages: {
          reducer: (x: any[], y: any[]) => x.concat(y),
          default: () => [],
        },
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        gymData: {
          reducer: (x: GymProgress[], y: GymProgress[]) => y ?? x,
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
    this.graph.addNode('fetchData', this.fetchGymData.bind(this));
    this.graph.addNode('analyze', this.analyzeProgress.bind(this));
    this.graph.addNode('recommend', this.generateRecommendations.bind(this));
    this.graph.addNode('respond', this.generateResponse.bind(this));

    this.graph.addEdge(START, 'fetchData' as any);
    this.graph.addEdge('fetchData' as any, 'analyze' as any);
    this.graph.addEdge('analyze' as any, 'recommend' as any);
    this.graph.addEdge('recommend' as any, 'respond' as any);
    this.graph.addEdge('respond' as any, END);
  }

  private async fetchGymData(state: FitnessAgentState): Promise<FitnessAgentState> {
    try {
      const gymData = await this.collectionsService.findDocuments('gym-progress', {}, 50);
      return {
        ...state,
        gymData: gymData as unknown as GymProgress[],
      };
    } catch (error) {
      return {
        ...state,
        error: `Failed to fetch gym data: ${error.message}`,
      };
    }
  }

  private async analyzeProgress(state: FitnessAgentState): Promise<FitnessAgentState> {
    const prompt = `Analyze the following gym progress data and provide insights:
    
${JSON.stringify(state.gymData, null, 2)}

Query: ${state.query}

Provide a detailed analysis of the workout patterns, progress trends, and areas for improvement.`;

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

  private async generateRecommendations(state: FitnessAgentState): Promise<FitnessAgentState> {
    const prompt = `Based on this analysis:
    
${state.analysis}

And the original query: ${state.query}

Provide specific, actionable recommendations for improving the workout routine.`;

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

  private async generateResponse(state: FitnessAgentState): Promise<FitnessAgentState> {
    const finalResponse = `## Analysis
${state.analysis}

## Recommendations
${state.recommendations}`;

    return {
      ...state,
      result: finalResponse,
    };
  }

  async run(query: string): Promise<string> {
    const initialState: FitnessAgentState = {
      messages: [new HumanMessage(query)],
      query,
      gymData: [],
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.result || result.error || 'No result generated';
  }
}

