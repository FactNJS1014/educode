'use client';

import React from 'react';
import { Flame, Calendar, Award, Zap } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';

interface StreakCardProps {
  streakDays?: number;
  dailyGoalProgressMinutes?: number;
  dailyGoalTargetMinutes?: number;
}

export function StreakCard({
  streakDays = 1,
  dailyGoalProgressMinutes = 0,
  dailyGoalTargetMinutes = 30,
}: StreakCardProps) {
  const goalPercentage = Math.min(
    100,
    Math.round(((dailyGoalProgressMinutes || 0) / (dailyGoalTargetMinutes || 30)) * 100)
  );

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            Learning Momentum
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-100 font-mono">
              🔥 {streakDays}
            </span>
            <span className="text-sm font-semibold text-amber-400">
              {streakDays === 1 ? 'DAY STREAK' : 'DAYS STREAK'}
            </span>
          </div>
        </div>

        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Flame className="w-6 h-6 fill-amber-400 animate-pulse" />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400 leading-relaxed">
        Consistent daily learning reinforces muscle memory and long-term concept retention.
      </p>

      {/* Daily Goal */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-300 font-medium">Today&apos;s Goal</span>
          <span className="font-mono text-slate-400">
            <span className="text-amber-400 font-bold">{dailyGoalProgressMinutes}</span> / {dailyGoalTargetMinutes} min
          </span>
        </div>
        <ProgressBar progress={goalPercentage} size="sm" color="emerald" />
      </div>
    </div>
  );
}
