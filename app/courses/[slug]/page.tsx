import React from 'react';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
  Layers,
  Code2,
  PlayCircle,
  FolderGit2,
  Share2,
  User,
  ShieldCheck
} from 'lucide-react';
import { CourseService } from '@/lib/services/course.service';
import { getSession } from '@/lib/auth';
import { CurriculumAccordion } from '@/components/courses/CurriculumAccordion';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sessionUser = await getSession();
  const course = await CourseService.getCourseBySlug(slug, sessionUser?.id);

  if (!course) {
    notFound();
  }

  // Find the first lesson to start/resume
  let firstLessonSlug: string | null = null;
  if (course.chapters && course.chapters.length > 0) {
    for (const chap of course.chapters) {
      if (chap.lessons && chap.lessons.length > 0) {
        firstLessonSlug = chap.lessons[0].slug;
        break;
      }
    }
  }

  const startLearningUrl = firstLessonSlug
    ? `/learn/${course.slug}/${firstLessonSlug}`
    : `/courses`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* 1. HERO BANNER */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/20">
              {course.technology}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
              {course.level} Level
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
              {course.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono pt-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{course.totalLessons || 12} Comprehensive Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>~{course.estimatedHours} Hours Estimated</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verified Certificate of Completion</span>
            </div>
          </div>

          {/* Progress bar if logged in & in progress */}
          {course.progressPercentage !== undefined && course.progressPercentage > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-lg space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Your Progress</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {course.progressPercentage}%
                </span>
              </div>
              <ProgressBar progress={course.progressPercentage} size="sm" color="emerald" />
            </div>
          )}

          {/* Start / Resume Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <NextLink
              href={startLearningUrl}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 fill-slate-950" />
              <span>
                {course.progressPercentage && course.progressPercentage > 0
                  ? 'Continue Course'
                  : 'Start Curriculum Free'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </NextLink>

            <NextLink
              href="/coding"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Open Code Sandbox</span>
            </NextLink>
          </div>
        </div>
      </div>

      {/* 2. MAIN CURRICULUM ACCORDION & SIDEBAR INFO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 cols: Curriculum */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Course Curriculum</h2>
            <p className="text-sm text-slate-400">
              Structured progressive modules with interactive coding exercises and quizzes.
            </p>
          </div>

          <CurriculumAccordion
            chapters={course.chapters || []}
            courseSlug={course.slug}
            isLoggedIn={!!sessionUser}
          />
        </div>

        {/* Right 4 cols: Projects & Instructor info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Capstone Project Card */}
          {course.projects && course.projects.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase font-semibold">
                <FolderGit2 className="w-4 h-4" />
                <span>Capstone Workshop</span>
              </div>

              {course.projects.map(proj => (
                <div key={proj.id} className="space-y-3">
                  <h3 className="font-bold text-slate-100 text-base">{proj.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                  <NextLink
                    href={`/projects`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    <span>View Project Specification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              ))}
            </div>
          )}

          {/* Platform Guarantee Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>EduCode Academy Standards</span>
            </div>
            <ul className="space-y-2 list-disc pl-4 text-slate-400">
              <li>100% Free & Open access to all lectures</li>
              <li>Production best practices and anti-patterns</li>
              <li>Official Certificate on full completion</li>
              <li>Offline and cross-device synced progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
