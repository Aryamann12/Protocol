import { Controller, Post, Get } from '@nestjs/common';
import { SchedulerService } from '../../scheduler/scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private schedulerService: SchedulerService) {}

  @Get('test-all')
  async testAll() {
    const results = await Promise.all([
      this.schedulerService.triggerLifeOptimizer(),
      this.schedulerService.triggerFridgeManager(),
      this.schedulerService.triggerProgressReview(),
      this.schedulerService.triggerProblemDetector(),
    ]);

    return {
      success: true,
      message: 'All CRON jobs executed successfully',
      timestamp: new Date().toISOString(),
      results: {
        lifeOptimizer: results[0],
        fridgeManager: results[1],
        progressReview: results[2],
        problemDetector: results[3],
      },
    };
  }

  @Post('trigger/life-optimizer')
  async triggerLifeOptimizer() {
    try {
      const result = await this.schedulerService.triggerLifeOptimizer();
      return {
        success: !result?.error,
        useCase: 'Life Optimizer',
        result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        useCase: 'Life Optimizer',
        error: error.message || 'Unknown error occurred',
        stack: error.stack,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('trigger/fridge-manager')
  async triggerFridgeManager() {
    const result = await this.schedulerService.triggerFridgeManager();
    return {
      success: true,
      useCase: 'Fridge Manager',
      result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('trigger/progress-review')
  async triggerProgressReview() {
    const result = await this.schedulerService.triggerProgressReview();
    return {
      success: true,
      useCase: 'Progress Review',
      result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('trigger/problem-detector')
  async triggerProblemDetector() {
    const result = await this.schedulerService.triggerProblemDetector();
    return {
      success: true,
      useCase: 'Problem Detector',
      result,
      timestamp: new Date().toISOString(),
    };
  }
}

