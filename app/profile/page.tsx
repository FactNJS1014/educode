import React from 'react';
import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import { User, Mail, Award, Flame, CheckCircle2, Shield, Calendar, BookOpen, Clock } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db/store';
import { StatisticsService } from '@/lib/services/statistics.service';
import { CourseService } from '@/lib/services/course.service';
import { ProfileLogoutButton } from '@/components/profile/ProfileLogoutButton';

export default async function ProfilePage() {
  const sessionUser = await getSession();
  if (!sessionUser) {
    redirect('/login?redirect=/profile');
  }

  const user = await db.getUserById(sessionUser.id);
  const userStats = await StatisticsService.getUserStats(sessionUser.id);
  const enrolledCourses = await CourseService.getUserEnrolledCourses(sessionUser.id);
  const completedCourses = enrolledCourses.filter(c => (c.progressPercentage || 0) === 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Profile Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-indigo-600 p-1 shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-[20px] flex items-center justify-center text-3xl font-bold font-mono text-emerald-400">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-emerald-400 text-xs font-mono font-semibold border border-slate-700">
                {user?.role}
              </span>
            </div>
            <ProfileLogoutButton />
          </div>

          <div className="text-sm font-mono text-slate-400">@{user?.username} &bull; {user?.email}</div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Member since 2026
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Flame className="w-4 h-4 fill-amber-400" />
              {userStats.learningStreakDays} Day Streak
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {userStats.totalLessonsCompleted}
          </div>
          <div className="text-xs text-slate-400 mt-1">Lessons Completed</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-bold font-mono text-indigo-400">
            {userStats.totalCoursesStarted}
          </div>
          <div className="text-xs text-slate-400 mt-1">Enrolled Stacks</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-bold font-mono text-purple-400">
            {userStats.totalQuizzesPassed}
          </div>
          <div className="text-xs text-slate-400 mt-1">Quizzes Passed</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-2xl font-bold font-mono text-amber-400">
            {userStats.totalProjectsCompleted}
          </div>
          <div className="text-xs text-slate-400 mt-1">Projects Built</div>
        </div>
      </div>

      {/* Verified Course Certificates */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-slate-100">Earned Certifications</h2>
        </div>

        {completedCourses.length > 0 ? (
          <div className="space-y-4">
            {completedCourses.map(c => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{c.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">100% Curriculum Completed</p>
                </div>
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Verified Certificate
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            No course certificates earned yet. Complete all lessons in a course to generate your official certificate!
          </div>
        )}
      </div>
    </div>
  );
}
