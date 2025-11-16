import { StateGraph, END, START } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

/**
 * Base agent state interface
 */
export interface AgentState {
  messages: Array<HumanMessage | AIMessage>;
  query: string;
  context?: any;
  result?: string;
  error?: string;
}

/**
 * Base agent graph that other agents can extend
 */
export class BaseAgentGraph {
  protected model: BaseChatModel;
  protected graph: StateGraph<AgentState>;

  constructor(model: BaseChatModel) {
    this.model = model;
    this.graph = new StateGraph<AgentState>({
      channels: {
        messages: {
          reducer: (x: any[], y: any[]) => x.concat(y),
          default: () => [],
        },
        query: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        context: {
          reducer: (x: any, y: any) => y ?? x,
          default: () => ({}),
        },
        result: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
        error: {
          reducer: (x: string, y: string) => y ?? x,
          default: () => '',
        },
      },
    });
  }

  /**
   * Process a query through the agent
   */
  async process(state: AgentState): Promise<AgentState> {
    try {
      const response = await this.model.invoke(state.messages);
      return {
        ...state,
        messages: [...state.messages, response],
        result: response.content as string,
      };
    } catch (error) {
      return {
        ...state,
        error: error.message,
      };
    }
  }

  /**
   * Get the compiled graph
   */
  getGraph() {
    return this.graph;
  }
}

