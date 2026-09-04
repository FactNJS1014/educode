'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  CheckCircle2,
  Bookmark,
  FileText,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Share2,
  Award
} from 'lucide-react';
import { CodeBlock } from '../ui/CodeBlock';
import { NoteEditor } from './NoteEditor';
import { QuizRunner } from '../quizzes/QuizRunner';
import { CertificateModal } from './CertificateModal';
import { toggleLessonCompleteAction, toggleBookmarkAction } from '@/app/actions/learning.actions';
import type { Lesson, Chapter, Quiz } from '@/lib/types';

interface LessonViewerProps {
  lesson: Lesson;
  courseTitle: string;
  courseSlug: string;
  chapters: Chapter[];
  userName?: string;
  isLoggedIn?: boolean;
}

export function LessonViewer({
  lesson,
  courseTitle,
  courseSlug,
  chapters,
  userName = 'Developer',
  isLoggedIn = true,
}: LessonViewerProps) {
  const [completed, setCompleted] = useState<boolean>(!!lesson.completed);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(!!lesson.isBookmarked);
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz' | 'notes'>('lesson');
  const [showCertificate, setShowCertificate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Find next and previous lesson in curriculum
  const allLessons: Lesson[] = [];
  chapters.forEach(ch => {
    (ch.lessons || []).forEach(l => allLessons.push(l));
  });

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleToggleComplete = async () => {
    if (!isLoggedIn) return;
    setIsUpdating(true);
    const newStatus = !completed;
    setCompleted(newStatus);
    await toggleLessonCompleteAction(lesson.id, newStatus, courseSlug);
    setIsUpdating(false);

    // If this is the last lesson and completed, trigger certificate prompt
    if (newStatus && !nextLesson) {
      setShowCertificate(true);
    }
  };

  const handleToggleBookmark = async () => {
    if (!isLoggedIn) return;
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);
    await toggleBookmarkAction(lesson.id);
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Lesson Header */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
              LESSON {lesson.order}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ~{lesson.duration} min read & practice
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                id={`bookmark-lesson-${lesson.slug}`}
                onClick={handleToggleBookmark}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Lesson'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>
            )}

            <button
              id={`mark-complete-top-${lesson.slug}`}
              onClick={handleToggleComplete}
              disabled={isUpdating || !isLoggedIn}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                completed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{completed ? 'Completed ✓' : 'Mark as Complete'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {lesson.title}
        </h1>

        {lesson.description && (
          <p className="text-slate-400 text-sm leading-relaxed">{lesson.description}</p>
        )}

        {/* Lesson Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
          <button
            id="tab-lesson-content"
            onClick={() => setActiveTab('lesson')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'lesson'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lesson Content</span>
          </button>

          {lesson.quizzes && lesson.quizzes.length > 0 && (
            <button
              id="tab-quiz-content"
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Knowledge Quiz ({lesson.quizzes.length})</span>
            </button>
          )}

          {isLoggedIn && (
            <button
              id="tab-notes-content"
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>My Notes</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab: Main Lesson Content */}
      {activeTab === 'lesson' && (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');

                  if (match) {
                    return <CodeBlock code={codeString} language={match[1]} />;
                  }

                  return (
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono text-xs" {...props}>
                      {children}
                    </code>
                  );
                },
                h2({ children }) {
                  return <h2 className="text-xl font-bold text-slate-100 mt-8 mb-3 pb-2 border-b border-slate-800/80">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-lg font-semibold text-slate-200 mt-6 mb-2">{children}</h3>;
                },
                ul({ children }) {
                  return <ul className="list-disc pl-6 space-y-2 text-slate-300 my-3">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal pl-6 space-y-2 text-slate-300 my-3">{children}</ol>;
                },
                table({ children }) {
                  return (
                    <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">{children}</table>
                    </div>
                  );
                },
                th({ children }) {
                  return <th className="p-3 bg-slate-900 font-semibold text-slate-200 uppercase font-mono">{children}</th>;
                },
                td({ children }) {
                  return <td className="p-3 bg-slate-950/60 border-t border-slate-800/60">{children}</td>;
                },
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>

          {/* Bottom Action bar */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {prevLesson ? (
                <NextLink
                  href={`/learn/${courseSlug}/${prevLesson.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: {prevLesson.title}</span>
                </NextLink>
              ) : (
                <div />
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                id={`mark-complete-bottom-${lesson.slug}`}
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  completed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completed ? 'Completed ✓' : 'Mark as Complete'}</span>
              </button>

              {nextLesson && (
                <NextLink
                  href={`/learn/${courseSlug}/${nextLesson.slug}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold transition-colors"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </NextLink>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Embedded Quiz */}
      {activeTab === 'quiz' && lesson.quizzes && lesson.quizzes.length > 0 && (
        <div className="space-y-6">
          {lesson.quizzes.map(q => (
            <QuizRunner key={q.id} quiz={q} onCompleted={() => setCompleted(true)} />
          ))}
        </div>
      )}

      {/* Tab: Notes */}
      {activeTab === 'notes' && (
        <NoteEditor lessonId={lesson.id} initialContent={lesson.userNote} />
      )}

      {/* Certificate Modal on Course 100% Completion */}
      <CertificateModal
        userName={userName}
        courseTitle={courseTitle}
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
    </div>
  );
}
