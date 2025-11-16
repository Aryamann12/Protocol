import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { FitnessAgentGraph } from '../fitness/fitness-agent.graph';
import { LearningAgentGraph } from '../learning/learning-agent.graph';
import { InventoryAgentGraph } from '../inventory/inventory-agent.graph';
import { TechAgentGraph } from '../tech/tech-agent.graph';
import { CollectionsService } from '../../collections/collections.service';

export interface ConditionalAgentState {
  query: string;
  route?: 'fitness' | 'learning' | 'inventory' | 'tech' | 'all';
  result?: string;
  error?: string;
}

export class ConditionalAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private fitnessAgent: FitnessAgentGraph;
  private learningAgent: LearningAgentGraph;
  private inventoryAgent: InventoryAgentGraph;
  private techAgent: TechAgentGraph;
  private graph: StateGraph<ConditionalAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;
    
    // Initialize specialized agents
    this.fitnessAgent = new FitnessAgentGraph(model, collectionsService);
    this.learningAgent = new LearningAgentGraph(model, collectionsService);
    this.inventoryAgent = new InventoryAgentGraph(model, collectionsService);
    this.techAgent = new TechAgentGraph(model, collectionsService);

    this.graph = new StateGraph<ConditionalAgentState>({
      channels: {
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        route: {
          reducer: (x: any, y: any) => y ?? x,
          default: () => undefined,
        },
        result: {
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
    // Routing node
    this.graph.addNode('router', this.routeQuery.bind(this));
    
    // Agent nodes
    this.graph.addNode('fitness', this.runFitnessAgent.bind(this));
    this.graph.addNode('learning', this.runLearningAgent.bind(this));
    this.graph.addNode('inventory', this.runInventoryAgent.bind(this));
    this.graph.addNode('tech', this.runTechAgent.bind(this));
    this.graph.addNode('all', this.runAllAgents.bind(this));

    // Start with routing
    this.graph.addEdge(START, 'router' as any);
    
    // Conditional routing based on route decision
    this.graph.addConditionalEdges(
      'router' as any,
      (state: ConditionalAgentState) => state.route || 'all',
      {
        fitness: 'fitness' as any,
        learning: 'learning' as any,
        inventory: 'inventory' as any,
        tech: 'tech' as any,
        all: 'all' as any,
      },
    );

    // All routes end
    this.graph.addEdge('fitness' as any, END);
    this.graph.addEdge('learning' as any, END);
    this.graph.addEdge('inventory' as any, END);
    this.graph.addEdge('tech' as any, END);
    this.graph.addEdge('all' as any, END);
  }

  private async routeQuery(state: ConditionalAgentState): Promise<ConditionalAgentState> {
    const routingPrompt = `Analyze the following query and determine which domain(s) it relates to:

Query: "${state.query}"

Available domains:
- fitness: Questions about gym progress, workouts, exercise, fitness goals
- learning: Questions about books, courses, coding problems, educational progress
- inventory: Questions about items, fridge contents, devices, kitchen equipment
- tech: Questions about streaming apps, social platforms, tech usage
- all: Questions that span multiple domains or need comprehensive analysis

Respond with ONLY one word: "fitness", "learning", "inventory", "tech", or "all"`;

    try {
      const response = await this.model.invoke([new HumanMessage(routingPrompt)]);
      const route = (response.content as string).toLowerCase().trim();
      
      // Validate route
      const validRoutes = ['fitness', 'learning', 'inventory', 'tech', 'all'];
      const selectedRoute = validRoutes.includes(route) ? route : 'all';
      
      return {
        ...state,
        route: selectedRoute as any,
      };
    } catch (error) {
      return {
        ...state,
        route: 'all',
        error: `Routing failed, defaulting to all: ${error.message}`,
      };
    }
  }

  private async runFitnessAgent(state: ConditionalAgentState): Promise<ConditionalAgentState> {
    try {
      const result = await this.fitnessAgent.run(state.query);
      return {
        ...state,
        result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Fitness agent failed: ${error.message}`,
      };
    }
  }

  private async runLearningAgent(state: ConditionalAgentState): Promise<ConditionalAgentState> {
    try {
      const result = await this.learningAgent.run(state.query);
      return {
        ...state,
        result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Learning agent failed: ${error.message}`,
      };
    }
  }

  private async runInventoryAgent(state: ConditionalAgentState): Promise<ConditionalAgentState> {
    try {
      const result = await this.inventoryAgent.run(state.query);
      return {
        ...state,
        result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Inventory agent failed: ${error.message}`,
      };
    }
  }

  private async runTechAgent(state: ConditionalAgentState): Promise<ConditionalAgentState> {
    try {
      const result = await this.techAgent.run(state.query);
      return {
        ...state,
        result,
      };
    } catch (error) {
      return {
        ...state,
        error: `Tech agent failed: ${error.message}`,
      };
    }
  }

  private async runAllAgents(state: ConditionalAgentState): Promise<ConditionalAgentState> {
    try {
      // Run all agents and combine results
      const [fitness, learning, inventory, tech] = await Promise.all([
        this.fitnessAgent.run(state.query),
        this.learningAgent.run(state.query),
        this.inventoryAgent.run(state.query),
        this.techAgent.run(state.query),
      ]);

      const combinedResult = `## Fitness Domain
${fitness}

## Learning Domain
${learning}

## Inventory Domain
${inventory}

## Tech Domain
${tech}`;

      return {
        ...state,
        result: combinedResult,
      };
    } catch (error) {
      return {
        ...state,
        error: `All agents execution failed: ${error.message}`,
      };
    }
  }

  async run(query: string): Promise<string> {
    const initialState: ConditionalAgentState = {
      query,
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.result || result.error || 'No result generated';
  }
}

