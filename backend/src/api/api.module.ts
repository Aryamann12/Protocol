import { Module } from '@nestjs/common';
import { AgentsModule } from '../agents/agents.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { CollectionsModule } from '../collections/collections.module';
import { LlmModule } from '../llm/llm.module';
import { AgentsController } from './agents/agents.controller';
import { HealthController } from './health/health.controller';
import { SchedulerController } from './scheduler/scheduler.controller';

@Module({
  imports: [AgentsModule, SchedulerModule, CollectionsModule, LlmModule],
  controllers: [AgentsController, HealthController, SchedulerController],
})
export class ApiModule {}

