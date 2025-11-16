import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AgentsService, AgentPattern } from '../../agents/agents.service';
import { CollectionsService } from '../../collections/collections.service';
import { QueryDto, AnalyzeDto, InsightsDto, SwarmDto } from './dto/agents.dto';

@Controller('agents')
export class AgentsController {
  constructor(
    private agentsService: AgentsService,
    private collectionsService: CollectionsService,
  ) {}

  @Post('query')
  async query(@Body() queryDto: QueryDto) {
    const result = await this.agentsService.processQuery(
      queryDto.query,
      queryDto.pattern || 'conditional',
    );
    return {
      success: true,
      query: queryDto.query,
      pattern: queryDto.pattern || 'conditional',
      result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('analyze')
  async analyze(@Body() analyzeDto: AnalyzeDto) {
    const result = await this.agentsService.analyzeData(
      analyzeDto.query,
      analyzeDto.collection,
    );
    return {
      success: true,
      query: analyzeDto.query,
      collection: analyzeDto.collection,
      analysis: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('insights')
  async insights(@Body() insightsDto: InsightsDto) {
    const result = await this.agentsService.generateInsights(insightsDto.query);
    return {
      success: true,
      query: insightsDto.query,
      insights: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('swarm')
  async swarm(@Body() swarmDto: SwarmDto) {
    const result = await this.agentsService.processQuery(
      swarmDto.query,
      'swarm',
    );
    return {
      success: true,
      query: swarmDto.query,
      pattern: 'swarm',
      result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('collections')
  async getCollections() {
    const collections = await this.collectionsService.getAllCollections();
    const collectionsWithCounts = await Promise.all(
      collections.map(async (name) => ({
        name,
        count: await this.collectionsService.getCollectionCount(name),
      })),
    );
    return {
      success: true,
      collections: collectionsWithCounts,
      total: collections.length,
      timestamp: new Date().toISOString(),
    };
  }
}

