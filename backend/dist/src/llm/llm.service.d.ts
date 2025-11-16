import { ConfigService } from '@nestjs/config';
import { OpenaiService } from './openai.service';
import { LocalService } from './local.service';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
export declare class LlmService {
    private configService;
    private openaiService;
    private localService;
    private useLocal;
    constructor(configService: ConfigService, openaiService: OpenaiService, localService: LocalService);
    getModel(): Promise<BaseChatModel>;
    getModelName(): string;
}
