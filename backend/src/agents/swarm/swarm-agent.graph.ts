import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { FitnessAgentGraph } from '../fitness/fitness-agent.graph';
import { LearningAgentGraph } from '../learning/learning-agent.graph';
import { InventoryAgentGraph } from '../inventory/inventory-agent.graph';
import { TechAgentGraph } from '../tech/tech-agent.graph';
import { CollectionsService } from '../../collections/collections.service';

export interface SwarmAgentState {
  query: string;
  fitnessResult?: string;
  learningResult?: string;
  inventoryResult?: string;
  techResult?: string;
  coordinatorResult?: string;
  error?: string;
}

export class SwarmAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private fitnessAgent: FitnessAgentGraph;
  private learningAgent: LearningAgentGraph;
  private inventoryAgent: InventoryAgentGraph;
  private techAgent: TechAgentGraph;
  private graph: StateGraph<SwarmAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;
    
    // Initialize specialized agents
    this.fitnessAgent = new FitnessAgentGraph(model, collectionsService);
    this.learningAgent = new LearningAgentGraph(model, collectionsService);
    this.inventoryAgent = new InventoryAgentGraph(model, collectionsService);
    this.techAgent = new TechAgentGraph(model, collectionsService);

    this.graph = new StateGraph<SwarmAgentState>({
      channels: {
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        fitnessResult: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        learningResult: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        inventoryResult: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        techResult: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        coordinatorResult: {
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
    // Parallel execution nodes
    this.graph.addNode('fitness', this.runFitnessAgent.bind(this));
    this.graph.addNode('learning', this.runLearningAgent.bind(this));
    this.graph.addNode('inventory', this.runInventoryAgent.bind(this));
    this.graph.addNode('tech', this.runTechAgent.bind(this));
    
    // Coordinator node
    this.graph.addNode('coordinator', this.coordinateResults.bind(this));

    // All agents start in parallel
    this.graph.addEdge(START, 'fitness' as any);
    this.graph.addEdge(START, 'learning' as any);
    this.graph.addEdge(START, 'inventory' as any);
    this.graph.addEdge(START, 'tech' as any);
    
    // Coordinator waits for all agents
    this.graph.addEdge('fitness' as any, 'coordinator' as any);
    this.graph.addEdge('learning' as any, 'coordinator' as any);
    this.graph.addEdge('inventory' as any, 'coordinator' as any);
    this.graph.addEdge('tech' as any, 'coordinator' as any);
    
    this.graph.addEdge('coordinator' as any, END);
  }

  private async runFitnessAgent(state: SwarmAgentState): Promise<SwarmAgentState> {
    try {
      const result = await this.fitnessAgent.run(state.query);
      return {
        ...state,
        fitnessResult: result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Fitness agent failed: ${error.message}`,
      };
    }
  }

  private async runLearningAgent(state: SwarmAgentState): Promise<SwarmAgentState> {
    try {
      const result = await this.learningAgent.run(state.query);
      return {
        ...state,
        learningResult: result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Learning agent failed: ${error.message}`,
      };
    }
  }

  private async runInventoryAgent(state: SwarmAgentState): Promise<SwarmAgentState> {
    try {
      const result = await this.inventoryAgent.run(state.query);
      return {
        ...state,
        inventoryResult: result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Inventory agent failed: ${error.message}`,
      };
    }
  }

  private async runTechAgent(state: SwarmAgentState): Promise<SwarmAgentState> {
    try {
      const result = await this.techAgent.run(state.query);
      return {
        ...state,
        techResult: result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Tech agent failed: ${error.message}`,
      };
    }
  }

  private async coordinateResults(state: SwarmAgentState): Promise<SwarmAgentState> {
    // Wait for all results to be available
    const allResults = [
      state.fitnessResult,
      state.learningResult,
      state.inventoryResult,
      state.techResult,
    ].filter(Boolean);

    if (allResults.length === 0) {
      return {
        ...state,
        error: 'No agent results available for coordination',
      };
    }

    const prompt = `As a coordinator agent, synthesize the following parallel analysis results from multiple specialized agents:

Fitness Domain: ${state.fitnessResult || 'N/A'}
Learning Domain: ${state.learningResult || 'N/A'}
Inventory Domain: ${state.inventoryResult || 'N/A'}
Tech Domain: ${state.techResult || 'N/A'}

Original Query: ${state.query}

Provide a comprehensive, unified response that integrates insights from all domains, highlighting key findings and cross-domain patterns.`;

    try {
      const response = await this.model.invoke([new HumanMessage(prompt)]);
      return {
        ...state,
        coordinatorResult: response.content as string,
      };
    } catch (error) {
      return {
        ...state,
        error: `Coordination failed: ${error.message}`,
      };
    }
  }

  async run(query: string): Promise<string> {
    const initialState: SwarmAgentState = {
      query,
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.coordinatorResult || result.error || 'No result generated';
  }
}

