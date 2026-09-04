'use client';

import React, { useState, useMemo } from 'react';
import { CourseFilterBar } from './CourseFilterBar';
import { CourseCard } from './CourseCard';
import type { Course } from '@/lib/types';

interface CourseCatalogClientProps {
  initialCourses: Course[];
  initialCategory?: string;
  isLoggedIn?: boolean;
}

export function CourseCatalogClient({
  initialCourses,
  initialCategory = 'ALL',
  isLoggedIn = false,
}: CourseCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = useMemo(() => {
    return initialCourses.filter(c => {
      // Category match
      if (selectedCategory !== 'ALL' && c.category !== selectedCategory) {
        return false;
      }
      // Level match
      if (selectedLevel !== 'ALL' && c.level !== selectedLevel) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchTech = c.technology.toLowerCase().includes(q);
        const matchDesc = c.description.toLowerCase().includes(q);
        if (!matchTitle && !matchTech && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [initialCourses, selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="space-y-6">
      <CourseFilterBar
        currentCategory={selectedCategory}
        currentLevel={selectedLevel}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onLevelChange={setSelectedLevel}
        onSearchChange={setSearchQuery}
      />

      {/* Course Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Showing {filteredCourses.length} of {initialCourses.length} courses</span>
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="text-base font-bold text-slate-200">No courses match your filter criteria</div>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or clearing selected level/category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedLevel('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
