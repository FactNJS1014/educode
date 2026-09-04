'use client';

import React, { useState } from 'react';
import Link from 'next/navigation';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code,
  Search,
  Flame,
  User as UserIcon,
  LogOut,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  Compass,
  Laptop,
  Bookmark,
  FolderGit2
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth.actions';
import { GlobalSearchModal } from './GlobalSearchModal';
import type { SessionUser } from '@/lib/types';

interface NavbarProps {
  user: SessionUser | null;
  streakCount?: number;
}

export function Navbar({ user, streakCount = 1 }: NavbarProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  const handleLogout = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      // 1. Clear client cookies across variations
      document.cookie = 'educode_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure';
      document.cookie = 'educode_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      document.cookie = 'educode_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

      // 2. Clear client web storage
      try {
        localStorage.removeItem('educode_session');
        localStorage.removeItem('educode_user');
        sessionStorage.clear();
      } catch {
        // ignore
      }

      // 3. Clear server session via API route and server action
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      await logoutAction().catch(() => {});
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      window.location.href = '/login';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <NextLink
              href={user ? '/dashboard' : '/'}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Code className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                  EduCode <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-medium border border-emerald-500/20">ACADEMY</span>
                </span>
              </div>
            </NextLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NextLink
                href="/courses"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/courses')
                    ? 'text-emerald-400 bg-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Courses
              </NextLink>

              <NextLink
                href="/roadmap"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/roadmap')
                    ? 'text-emerald-400 bg-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Roadmap
              </NextLink>

              <NextLink
                href="/coding"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/coding')
                    ? 'text-emerald-400 bg-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Interactive Playground
              </NextLink>

              <NextLink
                href="/projects"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/projects')
                    ? 'text-emerald-400 bg-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                Projects
              </NextLink>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger button */}
            <button
              id="navbar-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all text-xs font-mono"
              aria-label="Search courses and lessons"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                Ctrl K
              </kbd>
            </button>

            {user ? (
              <>
                {/* Streak Badge */}
                <div
                  title={`${streakCount} Day Learning Streak!`}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
                >
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                  <span className="font-mono">{streakCount}d</span>
                </div>

                {/* Dashboard shortcut */}
                <NextLink
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </NextLink>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    id="profile-dropdown-btn"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full border border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 text-sm text-slate-200 z-50 animate-in fade-in zoom-in-95"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-800">
                        <div className="font-medium text-slate-100 truncate">{user.name}</div>
                        <div className="text-xs text-slate-400 truncate font-mono">@{user.username}</div>
                        <div className="mt-1">
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                            {user.role}
                          </span>
                        </div>
                      </div>

                      <NextLink
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>My Dashboard</span>
                      </NextLink>

                      <NextLink
                        href="/my-learning"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span>My Learning Progress</span>
                      </NextLink>

                      <NextLink
                        href="/bookmarks"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-slate-400" />
                        <span>Saved Bookmarks</span>
                      </NextLink>

                      <NextLink
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span>Profile & Achievements</span>
                      </NextLink>

                      {user.role === 'ADMIN' && (
                        <NextLink
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-indigo-400 hover:bg-indigo-950/40 border-t border-slate-800 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Admin Control Center</span>
                        </NextLink>
                      )}

                      <div className="border-t border-slate-800 mt-1">
                        <button
                          id="logout-btn"
                          type="button"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-950/20 transition-colors text-left cursor-pointer disabled:opacity-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{isLoggingOut ? 'Logging Out...' : 'Log Out'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/login"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  Log In
                </NextLink>
                <NextLink
                  href="/register"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-sm shadow-emerald-500/20 transition-all"
                >
                  Start Free
                </NextLink>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 md:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
            <NextLink
              href="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Courses Catalog
            </NextLink>
            <NextLink
              href="/roadmap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Learning Roadmap
            </NextLink>
            <NextLink
              href="/coding"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Interactive Playground
            </NextLink>
            <NextLink
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Real Projects
            </NextLink>

            {user && (
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <NextLink
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-emerald-400 hover:bg-slate-900"
                >
                  Dashboard
                </NextLink>
                <NextLink
                  href="/my-learning"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-900"
                >
                  My Learning
                </NextLink>
                <NextLink
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-900"
                >
                  Profile & Certifications
                </NextLink>
                {user.role === 'ADMIN' && (
                  <NextLink
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-indigo-400 hover:bg-slate-900"
                  >
                    Admin Panel
                  </NextLink>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-rose-400 hover:bg-rose-950/20 cursor-pointer disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isLoggingOut ? 'Logging Out...' : 'Log Out'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
