import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

function buildMongoUri(): string {
  const database = process.env.MONGODB_DATABASE || 'AryamannLifeVars';
  let uri =
    process.env.MONGODB_URI ??
    (process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD
      ? `mongodb+srv://${encodeURIComponent(
          process.env.MONGODB_USERNAME,
        )}:${encodeURIComponent(
          process.env.MONGODB_PASSWORD,
        )}@${process.env.MONGODB_HOST || 'jstraining.buufn0n.mongodb.net'}/${database}?retryWrites=true&w=majority&appName=JSTraining`
      : undefined);

  if (!uri) {
    // Return a default URI if nothing is set (for development)
    console.warn('MongoDB connection details are missing. Using default connection.');
    uri = `mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/${database}?retryWrites=true&w=majority&appName=JSTraining`;
  }

  // Ensure database name is set even if MONGODB_URI is provided
  if (process.env.MONGODB_URI) {
    const uriMatch = uri.match(/^(mongodb\+srv:\/\/[^/]+)\/([^?]*)(\?.*)?$/);
    if (uriMatch) {
      uri = `${uriMatch[1]}/${database}${uriMatch[3] || ''}`;
    } else {
      const queryMatch = uri.match(/\?/);
      if (queryMatch) {
        uri = uri.replace(/\?/, `/${database}?`);
      } else {
        uri = `${uri}/${database}`;
      }
    }
  }

  return uri;
}

try {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(buildMongoUri());
      globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(buildMongoUri());
    clientPromise = client.connect().catch((err) => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  }
} catch (error) {
  console.error('Failed to initialize MongoDB client:', error);
  // Create a rejected promise so errors are handled properly
  clientPromise = Promise.reject(error);
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  const database = process.env.MONGODB_DATABASE || 'AryamannLifeVars';
  return client.db(database);
}

export default clientPromise;

