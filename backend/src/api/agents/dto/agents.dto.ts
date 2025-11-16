import { IsString, IsOptional, IsEnum } from 'class-validator';

export type AgentPattern = 'sequential' | 'swarm' | 'conditional' | 'loop' | 'fitness' | 'learning' | 'inventory' | 'tech';

export class QueryDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsEnum(['sequential', 'swarm', 'conditional', 'loop', 'fitness', 'learning', 'inventory', 'tech'])
  pattern?: AgentPattern;
}

export class AnalyzeDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsString()
  collection?: string;
}

export class InsightsDto {
  @IsString()
  query: string;
}

export class SwarmDto {
  @IsString()
  query: string;
}

