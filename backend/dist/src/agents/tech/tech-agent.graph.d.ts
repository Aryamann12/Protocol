import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';
import { StreamingApp, SocialPlatform } from '../../types/collections.types';
export interface TechAgentState extends AgentState {
    streamingApps?: StreamingApp[];
    socialPlatforms?: SocialPlatform[];
    analysis?: string;
    recommendations?: string;
}
export declare class TechAgentGraph {
    private model;
    private collectionsService;
    private graph;
    constructor(model: BaseChatModel, collectionsService: CollectionsService);
    private setupGraph;
    private fetchTechData;
    private analyzeTechUsage;
    private generateRecommendations;
    private generateResponse;
    run(query: string): Promise<string>;
}
