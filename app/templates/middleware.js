import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    // Not logged in, redirect to login
    return NextResponse.redirect(new URL('/login?redirect=/templates', request.url));
  }
  try {
    // Verify JWT (replace 'changeme' with your JWT_SECRET)
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'changeme'));
    return NextResponse.next();
  } catch {
    // Invalid token, redirect
    return NextResponse.redirect(new URL('/login?redirect=/templates', request.url));
  }
}

export const config = {
  matcher: ['/templates'],
};
