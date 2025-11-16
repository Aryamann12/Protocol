import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db } from 'mongodb';
export declare class MongodbService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private client;
    private db;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private connect;
    private disconnect;
    private buildMongoUri;
    getDatabase(): Db;
    getClient(): MongoClient;
}
