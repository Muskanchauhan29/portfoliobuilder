import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  // Check for custom JWT token cookie
  const token = request.cookies.get('token')?.value;
  if (!token) {
    // Not logged in, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  try {
    // Verify JWT using JWT_SECRET
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'changeme'));
    return NextResponse.next();
  } catch {
    // Invalid token, redirect
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/templates/:path*', '/live-preview/:path*', '/form/:path*'],
};
