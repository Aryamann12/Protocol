"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const llm_service_1 = require("../llm/llm.service");
const collections_service_1 = require("../collections/collections.service");
const fitness_agent_graph_1 = require("./fitness/fitness-agent.graph");
const learning_agent_graph_1 = require("./learning/learning-agent.graph");
const inventory_agent_graph_1 = require("./inventory/inventory-agent.graph");
const tech_agent_graph_1 = require("./tech/tech-agent.graph");
const sequential_agent_graph_1 = require("./sequential/sequential-agent.graph");
const swarm_agent_graph_1 = require("./swarm/swarm-agent.graph");
const conditional_agent_graph_1 = require("./conditional/conditional-agent.graph");
const loop_agent_graph_1 = require("./loop/loop-agent.graph");
let AgentsService = class AgentsService {
    constructor(llmService, collectionsService) {
        this.llmService = llmService;
        this.collectionsService = collectionsService;
    }
    async initializeAgents() {
        const model = await this.llmService.getModel();
        if (!this.fitnessAgent) {
            this.fitnessAgent = new fitness_agent_graph_1.FitnessAgentGraph(model, this.collectionsService);
            this.learningAgent = new learning_agent_graph_1.LearningAgentGraph(model, this.collectionsService);
            this.inventoryAgent = new inventory_agent_graph_1.InventoryAgentGraph(model, this.collectionsService);
            this.techAgent = new tech_agent_graph_1.TechAgentGraph(model, this.collectionsService);
            this.sequentialAgent = new sequential_agent_graph_1.SequentialAgentGraph(model, this.collectionsService);
            this.swarmAgent = new swarm_agent_graph_1.SwarmAgentGraph(model, this.collectionsService);
            this.conditionalAgent = new conditional_agent_graph_1.ConditionalAgentGraph(model, this.collectionsService);
            this.loopAgent = new loop_agent_graph_1.LoopAgentGraph(model, this.collectionsService);
        }
    }
    async processQuery(query, pattern = 'conditional') {
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
    async analyzeData(query, collectionName) {
        await this.initializeAgents();
        return this.conditionalAgent.run(query);
    }
    async generateInsights(query) {
        await this.initializeAgents();
        return this.swarmAgent.run(query);
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [llm_service_1.LlmService,
        collections_service_1.CollectionsService])
], AgentsService);
//# sourceMappingURL=agents.service.js.map