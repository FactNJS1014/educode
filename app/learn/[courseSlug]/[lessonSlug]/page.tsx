import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { CourseService } from '@/lib/services/course.service';
import { LessonService } from '@/lib/services/lesson.service';
import { LessonSidebar } from '@/components/lessons/LessonSidebar';
import { LessonViewer } from '@/components/lessons/LessonViewer';

export default async function LearnLessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const sessionUser = await getSession();

  if (!sessionUser) {
    redirect(`/login?redirect=/learn/${courseSlug}/${lessonSlug}`);
  }

  const course = await CourseService.getCourseBySlug(courseSlug, sessionUser.id);
  if (!course) {
    notFound();
  }

  const lesson = await LessonService.getLessonBySlug(lessonSlug, sessionUser.id);
  if (!lesson) {
    notFound();
  }

  // Count total completed lessons
  let totalLessons = 0;
  let completedLessons = 0;

  course.chapters?.forEach(ch => {
    (ch.lessons || []).forEach(l => {
      totalLessons++;
      if (l.completed) completedLessons++;
    });
  });

  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      {/* Curriculum Sidebar */}
      <LessonSidebar
        courseTitle={course.title}
        courseSlug={course.slug}
        chapters={course.chapters || []}
        currentLessonSlug={lesson.slug}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
        progressPercentage={progressPercentage}
      />

      {/* Main Lesson Content & Tabs */}
      <main className="flex-1 bg-slate-950 overflow-y-auto">
        <LessonViewer
          lesson={lesson}
          courseTitle={course.title}
          courseSlug={course.slug}
          chapters={course.chapters || []}
          userName={sessionUser.name}
          isLoggedIn={true}
        />
      </main>
    </div>
  );
}
