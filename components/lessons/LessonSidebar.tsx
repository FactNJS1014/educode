'use client';

import React from 'react';
import NextLink from 'next/link';
import { CheckCircle2, Circle, ArrowLeft, BookOpen, Layers, Award } from 'lucide-react';
import type { Chapter, Lesson } from '@/lib/types';
import { ProgressBar } from '../ui/ProgressBar';

interface LessonSidebarProps {
  courseTitle: string;
  courseSlug: string;
  chapters: Chapter[];
  currentLessonSlug: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export function LessonSidebar({
  courseTitle,
  courseSlug,
  chapters,
  currentLessonSlug,
  totalLessons,
  completedLessons,
  progressPercentage,
}: LessonSidebarProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0 bg-slate-950 border-r border-slate-800/80 flex flex-col h-full lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto">
      {/* Course Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/40">
        <NextLink
          href={`/courses/${courseSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Course Overview</span>
        </NextLink>

        <h2 className="text-base font-bold text-slate-100 leading-snug mb-3">{courseTitle}</h2>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Progress</span>
            <span className="font-mono text-emerald-400">
              {completedLessons}/{totalLessons} ({progressPercentage}%)
            </span>
          </div>
          <ProgressBar progress={progressPercentage} size="sm" color="emerald" />
        </div>
      </div>

      {/* Chapters & Lessons */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2">
        {chapters.map((chap, cIdx) => (
          <div key={chap.id} className="py-3">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span className="truncate">
                {cIdx + 1}. {chap.title}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                {chap.level}
              </span>
            </div>

            <div className="mt-1 space-y-0.5">
              {(chap.lessons || []).map((les) => {
                const isCurrent = les.slug === currentLessonSlug;
                return (
                  <NextLink
                    key={les.id}
                    href={`/learn/${courseSlug}/${les.slug}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isCurrent
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {les.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle
                        className={`w-4 h-4 shrink-0 ${
                          isCurrent ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'
                        }`}
                      />
                    )}
                    <span className="truncate flex-1">{les.title}</span>
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">
                      {les.duration}m
                    </span>
                  </NextLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
