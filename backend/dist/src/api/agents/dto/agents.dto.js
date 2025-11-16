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
exports.SwarmDto = exports.InsightsDto = exports.AnalyzeDto = exports.QueryDto = void 0;
const class_validator_1 = require("class-validator");
class QueryDto {
}
exports.QueryDto = QueryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDto.prototype, "query", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['sequential', 'swarm', 'conditional', 'loop', 'fitness', 'learning', 'inventory', 'tech']),
    __metadata("design:type", String)
], QueryDto.prototype, "pattern", void 0);
class AnalyzeDto {
}
exports.AnalyzeDto = AnalyzeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnalyzeDto.prototype, "query", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnalyzeDto.prototype, "collection", void 0);
class InsightsDto {
}
exports.InsightsDto = InsightsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InsightsDto.prototype, "query", void 0);
class SwarmDto {
}
exports.SwarmDto = SwarmDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SwarmDto.prototype, "query", void 0);
//# sourceMappingURL=agents.dto.js.map