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
exports.MongodbService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongodb_1 = require("mongodb");
let MongodbService = class MongodbService {
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        await this.connect();
    }
    async onModuleDestroy() {
        await this.disconnect();
    }
    async connect() {
        const uri = this.buildMongoUri();
        const database = this.configService.get('MONGODB_DATABASE') || 'AryamannLifeVars';
        try {
            this.client = new mongodb_1.MongoClient(uri);
            await this.client.connect();
            this.db = this.client.db(database);
            console.log('✅ Connected to MongoDB Atlas');
        }
        catch (error) {
            console.error('❌ MongoDB connection error:', error);
            throw error;
        }
    }
    async disconnect() {
        if (this.client) {
            await this.client.close();
            console.log('🔌 Disconnected from MongoDB');
        }
    }
    buildMongoUri() {
        const database = this.configService.get('MONGODB_DATABASE') || 'AryamannLifeVars';
        let uri = this.configService.get('MONGODB_URI') ??
            (this.configService.get('MONGODB_USERNAME') &&
                this.configService.get('MONGODB_PASSWORD')
                ? `mongodb+srv://${encodeURIComponent(this.configService.get('MONGODB_USERNAME'))}:${encodeURIComponent(this.configService.get('MONGODB_PASSWORD'))}@${this.configService.get('MONGODB_HOST') || 'jstraining.buufn0n.mongodb.net'}/${database}?retryWrites=true&w=majority&appName=JSTraining`
                : undefined);
        if (!uri) {
            console.warn('MongoDB connection details are missing. Using default connection.');
            uri = `mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/${database}?retryWrites=true&w=majority&appName=JSTraining`;
        }
        return uri;
    }
    getDatabase() {
        if (!this.db) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.db;
    }
    getClient() {
        if (!this.client) {
            throw new Error('MongoDB client not connected. Call connect() first.');
        }
        return this.client;
    }
};
exports.MongodbService = MongodbService;
exports.MongodbService = MongodbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MongodbService);
//# sourceMappingURL=mongodb.service.js.map