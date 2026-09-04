import { db } from '../db/store';
import { hashPassword, verifyPassword, signToken } from '../auth';
import type { SessionUser, User } from '../types';

export class AuthService {
  static async register(data: { name: string; username: string; email: string; password: string }): Promise<{ user: SessionUser; token: string }> {
    const existingEmail = await db.getUserByEmail(data.email);
    if (existingEmail) {
      throw new Error('An account with this email already exists.');
    }

    const existingUsername = await db.getUserByUsername(data.username);
    if (existingUsername) {
      throw new Error('This username is already taken. Please choose another.');
    }

    const passwordHash = await hashPassword(data.password);
    const newUser = await db.createUser({
      name: data.name.trim(),
      username: data.username.trim().toLowerCase(),
      email: data.email.trim().toLowerCase(),
      passwordHash,
      role: 'USER',
      isActive: true,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.username)}`,
    });

    const sessionUser: SessionUser = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
    };

    const token = await signToken(sessionUser);
    await db.logActivity(newUser.id, 'REGISTER', JSON.stringify({ email: newUser.email }));

    return { user: sessionUser, token };
  }

  static async login(identifier: string, password: string): Promise<{ user: SessionUser; token: string }> {
    const cleanId = (identifier || '').trim();
    let user: User | null = null;
    if (cleanId.includes('@')) {
      user = await db.getUserByEmail(cleanId);
    } else {
      user = await db.getUserByUsername(cleanId);
      if (!user) {
        user = await db.getUserByEmail(cleanId);
      }
    }

    if (!user || !user.passwordHash) {
      throw new Error('Invalid email/username or password.');
    }

    if (!user.isActive) {
      throw new Error('Your account has been deactivated. Please contact support.');
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email/username or password.');
    }

    await db.updateUser(user.id, { lastLoginAt: new Date().toISOString() });
    await db.updateStreak(user.id);
    await db.logActivity(user.id, 'LOGIN');

    const sessionUser: SessionUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
    };

    const token = await signToken(sessionUser);
    return { user: sessionUser, token };
  }

  static async toggleUserStatus(userId: string): Promise<User> {
    const user = await db.getUserById(userId);
    if (!user) throw new Error('User not found');
    const updated = await db.updateUser(userId, { isActive: !user.isActive });
    if (!updated) throw new Error('Failed to update user');
    return updated;
  }

  static async updateUserRole(userId: string, role: 'USER' | 'ADMIN'): Promise<User> {
    const updated = await db.updateUser(userId, { role });
    if (!updated) throw new Error('Failed to update user role');
    return updated;
  }
}
