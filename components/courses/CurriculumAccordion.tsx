'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, PlayCircle, FileCode, Award, ArrowRight } from 'lucide-react';
import type { Chapter, Lesson } from '@/lib/types';

interface CurriculumProps {
  chapters: Chapter[];
  courseSlug: string;
  isLoggedIn?: boolean;
}

export function CurriculumAccordion({ chapters, courseSlug, isLoggedIn = false }: CurriculumProps) {
  const [openChapterIds, setOpenChapterIds] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    chapters.forEach((ch, idx) => {
      map[ch.id] = idx === 0; // open first by default
    });
    return map;
  });

  const toggleChapter = (id: string) => {
    setOpenChapterIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {chapters.map((chap, chapIndex) => {
        const isOpen = openChapterIds[chap.id];
        const lessons = chap.lessons || [];
        const completedCount = lessons.filter(l => l.completed).length;

        return (
          <div
            key={chap.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg transition-all"
          >
            {/* Header */}
            <button
              id={`curriculum-chap-${chap.id}`}
              onClick={() => toggleChapter(chap.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-semibold text-emerald-400">
                  0{chapIndex + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-100 text-base">{chap.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {chap.level}
                    </span>
                  </div>
                  {chap.description && (
                    <p className="text-xs text-slate-400 mt-1">{chap.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="font-mono">
                  {completedCount}/{lessons.length} Completed
                </span>
                {isOpen ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
              </div>
            </button>

            {/* Lesson list */}
            {isOpen && (
              <div className="divide-y divide-slate-800/80 border-t border-slate-800 bg-slate-950/40">
                {lessons.map((les, lIndex) => {
                  const targetUrl = isLoggedIn ? `/learn/${courseSlug}/${les.slug}` : `/login?redirect=/learn/${courseSlug}/${les.slug}`;

                  return (
                    <NextLink
                      key={les.id}
                      href={targetUrl}
                      className="flex items-center justify-between p-4 px-6 hover:bg-slate-800/60 transition-colors group"
                    >
                      <div className="flex items-center gap-3.5">
                        {les.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/10 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                        )}
                        <div>
                          <h4 className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                            {les.title}
                          </h4>
                          {les.description && (
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{les.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-mono">{les.duration} min</span>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </NextLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
