import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { CollectionsService } from '../../collections/collections.service';
export interface SwarmAgentState {
    query: string;
    fitnessResult?: string;
    learningResult?: string;
    inventoryResult?: string;
    techResult?: string;
    coordinatorResult?: string;
    error?: string;
}
export declare class SwarmAgentGraph {
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
    private coordinateResults;
    run(query: string): Promise<string>;
}
