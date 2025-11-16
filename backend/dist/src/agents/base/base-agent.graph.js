"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAgentGraph = void 0;
const langgraph_1 = require("@langchain/langgraph");
class BaseAgentGraph {
    constructor(model) {
        this.model = model;
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
                context: {
                    reducer: (x, y) => y ?? x,
                    default: () => ({}),
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
    }
    async process(state) {
        try {
            const response = await this.model.invoke(state.messages);
            return {
                ...state,
                messages: [...state.messages, response],
                result: response.content,
            };
        }
        catch (error) {
            return {
                ...state,
                error: error.message,
            };
        }
    }
    getGraph() {
        return this.graph;
    }
}
exports.BaseAgentGraph = BaseAgentGraph;
//# sourceMappingURL=base-agent.graph.js.map