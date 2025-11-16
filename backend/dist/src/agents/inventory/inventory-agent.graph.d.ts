import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';
export interface InventoryAgentState extends AgentState {
    inventoryData?: any;
    analysis?: string;
    recommendations?: string;
}
export declare class InventoryAgentGraph {
    private model;
    private collectionsService;
    private graph;
    constructor(model: BaseChatModel, collectionsService: CollectionsService);
    private setupGraph;
    private fetchInventoryData;
    private analyzeInventory;
    private generateRecommendations;
    private generateResponse;
    run(query: string): Promise<string>;
}
