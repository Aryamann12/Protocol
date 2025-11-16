import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET - List all collections
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({
      collections: collections.map((col) => ({
        name: col.name,
        type: col.type,
      })),
    });
  } catch (error: any) {
    console.error('GET collections error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

