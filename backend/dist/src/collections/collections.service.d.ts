import { MongodbService } from '../mongodb/mongodb.service';
import { CollectionName, CollectionDomain } from '../types/collections.types';
export declare class CollectionsService {
    private mongodbService;
    constructor(mongodbService: MongodbService);
    getCollection(collectionName: CollectionName): Promise<import("mongodb").Collection<import("bson").Document>>;
    getAllCollections(): Promise<CollectionName[]>;
    getCollectionsByDomain(domain: CollectionDomain): Promise<CollectionName[]>;
    getCollectionCount(collectionName: CollectionName): Promise<number>;
    findDocuments(collectionName: CollectionName, filter?: any, limit?: number, skip?: number): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    findOneDocument(collectionName: CollectionName, filter: any): Promise<import("mongodb").WithId<import("bson").Document>>;
    aggregate(collectionName: CollectionName, pipeline: any[]): Promise<import("bson").Document[]>;
}
