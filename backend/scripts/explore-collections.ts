import { MongoClient, Db } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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
    console.warn('MongoDB connection details are missing. Using default connection.');
    uri = `mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/${database}?retryWrites=true&w=majority&appName=JSTraining`;
  }

  return uri;
}

interface FieldAnalysis {
  type: string;
  examples: any[];
  isArray: boolean;
  isObject: boolean;
  nestedFields?: Record<string, FieldAnalysis>;
}

interface CollectionSchema {
  name: string;
  count: number;
  sampleDocuments: any[];
  fields: Record<string, FieldAnalysis>;
  domain?: string;
}

function analyzeField(value: any, fieldName: string): FieldAnalysis {
  const analysis: FieldAnalysis = {
    type: typeof value,
    examples: [value],
    isArray: Array.isArray(value),
    isObject: value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date),
  };

  if (value instanceof Date) {
    analysis.type = 'Date';
  } else if (value === null) {
    analysis.type = 'null';
  } else if (Array.isArray(value)) {
    analysis.type = 'Array';
    if (value.length > 0) {
      const firstItem = value[0];
      analysis.examples = [firstItem];
      if (typeof firstItem === 'object' && firstItem !== null) {
        analysis.nestedFields = {};
        Object.keys(firstItem).forEach((key) => {
          analysis.nestedFields![key] = analyzeField(firstItem[key], key);
        });
      }
    }
  } else if (analysis.isObject) {
    analysis.nestedFields = {};
    Object.keys(value).forEach((key) => {
      analysis.nestedFields![key] = analyzeField(value[key], key);
    });
  }

  return analysis;
}

function mergeFieldAnalyses(existing: FieldAnalysis, newValue: any): FieldAnalysis {
  const newAnalysis = analyzeField(newValue, '');
  
  // Merge examples (keep unique, max 3)
  const allExamples = [...existing.examples, ...newAnalysis.examples];
  const exampleMap = new Map(allExamples.map((ex) => [JSON.stringify(ex), ex]));
  const uniqueExamples = Array.from(exampleMap.values()).slice(0, 3);
  
  existing.examples = uniqueExamples;
  
  // If types differ, mark as union
  if (existing.type !== newAnalysis.type) {
    existing.type = `${existing.type} | ${newAnalysis.type}`;
  }
  
  // Merge nested fields if both are objects
  if (existing.nestedFields && newAnalysis.nestedFields) {
    Object.keys(newAnalysis.nestedFields).forEach((key) => {
      if (existing.nestedFields![key]) {
        existing.nestedFields![key] = mergeFieldAnalyses(
          existing.nestedFields![key],
          newAnalysis.nestedFields![key].examples[0]
        );
      } else {
        existing.nestedFields![key] = newAnalysis.nestedFields![key];
      }
    });
  } else if (newAnalysis.nestedFields) {
    existing.nestedFields = newAnalysis.nestedFields;
  }
  
  return existing;
}

function analyzeCollectionSchema(documents: any[], collectionName: string): CollectionSchema {
  const schema: CollectionSchema = {
    name: collectionName,
    count: documents.length,
    sampleDocuments: documents.slice(0, 3),
    fields: {},
  };

  // Analyze all documents
  documents.forEach((doc) => {
    Object.keys(doc).forEach((key) => {
      if (key === '_id' || key === '__v') return; // Skip MongoDB internal fields
      
      if (!schema.fields[key]) {
        schema.fields[key] = analyzeField(doc[key], key);
      } else {
        schema.fields[key] = mergeFieldAnalyses(schema.fields[key], doc[key]);
      }
    });
  });

  return schema;
}

