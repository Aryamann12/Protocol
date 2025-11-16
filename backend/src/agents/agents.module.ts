import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { LlmModule } from '../llm/llm.module';
import { CollectionsModule } from '../collections/collections.module';

@Module({
  imports: [LlmModule, CollectionsModule],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}

