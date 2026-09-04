'use client';

import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { AlertTriangle, RotateCcw, Home, LayoutDashboard, Terminal, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log error to console for client diagnostics
    console.error('App Runtime Exception:', error);
  }, [error]);

  const handleHardRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleClearAndGoHome = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
      } catch {
        // ignore
      }
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 shadow-xl shadow-rose-950/20">
        <AlertTriangle className="w-8 h-8 animate-pulse" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-medium border border-rose-500/20 mb-3">
        Client Error Exception
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mb-2">
        Something unexpected occurred
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
        The application encountered an unexpected state while rendering. You can retry the current action, reload the interface, or return to the main dashboard.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md mb-8">
        <button
          id="error-try-again-btn"
          onClick={() => reset()}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <button
          id="error-reload-btn"
          onClick={handleHardRefresh}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span>Reload Page</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mb-8">
        <NextLink
          href="/dashboard"
          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </NextLink>
        <span>•</span>
        <NextLink
          href="/courses"
          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <span>Course Catalog</span>
        </NextLink>
        <span>•</span>
        <button
          onClick={handleClearAndGoHome}
          className="hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <span>Homepage</span>
        </button>
      </div>

      {/* Optional Debug Trace Box */}
      {error && (
        <div className="w-full text-left rounded-xl bg-slate-900/90 border border-slate-800 p-4 text-xs font-mono">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span className="text-rose-400 truncate max-w-sm">
              {error.message || 'Unknown exception'}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              {showDetails ? 'Hide details' : 'Show details'}
              {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          </button>

          {showDetails && (
            <div className="mt-3 pt-3 border-t border-slate-800 text-slate-400 overflow-x-auto space-y-2">
              {error.digest && (
                <div>
                  <span className="text-slate-500">Error Digest:</span>{' '}
                  <span className="text-slate-300">{error.digest}</span>
                </div>
              )}
              {error.stack && (
                <pre className="text-[10px] text-slate-400 whitespace-pre-wrap leading-tight bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 max-h-48 overflow-y-auto">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
