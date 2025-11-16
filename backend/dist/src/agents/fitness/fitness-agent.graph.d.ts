import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';
import { GymProgress } from '../../types/collections.types';
export interface FitnessAgentState extends AgentState {
    gymData?: GymProgress[];
    analysis?: string;
    recommendations?: string;
}
export declare class FitnessAgentGraph {
    private model;
    private collectionsService;
    private graph;
    constructor(model: BaseChatModel, collectionsService: CollectionsService);
    private setupGraph;
    private fetchGymData;
    private analyzeProgress;
    private generateRecommendations;
    private generateResponse;
    run(query: string): Promise<string>;
}
