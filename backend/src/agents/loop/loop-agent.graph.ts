import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { CollectionsService } from '../../collections/collections.service';

export interface LoopAgentState {
  query: string;
  iteration: number;
  maxIterations: number;
  currentResult?: string;
  previousResults: string[];
  shouldContinue: boolean;
  finalResult?: string;
  error?: string;
}

export class LoopAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private graph: StateGraph<LoopAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;

    this.graph = new StateGraph<LoopAgentState>({
      channels: {
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        iteration: {
          reducer: (x: number, y: number) => y ?? x,
          default: () => 0,
        },
        maxIterations: {
          reducer: (x: number, y: number) => y ?? x,
          default: () => 3,
        },
        currentResult: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        previousResults: {
          reducer: (x: string[], y: string[]) => x.concat(y),
          default: () => [],
        },
        shouldContinue: {
          reducer: (x: boolean, y: boolean) => y ?? x,
          default: () => true,
        },
        finalResult: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        error: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
      },
    });

    this.setupGraph();
  }

  private setupGraph() {
    this.graph.addNode('process', this.processQuery.bind(this));
    this.graph.addNode('evaluate', this.evaluateResult.bind(this));
    this.graph.addNode('refine', this.refineResult.bind(this));

    this.graph.addEdge(START, 'process' as any);
    
    // Conditional loop: evaluate -> continue or end
    this.graph.addConditionalEdges(
      'evaluate' as any,
      (state: LoopAgentState) => {
        if (state.iteration >= state.maxIterations) return 'end';
        if (!state.shouldContinue) return 'end';
        return 'refine';
      },
      {
        refine: 'refine' as any,
        end: END,
      },
    );

    this.graph.addEdge('refine' as any, 'process' as any);
    this.graph.addEdge('process' as any, 'evaluate' as any);
  }

  private async processQuery(state: LoopAgentState): Promise<LoopAgentState> {
    const iterationContext = state.iteration > 0
      ? `\n\nPrevious iteration result:\n${state.previousResults[state.previousResults.length - 1]}`
      : '';

    const prompt = `Process the following query (Iteration ${state.iteration + 1}/${state.maxIterations}):${iterationContext}

Query: ${state.query}

${state.iteration > 0 ? 'Refine and improve upon the previous result based on the feedback.' : 'Provide a comprehensive analysis.'}`;

    try {
      const response = await this.model.invoke([new HumanMessage(prompt)]);
      return {
        ...state,
        iteration: state.iteration + 1,
        currentResult: response.content as string,
        previousResults: [...state.previousResults, response.content as string],
      };
    } catch (error) {
      return {
        ...state,
        error: `Processing failed: ${error.message}`,
        shouldContinue: false,
      };
    }
  }

  private async evaluateResult(state: LoopAgentState): Promise<LoopAgentState> {
    if (state.iteration >= state.maxIterations) {
      return {
        ...state,
        shouldContinue: false,
        finalResult: state.currentResult || state.previousResults[state.previousResults.length - 1],
      };
    }

    const evaluationPrompt = `Evaluate if this result needs further refinement:

Query: ${state.query}
Current Result: ${state.currentResult}
Previous Results: ${state.previousResults.length > 1 ? state.previousResults.slice(0, -1).join('\n---\n') : 'None'}

Is this result comprehensive, accurate, and complete? Respond with ONLY "yes" or "no".`;

    try {
      const response = await this.model.invoke([new HumanMessage(evaluationPrompt)]);
      const shouldContinue = (response.content as string).toLowerCase().trim() !== 'yes';
      
      return {
        ...state,
        shouldContinue,
        finalResult: !shouldContinue ? state.currentResult : undefined,
      };
    } catch (error) {
      // Default to continuing if evaluation fails
      return {
        ...state,
        shouldContinue: state.iteration < state.maxIterations,
      };
    }
  }

  private async refineResult(state: LoopAgentState): Promise<LoopAgentState> {
    // Refinement happens in the next process iteration
    // This node just passes through to continue the loop
    return state;
  }

  async run(query: string, maxIterations: number = 3): Promise<string> {
    const initialState: LoopAgentState = {
      query,
      iteration: 0,
      maxIterations,
      previousResults: [],
      shouldContinue: true,
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.finalResult || result.currentResult || result.error || 'No result generated';
  }
}

