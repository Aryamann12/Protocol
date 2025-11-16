import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { CollectionsModule } from './collections/collections.module';
import { LlmModule } from './llm/llm.module';
import { AgentsModule } from './agents/agents.module';
import { ApiModule } from './api/api.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongodbModule,
    CollectionsModule,
    LlmModule,
    AgentsModule,
    ApiModule,
    SchedulerModule,
  ],
})
export class AppModule {}

