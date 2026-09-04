import React from 'react';
import NextLink from 'next/link';
import { BookX, Home, Search, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
        <BookX className="w-8 h-8" />
      </div>

      <div className="text-xs font-mono text-emerald-400 font-semibold mb-2">404 NOT FOUND</div>
      <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Lesson or Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The course, lesson, or resource you are looking for might have been moved or does not exist.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <NextLink
          href="/courses"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore All Courses</span>
        </NextLink>

        <NextLink
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </NextLink>
      </div>
    </div>
  );
}
