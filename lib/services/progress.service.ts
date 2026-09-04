import { db } from '../db/store';
import type { LessonProgress } from '../types';

export class ProgressService {
  static async toggleLessonComplete(userId: string, lessonId: string, completed: boolean): Promise<LessonProgress> {
    const progress = await db.markLessonProgress(userId, lessonId, completed);
    return progress;
  }

  static async getUserProgressSummary(userId: string) {
    const user = await db.getUserById(userId);
    const progresses = await db.getUserProgressList(userId);
    const completedProgresses = progresses.filter(p => p.completed);

    const allCourses = await db.getCourses({ publishedOnly: true });
    const startedCourses = [];
    const completedCourses = [];

    for (const c of allCourses) {
      const chapters = await db.getChaptersByCourseId(c.id);
      let totalCourseLessons = 0;
      let completedCourseLessons = 0;

      for (const ch of chapters) {
        const lessons = ch.lessons || [];
        totalCourseLessons += lessons.length;
        for (const les of lessons) {
          if (completedProgresses.some(p => p.lessonId === les.id)) {
            completedCourseLessons++;
          }
        }
      }

      if (completedCourseLessons > 0) {
        const progressPercentage = totalCourseLessons > 0 ? Math.round((completedCourseLessons / totalCourseLessons) * 100) : 0;
        const enriched = {
          ...c,
          totalLessons: totalCourseLessons,
          completedLessons: completedCourseLessons,
          progressPercentage,
        };

        if (progressPercentage === 100) {
          completedCourses.push(enriched);
        } else {
          startedCourses.push(enriched);
        }
      }
    }

    return {
      streakCount: user?.streakCount || 1,
      totalCompletedLessons: completedProgresses.length,
      startedCourses,
      completedCourses,
    };
  }
}
