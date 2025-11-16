import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { FitnessAgentGraph } from '../fitness/fitness-agent.graph';
import { LearningAgentGraph } from '../learning/learning-agent.graph';
import { InventoryAgentGraph } from '../inventory/inventory-agent.graph';
import { TechAgentGraph } from '../tech/tech-agent.graph';
import { CollectionsService } from '../../collections/collections.service';

export interface SequentialAgentState {
  query: string;
  step: number;
  results: string[];
  finalResult?: string;
  error?: string;
}

export class SequentialAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private fitnessAgent: FitnessAgentGraph;
  private learningAgent: LearningAgentGraph;
  private inventoryAgent: InventoryAgentGraph;
  private techAgent: TechAgentGraph;
  private graph: StateGraph<SequentialAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;
    
    // Initialize specialized agents
    this.fitnessAgent = new FitnessAgentGraph(model, collectionsService);
    this.learningAgent = new LearningAgentGraph(model, collectionsService);
    this.inventoryAgent = new InventoryAgentGraph(model, collectionsService);
    this.techAgent = new TechAgentGraph(model, collectionsService);

    this.graph = new StateGraph<SequentialAgentState>({
      channels: {
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        step: {
          reducer: (x: number, y: number) => y ?? x,
          default: () => 0,
        },
        results: {
          reducer: (x: string[], y: string[]) => x.concat(y),
          default: () => [],
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
    this.graph.addNode('fitness', this.runFitnessAgent.bind(this));
    this.graph.addNode('learning', this.runLearningAgent.bind(this));
    this.graph.addNode('inventory', this.runInventoryAgent.bind(this));
    this.graph.addNode('tech', this.runTechAgent.bind(this));
    this.graph.addNode('aggregate', this.aggregateResults.bind(this));

    // Sequential flow: fitness -> learning -> inventory -> tech -> aggregate
    this.graph.addEdge(START, 'fitness' as any);
    this.graph.addEdge('fitness' as any, 'learning' as any);
    this.graph.addEdge('learning' as any, 'inventory' as any);
    this.graph.addEdge('inventory' as any, 'tech' as any);
    this.graph.addEdge('tech' as any, 'aggregate' as any);
    this.graph.addEdge('aggregate' as any, END);
  }

  private async runFitnessAgent(state: SequentialAgentState): Promise<SequentialAgentState> {
    try {
      const result = await this.fitnessAgent.run(state.query);
      return {
        ...state,
        step: 1,
        results: [...state.results, `Fitness Analysis:\n${result}`],
      };
    } catch (error) {
      return {
        ...state,
        error: `Fitness agent failed: ${error.message}`,
      };
    }
  }

  private async runLearningAgent(state: SequentialAgentState): Promise<SequentialAgentState> {
    try {
      const result = await this.learningAgent.run(state.query);
      return {
        ...state,
        step: 2,
        results: [...state.results, `Learning Analysis:\n${result}`],
      };
    } catch (error) {
      return {
        ...state,
        error: `Learning agent failed: ${error.message}`,
      };
    }
  }

  private async runInventoryAgent(state: SequentialAgentState): Promise<SequentialAgentState> {
    try {
      const result = await this.inventoryAgent.run(state.query);
      return {
        ...state,
        step: 3,
        results: [...state.results, `Inventory Analysis:\n${result}`],
      };
    } catch (error) {
      return {
        ...state,
        error: `Inventory agent failed: ${error.message}`,
      };
    }
  }

  private async runTechAgent(state: SequentialAgentState): Promise<SequentialAgentState> {
    try {
      const result = await this.techAgent.run(state.query);
      return {
        ...state,
        step: 4,
        results: [...state.results, `Tech Analysis:\n${result}`],
      };
    } catch (error) {
      return {
        ...state,
        error: `Tech agent failed: ${error.message}`,
      };
    }
  }

  private async aggregateResults(state: SequentialAgentState): Promise<SequentialAgentState> {
    const prompt = `Aggregate and synthesize the following sequential analysis results:

${state.results.join('\n\n---\n\n')}

Original Query: ${state.query}

Provide a comprehensive summary that combines insights from all domains.`;

    try {
      const response = await this.model.invoke([new HumanMessage(prompt)]);
      return {
        ...state,
        finalResult: response.content as string,
      };
    } catch (error) {
      return {
        ...state,
        error: `Aggregation failed: ${error.message}`,
      };
    }
  }

  async run(query: string): Promise<string> {
    const initialState: SequentialAgentState = {
      query,
      step: 0,
      results: [],
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.finalResult || result.error || 'No result generated';
  }
}

