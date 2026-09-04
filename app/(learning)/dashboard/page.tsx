import React from 'react';
import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import {
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Compass,
  CheckCircle2,
  Clock,
  Layers,
  Terminal
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db/store';
import { StatisticsService } from '@/lib/services/statistics.service';
import { CourseService } from '@/lib/services/course.service';
import { StreakCard } from '@/components/dashboard/StreakCard';
import { StatCards } from '@/components/dashboard/StatCards';
import { ContinueLearningCard } from '@/components/dashboard/ContinueLearningCard';
import { CourseCard } from '@/components/courses/CourseCard';

export default async function DashboardPage() {
  const sessionUser = await getSession();
  if (!sessionUser) {
    redirect('/login?redirect=/dashboard');
  }

  const userStats = (await StatisticsService.getUserStats(sessionUser.id)) || {
    totalCoursesStarted: 0,
    totalCoursesCompleted: 0,
    totalLessonsCompleted: 0,
    totalQuizzesPassed: 0,
    totalProjectsCompleted: 0,
    learningStreakDays: 1,
    estimatedHoursLearned: 0,
    dailyGoalProgressMinutes: 0,
    dailyGoalTargetMinutes: 30,
  };
  const recentActivities = (await db.getActivities(6)) || [];
  const enrolledCourses = (await CourseService.getUserEnrolledCourses(sessionUser.id)) || [];
  const allCourses = (await CourseService.getCourses(undefined, sessionUser.id)) || [];

  // Active course in progress
  const activeCourse = enrolledCourses.find(c => (c.progressPercentage || 0) < 100) || enrolledCourses[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              Student Command Center
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {sessionUser.role || 'USER'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
            Welcome back, {sessionUser.name || sessionUser.username || 'Student'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your streak, code exercises, and engineering certifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NextLink
            href="/coding"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Open Sandbox</span>
          </NextLink>

          <NextLink
            href="/courses"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Courses</span>
          </NextLink>
        </div>
      </div>

      {/* 2. STATS & STREAK ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatCards stats={userStats} />
        </div>
        <div>
          <StreakCard
            streakDays={userStats?.learningStreakDays || 1}
            dailyGoalProgressMinutes={userStats?.dailyGoalProgressMinutes || 0}
            dailyGoalTargetMinutes={userStats?.dailyGoalTargetMinutes || 30}
          />
        </div>
      </div>

      {/* 3. CONTINUE LEARNING ACTIVE BANNER */}
      {activeCourse && (
        <section>
          <ContinueLearningCard course={activeCourse} />
        </section>
      )}

      {/* 4. ENROLLED / IN PROGRESS COURSES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              My Active Enrolled Curriculums
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Continue where you left off across your active courses
            </p>
          </div>

          <NextLink
            href="/my-learning"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All ({enrolledCourses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(c => (
              <CourseCard key={c.id} course={c} isLoggedIn={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-slate-200">No courses started yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Explore our catalog of 16+ programming languages and frameworks to begin your first curriculum.
              </p>
            </div>
            <NextLink
              href="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              <span>Explore Course Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </NextLink>
          </div>
        )}
      </section>

      {/* 5. RECENT ACTIVITIES & RECOMMENDED COURSES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-slate-800">
        {/* Recent Activity Log */}
        <div className="lg:col-span-1 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-base">Recent Activities</h3>
            <span className="text-[11px] font-mono text-slate-400">Live Log</span>
          </div>

          {recentActivities.length > 0 ? (
            <div className="divide-y divide-slate-800/80">
              {recentActivities.map(act => (
                <div key={act.id} className="py-3 flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium truncate">{act.activityType || 'Learning Progress'}</p>
                    <span suppressHydrationWarning className="text-[10px] text-slate-500 font-mono">
                      {act.createdAt ? new Date(act.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-6 text-center">
              No recent activity recorded yet today. Complete a lesson to see it here!
            </div>
          )}
        </div>

        {/* Explore More Recommended */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-base">Recommended For You</h3>
            <NextLink href="/courses" className="text-xs text-emerald-400 hover:underline">
              Browse All
            </NextLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allCourses.slice(0, 4).map(c => (
              <CourseCard key={c.id} course={c} isLoggedIn={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
