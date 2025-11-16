"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitnessAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
class FitnessAgentGraph {
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
                gymData: {
                    reducer: (x, y) => y ?? x,
                    default: () => [],
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
        this.graph.addNode('fetchData', this.fetchGymData.bind(this));
        this.graph.addNode('analyze', this.analyzeProgress.bind(this));
        this.graph.addNode('recommend', this.generateRecommendations.bind(this));
        this.graph.addNode('respond', this.generateResponse.bind(this));
        this.graph.addEdge(langgraph_1.START, 'fetchData');
        this.graph.addEdge('fetchData', 'analyze');
        this.graph.addEdge('analyze', 'recommend');
        this.graph.addEdge('recommend', 'respond');
        this.graph.addEdge('respond', langgraph_1.END);
    }
    async fetchGymData(state) {
        try {
            const gymData = await this.collectionsService.findDocuments('gym-progress', {}, 50);
            return {
                ...state,
                gymData: gymData,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Failed to fetch gym data: ${error.message}`,
            };
        }
    }
    async analyzeProgress(state) {
        const prompt = `Analyze the following gym progress data and provide insights:
    
${JSON.stringify(state.gymData, null, 2)}

Query: ${state.query}

Provide a detailed analysis of the workout patterns, progress trends, and areas for improvement.`;
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

Provide specific, actionable recommendations for improving the workout routine.`;
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
        const finalResponse = `## Analysis
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
            gymData: [],
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.result || result.error || 'No result generated';
    }
}
exports.FitnessAgentGraph = FitnessAgentGraph;
//# sourceMappingURL=fitness-agent.graph.js.map