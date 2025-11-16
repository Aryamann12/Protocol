"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
const fitness_agent_graph_1 = require("../fitness/fitness-agent.graph");
const learning_agent_graph_1 = require("../learning/learning-agent.graph");
const inventory_agent_graph_1 = require("../inventory/inventory-agent.graph");
const tech_agent_graph_1 = require("../tech/tech-agent.graph");
class ConditionalAgentGraph {
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
                route: {
                    reducer: (x, y) => y ?? x,
                    default: () => undefined,
                },
                result: {
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
        this.graph.addNode('router', this.routeQuery.bind(this));
        this.graph.addNode('fitness', this.runFitnessAgent.bind(this));
        this.graph.addNode('learning', this.runLearningAgent.bind(this));
        this.graph.addNode('inventory', this.runInventoryAgent.bind(this));
        this.graph.addNode('tech', this.runTechAgent.bind(this));
        this.graph.addNode('all', this.runAllAgents.bind(this));
        this.graph.addEdge(langgraph_1.START, 'router');
        this.graph.addConditionalEdges('router', (state) => state.route || 'all', {
            fitness: 'fitness',
            learning: 'learning',
            inventory: 'inventory',
            tech: 'tech',
            all: 'all',
        });
        this.graph.addEdge('fitness', langgraph_1.END);
        this.graph.addEdge('learning', langgraph_1.END);
        this.graph.addEdge('inventory', langgraph_1.END);
        this.graph.addEdge('tech', langgraph_1.END);
        this.graph.addEdge('all', langgraph_1.END);
    }
    async routeQuery(state) {
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
            const response = await this.model.invoke([new messages_1.HumanMessage(routingPrompt)]);
            const route = response.content.toLowerCase().trim();
            const validRoutes = ['fitness', 'learning', 'inventory', 'tech', 'all'];
            const selectedRoute = validRoutes.includes(route) ? route : 'all';
            return {
                ...state,
                route: selectedRoute,
            };
        }
        catch (error) {
            return {
                ...state,
                route: 'all',
                error: `Routing failed, defaulting to all: ${error.message}`,
            };
        }
    }
    async runFitnessAgent(state) {
        try {
            const result = await this.fitnessAgent.run(state.query);
            return {
                ...state,
                result,
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
                result,
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
                result,
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
                result,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Tech agent failed: ${error.message}`,
            };
        }
    }
    async runAllAgents(state) {
        try {
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
        }
        catch (error) {
            return {
                ...state,
                error: `All agents execution failed: ${error.message}`,
            };
        }
    }
    async run(query) {
        const initialState = {
            query,
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.result || result.error || 'No result generated';
    }
}
exports.ConditionalAgentGraph = ConditionalAgentGraph;
//# sourceMappingURL=conditional-agent.graph.js.map