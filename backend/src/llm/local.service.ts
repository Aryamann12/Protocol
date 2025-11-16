import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

@Injectable()
export class LocalService {
  private model: ChatOllama;

  constructor(private configService: ConfigService) {
    const baseUrl = this.configService.get<string>('OLLAMA_BASE_URL') || 'http://localhost:11434';
    const modelName = this.configService.get<string>('OLLAMA_MODEL') || 'llama2';

    // Temperature adjustment based on model size
    // Small models (<7B) need more deterministic outputs
    // Large models (20B+) can handle higher temperature
    let temperature = 0.7; // Default
    
    if (modelName.includes('gpt-oss:120b') || modelName.includes('gpt-oss:20b')) {
      temperature = 0.7; // GPT-OSS models work well at default
    } else if (modelName.includes('3b') || modelName.includes('1b') || modelName.includes('2b')) {
      temperature = 0.1; // Very low for tiny models
    } else if (modelName.includes('7b') || modelName.includes('8b')) {
      temperature = 0.3; // Low for small models
    } else if (modelName.includes('13b') || modelName.includes('14b')) {
      temperature = 0.5; // Medium for mid-size models
    }

    // Context window based on model capabilities
    let numCtx = 4096; // Default for small models
    if (modelName.includes('gpt-oss:120b')) {
      numCtx = 32768; // Large context for 120B model
    } else if (modelName.includes('gpt-oss:20b')) {
      numCtx = 16384; // Good context for 20B model
    } else if (modelName.includes('13b') || modelName.includes('14b')) {
      numCtx = 8192; // Medium context
    }

    this.model = new ChatOllama({
      baseUrl: baseUrl,
      model: modelName,
      temperature: temperature,
      numCtx: numCtx,
    });
  }

  async getModel(): Promise<BaseChatModel> {
    // Return model without testing (test will happen on first actual use)
    // This avoids blocking initialization if Ollama is starting up
    return this.model;
  }
}

