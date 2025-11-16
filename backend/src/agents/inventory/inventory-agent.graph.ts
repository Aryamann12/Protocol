import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';

export interface InventoryAgentState extends AgentState {
  inventoryData?: any;
  analysis?: string;
  recommendations?: string;
}

export class InventoryAgentGraph {
  private model: BaseChatModel;
  private collectionsService: CollectionsService;
  private graph: StateGraph<InventoryAgentState>;

  constructor(model: BaseChatModel, collectionsService: CollectionsService) {
    this.model = model;
    this.collectionsService = collectionsService;
    
    this.graph = new StateGraph<InventoryAgentState>({
      channels: {
        messages: {
          reducer: (x: any[], y: any[]) => x.concat(y),
          default: () => [],
        },
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        inventoryData: {
          reducer: (x: any, y: any) => y ?? x,
          default: () => ({}),
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
    this.graph.addNode('fetchData', this.fetchInventoryData.bind(this));
    this.graph.addNode('analyze', this.analyzeInventory.bind(this));
    this.graph.addNode('recommend', this.generateRecommendations.bind(this));
    this.graph.addNode('respond', this.generateResponse.bind(this));

    this.graph.addEdge(START, 'fetchData' as any);
    this.graph.addEdge('fetchData' as any, 'analyze' as any);
    this.graph.addEdge('analyze' as any, 'recommend' as any);
    this.graph.addEdge('recommend' as any, 'respond' as any);
    this.graph.addEdge('respond' as any, END);
  }

  private async fetchInventoryData(state: InventoryAgentState): Promise<InventoryAgentState> {
    try {
      const [fridgeItems, devices, utensils, kitchenEquipments] = await Promise.all([
        this.collectionsService.findDocuments('fridgeitems', {}, 50),
        this.collectionsService.findDocuments('devices', {}, 50),
        this.collectionsService.findDocuments('utensils', {}, 50),
        this.collectionsService.findDocuments('kitchenequipments', {}, 50),
      ]);

      return {
        ...state,
        inventoryData: {
          fridgeItems,
          devices,
          utensils,
          kitchenEquipments,
        },
      };
    } catch (error) {
      return {
        ...state,
        error: `Failed to fetch inventory data: ${error.message}`,
      };
    }
  }

  private async analyzeInventory(state: InventoryAgentState): Promise<InventoryAgentState> {
    const prompt = `Analyze the following inventory data:

${JSON.stringify(state.inventoryData, null, 2)}

Query: ${state.query}

Provide insights on inventory status, items that need attention (like expiring food), and organization recommendations.`;

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

  private async generateRecommendations(state: InventoryAgentState): Promise<InventoryAgentState> {
    const prompt = `Based on this analysis:
    
${state.analysis}

And the original query: ${state.query}

Provide specific recommendations for inventory management, items to consume, or things to purchase.`;

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

  private async generateResponse(state: InventoryAgentState): Promise<InventoryAgentState> {
    const finalResponse = `## Inventory Analysis
${state.analysis}

## Recommendations
${state.recommendations}`;

    return {
      ...state,
      result: finalResponse,
    };
  }

  async run(query: string): Promise<string> {
    const initialState: InventoryAgentState = {
      messages: [new HumanMessage(query)],
      query,
      inventoryData: {},
    };

    const compiledGraph = this.graph.compile();
    const result = await compiledGraph.invoke(initialState);
    return result.result || result.error || 'No result generated';
  }
}

