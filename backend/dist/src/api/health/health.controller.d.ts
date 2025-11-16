import { MongodbService } from '../../mongodb/mongodb.service';
import { LlmService } from '../../llm/llm.service';
export declare class HealthController {
    private mongodbService;
    private llmService;
    constructor(mongodbService: MongodbService, llmService: LlmService);
    health(): Promise<{
        status: string;
        timestamp: string;
        services: {
            mongodb: string;
            llm: string;
        };
    }>;
}
