import React from 'react';
import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import { BookOpen, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { CourseService } from '@/lib/services/course.service';
import { CourseCard } from '@/components/courses/CourseCard';

export default async function MyLearningPage() {
  const sessionUser = await getSession();
  if (!sessionUser) {
    redirect('/login?redirect=/my-learning');
  }

  const enrolledCourses = await CourseService.getUserEnrolledCourses(sessionUser.id);
  const completedCourses = enrolledCourses.filter(c => (c.progressPercentage || 0) === 100);
  const inProgressCourses = enrolledCourses.filter(c => (c.progressPercentage || 0) < 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-100">
          My Learning Portfolio
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review your enrolled curriculums, completed milestones, and earned certificates.
        </p>
      </div>

      {/* In Progress */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-100">
            In Progress ({inProgressCourses.length})
          </h2>
        </div>

        {inProgressCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map(c => (
              <CourseCard key={c.id} course={c} isLoggedIn={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-sm">
            No active courses in progress.{' '}
            <NextLink href="/courses" className="text-emerald-400 font-semibold hover:underline">
              Browse course catalog &rarr;
            </NextLink>
          </div>
        )}
      </section>

      {/* Completed Courses & Certificates */}
      <section className="space-y-6 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-slate-100">
            Completed & Certified ({completedCourses.length})
          </h2>
        </div>

        {completedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map(c => (
              <CourseCard key={c.id} course={c} isLoggedIn={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-sm">
            Complete 100% of lessons in any curriculum to unlock your verified Certificate of Completion!
          </div>
        )}
      </section>
    </div>
  );
}
