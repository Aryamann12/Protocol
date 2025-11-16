import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AgentState } from '../base/base-agent.graph';
import { CollectionsService } from '../../collections/collections.service';
import { Book, CppProblem, TleLevel3Course, UdemyCourse } from '../../types/collections.types';
export interface LearningAgentState extends AgentState {
    books?: Book[];
    problems?: CppProblem[];
    courses?: (TleLevel3Course | UdemyCourse)[];
    analysis?: string;
    recommendations?: string;
}
export declare class LearningAgentGraph {
    private model;
    private collectionsService;
    private graph;
    constructor(model: BaseChatModel, collectionsService: CollectionsService);
    private setupGraph;
    private fetchLearningData;
    private analyzeProgress;
    private generateRecommendations;
    private generateResponse;
    run(query: string): Promise<string>;
}
