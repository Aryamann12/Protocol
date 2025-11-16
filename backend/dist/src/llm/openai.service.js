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
exports.OpenaiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("@langchain/openai");
let OpenaiService = class OpenaiService {
    constructor(configService) {
        this.configService = configService;
        this.model = null;
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey) {
            console.warn('⚠️ OPENAI_API_KEY not set. OpenAI service will not work.');
        }
    }
    getModel() {
        if (!this.model) {
            const apiKey = this.configService.get('OPENAI_API_KEY');
            const modelName = this.configService.get('OPENAI_MODEL') || 'gpt-4';
            if (!apiKey) {
                throw new Error('OPENAI_API_KEY is not set. Please configure it in your .env file.');
            }
            this.model = new openai_1.ChatOpenAI({
                openAIApiKey: apiKey,
                modelName: modelName,
                temperature: 0.7,
            });
        }
        return this.model;
    }
};
exports.OpenaiService = OpenaiService;
exports.OpenaiService = OpenaiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenaiService);
//# sourceMappingURL=openai.service.js.map