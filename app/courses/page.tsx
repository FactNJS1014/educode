import React from 'react';
import { CourseService } from '@/lib/services/course.service';
import { getSession } from '@/lib/auth';
import { CourseCatalogClient } from '@/components/courses/CourseCatalogClient';
import { Sparkles } from 'lucide-react';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; level?: string }>;
}) {
  const params = await searchParams;
  const sessionUser = await getSession();
  const initialCategory = params.category || 'ALL';

  const allCourses = await CourseService.getCourses(undefined, sessionUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Developer Curriculums</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Explore Courses & Stacks
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          From Python and Go to Next.js and Rust. Every curriculum is engineered with hands-on lesson code, knowledge check quizzes, and real-world project builds.
        </p>
      </div>

      {/* Interactive Filterable Catalog */}
      <CourseCatalogClient
        initialCourses={allCourses}
        initialCategory={initialCategory}
        isLoggedIn={!!sessionUser}
      />
    </div>
  );
}
