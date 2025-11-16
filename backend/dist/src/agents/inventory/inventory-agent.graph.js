"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
class InventoryAgentGraph {
    constructor(model, collectionsService) {
        this.model = model;
        this.collectionsService = collectionsService;
        this.graph = new langgraph_1.StateGraph({
            channels: {
                messages: {
                    reducer: (x, y) => x.concat(y),
                    default: () => [],
                },
                query: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                inventoryData: {
                    reducer: (x, y) => y ?? x,
                    default: () => ({}),
                },
                analysis: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                recommendations: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                result: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
            },
        });
        this.setupGraph();
    }
    setupGraph() {
        this.graph.addNode('fetchData', this.fetchInventoryData.bind(this));
        this.graph.addNode('analyze', this.analyzeInventory.bind(this));
        this.graph.addNode('recommend', this.generateRecommendations.bind(this));
        this.graph.addNode('respond', this.generateResponse.bind(this));
        this.graph.addEdge(langgraph_1.START, 'fetchData');
        this.graph.addEdge('fetchData', 'analyze');
        this.graph.addEdge('analyze', 'recommend');
        this.graph.addEdge('recommend', 'respond');
        this.graph.addEdge('respond', langgraph_1.END);
    }
    async fetchInventoryData(state) {
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
        }
        catch (error) {
            return {
                ...state,
                error: `Failed to fetch inventory data: ${error.message}`,
            };
        }
    }
    async analyzeInventory(state) {
        const prompt = `Analyze the following inventory data:

${JSON.stringify(state.inventoryData, null, 2)}

Query: ${state.query}

Provide insights on inventory status, items that need attention (like expiring food), and organization recommendations.`;
        try {
            const response = await this.model.invoke([new messages_1.HumanMessage(prompt)]);
            return {
                ...state,
                analysis: response.content,
                messages: [...state.messages, response],
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Analysis failed: ${error.message}`,
            };
        }
    }
    async generateRecommendations(state) {
        const prompt = `Based on this analysis:
    
${state.analysis}

And the original query: ${state.query}

Provide specific recommendations for inventory management, items to consume, or things to purchase.`;
        try {
            const response = await this.model.invoke([new messages_1.HumanMessage(prompt)]);
            return {
                ...state,
                recommendations: response.content,
                messages: [...state.messages, response],
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Recommendation generation failed: ${error.message}`,
            };
        }
    }
    async generateResponse(state) {
        const finalResponse = `## Inventory Analysis
${state.analysis}

## Recommendations
${state.recommendations}`;
        return {
            ...state,
            result: finalResponse,
        };
    }
    async run(query) {
        const initialState = {
            messages: [new messages_1.HumanMessage(query)],
            query,
            inventoryData: {},
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.result || result.error || 'No result generated';
    }
}
exports.InventoryAgentGraph = InventoryAgentGraph;
//# sourceMappingURL=inventory-agent.graph.js.map