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
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_service_1 = require("../mongodb/mongodb.service");
const collections_types_1 = require("../types/collections.types");
let CollectionsService = class CollectionsService {
    constructor(mongodbService) {
        this.mongodbService = mongodbService;
    }
    async getCollection(collectionName) {
        const db = this.mongodbService.getDatabase();
        return db.collection(collectionName);
    }
    async getAllCollections() {
        const db = this.mongodbService.getDatabase();
        const collections = await db.listCollections().toArray();
        return collections.map((col) => col.name);
    }
    async getCollectionsByDomain(domain) {
        const allCollections = await this.getAllCollections();
        return allCollections.filter((name) => collections_types_1.COLLECTION_DOMAIN_MAP[name] === domain);
    }
    async getCollectionCount(collectionName) {
        const collection = await this.getCollection(collectionName);
        return collection.countDocuments();
    }
    async findDocuments(collectionName, filter = {}, limit = 100, skip = 0) {
        const collection = await this.getCollection(collectionName);
        return collection.find(filter).limit(limit).skip(skip).toArray();
    }
    async findOneDocument(collectionName, filter) {
        const collection = await this.getCollection(collectionName);
        return collection.findOne(filter);
    }
    async aggregate(collectionName, pipeline) {
        const collection = await this.getCollection(collectionName);
        return collection.aggregate(pipeline).toArray();
    }
};
exports.CollectionsService = CollectionsService;
exports.CollectionsService = CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongodb_service_1.MongodbService])
], CollectionsService);
//# sourceMappingURL=collections.service.js.map