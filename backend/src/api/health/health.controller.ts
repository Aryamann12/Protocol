import { Controller, Get } from '@nestjs/common';
import { MongodbService } from '../../mongodb/mongodb.service';
import { LlmService } from '../../llm/llm.service';

@Controller('health')
export class HealthController {
  constructor(
    private mongodbService: MongodbService,
    private llmService: LlmService,
  ) {}

  @Get()
  async health() {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        mongodb: 'unknown',
        llm: 'unknown',
      },
    };

    try {
      // Test MongoDB connection
      const db = this.mongodbService.getDatabase();
      await db.admin().ping();
      health.services.mongodb = 'connected';
    } catch (error) {
      health.services.mongodb = `error: ${error.message}`;
      health.status = 'degraded';
    }

    try {
      // Test LLM service
      const model = await this.llmService.getModel();
      health.services.llm = `connected (${this.llmService.getModelName()})`;
    } catch (error) {
      health.services.llm = `error: ${error.message}`;
      health.status = 'degraded';
    }

    return health;
  }
}

