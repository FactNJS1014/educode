'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthService } from '@/lib/services/auth.service';
import { registerSchema, loginSchema } from '@/lib/validations';
import { SESSION_COOKIE_NAME, TOKEN_MAX_AGE, getSession } from '@/lib/auth';

export async function registerAction(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Validation failed',
    };
  }

  try {
    const { user, token } = await AuthService.register({
      name: parsed.data.name,
      username: parsed.data.username,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: TOKEN_MAX_AGE, // 24 hours
    });

    return { success: true, token, user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Registration failed' };
  }
}

export async function loginAction(formData: FormData) {
  const rawData = {
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Please fill in all fields',
    };
  }

  try {
    const { user, token } = await AuthService.login(parsed.data.identifier, parsed.data.password);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: TOKEN_MAX_AGE, // 24 hours
    });

    return { success: true, token, user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Invalid credentials' };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    cookieStore.set(SESSION_COOKIE_NAME, '', {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });
  } catch (err) {
    console.warn('Logout action cookie clear:', err);
  }
  redirect('/login');
}

export async function getCurrentUserAction() {
  return await getSession();
}

export async function toggleUserStatusAction(userId: string, status: string) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const user = await AuthService.toggleUserStatus(userId);
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update user status' };
  }
}

export async function updateUserRoleAction(userId: string, role: 'USER' | 'ADMIN') {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const user = await AuthService.updateUserRole(userId, role);
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update user role' };
  }
}

