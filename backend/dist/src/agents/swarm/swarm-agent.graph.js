"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwarmAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
const fitness_agent_graph_1 = require("../fitness/fitness-agent.graph");
const learning_agent_graph_1 = require("../learning/learning-agent.graph");
const inventory_agent_graph_1 = require("../inventory/inventory-agent.graph");
const tech_agent_graph_1 = require("../tech/tech-agent.graph");
class SwarmAgentGraph {
    constructor(model, collectionsService) {
        this.model = model;
        this.collectionsService = collectionsService;
        this.fitnessAgent = new fitness_agent_graph_1.FitnessAgentGraph(model, collectionsService);
        this.learningAgent = new learning_agent_graph_1.LearningAgentGraph(model, collectionsService);
        this.inventoryAgent = new inventory_agent_graph_1.InventoryAgentGraph(model, collectionsService);
        this.techAgent = new tech_agent_graph_1.TechAgentGraph(model, collectionsService);
        this.graph = new langgraph_1.StateGraph({
            channels: {
                query: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                fitnessResult: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                learningResult: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                inventoryResult: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                techResult: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                coordinatorResult: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                error: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
            },
        });
        this.setupGraph();
    }
    setupGraph() {
        this.graph.addNode('fitness', this.runFitnessAgent.bind(this));
        this.graph.addNode('learning', this.runLearningAgent.bind(this));
        this.graph.addNode('inventory', this.runInventoryAgent.bind(this));
        this.graph.addNode('tech', this.runTechAgent.bind(this));
        this.graph.addNode('coordinator', this.coordinateResults.bind(this));
        this.graph.addEdge(langgraph_1.START, 'fitness');
        this.graph.addEdge(langgraph_1.START, 'learning');
        this.graph.addEdge(langgraph_1.START, 'inventory');
        this.graph.addEdge(langgraph_1.START, 'tech');
        this.graph.addEdge('fitness', 'coordinator');
        this.graph.addEdge('learning', 'coordinator');
        this.graph.addEdge('inventory', 'coordinator');
        this.graph.addEdge('tech', 'coordinator');
        this.graph.addEdge('coordinator', langgraph_1.END);
    }
    async runFitnessAgent(state) {
        try {
            const result = await this.fitnessAgent.run(state.query);
            return {
                ...state,
                fitnessResult: result,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Fitness agent failed: ${error.message}`,
            };
        }
    }
    async runLearningAgent(state) {
        try {
            const result = await this.learningAgent.run(state.query);
            return {
                ...state,
                learningResult: result,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Learning agent failed: ${error.message}`,
            };
        }
    }
    async runInventoryAgent(state) {
        try {
            const result = await this.inventoryAgent.run(state.query);
            return {
                ...state,
                inventoryResult: result,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Inventory agent failed: ${error.message}`,
            };
        }
    }
    async runTechAgent(state) {
        try {
            const result = await this.techAgent.run(state.query);
            return {
                ...state,
                techResult: result,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Tech agent failed: ${error.message}`,
            };
        }
    }
    async coordinateResults(state) {
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
            const response = await this.model.invoke([new messages_1.HumanMessage(prompt)]);
            return {
                ...state,
                coordinatorResult: response.content,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Coordination failed: ${error.message}`,
            };
        }
    }
    async run(query) {
        const initialState = {
            query,
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.coordinatorResult || result.error || 'No result generated';
    }
}
exports.SwarmAgentGraph = SwarmAgentGraph;
//# sourceMappingURL=swarm-agent.graph.js.map