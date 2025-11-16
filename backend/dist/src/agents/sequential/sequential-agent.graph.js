"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequentialAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
const fitness_agent_graph_1 = require("../fitness/fitness-agent.graph");
const learning_agent_graph_1 = require("../learning/learning-agent.graph");
const inventory_agent_graph_1 = require("../inventory/inventory-agent.graph");
const tech_agent_graph_1 = require("../tech/tech-agent.graph");
class SequentialAgentGraph {
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
                step: {
                    reducer: (x, y) => y ?? x,
                    default: () => 0,
                },
                results: {
                    reducer: (x, y) => x.concat(y),
                    default: () => [],
                },
                finalResult: {
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
        this.graph.addNode('aggregate', this.aggregateResults.bind(this));
        this.graph.addEdge(langgraph_1.START, 'fitness');
        this.graph.addEdge('fitness', 'learning');
        this.graph.addEdge('learning', 'inventory');
        this.graph.addEdge('inventory', 'tech');
        this.graph.addEdge('tech', 'aggregate');
        this.graph.addEdge('aggregate', langgraph_1.END);
    }
    async runFitnessAgent(state) {
        try {
            const result = await this.fitnessAgent.run(state.query);
            return {
                ...state,
                step: 1,
                results: [...state.results, `Fitness Analysis:\n${result}`],
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
                step: 2,
                results: [...state.results, `Learning Analysis:\n${result}`],
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
                step: 3,
                results: [...state.results, `Inventory Analysis:\n${result}`],
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
                step: 4,
                results: [...state.results, `Tech Analysis:\n${result}`],
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Tech agent failed: ${error.message}`,
            };
        }
    }
    async aggregateResults(state) {
        const prompt = `Aggregate and synthesize the following sequential analysis results:

${state.results.join('\n\n---\n\n')}

Original Query: ${state.query}

Provide a comprehensive summary that combines insights from all domains.`;
        try {
            const response = await this.model.invoke([new messages_1.HumanMessage(prompt)]);
            return {
                ...state,
                finalResult: response.content,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Aggregation failed: ${error.message}`,
            };
        }
    }
    async run(query) {
        const initialState = {
            query,
            step: 0,
            results: [],
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.finalResult || result.error || 'No result generated';
    }
}
exports.SequentialAgentGraph = SequentialAgentGraph;
//# sourceMappingURL=sequential-agent.graph.js.map