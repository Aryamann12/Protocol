import { ConfigService } from '@nestjs/config';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
export declare class LocalService {
    private configService;
    private model;
    constructor(configService: ConfigService);
    getModel(): Promise<BaseChatModel>;
}
