import { NextResponse } from 'next/server';

export async function POST(req) {
  // Clear the JWT cookie by setting it to an empty string and expiring it
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
