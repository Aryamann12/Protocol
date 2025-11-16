import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenaiService } from './openai.service';
import { LocalService } from './local.service';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

@Injectable()
export class LlmService {
  private useLocal: boolean;

  constructor(
    private configService: ConfigService,
    private openaiService: OpenaiService,
    private localService: LocalService,
  ) {
    this.useLocal = this.configService.get<string>('USE_LOCAL_LLM') === 'true';
  }

  async getModel(): Promise<BaseChatModel> {
    if (this.useLocal) {
      try {
        return await this.localService.getModel();
      } catch (error) {
        console.warn('⚠️ Local model failed, falling back to OpenAI:', error);
        return this.openaiService.getModel();
      }
    }
    return this.openaiService.getModel();
  }

  getModelName(): string {
    if (this.useLocal) {
      return this.configService.get<string>('OLLAMA_MODEL') || 'llama2';
    }
    return this.configService.get<string>('OPENAI_MODEL') || 'gpt-4';
  }
}

