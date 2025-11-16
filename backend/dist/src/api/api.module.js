"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const agents_module_1 = require("../agents/agents.module");
const scheduler_module_1 = require("../scheduler/scheduler.module");
const collections_module_1 = require("../collections/collections.module");
const llm_module_1 = require("../llm/llm.module");
const agents_controller_1 = require("./agents/agents.controller");
const health_controller_1 = require("./health/health.controller");
const scheduler_controller_1 = require("./scheduler/scheduler.controller");
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [agents_module_1.AgentsModule, scheduler_module_1.SchedulerModule, collections_module_1.CollectionsModule, llm_module_1.LlmModule],
        controllers: [agents_controller_1.AgentsController, health_controller_1.HealthController, scheduler_controller_1.SchedulerController],
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map