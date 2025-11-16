import { AgentsService } from '../../agents/agents.service';
import { CollectionsService } from '../../collections/collections.service';
import { QueryDto, AnalyzeDto, InsightsDto, SwarmDto } from './dto/agents.dto';
export declare class AgentsController {
    private agentsService;
    private collectionsService;
    constructor(agentsService: AgentsService, collectionsService: CollectionsService);
    query(queryDto: QueryDto): Promise<{
        success: boolean;
        query: string;
        pattern: import("./dto/agents.dto").AgentPattern;
        result: string;
        timestamp: string;
    }>;
    analyze(analyzeDto: AnalyzeDto): Promise<{
        success: boolean;
        query: string;
        collection: string;
        analysis: string;
        timestamp: string;
    }>;
    insights(insightsDto: InsightsDto): Promise<{
        success: boolean;
        query: string;
        insights: string;
        timestamp: string;
    }>;
    swarm(swarmDto: SwarmDto): Promise<{
        success: boolean;
        query: string;
        pattern: string;
        result: string;
        timestamp: string;
    }>;
    getCollections(): Promise<{
        success: boolean;
        collections: {
            name: import("../../types/collections.types").CollectionName;
            count: number;
        }[];
        total: number;
        timestamp: string;
    }>;
}
