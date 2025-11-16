import { SchedulerService } from '../../scheduler/scheduler.service';
export declare class SchedulerController {
    private schedulerService;
    constructor(schedulerService: SchedulerService);
    testAll(): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
        results: {
            lifeOptimizer: string | {
                error: boolean;
                message: any;
                stack: any;
                timestamp: string;
            };
            fridgeManager: string;
            progressReview: string;
            problemDetector: string;
        };
    }>;
    triggerLifeOptimizer(): Promise<{
        success: boolean;
        useCase: string;
        result: string | {
            error: boolean;
            message: any;
            stack: any;
            timestamp: string;
        };
        timestamp: string;
        error?: undefined;
        stack?: undefined;
    } | {
        success: boolean;
        useCase: string;
        error: any;
        stack: any;
        timestamp: string;
        result?: undefined;
    }>;
    triggerFridgeManager(): Promise<{
        success: boolean;
        useCase: string;
        result: string;
        timestamp: string;
    }>;
    triggerProgressReview(): Promise<{
        success: boolean;
        useCase: string;
        result: string;
        timestamp: string;
    }>;
    triggerProblemDetector(): Promise<{
        success: boolean;
        useCase: string;
        result: string;
        timestamp: string;
    }>;
}
