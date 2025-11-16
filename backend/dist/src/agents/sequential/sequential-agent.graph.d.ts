import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { CollectionsService } from '../../collections/collections.service';
export interface SequentialAgentState {
    query: string;
    step: number;
    results: string[];
    finalResult?: string;
    error?: string;
}
export declare class SequentialAgentGraph {
    private model;
    private collectionsService;
    private fitnessAgent;
    private learningAgent;
    private inventoryAgent;
    private techAgent;
    private graph;
    constructor(model: BaseChatModel, collectionsService: CollectionsService);
    private setupGraph;
    private runFitnessAgent;
    private runLearningAgent;
    private runInventoryAgent;
    private runTechAgent;
    private aggregateResults;
    run(query: string): Promise<string>;
}
