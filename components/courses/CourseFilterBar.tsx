'use client';

import React from 'react';
import { Search, Filter, Layers, Code, Globe, Server, Smartphone } from 'lucide-react';

interface FilterBarProps {
  currentCategory: string;
  currentLevel: string;
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onLevelChange: (lvl: string) => void;
  onSearchChange: (q: string) => void;
}

const CATEGORIES = [
  { id: 'ALL', label: 'All Technologies', icon: Layers },
  { id: 'Programming Languages', label: 'Languages (Python, Java, Go, Rust, C#, PHP)', icon: Code },
  { id: 'Web Development', label: 'Web (Next.js, React, Laravel, Vue, Node, Nuxt)', icon: Globe },
  { id: 'Backend Framework', label: 'Backend (Flask, Django)', icon: Server },
  { id: 'Mobile Development', label: 'Mobile (Flutter, React Native)', icon: Smartphone },
];

const LEVELS = [
  { id: 'ALL', label: 'All Levels' },
  { id: 'BASIC', label: 'Basic' },
  { id: 'INTERMEDIATE', label: 'Intermediate' },
  { id: 'ADVANCED', label: 'Advanced' },
];

export function CourseFilterBar({
  currentCategory,
  currentLevel,
  searchQuery,
  onCategoryChange,
  onLevelChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search and Level Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="course-filter-search"
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Filter courses by name or technology..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm transition-all"
          />
        </div>

        {/* Level pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-900/80 border border-slate-800 rounded-xl">
          {LEVELS.map(lvl => (
            <button
              key={lvl.id}
              id={`level-btn-${lvl.id}`}
              onClick={() => onLevelChange(lvl.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                currentLevel === lvl.id
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isSelected = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`category-tab-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-slate-800 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
