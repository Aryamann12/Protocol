import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';
import { Book, CppProblem, TleLevel3Course, UdemyCourse } from '../../types/collections.types';

export interface LearningAgentState extends AgentState {
  books?: Book[];
  problems?: CppProblem[];
  courses?: (TleLevel3Course | UdemyCourse)[];
  analysis?: string;
  recommendations?: string;
}

export class LearningAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private graph: StateGraph<LearningAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;
    
    this.graph = new StateGraph<LearningAgentState>({
      channels: {
        messages: {
          reducer: (x: any[], y: any[]) => x.concat(y),
          default: () => [],
        },
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        books: {
          reducer: (x: Book[], y: Book[]) => y ?? x,
          default: () => [],
        },
        problems: {
          reducer: (x: CppProblem[], y: CppProblem[]) => y ?? x,
          default: () => [],
        },
        courses: {
          reducer: (x: any[], y: any[]) => y ?? x,
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
    this.graph.addNode('fetchData', this.fetchLearningData.bind(this));
    this.graph.addNode('analyze', this.analyzeProgress.bind(this));
    this.graph.addNode('recommend', this.generateRecommendations.bind(this));
    this.graph.addNode('respond', this.generateResponse.bind(this));

    this.graph.addEdge(START, 'fetchData' as any);
    this.graph.addEdge('fetchData' as any, 'analyze' as any);
    this.graph.addEdge('analyze' as any, 'recommend' as any);
    this.graph.addEdge('recommend' as any, 'respond' as any);
    this.graph.addEdge('respond' as any, END);
  }

  private async fetchLearningData(state: LearningAgentState): Promise<LearningAgentState> {
    try {
      const [books, problems, tleCourses, udemyCourses] = await Promise.all([
        this.collectionsService.findDocuments('books', {}, 50),
        this.collectionsService.findDocuments('cppproblems', {}, 50),
        this.collectionsService.findDocuments('tlelevel3courses', {}, 50),
        this.collectionsService.findDocuments('udemycourses', {}, 50),
      ]);

      return {
        ...state,
        books: books as unknown as Book[],
        problems: problems as unknown as CppProblem[],
        courses: [...(tleCourses as unknown as TleLevel3Course[]), ...(udemyCourses as unknown as UdemyCourse[])],
      };
    } catch (error) {
      return {
        ...state,
        error: `Failed to fetch learning data: ${error.message}`,
      };
    }
  }

  private async analyzeProgress(state: LearningAgentState): Promise<LearningAgentState> {
    const prompt = `Analyze the following learning data:

Books: ${JSON.stringify(state.books?.slice(0, 5), null, 2)}
Problems: ${JSON.stringify(state.problems?.slice(0, 5), null, 2)}
Courses: ${JSON.stringify(state.courses?.slice(0, 5), null, 2)}

Query: ${state.query}

Provide insights on learning progress, completion rates, and knowledge gaps.`;

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

  private async generateRecommendations(state: LearningAgentState): Promise<LearningAgentState> {
    const prompt = `Based on this analysis:
    
${state.analysis}

And the original query: ${state.query}

Provide specific recommendations for next learning steps, books to read, or problems to solve.`;

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

  private async generateResponse(state: LearningAgentState): Promise<LearningAgentState> {
    const finalResponse = `## Learning Analysis
${state.analysis}

## Recommendations
${state.recommendations}`;

    return {
      ...state,
      result: finalResponse,
    };
  }

  async run(query: string): Promise<string> {
    const initialState: LearningAgentState = {
      messages: [new HumanMessage(query)],
      query,
      books: [],
      problems: [],
      courses: [],
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.result || result.error || 'No result generated';
  }
}

