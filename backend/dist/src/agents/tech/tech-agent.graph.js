"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
class TechAgentGraph {
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
                streamingApps: {
                    reducer: (x, y) => y ?? x,
                    default: () => [],
                },
                socialPlatforms: {
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
        this.graph.addNode('fetchData', this.fetchTechData.bind(this));
        this.graph.addNode('analyze', this.analyzeTechUsage.bind(this));
        this.graph.addNode('recommend', this.generateRecommendations.bind(this));
        this.graph.addNode('respond', this.generateResponse.bind(this));
        this.graph.addEdge(langgraph_1.START, 'fetchData');
        this.graph.addEdge('fetchData', 'analyze');
        this.graph.addEdge('analyze', 'recommend');
        this.graph.addEdge('recommend', 'respond');
        this.graph.addEdge('respond', langgraph_1.END);
    }
    async fetchTechData(state) {
        try {
            const [streamingApps, socialPlatforms] = await Promise.all([
                this.collectionsService.findDocuments('streamingapps', {}, 50),
                this.collectionsService.findDocuments('socialplatforms', {}, 50),
            ]);
            return {
                ...state,
                streamingApps: streamingApps,
                socialPlatforms: socialPlatforms,
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Failed to fetch tech data: ${error.message}`,
            };
        }
    }
    async analyzeTechUsage(state) {
        const prompt = `Analyze the following tech platform data:

Streaming Apps: ${JSON.stringify(state.streamingApps, null, 2)}
Social Platforms: ${JSON.stringify(state.socialPlatforms, null, 2)}

Query: ${state.query}

Provide insights on platform usage, subscriptions, and digital habits.`;
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

Provide recommendations for optimizing tech usage, managing subscriptions, or improving digital habits.`;
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
        const finalResponse = `## Tech Usage Analysis
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
            streamingApps: [],
            socialPlatforms: [],
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.result || result.error || 'No result generated';
    }
}
exports.TechAgentGraph = TechAgentGraph;
//# sourceMappingURL=tech-agent.graph.js.map