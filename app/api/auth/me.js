import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
export const dynamic = 'force-dynamic';

export async function GET() {
  const token = cookies().get('token')?.value;
  if (!token) return NextResponse.json({ user: null });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
