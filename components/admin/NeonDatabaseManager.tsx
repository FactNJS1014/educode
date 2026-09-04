'use client';

import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, RefreshCw, Server, ArrowUpRight, Copy, Check, Zap } from 'lucide-react';

interface NeonHealth {
  configured: boolean;
  connected: boolean;
  database?: string;
  version?: string;
  tablesCount?: number;
  usersCount?: number;
  coursesCount?: number;
  error?: string;
  latencyMs?: number;
}

export function NeonDatabaseManager() {
  const [health, setHealth] = useState<NeonHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<'init' | 'seed' | null>(null);
  const [actionResult, setActionResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/neon');
      const data = await res.json();
      setHealth(data);
    } catch (err: any) {
      setHealth({
        configured: false,
        connected: false,
        error: err.message || 'Failed to check database',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch('/api/admin/neon')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setHealth(data);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        if (isMounted) {
          setHealth({
            configured: false,
            connected: false,
            error: err.message || 'Failed to check database',
          });
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleInitSchema = async () => {
    setActionLoading('init');
    setActionResult(null);
    try {
      const res = await fetch('/api/admin/neon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'init_schema' }),
      });
      const data = await res.json();
      if (data.success) {
        setActionResult({ success: true, message: 'Neon PostgreSQL schema initialized successfully!' });
        await fetchHealth();
      } else {
        setActionResult({ success: false, message: data.error || 'Failed to initialize schema' });
      }
    } catch (err: any) {
      setActionResult({ success: false, message: err.message || 'Error executing schema initialization' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleSeedData = async () => {
    setActionLoading('seed');
    setActionResult(null);
    try {
      const res = await fetch('/api/admin/neon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed_data' }),
      });
      const data = await res.json();
      if (data.success) {
        setActionResult({ success: true, message: 'Neon PostgreSQL seeded with full course catalog, users, and achievements!' });
        await fetchHealth();
      } else {
        setActionResult({ success: false, message: data.error || 'Failed to seed database' });
      }
    } catch (err: any) {
      setActionResult({ success: false, message: err.message || 'Error executing seed' });
    } finally {
      setActionLoading(null);
    }
  };

  const copyConnectionStringExample = () => {
    navigator.clipboard.writeText('postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/educode?sslmode=require');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
              Neon PostgreSQL Database Hub
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Serverless SQL
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Live serverless PostgreSQL storage connection, table schemas, and data seeding
            </p>
          </div>
        </div>

        <button
          onClick={fetchHealth}
          disabled={loading}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Check Health
        </button>
      </div>

      {/* Connection Status Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Status</span>
            {health?.connected ? (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" /> {health?.configured ? 'Offline / Auth Error' : 'Local Hybrid Mode'}
              </span>
            )}
          </div>
          <div className="text-sm font-bold text-slate-200">
            {health?.connected ? 'Neon Cloud PostgreSQL' : 'Memory Store Active'}
          </div>
          {health?.latencyMs !== undefined && (
            <div className="text-[10px] font-mono text-slate-500">
              Roundtrip Latency: {health.latencyMs}ms
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono text-slate-400">Database Engine</div>
          <div className="text-sm font-bold text-slate-200 truncate font-mono text-xs">
            {health?.database || 'educode (default)'}
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            {health?.version ? health.version.split(' ')[0] + ' (Neon)' : 'PostgreSQL 16 Compatible'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono text-slate-400">Database Records</div>
          <div className="text-sm font-bold text-slate-200 font-mono">
            {health?.tablesCount ?? 0} Tables &bull; {health?.coursesCount ?? 0} Courses
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {health?.usersCount ?? 0} Registered Users
          </div>
        </div>
      </div>

      {/* Action Results Message */}
      {actionResult && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
            actionResult.success
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}
        >
          {actionResult.success ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          )}
          <span>{actionResult.message}</span>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={handleInitSchema}
          disabled={actionLoading !== null}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-900/20"
        >
          {actionLoading === 'init' ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Server className="w-3.5 h-3.5" />
          )}
          Run Schema Migration (DDL)
        </button>

        <button
          onClick={handleSeedData}
          disabled={actionLoading !== null}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-900/20"
        >
          {actionLoading === 'seed' ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Zap className="w-3.5 h-3.5" />
          )}
          Seed Curriculums & Users to Neon
        </button>

        <a
          href="https://console.neon.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          Open Neon Console
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Configuration Helper Callout */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            Connecting your own Neon PostgreSQL Instance:
          </span>
          <button
            onClick={copyConnectionStringExample}
            className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy Sample String'}
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          To connect your live Neon database, supply your <code className="text-cyan-300 font-mono">DATABASE_URL</code> in project environment variables. Once connected, click <strong>Run Schema Migration</strong> to automatically construct the tables, indexes, and relations.
        </p>
      </div>
    </div>
  );
}
