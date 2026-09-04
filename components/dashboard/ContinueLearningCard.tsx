import React from 'react';
import NextLink from 'next/link';
import { PlayCircle, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';
import type { Course } from '@/lib/types';

interface ContinueLearningCardProps {
  course: Course;
}

export function ContinueLearningCard({ course }: ContinueLearningCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-2 max-w-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20">
            CONTINUE LEARNING
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {course.technology}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-100">{course.title}</h3>
        <p className="text-xs text-slate-400 line-clamp-1">{course.description}</p>

        <div className="pt-2 w-full max-w-md">
          <ProgressBar progress={course.progressPercentage || 0} showLabel size="sm" color="emerald" />
        </div>
      </div>

      <NextLink
        href={`/courses/${course.slug}`}
        className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
      >
        <PlayCircle className="w-4 h-4 fill-slate-950" />
        <span>Resume Course</span>
        <ArrowRight className="w-4 h-4" />
      </NextLink>
    </div>
  );
}
