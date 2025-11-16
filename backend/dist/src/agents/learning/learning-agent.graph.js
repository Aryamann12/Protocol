"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
class LearningAgentGraph {
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
                books: {
                    reducer: (x, y) => y ?? x,
                    default: () => [],
                },
                problems: {
                    reducer: (x, y) => y ?? x,
                    default: () => [],
                },
                courses: {
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
        this.graph.addNode('fetchData', this.fetchLearningData.bind(this));
        this.graph.addNode('analyze', this.analyzeProgress.bind(this));
        this.graph.addNode('recommend', this.generateRecommendations.bind(this));
        this.graph.addNode('respond', this.generateResponse.bind(this));
        this.graph.addEdge(langgraph_1.START, 'fetchData');
        this.graph.addEdge('fetchData', 'analyze');
        this.graph.addEdge('analyze', 'recommend');
        this.graph.addEdge('recommend', 'respond');
        this.graph.addEdge('respond', langgraph_1.END);
    }
    async fetchLearningData(state) {
        try {
            const [books, problems, tleCourses, udemyCourses] = await Promise.all([
                this.collectionsService.findDocuments('books', {}, 50),
                this.collectionsService.findDocuments('cppproblems', {}, 50),
                this.collectionsService.findDocuments('tlelevel3courses', {}, 50),
                this.collectionsService.findDocuments('udemycourses', {}, 50),
            ]);
            return {
                ...state,
                books: books,
                problems: problems,
                courses: [...tleCourses, ...udemyCourses],
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Failed to fetch learning data: ${error.message}`,
            };
        }
    }
    async analyzeProgress(state) {
        const prompt = `Analyze the following learning data:

Books: ${JSON.stringify(state.books?.slice(0, 5), null, 2)}
Problems: ${JSON.stringify(state.problems?.slice(0, 5), null, 2)}
Courses: ${JSON.stringify(state.courses?.slice(0, 5), null, 2)}

Query: ${state.query}

Provide insights on learning progress, completion rates, and knowledge gaps.`;
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

Provide specific recommendations for next learning steps, books to read, or problems to solve.`;
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
        const finalResponse = `## Learning Analysis
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
            books: [],
            problems: [],
            courses: [],
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.result || result.error || 'No result generated';
    }
}
exports.LearningAgentGraph = LearningAgentGraph;
//# sourceMappingURL=learning-agent.graph.js.map