'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { BookOpen, Clock, Heart, ArrowRight, Layers, Award } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';
import { toggleFavoriteAction } from '@/app/actions/learning.actions';
import type { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
  isLoggedIn?: boolean;
}

const TECH_BADGE_COLORS: Record<string, string> = {
  Python: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Java: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Go: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  React: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'Next.js': 'bg-slate-100/10 text-slate-200 border-slate-400/20',
  Laravel: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Node.js': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Rust: 'bg-amber-600/10 text-amber-400 border-amber-600/20',
  'C#': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  PHP: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Vue.js': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Nuxt.js': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  Flask: 'bg-stone-500/10 text-stone-300 border-stone-500/20',
  Django: 'bg-emerald-800/10 text-emerald-300 border-emerald-800/20',
  Flutter: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'React Native': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

export function CourseCard({ course, isLoggedIn = false }: CourseCardProps) {
  const [favorite, setFavorite] = useState(course.isFavorite || false);
  const [loadingFav, setLoadingFav] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) return;

    setLoadingFav(true);
    const res = await toggleFavoriteAction(course.id);
    if (res.success) {
      setFavorite(!!res.isFavorite);
    }
    setLoadingFav(false);
  };

  const techBadge = TECH_BADGE_COLORS[course.technology] || 'bg-slate-800 text-slate-300 border-slate-700';

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300">
      <div>
        {/* Top badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border ${techBadge}`}>
              {course.technology}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {course.level}
            </span>
          </div>

          {isLoggedIn && (
            <button
              id={`fav-btn-${course.slug}`}
              onClick={handleFavorite}
              disabled={loadingFav}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                favorite
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-rose-400 hover:bg-slate-800'
              }`}
              title={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500' : ''}`} />
            </button>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug">
          {course.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>{course.totalLessons || 12}+ Lessons</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>~{course.estimatedHours}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-500" />
            <span>Certificate</span>
          </div>
        </div>
      </div>

      {/* Progress & CTA button */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        {course.progressPercentage !== undefined && course.progressPercentage > 0 ? (
          <div className="mb-4">
            <ProgressBar progress={course.progressPercentage} showLabel size="sm" color="emerald" />
          </div>
        ) : null}

        <NextLink
          href={`/courses/${course.slug}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200"
        >
          <span>{course.progressPercentage && course.progressPercentage > 0 ? 'Continue Learning' : 'Start Curriculum'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </NextLink>
      </div>
    </div>
  );
}
