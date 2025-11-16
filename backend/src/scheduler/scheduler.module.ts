import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { AgentsModule } from '../agents/agents.module';
import { CollectionsModule } from '../collections/collections.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AgentsModule,
    CollectionsModule,
  ],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}

