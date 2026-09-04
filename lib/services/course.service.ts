import { db } from '../db/store';
import type { Course } from '../types';

export class CourseService {
  static async getCourses(filters?: { category?: string; level?: string; search?: string }, userId?: string): Promise<Course[]> {
    const courses = await db.getCourses({
      publishedOnly: true,
      category: filters?.category,
      level: filters?.level,
      search: filters?.search,
    });

    return Promise.all(
      courses.map(async c => {
        const chapters = await db.getChaptersByCourseId(c.id);
        let totalLessons = 0;
        let completedLessons = 0;

        for (const ch of chapters) {
          const lessons = ch.lessons || [];
          totalLessons += lessons.length;

          if (userId) {
            for (const les of lessons) {
              const prog = await db.getLessonProgress(userId, les.id);
              if (prog?.completed) {
                completedLessons++;
              }
            }
          }
        }

        const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        let isFavorite = false;
        if (userId) {
          const favs = await db.getFavorites(userId);
          isFavorite = favs.some(f => f.courseId === c.id);
        }

        return {
          ...c,
          chapters,
          totalLessons,
          completedLessons,
          progressPercentage,
          isFavorite,
        };
      })
    );
  }

  static async getCourseBySlug(slug: string, userId?: string): Promise<Course | null> {
    const course = await db.getCourseBySlug(slug);
    if (!course) return null;

    const chapters = await db.getChaptersByCourseId(course.id);
    let totalLessons = 0;
    let completedLessons = 0;

    const chaptersWithProgress = await Promise.all(
      chapters.map(async ch => {
        const lessons = (ch.lessons || []).map(async les => {
          let completed = false;
          let isBookmarked = false;
          if (userId) {
            const prog = await db.getLessonProgress(userId, les.id);
            completed = !!prog?.completed;
            const bms = await db.getBookmarks(userId);
            isBookmarked = bms.some(b => b.lessonId === les.id);
          }
          if (completed) completedLessons++;
          return {
            ...les,
            completed,
            isBookmarked,
          };
        });
        const resolvedLessons = await Promise.all(lessons);
        totalLessons += resolvedLessons.length;
        return {
          ...ch,
          lessons: resolvedLessons,
        };
      })
    );

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    let isFavorite = false;
    if (userId) {
      const favs = await db.getFavorites(userId);
      isFavorite = favs.some(f => f.courseId === course.id);
    }

    return {
      ...course,
      chapters: chaptersWithProgress,
      totalLessons,
      completedLessons,
      progressPercentage,
      isFavorite,
    };
  }

  static async getUserEnrolledCourses(userId: string): Promise<Course[]> {
    const allCourses = await this.getCourses(undefined, userId);
    // Courses where user has progress or favorite, fallback to top courses
    const startedCourses = allCourses.filter(c => (c.completedLessons || 0) > 0);
    if (startedCourses.length > 0) {
      return startedCourses;
    }
    // If user hasn't completed lessons yet, show top popular courses so the dashboard is engaging
    return allCourses.slice(0, 3);
  }
}
