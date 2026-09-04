import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import type { SessionUser, Role } from './types';

const SECRET_KEY = process.env.AUTH_SECRET || 'educode-academy-super-secret-key-32-chars-long';
const key = new TextEncoder().encode(SECRET_KEY);

export const SESSION_COOKIE_NAME = 'educode_session';
export const TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds (1 day)

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: SessionUser): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // strict 24 hours expiration
    .sign(key);
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });

    if (!payload || !payload.id || !payload.email) {
      return null;
    }

    return {
      id: payload.id as string,
      name: payload.name as string,
      username: payload.username as string,
      email: payload.email as string,
      role: (payload.role as Role) || 'USER',
      avatarUrl: (payload.avatarUrl as string | null) || null,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireAuth();
  if (session.role !== 'ADMIN') {
    throw new Error('FORBIDDEN');
  }
  return session;
}
