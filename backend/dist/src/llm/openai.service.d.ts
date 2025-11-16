import { ConfigService } from '@nestjs/config';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
export declare class OpenaiService {
    private configService;
    private model;
    constructor(configService: ConfigService);
    getModel(): BaseChatModel;
}
