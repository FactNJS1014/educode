import React from 'react';
import { BookOpen, CheckCircle, Award, Layers, Clock, Flame } from 'lucide-react';
import type { UserStats } from '@/lib/types';

export function StatCards({ stats }: { stats: UserStats }) {
  const items = [
    {
      label: 'Lessons Completed',
      value: stats.totalLessonsCompleted,
      icon: CheckCircle,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Courses in Progress',
      value: stats.totalCoursesStarted,
      icon: BookOpen,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      label: 'Quizzes Passed',
      value: stats.totalQuizzesPassed,
      icon: Award,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      label: 'Projects Built',
      value: stats.totalProjectsCompleted,
      icon: Layers,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it, idx) => {
        const Icon = it.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">{it.label}</span>
              <div className={`p-2 rounded-xl border ${it.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-100">
              {it.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
