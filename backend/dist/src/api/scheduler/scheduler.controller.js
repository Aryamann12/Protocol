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
exports.SchedulerController = void 0;
const common_1 = require("@nestjs/common");
const scheduler_service_1 = require("../../scheduler/scheduler.service");
let SchedulerController = class SchedulerController {
    constructor(schedulerService) {
        this.schedulerService = schedulerService;
    }
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
    async triggerLifeOptimizer() {
        try {
            const result = await this.schedulerService.triggerLifeOptimizer();
            return {
                success: !result?.error,
                useCase: 'Life Optimizer',
                result,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            return {
                success: false,
                useCase: 'Life Optimizer',
                error: error.message || 'Unknown error occurred',
                stack: error.stack,
                timestamp: new Date().toISOString(),
            };
        }
    }
    async triggerFridgeManager() {
        const result = await this.schedulerService.triggerFridgeManager();
        return {
            success: true,
            useCase: 'Fridge Manager',
            result,
            timestamp: new Date().toISOString(),
        };
    }
    async triggerProgressReview() {
        const result = await this.schedulerService.triggerProgressReview();
        return {
            success: true,
            useCase: 'Progress Review',
            result,
            timestamp: new Date().toISOString(),
        };
    }
    async triggerProblemDetector() {
        const result = await this.schedulerService.triggerProblemDetector();
        return {
            success: true,
            useCase: 'Problem Detector',
            result,
            timestamp: new Date().toISOString(),
        };
    }
};
exports.SchedulerController = SchedulerController;
__decorate([
    (0, common_1.Get)('test-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "testAll", null);
__decorate([
    (0, common_1.Post)('trigger/life-optimizer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "triggerLifeOptimizer", null);
__decorate([
    (0, common_1.Post)('trigger/fridge-manager'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "triggerFridgeManager", null);
__decorate([
    (0, common_1.Post)('trigger/progress-review'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "triggerProgressReview", null);
__decorate([
    (0, common_1.Post)('trigger/problem-detector'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "triggerProblemDetector", null);
exports.SchedulerController = SchedulerController = __decorate([
    (0, common_1.Controller)('scheduler'),
    __metadata("design:paramtypes", [scheduler_service_1.SchedulerService])
], SchedulerController);
//# sourceMappingURL=scheduler.controller.js.map