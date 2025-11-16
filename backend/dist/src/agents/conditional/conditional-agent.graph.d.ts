import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { CollectionsService } from '../../collections/collections.service';
export interface ConditionalAgentState {
    query: string;
    route?: 'fitness' | 'learning' | 'inventory' | 'tech' | 'all';
    result?: string;
    error?: string;
}
export declare class ConditionalAgentGraph {
    private model;
    private collectionsService;
    private fitnessAgent;
    private learningAgent;
    private inventoryAgent;
    private techAgent;
    private graph;
    constructor(model: BaseChatModel, collectionsService: CollectionsService);
    private setupGraph;
    private routeQuery;
    private runFitnessAgent;
    private runLearningAgent;
    private runInventoryAgent;
    private runTechAgent;
    private runAllAgents;
    run(query: string): Promise<string>;
}
