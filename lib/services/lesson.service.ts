import { db } from '../db/store';
import type { Lesson } from '../types';

export class LessonService {
  static async getLessonBySlug(slug: string, userId?: string): Promise<Lesson | null> {
    const lesson = await db.getLessonBySlug(slug);
    if (!lesson) return null;

    let completed = false;
    let isBookmarked = false;
    let userNote: string | null = null;

    if (userId) {
      const progress = await db.getLessonProgress(userId, lesson.id);
      completed = !!progress?.completed;

      const bookmarks = await db.getBookmarks(userId);
      isBookmarked = bookmarks.some(b => b.lessonId === lesson.id);

      const note = await db.getNote(userId, lesson.id);
      userNote = note?.content || null;

      // Update last accessed
      await db.markLessonProgress(userId, lesson.id, completed);
    }

    // Attach quizzes with best attempt
    const quizzes = (lesson.quizzes || []).map(q => {
      // Don't send isCorrect to client for ongoing quizzes
      const sanitizedQuestions = (q.questions || []).map(qu => ({
        ...qu,
        options: qu.options.map(opt => ({
          id: opt.id,
          questionId: opt.questionId,
          text: opt.text,
          // hide isCorrect unless submitted
        })),
      }));

      return {
        ...q,
        questions: sanitizedQuestions,
      };
    });

    return {
      ...lesson,
      completed,
      isBookmarked,
      userNote,
      quizzes,
    };
  }

  static async getCourseNavigation(currentLessonId: string) {
    const allLessons = await db.getAllLessons();
    const sorted = allLessons.sort((a, b) => a.order - b.order);
    const currentIndex = sorted.findIndex(l => l.id === currentLessonId);

    const prevLesson = currentIndex > 0 ? sorted[currentIndex - 1] : null;
    const nextLesson = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

    return { prevLesson, nextLesson };
  }
}
