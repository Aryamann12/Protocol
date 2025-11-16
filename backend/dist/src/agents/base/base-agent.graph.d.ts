import { StateGraph } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
export interface AgentState {
    messages: Array<HumanMessage | AIMessage>;
    query: string;
    context?: any;
    result?: string;
    error?: string;
}
export declare class BaseAgentGraph {
    protected model: BaseChatModel;
    protected graph: StateGraph<AgentState>;
    constructor(model: BaseChatModel);
    process(state: AgentState): Promise<AgentState>;
    getGraph(): StateGraph<AgentState, AgentState, Partial<AgentState>, "__start__", import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition>;
}
