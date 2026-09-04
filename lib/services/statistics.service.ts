import { db } from '../db/store';
import type { Note, Bookmark, Favorite, UserStats } from '../types';

export class NoteService {
  static async getNote(userId: string, lessonId: string): Promise<Note | null> {
    return await db.getNote(userId, lessonId);
  }

  static async saveNote(userId: string, lessonId: string, content: string): Promise<Note> {
    return await db.saveNote(userId, lessonId, content);
  }
}

export class BookmarkService {
  static async getBookmarks(userId: string): Promise<Bookmark[]> {
    return await db.getBookmarks(userId);
  }

  static async toggleBookmark(userId: string, lessonId: string): Promise<boolean> {
    return await db.toggleBookmark(userId, lessonId);
  }
}

export class FavoriteService {
  static async getFavorites(userId: string): Promise<Favorite[]> {
    return await db.getFavorites(userId);
  }

  static async toggleFavorite(userId: string, courseId: string): Promise<boolean> {
    return await db.toggleFavorite(userId, courseId);
  }
}

export class StatisticsService {
  static async getUserStats(userId: string): Promise<UserStats> {
    const user = await db.getUserById(userId);
    const progresses = await db.getUserProgressList(userId);
    const completedLessons = progresses.filter(p => p.completed).length;

    const quizAttempts = await db.getUserQuizAttempts(userId);
    const totalQuizzesPassed = quizAttempts.filter(q => q.passed).length;

    const allCourses = await db.getCourses({ publishedOnly: true });
    let totalCoursesStarted = 0;
    let totalCoursesCompleted = 0;

    for (const c of allCourses) {
      const chapters = await db.getChaptersByCourseId(c.id);
      let totalLessonsInCourse = 0;
      let completedInCourse = 0;

      for (const ch of chapters) {
        const lessons = ch.lessons || [];
        totalLessonsInCourse += lessons.length;
        for (const les of lessons) {
          if (progresses.some(p => p.lessonId === les.id && p.completed)) {
            completedInCourse++;
          }
        }
      }

      if (completedInCourse > 0) {
        totalCoursesStarted++;
        if (totalLessonsInCourse > 0 && completedInCourse >= totalLessonsInCourse) {
          totalCoursesCompleted++;
        }
      }
    }

    const projects = await db.getAllProjects();
    let totalProjectsCompleted = 0;
    for (const pr of projects) {
      const up = await db.getUserProject(userId, pr.id);
      if (up && up.status === 'COMPLETED') {
        totalProjectsCompleted++;
      }
    }

    // Approx 20 mins per completed lesson
    const estimatedHoursLearned = Math.round((completedLessons * 20) / 60);

    return {
      totalCoursesStarted,
      totalCoursesCompleted,
      totalLessonsCompleted: completedLessons,
      totalQuizzesPassed,
      totalProjectsCompleted,
      learningStreakDays: user?.streakCount || 1,
      estimatedHoursLearned,
      dailyGoalProgressMinutes: Math.min(user?.dailyGoalMinutes || 30, completedLessons * 15),
      dailyGoalTargetMinutes: user?.dailyGoalMinutes || 30,
    };
  }
}

export class AdminService {
  static async getOverviewStats() {
    const users = await db.getUsers();
    const courses = await db.getCourses({ publishedOnly: false });
    const lessons = await db.getAllLessons();
    const quizzes = await db.getAllQuizzes();
    const projects = await db.getAllProjects();
    const activities = await db.getActivities(20);

    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      totalCourses: courses.length,
      totalLessons: lessons.length,
      totalQuizzes: quizzes.length,
      totalProjects: projects.length,
      recentActivities: activities,
    };
  }

  static async getUsers() {
    const users = await db.getUsers();
    return users.map(u => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      role: u.role,
      isActive: u.isActive,
      streakCount: u.streakCount,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
    }));
  }

  static async toggleUserStatus(userId: string) {
    const user = await db.getUserById(userId);
    if (!user) throw new Error('User not found');
    return await db.updateUser(userId, { isActive: !user.isActive });
  }

  static async changeUserRole(userId: string, role: 'USER' | 'ADMIN') {
    return await db.updateUser(userId, { role });
  }
}
