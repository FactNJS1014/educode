import React from 'react';
import NextLink from 'next/link';
import { Code, Heart, Shield, Terminal, BookOpen, Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-100 text-lg">EduCode Academy</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Free, comprehensive programming & framework education platform. Master skills from core syntax to production architecture and real-world deployment.
          </p>
          <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            All courses 100% Free for Developers
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
            Programming Languages
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NextLink href="/courses/python-programming" className="hover:text-emerald-400 transition-colors">
                Python Masterclass
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/java-programming" className="hover:text-emerald-400 transition-colors">
                Java Enterprise
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/go-programming" className="hover:text-emerald-400 transition-colors">
                Go (Golang) Cloud
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/rust-programming" className="hover:text-emerald-400 transition-colors">
                Rust Systems
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/csharp-programming" className="hover:text-emerald-400 transition-colors">
                C# & .NET 8
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/php-programming" className="hover:text-emerald-400 transition-colors">
                Modern PHP 8
              </NextLink>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
            Frameworks & Stacks
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NextLink href="/courses/nextjs-framework" className="hover:text-emerald-400 transition-colors">
                Next.js 15 Full Stack
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/react-framework" className="hover:text-emerald-400 transition-colors">
                React 19 & Hooks
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/laravel-framework" className="hover:text-emerald-400 transition-colors">
                Laravel 11 PHP
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/vue-framework" className="hover:text-emerald-400 transition-colors">
                Vue 3 & Pinia
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/flutter-mobile" className="hover:text-emerald-400 transition-colors">
                Flutter & Dart Mobile
              </NextLink>
            </li>
            <li>
              <NextLink href="/courses/django-framework" className="hover:text-emerald-400 transition-colors">
                Django & DRF API
              </NextLink>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
            Learning Platform
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NextLink href="/roadmap" className="hover:text-emerald-400 transition-colors">
                Career Roadmaps
              </NextLink>
            </li>
            <li>
              <NextLink href="/coding" className="hover:text-emerald-400 transition-colors">
                Interactive Code Sandbox
              </NextLink>
            </li>
            <li>
              <NextLink href="/projects" className="hover:text-emerald-400 transition-colors">
                Real-World Workshops
              </NextLink>
            </li>
            <li>
              <NextLink href="/about" className="hover:text-emerald-400 transition-colors">
                About the Academy
              </NextLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} EduCode Academy. Built for students & software engineers worldwide.
        </div>
        <div className="flex items-center gap-6">
          <span>PostgreSQL + Prisma</span>
          <span>Next.js App Router</span>
          <span>24h Token Auth</span>
        </div>
      </div>
    </footer>
  );
}

export function MobileBottomNav({ user }: { user: any }) {
  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-md px-2 py-2 flex items-center justify-around text-[10px] text-slate-400">
      <NextLink href="/" className="flex flex-col items-center gap-1 p-1 hover:text-emerald-400">
        <Code className="w-5 h-5" />
        <span>Home</span>
      </NextLink>
      <NextLink href="/courses" className="flex flex-col items-center gap-1 p-1 hover:text-emerald-400">
        <BookOpen className="w-5 h-5" />
        <span>Courses</span>
      </NextLink>
      <NextLink href="/coding" className="flex flex-col items-center gap-1 p-1 hover:text-emerald-400">
        <Terminal className="w-5 h-5" />
        <span>Playground</span>
      </NextLink>
      <NextLink href={user ? '/dashboard' : '/login'} className="flex flex-col items-center gap-1 p-1 hover:text-emerald-400">
        <Layers className="w-5 h-5" />
        <span>{user ? 'Dashboard' : 'Login'}</span>
      </NextLink>
    </nav>
  );
}
