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
exports.LlmService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_service_1 = require("./openai.service");
const local_service_1 = require("./local.service");
let LlmService = class LlmService {
    constructor(configService, openaiService, localService) {
        this.configService = configService;
        this.openaiService = openaiService;
        this.localService = localService;
        this.useLocal = this.configService.get('USE_LOCAL_LLM') === 'true';
    }
    async getModel() {
        if (this.useLocal) {
            try {
                return await this.localService.getModel();
            }
            catch (error) {
                console.warn('⚠️ Local model failed, falling back to OpenAI:', error);
                return this.openaiService.getModel();
            }
        }
        return this.openaiService.getModel();
    }
    getModelName() {
        if (this.useLocal) {
            return this.configService.get('OLLAMA_MODEL') || 'llama2';
        }
        return this.configService.get('OPENAI_MODEL') || 'gpt-4';
    }
};
exports.LlmService = LlmService;
exports.LlmService = LlmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        openai_service_1.OpenaiService,
        local_service_1.LocalService])
], LlmService);
//# sourceMappingURL=llm.service.js.map