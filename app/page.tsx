import React from 'react';
import NextLink from 'next/link';
import {
  Code,
  ArrowRight,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  Globe,
  Server,
  Smartphone,
  ShieldCheck,
  Zap,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseService } from '@/lib/services/course.service';
import { getSession } from '@/lib/auth';

export default async function HomePage() {
  const sessionUser = await getSession();
  const courses = await CourseService.getCourses(undefined, sessionUser?.id);

  const programmingLanguages = courses.filter(c => c.category === 'Programming Languages');
  const webFrameworks = courses.filter(c => c.category === 'Web Development');
  const backendFrameworks = courses.filter(c => c.category === 'Backend Framework');
  const mobileFrameworks = courses.filter(c => c.category === 'Mobile Development');

  return (
    <div className="flex flex-col space-y-24 py-12 sm:py-16">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Background ambient gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-8 animate-in fade-in zoom-in-95">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Free Developer Education Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight leading-[1.1] uppercase max-w-5xl mx-auto">
          LEARN TO CODE. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
            BUILD REAL APPLICATIONS.
          </span> <br />
          FOR FREE.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Learn programming from Basic to Advanced through real-world projects, interactive code sandboxes, and production-grade architectures.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NextLink
            href={sessionUser ? '/dashboard' : '/register'}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{sessionUser ? 'CONTINUE TO DASHBOARD' : 'START LEARNING FREE'}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </NextLink>

          <NextLink
            href="/courses"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>EXPLORE 16+ COURSES</span>
          </NextLink>
        </div>

        {/* Value props badges */}
        <div className="mt-16 pt-10 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-200">Zero Cost</div>
              <div className="text-xs text-slate-500">No paywalls, subscriptions, or credit cards</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Terminal className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-200">Code Sandbox</div>
              <div className="text-xs text-slate-500">Interactive live code execution simulation</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-200">Real Projects</div>
              <div className="text-xs text-slate-500">Build REST APIs, auth systems & full SaaS</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-200">Certificates</div>
              <div className="text-xs text-slate-500">Verified completion certificate per course</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEARNING PATH ROADMAP VISUALIZER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-semibold uppercase text-emerald-400 tracking-wider">
              STRUCTURED PROGRESSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-2">
              From First Line of Code to Production Deployment
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every curriculum is crafted with a progressive 4-tier milestone ladder.
            </p>
          </div>

          {/* Path Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { step: '01', title: 'BEGINNER', desc: 'Syntax & Setup' },
              { step: '02', title: 'BASIC', desc: 'Data & Loops' },
              { step: '03', title: 'INTERMEDIATE', desc: 'OOP & APIs' },
              { step: '04', title: 'ADVANCED', desc: 'Concurrency & Async' },
              { step: '05', title: 'PROJECT', desc: 'System Design' },
              { step: '06', title: 'APPLICATION', desc: 'Auth & Database' },
              { step: '07', title: 'DEPLOYMENT', desc: 'Cloud & CI/CD' },
            ].map((st, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between items-center group hover:border-emerald-500/40 transition-colors"
              >
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">{st.step}</span>
                <div className="my-2">
                  <div className="text-xs font-bold text-slate-100 tracking-wider group-hover:text-emerald-300">
                    {st.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{st.desc}</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROGRAMMING LANGUAGES SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Core Foundations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
              Programming Languages
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Java, Python, Go, PHP, C#, and Rust — from memory models to asynchronous microservices.
            </p>
          </div>

          <NextLink
            href="/courses?category=Programming+Languages"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View all 6 languages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmingLanguages.map(c => (
            <CourseCard key={c.id} course={c} isLoggedIn={!!sessionUser} />
          ))}
        </div>
      </section>

      {/* 4. WEB DEVELOPMENT SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>Frontend & Full Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
              Modern Web Development
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Next.js 15, React 19, Laravel 11, Vue 3, Nuxt 3, and Node.js REST APIs.
            </p>
          </div>

          <NextLink
            href="/courses?category=Web+Development"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View all 6 web stacks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webFrameworks.map(c => (
            <CourseCard key={c.id} course={c} isLoggedIn={!!sessionUser} />
          ))}
        </div>
      </section>

      {/* 5. BACKEND & MOBILE SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Backend Frameworks */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
              <Server className="w-4 h-4" />
              <span>Python Web Stacks</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Backend Frameworks (Flask & Django)</h3>
            <div className="space-y-6">
              {backendFrameworks.map(c => (
                <CourseCard key={c.id} course={c} isLoggedIn={!!sessionUser} />
              ))}
            </div>
          </div>

          {/* Mobile Frameworks */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <Smartphone className="w-4 h-4" />
              <span>Cross-Platform Native</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Mobile Development (Flutter & React Native)</h3>
            <div className="space-y-6">
              {mobileFrameworks.map(c => (
                <CourseCard key={c.id} course={c} isLoggedIn={!!sessionUser} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-8 sm:p-14 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Ready to Build Production-Grade Code?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join thousands of developers leveling up their engineering skills. Create your free account to track streaks, bookmark notes, and earn course certificates.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <NextLink
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Create Free Account
              </NextLink>
              <NextLink
                href="/coding"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
              >
                Try Code Playground
              </NextLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
