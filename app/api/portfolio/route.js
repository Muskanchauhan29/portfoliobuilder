import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Incoming portfolio data:', data);
    const { db } = await connectToDatabase();
    // Get userId from JWT in cookie
    const token = req.cookies.get('token')?.value;
    let userId = null;
    if (token) {
      try {
        const jwt = (await import('jsonwebtoken')).default;
        const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id || decoded.userId || decoded._id;
      } catch {}
    }
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Please log in.' }, { status: 401 });
    }
    // Attach ownerId to portfolio
    const portfolioDoc = { ...data, ownerId: userId };
    const result = await db.collection('portfolios').insertOne(portfolioDoc);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Portfolio API Error:', error);
    if (error && error.stack) console.error(error.stack);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
