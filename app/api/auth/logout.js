import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Remove the token cookie with path "/"
  cookies().set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  // Also remove with no path (just in case)
  cookies().set('token', '', {
    httpOnly: true,
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  return NextResponse.json({ message: 'Logged out' });
}
