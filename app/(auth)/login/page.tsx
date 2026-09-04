'use client';

import React, { useState, useTransition } from 'react';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Code, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { loginAction } from '@/app/actions/auth.actions';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  const errorParam = searchParams.get('error');

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(
    errorParam === 'forbidden' ? 'Admin privileges required to access that section.' : ''
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const formData = new FormData();
    formData.append('identifier', identifier);
    formData.append('password', password);

    startTransition(async () => {
      const res = await loginAction(formData);
      if (res.success) {
        if (res.token) {
          // Set client cookie as well for iframe resilience
          document.cookie = `educode_session=${encodeURIComponent(res.token)}; path=/; max-age=${60 * 60 * 24}; SameSite=None; Secure`;
          try {
            localStorage.setItem('educode_session', res.token);
            if (res.user) {
              localStorage.setItem('educode_user', JSON.stringify(res.user));
            }
          } catch {
            // ignore storage restrictions
          }
        }
        // Force full page navigation to ensure session cookie is attached
        window.location.href = redirectUrl;
      } else {
        setErrorMessage(res.error || 'Failed to login');
      }
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <NextLink href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </NextLink>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to access your course progress, notes, and certificates.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="login-identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="name@example.com or username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                id="login-submit-btn"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isPending ? 'Authenticating...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <NextLink href="/register" className="text-emerald-400 font-semibold hover:underline">
              Create free account
            </NextLink>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500 font-mono">
          🔒 Secure 24h JWT Session Authentication
        </div>
      </div>
    </div>
  );
}
