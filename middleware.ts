import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.AUTH_SECRET || 'educode-academy-super-secret-key-32-chars-long';
const key = new TextEncoder().encode(SECRET_KEY);
const SESSION_COOKIE_NAME = 'educode_session';

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/learn',
  '/lesson',
  '/my-learning',
  '/progress',
  '/profile',
  '/quiz',
  '/coding',
  '/projects',
  '/bookmarks',
  '/favorites',
  '/settings',
  '/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  let sessionUser: any = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
      sessionUser = payload;
    } catch {
      sessionUser = null;
    }
  }

  // 1. If accessing auth pages (login/register) while logged in, redirect to dashboard
  if (isAuthRoute && sessionUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. If accessing protected routes without valid session, redirect to login
  if (isProtected) {
    if (!sessionUser) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (token) {
        // Clear invalid/expired cookie
        response.cookies.delete(SESSION_COOKIE_NAME);
      }
      return response;
    }

    // 3. If accessing admin route without ADMIN role, redirect to dashboard
    if (isAdminRoute && sessionUser.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard?error=forbidden', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};
