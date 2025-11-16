"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongodb_module_1 = require("./mongodb/mongodb.module");
const collections_module_1 = require("./collections/collections.module");
const llm_module_1 = require("./llm/llm.module");
const agents_module_1 = require("./agents/agents.module");
const api_module_1 = require("./api/api.module");
const scheduler_module_1 = require("./scheduler/scheduler.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongodb_module_1.MongodbModule,
            collections_module_1.CollectionsModule,
            llm_module_1.LlmModule,
            agents_module_1.AgentsModule,
            api_module_1.ApiModule,
            scheduler_module_1.SchedulerModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map