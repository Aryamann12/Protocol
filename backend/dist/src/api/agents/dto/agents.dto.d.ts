export type AgentPattern = 'sequential' | 'swarm' | 'conditional' | 'loop' | 'fitness' | 'learning' | 'inventory' | 'tech';
export declare class QueryDto {
    query: string;
    pattern?: AgentPattern;
}
export declare class AnalyzeDto {
    query: string;
    collection?: string;
}
export declare class InsightsDto {
    query: string;
}
export declare class SwarmDto {
    query: string;
}
