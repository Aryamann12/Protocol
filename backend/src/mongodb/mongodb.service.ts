import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongodbService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    const uri = this.buildMongoUri();
    const database = this.configService.get<string>('MONGODB_DATABASE') || 'AryamannLifeVars';

    try {
      this.client = new MongoClient(uri);
      await this.client.connect();
      this.db = this.client.db(database);
      console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  private async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }

  private buildMongoUri(): string {
    const database = this.configService.get<string>('MONGODB_DATABASE') || 'AryamannLifeVars';
    
    let uri =
      this.configService.get<string>('MONGODB_URI') ??
      (this.configService.get<string>('MONGODB_USERNAME') &&
      this.configService.get<string>('MONGODB_PASSWORD')
        ? `mongodb+srv://${encodeURIComponent(
            this.configService.get<string>('MONGODB_USERNAME')!,
          )}:${encodeURIComponent(
            this.configService.get<string>('MONGODB_PASSWORD')!,
          )}@${this.configService.get<string>('MONGODB_HOST') || 'jstraining.buufn0n.mongodb.net'}/${database}?retryWrites=true&w=majority&appName=JSTraining`
        : undefined);

    if (!uri) {
      console.warn('MongoDB connection details are missing. Using default connection.');
      uri = `mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/${database}?retryWrites=true&w=majority&appName=JSTraining`;
    }

    return uri;
  }

  getDatabase(): Db {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  getClient(): MongoClient {
    if (!this.client) {
      throw new Error('MongoDB client not connected. Call connect() first.');
    }
    return this.client;
  }
}

