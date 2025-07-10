import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields required.' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const existing = await db.collection('users').findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashed, createdAt: new Date() };
    await db.collection('users').insertOne(user);
    return NextResponse.json({ message: 'Registration successful.' }, { status: 201 });
  } catch (e) {
        console.error(e);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
