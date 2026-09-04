import { db } from '../db/store';
import type { Course } from '../types';

export class CourseService {
  static async getCourses(filters?: { category?: string; level?: string; search?: string }, userId?: string): Promise<Course[]> {
    try {
      const courses = (await db.getCourses({
        publishedOnly: true,
        category: filters?.category,
        level: filters?.level,
        search: filters?.search,
      })) || [];

      let completedLessonSet = new Set<string>();
      let favoriteCourseSet = new Set<string>();

      if (userId) {
        try {
          const progresses = (await db.getUserProgressList(userId)) || [];
          completedLessonSet = new Set(progresses.filter(p => p.completed).map(p => p.lessonId));
          const favs = (await db.getFavorites(userId)) || [];
          favoriteCourseSet = new Set(favs.map(f => f.courseId));
        } catch (err) {
          console.warn('Could not load user course metadata:', err);
        }
      }

      return await Promise.all(
        courses.map(async c => {
          const chapters = c.chapters || (await db.getChaptersByCourseId(c.id)) || [];
          let totalLessons = 0;
          let completedLessons = 0;

          for (const ch of chapters) {
            const lessons = ch.lessons || [];
            totalLessons += lessons.length;

            if (userId) {
              for (const les of lessons) {
                if (completedLessonSet.has(les.id)) {
                  completedLessons++;
                }
              }
            }
          }

          const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
          const isFavorite = favoriteCourseSet.has(c.id);

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
    } catch (err) {
      console.warn('Error in CourseService.getCourses:', err);
      return [];
    }
  }

  static async getCourseBySlug(slug: string, userId?: string): Promise<Course | null> {
    try {
      const course = await db.getCourseBySlug(slug);
      if (!course) return null;

      const chapters = (await db.getChaptersByCourseId(course.id)) || [];
      let totalLessons = 0;
      let completedLessons = 0;

      let completedLessonSet = new Set<string>();
      let bookmarkLessonSet = new Set<string>();
      let isFavorite = false;

      if (userId) {
        try {
          const progresses = (await db.getUserProgressList(userId)) || [];
          completedLessonSet = new Set(progresses.filter(p => p.completed).map(p => p.lessonId));
          const bms = (await db.getBookmarks(userId)) || [];
          bookmarkLessonSet = new Set(bms.map(b => b.lessonId));
          const favs = (await db.getFavorites(userId)) || [];
          isFavorite = favs.some(f => f.courseId === course.id);
        } catch (err) {
          console.warn('Could not load user course slug metadata:', err);
        }
      }

      const chaptersWithProgress = chapters.map(ch => {
        const lessons = (ch.lessons || []).map(les => {
          const completed = completedLessonSet.has(les.id);
          const isBookmarked = bookmarkLessonSet.has(les.id);
          if (completed) completedLessons++;
          return {
            ...les,
            completed,
            isBookmarked,
          };
        });
        totalLessons += lessons.length;
        return {
          ...ch,
          lessons,
        };
      });

      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        ...course,
        chapters: chaptersWithProgress,
        totalLessons,
        completedLessons,
        progressPercentage,
        isFavorite,
      };
    } catch (err) {
      console.warn('Error in CourseService.getCourseBySlug:', err);
      return null;
    }
  }

  static async getUserEnrolledCourses(userId: string): Promise<Course[]> {
    try {
      const allCourses = await this.getCourses(undefined, userId);
      // Courses where user has progress, fallback to top courses
      const startedCourses = allCourses.filter(c => (c.completedLessons || 0) > 0);
      if (startedCourses.length > 0) {
        return startedCourses;
      }
      // If user hasn't completed lessons yet, show top popular courses so the dashboard is engaging
      return allCourses.slice(0, 3);
    } catch (err) {
      console.warn('Error in CourseService.getUserEnrolledCourses:', err);
      return [];
    }
  }
}