async function exploreCollections(): Promise<void> {
  const uri = buildMongoUri();
  const database = process.env.MONGODB_DATABASE || 'AryamannLifeVars';
  
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(database);
    const collections = await db.listCollections().toArray();
    
    console.log(`Found ${collections.length} collections`);
    
    const schemas: CollectionSchema[] = [];
    
    // Domain mapping
    const domainMap: Record<string, string> = {
      'gym-progress': 'Fitness',
      'exercise-entries': 'Fitness',
      'books': 'Learning',
      'udemyaccesses': 'Learning',
      'gfgcourseprogresses': 'Learning',
      'codingninjascourses': 'Learning',
      'tlelevel3courses': 'Learning',
      'topicprogresses': 'Learning',
      'moduleprogresses': 'Learning',
      'cppproblems': 'Learning',
      'cppproblemlists': 'Learning',
      'items': 'Inventory',
      'wardrobe': 'Inventory',
      'fridgeitems': 'Inventory',
      'kitchenequipments': 'Inventory',
      'utensils': 'Inventory',
      'devices': 'Inventory',
      'musicalinstruments': 'Inventory',
      'mobilities': 'Inventory',
      'streamingapps': 'Tech',
      'socialplatformitems': 'Tech',
      'airesources': 'Tech',
      'modelusages': 'Tech',
      'usagelimits': 'Tech',
      'companies': 'General',
      'users': 'General',
    };
    
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      console.log(`\nExploring collection: ${collectionName}`);
      
      const collection = db.collection(collectionName);
      const count = await collection.countDocuments();
      console.log(`  Count: ${count}`);
      
      if (count === 0) {
        console.log(`  Skipping empty collection`);
        continue;
      }
      
      // Fetch 3 sample documents
      const sampleDocs = await collection.find({}).limit(3).toArray();
      const schema = analyzeCollectionSchema(sampleDocs, collectionName);
      schema.domain = domainMap[collectionName] || 'General';
      
      schemas.push(schema);
      console.log(`  Fields: ${Object.keys(schema.fields).join(', ')}`);
    }
    
    // Generate schema documentation
    const schemasDir = path.join(__dirname, '../src/types');
    if (!fs.existsSync(schemasDir)) {
      fs.mkdirSync(schemasDir, { recursive: true });
    }
    
    // Create markdown documentation
    let markdown = '# MongoDB Collection Schemas\n\n';
    markdown += `Generated on: ${new Date().toISOString()}\n\n`;
    markdown += `Total Collections: ${schemas.length}\n\n`;
    
    // Group by domain
    const byDomain: Record<string, CollectionSchema[]> = {};
    schemas.forEach((schema) => {
      const domain = schema.domain || 'General';
      if (!byDomain[domain]) {
        byDomain[domain] = [];
      }
      byDomain[domain].push(schema);
    });
    
    Object.keys(byDomain).sort().forEach((domain) => {
      markdown += `## ${domain} Domain\n\n`;
      
      byDomain[domain].forEach((schema) => {
        markdown += `### ${schema.name}\n\n`;
        markdown += `- **Count**: ${schema.count} documents\n`;
        markdown += `- **Domain**: ${schema.domain}\n\n`;
        markdown += `#### Fields:\n\n`;
        
        Object.keys(schema.fields).sort().forEach((fieldName) => {
          const field = schema.fields[fieldName];
          markdown += `- **${fieldName}**: \`${field.type}\``;
          if (field.isArray) markdown += ` (Array)`;
          if (field.isObject && !field.isArray) markdown += ` (Object)`;
          markdown += `\n`;
          
          if (field.examples.length > 0 && field.examples[0] !== null) {
            const example = field.examples[0];
            if (typeof example === 'string' && example.length > 100) {
              markdown += `  - Example: "${example.substring(0, 100)}..."\n`;
            } else if (typeof example !== 'object') {
              markdown += `  - Example: ${JSON.stringify(example)}\n`;
            }
          }
          
          if (field.nestedFields) {
            markdown += `  - Nested fields: ${Object.keys(field.nestedFields).join(', ')}\n`;
          }
        });
        
        markdown += `\n`;
      });
    });
    
    // Save markdown
    fs.writeFileSync(
      path.join(schemasDir, 'schemas.md'),
      markdown,
      'utf-8'
    );
    
    // Save JSON for programmatic access
    fs.writeFileSync(
      path.join(schemasDir, 'schemas.json'),
      JSON.stringify(schemas, null, 2),
      'utf-8'
    );
    
    console.log(`\n✅ Schema analysis complete!`);
    console.log(`   - Documentation: ${path.join(schemasDir, 'schemas.md')}`);
    console.log(`   - JSON data: ${path.join(schemasDir, 'schemas.json')}`);
    
  } catch (error) {
    console.error('Error exploring collections:', error);
    throw error;
  } finally {
    await client.close();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the exploration
exploreCollections()
  .then(() => {
    console.log('\n✅ Data exploration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Data exploration failed:', error);
    process.exit(1);
  });

