'use client';

import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mb-2">Something went wrong</h2>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        An unexpected error occurred while loading this page. You can try refreshing or returning home.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <NextLink
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </NextLink>
      </div>
    </div>
  );
}
