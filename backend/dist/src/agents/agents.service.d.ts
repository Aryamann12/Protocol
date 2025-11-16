import { LlmService } from '../llm/llm.service';
import { CollectionsService } from '../collections/collections.service';
export type AgentPattern = 'sequential' | 'swarm' | 'conditional' | 'loop' | 'fitness' | 'learning' | 'inventory' | 'tech';
export declare class AgentsService {
    private llmService;
    private collectionsService;
    private fitnessAgent;
    private learningAgent;
    private inventoryAgent;
    private techAgent;
    private sequentialAgent;
    private swarmAgent;
    private conditionalAgent;
    private loopAgent;
    constructor(llmService: LlmService, collectionsService: CollectionsService);
    private initializeAgents;
    processQuery(query: string, pattern?: AgentPattern): Promise<string>;
    analyzeData(query: string, collectionName?: string): Promise<string>;
    generateInsights(query: string): Promise<string>;
}
