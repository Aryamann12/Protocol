import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';
import { CollectionsService } from '../collections/collections.service';
import { FitnessAgentGraph } from './fitness/fitness-agent.graph';
import { LearningAgentGraph } from './learning/learning-agent.graph';
import { InventoryAgentGraph } from './inventory/inventory-agent.graph';
import { TechAgentGraph } from './tech/tech-agent.graph';
import { SequentialAgentGraph } from './sequential/sequential-agent.graph';
import { SwarmAgentGraph } from './swarm/swarm-agent.graph';
import { ConditionalAgentGraph } from './conditional/conditional-agent.graph';
import { LoopAgentGraph } from './loop/loop-agent.graph';

export type AgentPattern = 'sequential' | 'swarm' | 'conditional' | 'loop' | 'fitness' | 'learning' | 'inventory' | 'tech';

@Injectable()
export class AgentsService {
  private fitnessAgent: FitnessAgentGraph;
  private learningAgent: LearningAgentGraph;
  private inventoryAgent: InventoryAgentGraph;
  private techAgent: TechAgentGraph;
  private sequentialAgent: SequentialAgentGraph;
  private swarmAgent: SwarmAgentGraph;
  private conditionalAgent: ConditionalAgentGraph;
  private loopAgent: LoopAgentGraph;

  constructor(
    private llmService: LlmService,
    private collectionsService: CollectionsService,
  ) {
    // Initialize agents lazily when model is available
  }

  private async initializeAgents() {
    const model = await this.llmService.getModel();
    
    if (!this.fitnessAgent) {
      this.fitnessAgent = new FitnessAgentGraph(model, this.collectionsService);
      this.learningAgent = new LearningAgentGraph(model, this.collectionsService);
      this.inventoryAgent = new InventoryAgentGraph(model, this.collectionsService);
      this.techAgent = new TechAgentGraph(model, this.collectionsService);
      this.sequentialAgent = new SequentialAgentGraph(model, this.collectionsService);
      this.swarmAgent = new SwarmAgentGraph(model, this.collectionsService);
      this.conditionalAgent = new ConditionalAgentGraph(model, this.collectionsService);
      this.loopAgent = new LoopAgentGraph(model, this.collectionsService);
    }
  }

  async processQuery(query: string, pattern: AgentPattern = 'conditional'): Promise<string> {
    await this.initializeAgents();

    switch (pattern) {
      case 'fitness':
        return this.fitnessAgent.run(query);
      case 'learning':
        return this.learningAgent.run(query);
      case 'inventory':
        return this.inventoryAgent.run(query);
      case 'tech':
        return this.techAgent.run(query);
      case 'sequential':
        return this.sequentialAgent.run(query);
      case 'swarm':
        return this.swarmAgent.run(query);
      case 'conditional':
        return this.conditionalAgent.run(query);
      case 'loop':
        return this.loopAgent.run(query);
      default:
        return this.conditionalAgent.run(query);
    }
  }

  async analyzeData(query: string, collectionName?: string): Promise<string> {
    await this.initializeAgents();
    // Use conditional agent for analysis
    return this.conditionalAgent.run(query);
  }

  async generateInsights(query: string): Promise<string> {
    await this.initializeAgents();
    // Use swarm agent for comprehensive insights
    return this.swarmAgent.run(query);
  }
}

