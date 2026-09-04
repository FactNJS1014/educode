import React from 'react';
import NextLink from 'next/link';
import { Code, CheckCircle2, ShieldCheck, Globe, Terminal, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono">
          <Globe className="w-3.5 h-3.5" />
          <span>Our Open Educational Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          About EduCode Academy
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          High-quality software engineering education should be accessible, practical, and completely free for developers worldwide.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10 space-y-6 text-sm text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-100">Why EduCode Academy?</h2>
        <p>
          Most tutorials either teach isolated, trivial syntax that leaves developers unprepared for production systems, or lock real-world architectural knowledge behind expensive paywalls.
        </p>
        <p>
          EduCode Academy was engineered to bridge that gap with comprehensive curriculums spanning <strong>16+ languages and frameworks</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="font-bold text-emerald-400">Core Systems & Concurrency</h3>
            <p className="text-xs text-slate-400">Python, Java Enterprise, Go Cloud, Rust Systems, PHP 8, C# .NET 8</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h3 className="font-bold text-indigo-400">Modern Web & Mobile</h3>
            <p className="text-xs text-slate-400">Next.js 15, React 19, Laravel 11, Vue 3, Nuxt 3, Flutter, Django, Flask</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-100 pt-4">Zero Cost, Full Transparency</h2>
        <p>
          All learning resources, interactive code editors, quizzes, and completion certificates are 100% free with no hidden fees or paywalled content.
        </p>
      </div>

      <div className="text-center pt-4">
        <NextLink
          href="/courses"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all"
        >
          <span>Start Exploring Courses</span>
          <ArrowRight className="w-4 h-4" />
        </NextLink>
      </div>
    </div>
  );
}
