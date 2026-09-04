import React from 'react';
import NextLink from 'next/link';
import { redirect } from 'next/navigation';
import { Bookmark, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db/store';
import { CourseService } from '@/lib/services/course.service';
import { CourseCard } from '@/components/courses/CourseCard';

export default async function BookmarksPage() {
  const sessionUser = await getSession();
  if (!sessionUser) {
    redirect('/login?redirect=/bookmarks');
  }

  // Get bookmarked lessons
  const bookmarks = await db.getBookmarks(sessionUser.id);
  const bookmarkedLessons = [];

  for (const b of bookmarks) {
    const l = await db.getLessonById(b.lessonId);
    if (l) {
      bookmarkedLessons.push({
        ...l,
        courseSlug: l.courseSlug || 'courses',
        courseTitle: l.courseTitle || 'Curriculum',
      });
    }
  }

  // Get favorited courses
  const allCourses = await CourseService.getCourses(undefined, sessionUser.id);
  const favoriteCourses = allCourses.filter(c => c.isFavorite);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
          Saved Bookmarks & Favorites
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Quickly access reference lessons and prioritized courses.
        </p>
      </div>

      {/* Bookmarked Lessons */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-slate-100">
            Bookmarked Lessons ({bookmarkedLessons.length})
          </h2>
        </div>

        {bookmarkedLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedLessons.map(les => (
              <div
                key={les.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase">
                    {les.courseTitle}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 mt-1">{les.title}</h3>
                  {les.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{les.description}</p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-500">{les.duration} min read</span>
                  <NextLink
                    href={`/learn/${les.courseSlug}/${les.slug}`}
                    className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-sm">
            No bookmarked lessons yet. Click the bookmark icon on any lesson to save it for quick reference!
          </div>
        )}
      </section>

      {/* Favorite Courses */}
      <section className="space-y-6 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <h2 className="text-xl font-bold text-slate-100">
            Favorited Curriculums ({favoriteCourses.length})
          </h2>
        </div>

        {favoriteCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCourses.map(c => (
              <CourseCard key={c.id} course={c} isLoggedIn={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-sm">
            No favorited courses yet. Click the heart icon on any course card to add it here.
          </div>
        )}
      </section>
    </div>
  );
}
