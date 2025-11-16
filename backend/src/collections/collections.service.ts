import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { CollectionName, COLLECTION_DOMAIN_MAP, CollectionDomain } from '../types/collections.types';

@Injectable()
export class CollectionsService {
  constructor(private mongodbService: MongodbService) {}

  async getCollection(collectionName: CollectionName) {
    const db = this.mongodbService.getDatabase();
    return db.collection(collectionName);
  }

  async getAllCollections(): Promise<CollectionName[]> {
    const db = this.mongodbService.getDatabase();
    const collections = await db.listCollections().toArray();
    return collections.map((col) => col.name as CollectionName);
  }

  async getCollectionsByDomain(domain: CollectionDomain): Promise<CollectionName[]> {
    const allCollections = await this.getAllCollections();
    return allCollections.filter(
      (name) => COLLECTION_DOMAIN_MAP[name] === domain,
    );
  }

  async getCollectionCount(collectionName: CollectionName): Promise<number> {
    const collection = await this.getCollection(collectionName);
    return collection.countDocuments();
  }

  async findDocuments(
    collectionName: CollectionName,
    filter: any = {},
    limit: number = 100,
    skip: number = 0,
  ) {
    const collection = await this.getCollection(collectionName);
    return collection.find(filter).limit(limit).skip(skip).toArray();
  }

  async findOneDocument(collectionName: CollectionName, filter: any) {
    const collection = await this.getCollection(collectionName);
    return collection.findOne(filter);
  }

  async aggregate(collectionName: CollectionName, pipeline: any[]) {
    const collection = await this.getCollection(collectionName);
    return collection.aggregate(pipeline).toArray();
  }
}

