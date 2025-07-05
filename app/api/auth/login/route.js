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
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const res = NextResponse.json({ user: { id: user._id, name: user.name, email: user.email } });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
