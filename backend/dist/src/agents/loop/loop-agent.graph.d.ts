import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { CollectionsService } from '../../collections/collections.service';
export interface LoopAgentState {
    query: string;
    iteration: number;
    maxIterations: number;
    currentResult?: string;
    previousResults: string[];
    shouldContinue: boolean;
    finalResult?: string;
    error?: string;
}
export declare class LoopAgentGraph {
    private model;
    private collectionsService;
    private graph;
    constructor(model: BaseChatModel, collectionsService: CollectionsService);
    private setupGraph;
    private processQuery;
    private evaluateResult;
    private refineResult;
    run(query: string, maxIterations?: number): Promise<string>;
}
