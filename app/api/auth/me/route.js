import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ user: null });
    const user = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
