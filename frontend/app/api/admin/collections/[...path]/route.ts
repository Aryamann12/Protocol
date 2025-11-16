import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/mongodb';

// GET - List collections or fetch documents
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const db = await getDatabase();
    
    // Handle empty path array
    if (!path || path.length === 0) {
      const collections = await db.listCollections().toArray();
      return NextResponse.json({
        collections: collections.map((col) => ({
          name: col.name,
          type: col.type,
        })),
      });
    }
    
    const [collectionName, ...rest] = path;

    const collection = db.collection(collectionName);
    const id = rest[0];

    // If ID is provided, get single document
    if (id) {
      // Try to convert to ObjectId, fallback to string if invalid
      let queryId: any = id;
      try {
        if (ObjectId.isValid(id)) {
          queryId = new ObjectId(id);
        }
      } catch {
        // Keep as string if ObjectId conversion fails
      }
      
      const document = await collection.findOne({ _id: queryId });
      if (!document) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(document);
    }

    // Otherwise, get all documents with optional query params
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '100');
    const skip = parseInt(request.nextUrl.searchParams.get('skip') || '0');
    const sort = request.nextUrl.searchParams.get('sort') || '_id';
    const order = request.nextUrl.searchParams.get('order') === 'desc' ? -1 : 1;

    // Build filter from query params
    const filter: any = {};
    request.nextUrl.searchParams.forEach((value, key) => {
      if (!['limit', 'skip', 'sort', 'order', 'secret'].includes(key)) {
        try {
          // Try to parse as JSON for complex queries
          filter[key] = JSON.parse(value);
        } catch {
          // If not JSON, use as string
          filter[key] = value;
        }
      }
    });

    const documents = await collection
      .find(filter)
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .toArray();

    const count = await collection.countDocuments(filter);

    return NextResponse.json({
      data: documents,
      count,
      limit,
      skip,
      total: count,
    });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new document(s)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const db = await getDatabase();
    const [collectionName] = path;

    if (!collectionName) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const collection = db.collection(collectionName);

    // Support both single document and array of documents
    if (Array.isArray(body)) {
      const result = await collection.insertMany(body);
      return NextResponse.json({
        success: true,
        insertedIds: result.insertedIds,
        count: result.insertedCount,
      });
    } else {
      const result = await collection.insertOne(body);
      return NextResponse.json({
        success: true,
        _id: result.insertedId,
      });
    }
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update document(s)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const db = await getDatabase();
    const [collectionName, id] = path;

    if (!collectionName) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const collection = db.collection(collectionName);

    // If ID is provided, update single document
    if (id) {
      const { _id, ...updateData } = body;
      
      // Try to convert to ObjectId, fallback to string if invalid
      let queryId: any = id;
      try {
        if (ObjectId.isValid(id)) {
          queryId = new ObjectId(id);
        }
      } catch {
        // Keep as string if ObjectId conversion fails
      }
      
      const result = await collection.updateOne(
        { _id: queryId },
        { $set: updateData },
        { upsert: false }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      });
    }

    // Otherwise, update multiple documents based on filter
    const filter = body.filter || {};
    const update = body.update || body;
    const { filter: _, ...updateData } = update;

    const result = await collection.updateMany(
      filter,
      { $set: updateData }
    );

    return NextResponse.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Partial update (upsert support)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const db = await getDatabase();
    const [collectionName, id] = path;

    if (!collectionName) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const collection = db.collection(collectionName);
    const upsert = body.upsert !== false; // Default to true

    if (id) {
      const { _id, upsert: _, ...updateData } = body;
      
      // Try to convert to ObjectId, fallback to string if invalid
      let queryId: any = id;
      try {
        if (ObjectId.isValid(id)) {
          queryId = new ObjectId(id);
        }
      } catch {
        // Keep as string if ObjectId conversion fails
      }
      
      const result = await collection.updateOne(
        { _id: queryId },
        { $set: updateData },
        { upsert }
      );

      return NextResponse.json({
        success: true,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        upsertedId: result.upsertedId,
      });
    }

    const filter = body.filter || {};
    const { filter: _, upsert: __, ...updateData } = body;

    const result = await collection.updateMany(
      filter,
      { $set: updateData },
      { upsert }
    );

    return NextResponse.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount,
    });
  } catch (error: any) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete document(s)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const db = await getDatabase();
    const [collectionName, id] = path;

    if (!collectionName) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      );
    }

    const collection = db.collection(collectionName);

    // If ID is provided, delete single document
    if (id) {
      // Try to convert to ObjectId, fallback to string if invalid
      let queryId: any = id;
      try {
        if (ObjectId.isValid(id)) {
          queryId = new ObjectId(id);
        }
      } catch {
        // Keep as string if ObjectId conversion fails
      }
      
      const result = await collection.deleteOne({ _id: queryId });
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        deletedCount: result.deletedCount,
      });
    }

    // Check if deleteAll query param is set
    const deleteAll = request.nextUrl.searchParams.get('deleteAll') === 'true';
    
    if (deleteAll) {
      // Delete all documents in collection
      const result = await collection.deleteMany({});
      return NextResponse.json({
        success: true,
        deletedCount: result.deletedCount,
      });
    }

    // Otherwise, delete based on filter from query params or body
    const body = await request.json().catch(() => ({}));
    const filter = body.filter || {};

    // Also check query params for filter
    request.nextUrl.searchParams.forEach((value, key) => {
      if (key !== 'deleteAll' && key !== 'secret') {
        try {
          filter[key] = JSON.parse(value);
        } catch {
          filter[key] = value;
        }
      }
    });

    const result = await collection.deleteMany(filter);
    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

