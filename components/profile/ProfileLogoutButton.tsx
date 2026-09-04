'use client';

import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth.actions';

export function ProfileLogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      document.cookie = 'educode_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';
      document.cookie = 'educode_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      document.cookie = 'educode_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

      try {
        localStorage.removeItem('educode_session');
        localStorage.removeItem('educode_user');
        sessionStorage.clear();
      } catch {
        // ignore
      }

      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      await logoutAction().catch(() => {});
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      window.location.href = '/login';
    }
  };

  return (
    <button
      id="profile-logout-btn"
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{isLoggingOut ? 'Logging Out...' : 'Sign Out'}</span>
    </button>
  );
}
