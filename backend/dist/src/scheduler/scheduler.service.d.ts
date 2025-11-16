import { AgentsService } from '../agents/agents.service';
import { CollectionsService } from '../collections/collections.service';
export declare class SchedulerService {
    private agentsService;
    private collectionsService;
    private readonly logger;
    constructor(agentsService: AgentsService, collectionsService: CollectionsService);
    runLifeOptimizer(): Promise<string | {
        error: boolean;
        message: any;
        stack: any;
        timestamp: string;
    }>;
    runFridgeManager(): Promise<string>;
    runProgressReview(): Promise<string>;
    runProblemDetector(): Promise<string>;
    private generateLifeBriefing;
    private generateFridgeReport;
    private generateProgressReview;
    private detectProblems;
    triggerLifeOptimizer(): Promise<string | {
        error: boolean;
        message: any;
        stack: any;
        timestamp: string;
    }>;
    triggerFridgeManager(): Promise<string>;
    triggerProgressReview(): Promise<string>;
    triggerProblemDetector(): Promise<string>;
}
