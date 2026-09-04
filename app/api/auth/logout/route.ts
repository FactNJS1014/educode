import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}

export async function GET() {
  const response = NextResponse.redirect(new URL('/login', 'https://localhost:3000'));
  
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
