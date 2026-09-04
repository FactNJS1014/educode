'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Code2, Layers, ArrowRight } from 'lucide-react';

interface SearchResult {
  title: string;
  category: string;
  level?: string;
  type: 'course' | 'lesson' | 'project';
  url: string;
}

const SEARCH_CATALOG: SearchResult[] = [
  { title: 'Python Programming Masterclass', category: 'Python', level: 'Basic → Advanced', type: 'course', url: '/courses/python-programming' },
  { title: 'Introduction to Python & Setup', category: 'Python', type: 'lesson', url: '/learn/python-programming/python-introduction-and-setup' },
  { title: 'Data Structures & List Comprehensions', category: 'Python', type: 'lesson', url: '/learn/python-programming/python-data-structures-and-comprehensions' },
  { title: 'Object-Oriented Programming & Dataclasses', category: 'Python', type: 'lesson', url: '/learn/python-programming/python-oop-and-dataclasses' },
  { title: 'CLI Task & Budget Manager with SQLite', category: 'Python Project', type: 'project', url: '/projects/proj-py-1' },

  { title: 'Java Enterprise Programming', category: 'Java', level: 'Basic → Advanced', type: 'course', url: '/courses/java-programming' },
  { title: 'Java OOP, Records & Streams API', category: 'Java', type: 'lesson', url: '/learn/java-programming/java-oop-and-modern-syntax' },
  { title: 'Enterprise Inventory Management System', category: 'Java Project', type: 'project', url: '/projects/proj-java-1' },

  { title: 'Go (Golang) Cloud Native Development', category: 'Go', level: 'Basic → Advanced', type: 'course', url: '/courses/go-programming' },
  { title: 'Goroutines, Channels & Idiomatic REST Handlers', category: 'Go', type: 'lesson', url: '/learn/go-programming/go-goroutines-and-rest-api' },
  { title: 'Distributed Rate Limiter & JWT API', category: 'Go Project', type: 'project', url: '/projects/proj-go-1' },

  { title: 'React & Modern Frontend Architecture', category: 'React', level: 'Basic → Advanced', type: 'course', url: '/courses/react-framework' },
  { title: 'React State Management & Custom Hooks', category: 'React', type: 'lesson', url: '/learn/react-framework/react-state-and-custom-hooks' },

  { title: 'Next.js App Router & Full Stack Mastery', category: 'Next.js', level: 'Basic → Advanced', type: 'course', url: '/courses/nextjs-framework' },
  { title: 'Server Components & Server Actions Architecture', category: 'Next.js', type: 'lesson', url: '/learn/nextjs-framework/nextjs-server-components-and-actions' },
  { title: 'Full Stack SaaS Education Platform with Neon & Netlify', category: 'Next.js Project', type: 'project', url: '/projects/proj-next-1' },

  { title: 'Laravel Enterprise PHP Framework', category: 'Laravel', level: 'Basic → Advanced', type: 'course', url: '/courses/laravel-framework' },
  { title: 'Eloquent ORM & RESTful Resource Controllers', category: 'Laravel', type: 'lesson', url: '/learn/laravel-framework/laravel-eloquent-and-controllers' },

  { title: 'Node.js & Express REST API Mastery', category: 'Node.js', level: 'Basic → Advanced', type: 'course', url: '/courses/nodejs-backend' },
  { title: 'Express Pipeline, JWT Middleware & Error Handling', category: 'Node.js', type: 'lesson', url: '/learn/nodejs-backend/nodejs-express-and-jwt' },

  { title: 'Rust Systems & Memory-Safe Programming', category: 'Rust', level: 'Basic → Advanced', type: 'course', url: '/courses/rust-programming' },
  { title: 'Ownership Rules, Mutability & Lifetimes', category: 'Rust', type: 'lesson', url: '/learn/rust-programming/rust-ownership-and-borrowing' },

  { title: 'C# & .NET Web API Architecture', category: 'C#', level: 'Basic → Advanced', type: 'course', url: '/courses/csharp-programming' },
  { title: 'Modern PHP 8 & Object-Oriented Architecture', category: 'PHP', level: 'Basic → Advanced', type: 'course', url: '/courses/php-programming' },
  { title: 'Vue 3 & Composition API', category: 'Vue.js', level: 'Basic → Advanced', type: 'course', url: '/courses/vue-framework' },
  { title: 'Nuxt 3 Full Stack Web Development', category: 'Nuxt.js', level: 'Basic → Advanced', type: 'course', url: '/courses/nuxtjs-framework' },
  { title: 'Flask Microframework & RESTful APIs', category: 'Flask', level: 'Basic → Advanced', type: 'course', url: '/courses/flask-framework' },
  { title: 'Django & Django REST Framework (DRF)', category: 'Django', level: 'Basic → Advanced', type: 'course', url: '/courses/django-framework' },
  { title: 'Flutter & Dart Cross-Platform Mobile Apps', category: 'Flutter', level: 'Basic → Advanced', type: 'course', url: '/courses/flutter-mobile' },
  { title: 'React Native & Expo Mobile Engineering', category: 'React Native', level: 'Basic → Advanced', type: 'course', url: '/courses/react-native-mobile' },
];

export function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? SEARCH_CATALOG.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_CATALOG.slice(0, 6);

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-emerald-400" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search courses, lessons, topics, frameworks (e.g. Python, React, Goroutines)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base"
          />
          <button
            id="close-search-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-slate-800/60">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No results found for &ldquo;{query}&rdquo;. Try searching for Python, Next.js, or Go.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                id={`search-item-${idx}`}
                onClick={() => handleSelect(item.url)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                    {item.type === 'course' ? <BookOpen className="w-4 h-4" /> : item.type === 'project' ? <Layers className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {item.category} {item.level ? `• ${item.level}` : ''}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
          <span>Navigate with mouse or arrow keys</span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] mr-1">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
