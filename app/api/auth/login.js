import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'All fields required.' }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }
    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const res = NextResponse.json({ message: 'Login successful.', token, user: { name: user.name, email: user.email } });
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e) {
    console.error('Login error:', e);
    const isProd = process.env.NODE_ENV === 'production';
    return NextResponse.json({ error: isProd ? 'Server error.' : String(e) }, { status: 500 });
  }
}
