import React from 'react';
import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import { ShieldCheck, Users, BookOpen, Layers, Award, Terminal, ArrowRight } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db/store';
import { AdminService } from '@/lib/services/statistics.service';
import { AdminUserTable } from '@/components/admin/AdminUserTable';
import { NeonDatabaseManager } from '@/components/admin/NeonDatabaseManager';

export default async function AdminDashboardPage() {
  const sessionUser = await getSession();

  if (!sessionUser) {
    redirect('/login?redirect=/admin');
  }

  if (sessionUser.role !== 'ADMIN') {
    redirect('/dashboard?error=forbidden');
  }

  const adminStats = await AdminService.getOverviewStats();
  const allUsers = await db.getUsers();
  const allCourses = await db.getCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Administrator Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 mt-1">
            Platform Operations & Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review live learner metrics, course status, and user privileges.
          </p>
        </div>

        <NextLink
          href="/dashboard"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
        >
          View as Student &rarr;
        </NextLink>
      </div>

      {/* Admin Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Users</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {adminStats.totalUsers}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Active Students</div>
          <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">
            {adminStats.activeUsers}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Curriculums</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
            {adminStats.totalCourses}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Lessons</div>
          <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
            {adminStats.totalLessons}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Quizzes</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {adminStats.totalQuizzes}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Projects</div>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-1">
            {adminStats.totalProjects}
          </div>
        </div>
      </div>

      {/* Neon Serverless PostgreSQL Database Hub */}
      <section>
        <NeonDatabaseManager />
      </section>

      {/* Users Management Table */}
      <section>
        <AdminUserTable initialUsers={allUsers} currentAdminId={sessionUser.id} />
      </section>

      {/* Course Catalog Health Overview */}
      <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-100 text-base">Course Catalog Health</h3>
          <NextLink href="/courses" className="text-xs text-emerald-400 hover:underline">
            View Live Catalog &rarr;
          </NextLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {allCourses.map(c => (
            <div
              key={c.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-200">{c.title}</div>
                <div className="text-[10px] text-slate-500 font-mono">{c.technology} &bull; {c.level}</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                Active
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
