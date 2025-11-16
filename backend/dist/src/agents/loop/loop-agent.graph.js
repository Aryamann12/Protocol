"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
const messages_1 = require("@langchain/core/messages");
class LoopAgentGraph {
    constructor(model, collectionsService) {
        this.model = model;
        this.collectionsService = collectionsService;
        this.graph = new langgraph_1.StateGraph({
            channels: {
                query: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                iteration: {
                    reducer: (x, y) => y ?? x,
                    default: () => 0,
                },
                maxIterations: {
                    reducer: (x, y) => y ?? x,
                    default: () => 3,
                },
                currentResult: {
                    reducer: (x, y) => y ?? x,
                    default: () => '',
                },
                previousResults: {
                    reducer: (x, y) => x.concat(y),
                    default: () => [],
                },
                shouldContinue: {
                    reducer: (x, y) => y ?? x,
                    default: () => true,
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
        this.graph.addNode('process', this.processQuery.bind(this));
        this.graph.addNode('evaluate', this.evaluateResult.bind(this));
        this.graph.addNode('refine', this.refineResult.bind(this));
        this.graph.addEdge(langgraph_1.START, 'process');
        this.graph.addConditionalEdges('evaluate', (state) => {
            if (state.iteration >= state.maxIterations)
                return 'end';
            if (!state.shouldContinue)
                return 'end';
            return 'refine';
        }, {
            refine: 'refine',
            end: langgraph_1.END,
        });
        this.graph.addEdge('refine', 'process');
        this.graph.addEdge('process', 'evaluate');
    }
    async processQuery(state) {
        const iterationContext = state.iteration > 0
            ? `\n\nPrevious iteration result:\n${state.previousResults[state.previousResults.length - 1]}`
            : '';
        const prompt = `Process the following query (Iteration ${state.iteration + 1}/${state.maxIterations}):${iterationContext}

Query: ${state.query}

${state.iteration > 0 ? 'Refine and improve upon the previous result based on the feedback.' : 'Provide a comprehensive analysis.'}`;
        try {
            const response = await this.model.invoke([new messages_1.HumanMessage(prompt)]);
            return {
                ...state,
                iteration: state.iteration + 1,
                currentResult: response.content,
                previousResults: [...state.previousResults, response.content],
            };
        }
        catch (error) {
            return {
                ...state,
                error: `Processing failed: ${error.message}`,
                shouldContinue: false,
            };
        }
    }
    async evaluateResult(state) {
        if (state.iteration >= state.maxIterations) {
            return {
                ...state,
                shouldContinue: false,
                finalResult: state.currentResult || state.previousResults[state.previousResults.length - 1],
            };
        }
        const evaluationPrompt = `Evaluate if this result needs further refinement:

Query: ${state.query}
Current Result: ${state.currentResult}
Previous Results: ${state.previousResults.length > 1 ? state.previousResults.slice(0, -1).join('\n---\n') : 'None'}

Is this result comprehensive, accurate, and complete? Respond with ONLY "yes" or "no".`;
        try {
            const response = await this.model.invoke([new messages_1.HumanMessage(evaluationPrompt)]);
            const shouldContinue = response.content.toLowerCase().trim() !== 'yes';
            return {
                ...state,
                shouldContinue,
                finalResult: !shouldContinue ? state.currentResult : undefined,
            };
        }
        catch (error) {
            return {
                ...state,
                shouldContinue: state.iteration < state.maxIterations,
            };
        }
    }
    async refineResult(state) {
        return state;
    }
    async run(query, maxIterations = 3) {
        const initialState = {
            query,
            iteration: 0,
            maxIterations,
            previousResults: [],
            shouldContinue: true,
        };
        const compiledGraph = this.graph.compile();
        const result = await compiledGraph.invoke(initialState);
        return result.finalResult || result.currentResult || result.error || 'No result generated';
    }
}
exports.LoopAgentGraph = LoopAgentGraph;
//# sourceMappingURL=loop-agent.graph.js.map