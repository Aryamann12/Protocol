import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { OpenaiService } from './openai.service';
import { LocalService } from './local.service';

@Module({
  providers: [LlmService, OpenaiService, LocalService],
  exports: [LlmService],
})
export class LlmModule {}

