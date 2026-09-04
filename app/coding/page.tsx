import React from 'react';
import { InteractivePlayground } from '@/components/code-editor/InteractivePlayground';
import { Terminal, Sparkles, Cpu, ShieldCheck } from 'lucide-react';

export default function CodingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Code Sandbox</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Interactive Code Playground
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Write, edit, and test algorithms across Python, TypeScript, Go, Rust, Java, PHP, and C# directly in your browser. Practice coding challenges with automated test execution.
        </p>
      </div>

      {/* Main Interactive Playground */}
      <InteractivePlayground />
    </div>
  );
}
