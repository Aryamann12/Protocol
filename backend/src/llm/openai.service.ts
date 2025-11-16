import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

@Injectable()
export class OpenaiService {
  private model: ChatOpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey) {
      console.warn('⚠️ OPENAI_API_KEY not set. OpenAI service will not work.');
    }
  }

  getModel(): BaseChatModel {
    if (!this.model) {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');
      const modelName = this.configService.get<string>('OPENAI_MODEL') || 'gpt-4';

      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not set. Please configure it in your .env file.');
      }

      this.model = new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: modelName,
        temperature: 0.7,
      });
    }

    return this.model as BaseChatModel;
  }
}

