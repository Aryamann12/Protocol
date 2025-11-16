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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsController = void 0;
const common_1 = require("@nestjs/common");
const agents_service_1 = require("../../agents/agents.service");
const collections_service_1 = require("../../collections/collections.service");
const agents_dto_1 = require("./dto/agents.dto");
let AgentsController = class AgentsController {
    constructor(agentsService, collectionsService) {
        this.agentsService = agentsService;
        this.collectionsService = collectionsService;
    }
    async query(queryDto) {
        const result = await this.agentsService.processQuery(queryDto.query, queryDto.pattern || 'conditional');
        return {
            success: true,
            query: queryDto.query,
            pattern: queryDto.pattern || 'conditional',
            result,
            timestamp: new Date().toISOString(),
        };
    }
    async analyze(analyzeDto) {
        const result = await this.agentsService.analyzeData(analyzeDto.query, analyzeDto.collection);
        return {
            success: true,
            query: analyzeDto.query,
            collection: analyzeDto.collection,
            analysis: result,
            timestamp: new Date().toISOString(),
        };
    }
    async insights(insightsDto) {
        const result = await this.agentsService.generateInsights(insightsDto.query);
        return {
            success: true,
            query: insightsDto.query,
            insights: result,
            timestamp: new Date().toISOString(),
        };
    }
    async swarm(swarmDto) {
        const result = await this.agentsService.processQuery(swarmDto.query, 'swarm');
        return {
            success: true,
            query: swarmDto.query,
            pattern: 'swarm',
            result,
            timestamp: new Date().toISOString(),
        };
    }
    async getCollections() {
        const collections = await this.collectionsService.getAllCollections();
        const collectionsWithCounts = await Promise.all(collections.map(async (name) => ({
            name,
            count: await this.collectionsService.getCollectionCount(name),
        })));
        return {
            success: true,
            collections: collectionsWithCounts,
            total: collections.length,
            timestamp: new Date().toISOString(),
        };
    }
};
exports.AgentsController = AgentsController;
__decorate([
    (0, common_1.Post)('query'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agents_dto_1.QueryDto]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "query", null);
__decorate([
    (0, common_1.Post)('analyze'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agents_dto_1.AnalyzeDto]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "analyze", null);
__decorate([
    (0, common_1.Post)('insights'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agents_dto_1.InsightsDto]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "insights", null);
__decorate([
    (0, common_1.Post)('swarm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agents_dto_1.SwarmDto]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "swarm", null);
__decorate([
    (0, common_1.Get)('collections'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "getCollections", null);
exports.AgentsController = AgentsController = __decorate([
    (0, common_1.Controller)('agents'),
    __metadata("design:paramtypes", [agents_service_1.AgentsService,
        collections_service_1.CollectionsService])
], AgentsController);
//# sourceMappingURL=agents.controller.js.map