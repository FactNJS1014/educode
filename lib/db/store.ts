import {
  SEED_USERS,
  SEED_ACHIEVEMENTS,
  SEED_COURSES_DATA,
} from './seed-data';
import { getReadyNeonSql } from './neon';
import type {
  User,
  Role,
  Course,
  Chapter,
  Lesson,
  LessonProgress,
  Quiz,
  QuizAttempt,
  Project,
  UserProject,
  Bookmark,
  Favorite,
  Note,
  Achievement,
  UserAchievement,
  LearningActivity,
} from '../types';

// Global in-memory storage holding deep reactive relational models
class DataStore {
  private users: Map<string, User> = new Map();
  private courses: Map<string, Course> = new Map();
  private chapters: Map<string, Chapter> = new Map();
  private lessons: Map<string, Lesson> = new Map();
  private quizzes: Map<string, Quiz> = new Map();
  private projects: Map<string, Project> = new Map();
  private lessonProgresses: Map<string, LessonProgress> = new Map();
  private quizAttempts: Map<string, QuizAttempt> = new Map();
  private userProjects: Map<string, UserProject> = new Map();
  private bookmarks: Map<string, Bookmark> = new Map();
  private favorites: Map<string, Favorite> = new Map();
  private notes: Map<string, Note> = new Map();
  private achievements: Map<string, Achievement> = new Map();
  private userAchievements: Map<string, UserAchievement> = new Map();
  private activities: LearningActivity[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  public init() {
    if (this.initialized) return;

    // Seed Users
    for (const u of SEED_USERS) {
      this.users.set(u.id, { ...u });
    }

    // Seed Achievements
    for (const a of SEED_ACHIEVEMENTS) {
      this.achievements.set(a.id, { ...a });
    }

    // Seed Courses, Chapters, Lessons, Quizzes, Projects
    for (const item of SEED_COURSES_DATA) {
      this.courses.set(item.course.id, { ...item.course });

      for (const ch of item.chapters) {
        this.chapters.set(ch.id, {
          id: ch.id,
          courseId: ch.courseId,
          title: ch.title,
          description: ch.description,
          order: ch.order,
          level: ch.level,
        });

        for (const les of ch.lessons) {
          this.lessons.set(les.id, {
            id: les.id,
            chapterId: les.chapterId,
            slug: les.slug,
            title: les.title,
            description: les.description,
            content: les.content,
            videoUrl: les.videoUrl,
            order: les.order,
            duration: les.duration,
            published: les.published,
            createdAt: les.createdAt,
            updatedAt: les.updatedAt,
          });

          if (les.quiz) {
            this.quizzes.set(les.quiz.id, { ...les.quiz });
          }
        }
      }

      for (const pr of item.projects) {
        this.projects.set(pr.id, { ...pr });
      }
    }

    // Give demo student some sample progress
    const studentId = 'user-student-1';
    const firstLesson = Array.from(this.lessons.values())[0];
    if (firstLesson) {
      const progressId = `${studentId}_${firstLesson.id}`;
      this.lessonProgresses.set(progressId, {
        id: progressId,
        userId: studentId,
        lessonId: firstLesson.id,
        completed: true,
        completedAt: new Date(Date.now() - 3600000).toISOString(),
        lastAccessedAt: new Date().toISOString(),
      });

      this.notes.set(`${studentId}_${firstLesson.id}`, {
        id: `note-1`,
        userId: studentId,
        lessonId: firstLesson.id,
        content: 'Remember: Always isolate environments using `python -m venv .venv` before installing libraries!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      this.bookmarks.set(`${studentId}_${firstLesson.id}`, {
        id: `bm-1`,
        userId: studentId,
        lessonId: firstLesson.id,
        createdAt: new Date().toISOString(),
      });
    }

    this.initialized = true;
  }

  // --- Users ---
  public async getUsers(): Promise<User[]> {
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, email, username, name, password as "passwordHash", role, is_active as "isActive", streak_count as "streakCount", avatar_url as "avatarUrl", last_active_at as "lastActiveDate", created_at as "createdAt", updated_at as "updatedAt"
          FROM users ORDER BY created_at DESC
        `;
        if (rows && rows.length > 0) {
          const list: User[] = rows.map((r: any) => ({
            id: r.id,
            email: r.email,
            username: r.username,
            name: r.name,
            passwordHash: r.passwordHash,
            role: (r.role as Role) || 'USER',
            isActive: r.isActive ?? true,
            streakCount: r.streakCount || 1,
            avatarUrl: r.avatarUrl || null,
            lastActiveDate: r.lastActiveDate ? new Date(r.lastActiveDate).toISOString() : null,
            dailyGoalMinutes: 30,
            createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
          }));
          for (const u of list) this.users.set(u.id, u);
          return list;
        }
      } catch (err) {
        console.warn('Neon query error for getUsers, falling back to memory:', err);
      }
    }
    return Array.from(this.users.values());
  }

  public async getUserById(id: string): Promise<User | null> {
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, email, username, name, password as "passwordHash", role, is_active as "isActive", streak_count as "streakCount", avatar_url as "avatarUrl", last_active_at as "lastActiveDate", created_at as "createdAt", updated_at as "updatedAt"
          FROM users WHERE id = ${id} LIMIT 1
        `;
        if (rows && rows.length > 0) {
          const row = rows[0];
          const u: User = {
            id: row.id,
            email: row.email,
            username: row.username,
            name: row.name,
            passwordHash: row.passwordHash,
            role: (row.role as Role) || 'USER',
            isActive: row.isActive ?? true,
            streakCount: row.streakCount || 1,
            avatarUrl: row.avatarUrl || null,
            lastActiveDate: row.lastActiveDate ? new Date(row.lastActiveDate).toISOString() : null,
            dailyGoalMinutes: 30,
            createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
          };
          this.users.set(u.id, u);
          return { ...u };
        }
      } catch (err) {
        console.warn('Neon query error for getUserById, falling back to memory:', err);
      }
    }

    const user = this.users.get(id);
    return user ? { ...user } : null;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const cleanEmail = email.trim().toLowerCase();
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, email, username, name, password as "passwordHash", role, is_active as "isActive", streak_count as "streakCount", avatar_url as "avatarUrl", last_active_at as "lastActiveDate", created_at as "createdAt", updated_at as "updatedAt"
          FROM users WHERE LOWER(email) = ${cleanEmail} LIMIT 1
        `;
        if (rows && rows.length > 0) {
          const row = rows[0];
          const u: User = {
            id: row.id,
            email: row.email,
            username: row.username,
            name: row.name,
            passwordHash: row.passwordHash,
            role: (row.role as Role) || 'USER',
            isActive: row.isActive ?? true,
            streakCount: row.streakCount || 1,
            avatarUrl: row.avatarUrl || null,
            lastActiveDate: row.lastActiveDate ? new Date(row.lastActiveDate).toISOString() : null,
            dailyGoalMinutes: 30,
            createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
          };
          this.users.set(u.id, u);
          return { ...u };
        }
      } catch (err) {
        console.warn('Neon query error for getUserByEmail, falling back to memory:', err);
      }
    }

    for (const u of this.users.values()) {
      if (u.email.toLowerCase() === cleanEmail) {
        return { ...u };
      }
    }
    return null;
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const cleanUsername = username.trim().toLowerCase();
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, email, username, name, password as "passwordHash", role, is_active as "isActive", streak_count as "streakCount", avatar_url as "avatarUrl", last_active_at as "lastActiveDate", created_at as "createdAt", updated_at as "updatedAt"
          FROM users WHERE LOWER(username) = ${cleanUsername} LIMIT 1
        `;
        if (rows && rows.length > 0) {
          const row = rows[0];
          const u: User = {
            id: row.id,
            email: row.email,
            username: row.username,
            name: row.name,
            passwordHash: row.passwordHash,
            role: (row.role as Role) || 'USER',
            isActive: row.isActive ?? true,
            streakCount: row.streakCount || 1,
            avatarUrl: row.avatarUrl || null,
            lastActiveDate: row.lastActiveDate ? new Date(row.lastActiveDate).toISOString() : null,
            dailyGoalMinutes: 30,
            createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
          };
          this.users.set(u.id, u);
          return { ...u };
        }
      } catch (err) {
        console.warn('Neon query error for getUserByUsername, falling back to memory:', err);
      }
    }

    for (const u of this.users.values()) {
      if (u.username.toLowerCase() === cleanUsername) {
        return { ...u };
      }
    }
    return null;
  }

  public async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'streakCount' | 'dailyGoalMinutes'>): Promise<User> {
    const id = `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newUser: User = {
      ...userData,
      id,
      streakCount: 1,
      lastActiveDate: now,
      dailyGoalMinutes: 30,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, newUser);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO users (id, email, username, name, password, role, is_active, streak_count, avatar_url, created_at, updated_at)
          VALUES (
            ${newUser.id},
            ${newUser.email},
            ${newUser.username},
            ${newUser.name},
            ${newUser.passwordHash || ''},
            ${newUser.role},
            ${newUser.isActive},
            ${newUser.streakCount},
            ${newUser.avatarUrl || null},
            ${newUser.createdAt},
            ${newUser.updatedAt}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      } catch (err) {
        console.warn('Failed to insert user into Neon DB:', err);
      }
    }

    return { ...newUser };
  }

  public async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
    const existing = this.users.get(id);
    const updated = { ...(existing || ({} as User)), ...updateData, updatedAt: new Date().toISOString() };
    this.users.set(id, updated);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        if (updateData.role) {
          await sql`UPDATE users SET role = ${updateData.role}, updated_at = NOW() WHERE id = ${id}`;
        }
        if (updateData.isActive !== undefined) {
          await sql`UPDATE users SET is_active = ${updateData.isActive}, updated_at = NOW() WHERE id = ${id}`;
        }
        if (updateData.name) {
          await sql`UPDATE users SET name = ${updateData.name}, updated_at = NOW() WHERE id = ${id}`;
        }
        if (updateData.passwordHash) {
          await sql`UPDATE users SET password = ${updateData.passwordHash}, updated_at = NOW() WHERE id = ${id}`;
        }
        if (updateData.lastLoginAt) {
          await sql`UPDATE users SET last_active_at = NOW(), updated_at = NOW() WHERE id = ${id}`;
        }
      } catch (err) {
        console.warn('Failed to update user in Neon DB:', err);
      }
    }

    return { ...updated };
  }

  public async updateStreak(userId: string): Promise<number> {
    const user = this.users.get(userId);
    if (!user) return 1;

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const lastActive = user.lastActiveDate ? user.lastActiveDate.slice(0, 10) : null;

    let newStreak = user.streakCount || 1;

    if (!lastActive) {
      newStreak = 1;
    } else if (lastActive === todayStr) {
      // Already active today
      newStreak = user.streakCount || 1;
    } else {
      const yesterday = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);
      if (lastActive === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1; // reset streak if missed a day
      }
    }

    user.streakCount = newStreak;
    user.lastActiveDate = now.toISOString();
    this.users.set(userId, user);
    return newStreak;
  }

  // --- Courses ---
  public async getCourses(options?: { publishedOnly?: boolean; search?: string; category?: string; level?: string }): Promise<Course[]> {
    let result = Array.from(this.courses.values());

    if (options?.publishedOnly !== false) {
      result = result.filter(c => c.published);
    }

    if (options?.category && options.category !== 'ALL') {
      result = result.filter(c => c.category.toLowerCase() === options.category?.toLowerCase());
    }

    if (options?.level && options.level !== 'ALL') {
      result = result.filter(c => c.level === options.level);
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.technology.toLowerCase().includes(q)
      );
    }

    return result.map(c => ({ ...c }));
  }

  public async getCourseBySlug(slug: string): Promise<Course | null> {
    for (const c of this.courses.values()) {
      if (c.slug === slug) {
        const chapters = await this.getChaptersByCourseId(c.id);
        const projects = await this.getProjectsByCourseId(c.id);
        return {
          ...c,
          chapters,
          projects,
        };
      }
    }
    return null;
  }

  public async getCourseById(id: string): Promise<Course | null> {
    const c = this.courses.get(id);
    if (!c) return null;
    const chapters = await this.getChaptersByCourseId(c.id);
    const projects = await this.getProjectsByCourseId(c.id);
    return { ...c, chapters, projects };
  }

  public async createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const id = `course-${Date.now()}`;
    const now = new Date().toISOString();
    const newCourse: Course = { ...course, id, createdAt: now, updatedAt: now };
    this.courses.set(id, newCourse);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO courses (id, title, slug, description, technology, category, thumbnail, level, estimated_hours, published, created_at, updated_at)
          VALUES (
            ${newCourse.id},
            ${newCourse.title},
            ${newCourse.slug},
            ${newCourse.description || ''},
            ${newCourse.technology},
            ${newCourse.category || 'Programming Languages'},
            ${newCourse.thumbnail || null},
            ${newCourse.level},
            ${newCourse.estimatedHours || 10},
            ${newCourse.published ?? true},
            ${newCourse.createdAt},
            ${newCourse.updatedAt}
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            description = EXCLUDED.description,
            technology = EXCLUDED.technology,
            category = EXCLUDED.category,
            thumbnail = EXCLUDED.thumbnail,
            level = EXCLUDED.level,
            estimated_hours = EXCLUDED.estimated_hours,
            published = EXCLUDED.published,
            updated_at = NOW();
        `;
      } catch (err) {
        console.warn('Neon createCourse error:', err);
      }
    }

    return { ...newCourse };
  }

  public async updateCourse(id: string, data: Partial<Course>): Promise<Course | null> {
    const existing = this.courses.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
    this.courses.set(id, updated);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        if (data.title) await sql`UPDATE courses SET title = ${data.title}, updated_at = NOW() WHERE id = ${id}`;
        if (data.description !== undefined) await sql`UPDATE courses SET description = ${data.description}, updated_at = NOW() WHERE id = ${id}`;
        if (data.technology) await sql`UPDATE courses SET technology = ${data.technology}, updated_at = NOW() WHERE id = ${id}`;
        if (data.category) await sql`UPDATE courses SET category = ${data.category}, updated_at = NOW() WHERE id = ${id}`;
        if (data.level) await sql`UPDATE courses SET level = ${data.level}, updated_at = NOW() WHERE id = ${id}`;
        if (data.thumbnail !== undefined) await sql`UPDATE courses SET thumbnail = ${data.thumbnail}, updated_at = NOW() WHERE id = ${id}`;
        if (data.published !== undefined) await sql`UPDATE courses SET published = ${data.published}, updated_at = NOW() WHERE id = ${id}`;
      } catch (err) {
        console.warn('Neon updateCourse error:', err);
      }
    }

    return { ...updated };
  }

  public async deleteCourse(id: string): Promise<boolean> {
    const deleted = this.courses.delete(id);
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`DELETE FROM courses WHERE id = ${id}`;
      } catch (err) {
        console.warn('Neon deleteCourse error:', err);
      }
    }
    return deleted;
  }

  // --- Chapters & Lessons ---
  public async getChaptersByCourseId(courseId: string): Promise<Chapter[]> {
    const chapters = Array.from(this.chapters.values())
      .filter(ch => ch.courseId === courseId)
      .sort((a, b) => a.order - b.order);

    return Promise.all(
      chapters.map(async ch => {
        const lessons = await this.getLessonsByChapterId(ch.id);
        return { ...ch, lessons };
      })
    );
  }

  public async createChapter(chapter: Omit<Chapter, 'id'>): Promise<Chapter> {
    const id = `chap-${Date.now()}`;
    const newChap: Chapter = { ...chapter, id };
    this.chapters.set(id, newChap);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO chapters (id, course_id, title, description, level, order_index)
          VALUES (${id}, ${chapter.courseId}, ${chapter.title}, ${chapter.description || null}, ${chapter.level || 'BASIC'}, ${chapter.order || 0})
          ON CONFLICT (id) DO NOTHING;
        `;
      } catch (err) {
        console.warn('Neon createChapter error:', err);
      }
    }

    return { ...newChap };
  }

  public async getLessonsByChapterId(chapterId: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(l => l.chapterId === chapterId)
      .sort((a, b) => a.order - b.order)
      .map(l => ({ ...l }));
  }

  public async getLessonBySlug(slug: string): Promise<Lesson | null> {
    for (const l of this.lessons.values()) {
      if (l.slug === slug) {
        const chapter = this.chapters.get(l.chapterId);
        const course = chapter ? this.courses.get(chapter.courseId) : undefined;
        const quizzes = Array.from(this.quizzes.values()).filter(q => q.lessonId === l.id);

        return {
          ...l,
          chapter: chapter ? { ...chapter } : undefined,
          courseSlug: course?.slug,
          courseTitle: course?.title,
          quizzes,
        };
      }
    }
    return null;
  }

  public async getLessonById(id: string): Promise<Lesson | null> {
    const l = this.lessons.get(id);
    if (!l) return null;
    const chapter = this.chapters.get(l.chapterId);
    const course = chapter ? this.courses.get(chapter.courseId) : undefined;
    const quizzes = Array.from(this.quizzes.values()).filter(q => q.lessonId === l.id);

    return {
      ...l,
      chapter: chapter ? { ...chapter } : undefined,
      courseSlug: course?.slug,
      courseTitle: course?.title,
      quizzes,
    };
  }

  public async createLesson(lesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lesson> {
    const id = `les-${Date.now()}`;
    const now = new Date().toISOString();
    const newLesson: Lesson = { ...lesson, id, createdAt: now, updatedAt: now };
    this.lessons.set(id, newLesson);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO lessons (id, chapter_id, title, slug, duration, description, content, video_url, order_index, published, created_at, updated_at)
          VALUES (
            ${newLesson.id},
            ${newLesson.chapterId},
            ${newLesson.title},
            ${newLesson.slug},
            ${newLesson.duration || 15},
            ${newLesson.description || null},
            ${newLesson.content},
            ${newLesson.videoUrl || null},
            ${newLesson.order || 0},
            ${newLesson.published ?? true},
            ${newLesson.createdAt},
            ${newLesson.updatedAt}
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            content = EXCLUDED.content,
            updated_at = NOW();
        `;
      } catch (err) {
        console.warn('Neon createLesson error:', err);
      }
    }

    return { ...newLesson };
  }

  public async updateLesson(id: string, data: Partial<Lesson>): Promise<Lesson | null> {
    const existing = this.lessons.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
    this.lessons.set(id, updated);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        if (data.title) await sql`UPDATE lessons SET title = ${data.title}, updated_at = NOW() WHERE id = ${id}`;
        if (data.content !== undefined) await sql`UPDATE lessons SET content = ${data.content}, updated_at = NOW() WHERE id = ${id}`;
        if (data.description !== undefined) await sql`UPDATE lessons SET description = ${data.description}, updated_at = NOW() WHERE id = ${id}`;
        if (data.videoUrl !== undefined) await sql`UPDATE lessons SET video_url = ${data.videoUrl}, updated_at = NOW() WHERE id = ${id}`;
        if (data.duration !== undefined) await sql`UPDATE lessons SET duration = ${data.duration}, updated_at = NOW() WHERE id = ${id}`;
        if (data.published !== undefined) await sql`UPDATE lessons SET published = ${data.published}, updated_at = NOW() WHERE id = ${id}`;
      } catch (err) {
        console.warn('Neon updateLesson error:', err);
      }
    }

    return { ...updated };
  }

  public async deleteLesson(id: string): Promise<boolean> {
    const deleted = this.lessons.delete(id);
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`DELETE FROM lessons WHERE id = ${id}`;
      } catch (err) {
        console.warn('Neon deleteLesson error:', err);
      }
    }
    return deleted;
  }

  // --- Lesson Progress ---
  public async getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
    const key = `${userId}_${lessonId}`;
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, user_id as "userId", lesson_id as "lessonId", is_completed as "completed", completed_at as "completedAt", updated_at as "lastAccessedAt"
          FROM lesson_progress
          WHERE user_id = ${userId} AND lesson_id = ${lessonId}
          LIMIT 1
        `;
        if (rows && rows.length > 0) {
          const r = rows[0];
          const lp: LessonProgress = {
            id: r.id,
            userId: r.userId,
            lessonId: r.lessonId,
            completed: !!r.completed,
            completedAt: r.completedAt ? new Date(r.completedAt).toISOString() : null,
            lastAccessedAt: r.lastAccessedAt ? new Date(r.lastAccessedAt).toISOString() : new Date().toISOString(),
          };
          this.lessonProgresses.set(key, lp);
          return { ...lp };
        }
      } catch (err) {
        console.warn('Neon getLessonProgress error:', err);
      }
    }
    const progress = this.lessonProgresses.get(key);
    return progress ? { ...progress } : null;
  }

  public async markLessonProgress(userId: string, lessonId: string, completed: boolean): Promise<LessonProgress> {
    const key = `${userId}_${lessonId}`;
    const now = new Date().toISOString();
    const existing = this.lessonProgresses.get(key);

    const progress: LessonProgress = {
      id: existing ? existing.id : `lp-${Date.now()}`,
      userId,
      lessonId,
      completed,
      completedAt: completed ? now : null,
      lastAccessedAt: now,
    };

    this.lessonProgresses.set(key, progress);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO lesson_progress (id, user_id, lesson_id, is_completed, completed_at, updated_at)
          VALUES (
            ${progress.id},
            ${userId},
            ${lessonId},
            ${completed},
            ${progress.completedAt ? new Date(progress.completedAt) : null},
            NOW()
          )
          ON CONFLICT (user_id, lesson_id) DO UPDATE SET
            is_completed = EXCLUDED.is_completed,
            completed_at = EXCLUDED.completed_at,
            updated_at = NOW();
        `;
      } catch (err) {
        console.warn('Neon markLessonProgress error:', err);
      }
    }

    await this.updateStreak(userId);
    await this.logActivity(userId, 'LESSON_COMPLETE', JSON.stringify({ lessonId, completed }));

    return { ...progress };
  }

  public async getUserProgressList(userId: string): Promise<LessonProgress[]> {
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, user_id as "userId", lesson_id as "lessonId", is_completed as "completed", completed_at as "completedAt", updated_at as "lastAccessedAt"
          FROM lesson_progress
          WHERE user_id = ${userId}
        `;
        if (rows && rows.length > 0) {
          const list: LessonProgress[] = rows.map((r: any) => ({
            id: r.id,
            userId: r.userId,
            lessonId: r.lessonId,
            completed: !!r.completed,
            completedAt: r.completedAt ? new Date(r.completedAt).toISOString() : null,
            lastAccessedAt: r.lastAccessedAt ? new Date(r.lastAccessedAt).toISOString() : new Date().toISOString(),
          }));
          for (const lp of list) {
            this.lessonProgresses.set(`${userId}_${lp.lessonId}`, lp);
          }
          return list;
        }
      } catch (err) {
        console.warn('Neon getUserProgressList error:', err);
      }
    }

    return Array.from(this.lessonProgresses.values())
      .filter(p => p.userId === userId)
      .map(p => ({ ...p }));
  }

  // --- Quizzes ---
  public async getQuizById(id: string): Promise<Quiz | null> {
    const q = this.quizzes.get(id);
    return q ? { ...q } : null;
  }

  public async getAllQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values()).map(q => ({ ...q }));
  }

  public async recordQuizAttempt(attempt: Omit<QuizAttempt, 'id'>): Promise<QuizAttempt> {
    const id = `qa-${Date.now()}`;
    const newAttempt: QuizAttempt = { ...attempt, id };
    this.quizAttempts.set(id, newAttempt);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO quiz_attempts (id, user_id, quiz_id, score, max_score, passed, completed_at)
          VALUES (
            ${id},
            ${attempt.userId},
            ${attempt.quizId},
            ${attempt.score},
            ${attempt.totalScore},
            ${attempt.passed},
            NOW()
          );
        `;
      } catch (err) {
        console.warn('Neon recordQuizAttempt error:', err);
      }
    }

    await this.updateStreak(attempt.userId);
    await this.logActivity(
      attempt.userId,
      'QUIZ_COMPLETE',
      JSON.stringify({ quizId: attempt.quizId, percentage: attempt.percentage, passed: attempt.passed })
    );

    return { ...newAttempt };
  }

  public async getUserQuizAttempts(userId: string, quizId?: string): Promise<QuizAttempt[]> {
    let attempts = Array.from(this.quizAttempts.values()).filter(a => a.userId === userId);
    if (quizId) {
      attempts = attempts.filter(a => a.quizId === quizId);
    }
    return attempts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }

  // --- Projects ---
  public async getProjectsByCourseId(courseId: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(p => p.courseId === courseId)
      .map(p => ({ ...p }));
  }

  public async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).map(p => {
      const course = this.courses.get(p.courseId);
      return {
        ...p,
        courseSlug: course?.slug,
        courseTitle: course?.title,
      };
    });
  }

  public async getProjectById(id: string): Promise<Project | null> {
    const pr = this.projects.get(id);
    if (!pr) return null;
    const course = this.courses.get(pr.courseId);
    return {
      ...pr,
      courseSlug: course?.slug,
      courseTitle: course?.title,
    };
  }

  public async getUserProject(userId: string, projectId: string): Promise<UserProject | null> {
    const key = `${userId}_${projectId}`;
    const up = this.userProjects.get(key);
    return up ? { ...up } : null;
  }

  public async updateUserProjectStep(userId: string, projectId: string, stepId: string, completed: boolean): Promise<UserProject> {
    const key = `${userId}_${projectId}`;
    let up = this.userProjects.get(key);
    const now = new Date().toISOString();
    const project = this.projects.get(projectId);
    const totalSteps = project?.steps?.length || 1;

    let completedSteps = up ? [...up.completedSteps] : [];
    if (completed && !completedSteps.includes(stepId)) {
      completedSteps.push(stepId);
    } else if (!completed) {
      completedSteps = completedSteps.filter(s => s !== stepId);
    }

    const progress = Math.min(100, Math.round((completedSteps.length / totalSteps) * 100));
    const isCompleted = progress === 100;

    up = {
      id: up ? up.id : `up-${Date.now()}`,
      userId,
      projectId,
      status: isCompleted ? 'COMPLETED' : completedSteps.length > 0 ? 'IN_PROGRESS' : 'NOT_STARTED',
      progress,
      completedSteps,
      startedAt: up ? up.startedAt : now,
      completedAt: isCompleted ? now : null,
    };

    this.userProjects.set(key, up);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO user_projects (id, user_id, project_id, step_index, is_completed, submitted_code, completed_at, updated_at)
          VALUES (
            ${up.id},
            ${userId},
            ${projectId},
            ${completedSteps.length},
            ${isCompleted},
            ${JSON.stringify(completedSteps)},
            ${isCompleted ? new Date() : null},
            NOW()
          )
          ON CONFLICT (user_id, project_id, step_index) DO UPDATE SET
            is_completed = EXCLUDED.is_completed,
            submitted_code = EXCLUDED.submitted_code,
            updated_at = NOW();
        `;
      } catch (err) {
        console.warn('Neon updateUserProjectStep error:', err);
      }
    }

    await this.updateStreak(userId);
    await this.logActivity(userId, 'PROJECT_STEP', JSON.stringify({ projectId, stepId, progress }));

    return { ...up };
  }

  // --- Bookmarks, Favorites, Notes ---
  public async getBookmarks(userId: string): Promise<Bookmark[]> {
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, user_id as "userId", lesson_id as "lessonId", created_at as "createdAt"
          FROM bookmarks WHERE user_id = ${userId}
        `;
        if (rows && rows.length > 0) {
          const list: Bookmark[] = await Promise.all(
            rows.map(async (r: any) => {
              const lesson = await this.getLessonById(r.lessonId);
              return {
                id: r.id,
                userId: r.userId,
                lessonId: r.lessonId,
                createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
                lesson: lesson || undefined,
              };
            })
          );
          return list;
        }
      } catch (err) {
        console.warn('Neon getBookmarks error:', err);
      }
    }

    const list = Array.from(this.bookmarks.values()).filter(b => b.userId === userId);
    return Promise.all(
      list.map(async b => {
        const lesson = await this.getLessonById(b.lessonId);
        return { ...b, lesson: lesson || undefined };
      })
    );
  }

  public async toggleBookmark(userId: string, lessonId: string): Promise<boolean> {
    const key = `${userId}_${lessonId}`;
    const sql = await getReadyNeonSql();

    if (this.bookmarks.has(key)) {
      this.bookmarks.delete(key);
      if (sql) {
        try {
          await sql`DELETE FROM bookmarks WHERE user_id = ${userId} AND lesson_id = ${lessonId};`;
        } catch (err) {
          console.warn('Neon delete bookmark error:', err);
        }
      }
      return false;
    } else {
      const bmId = `bm-${Date.now()}`;
      this.bookmarks.set(key, {
        id: bmId,
        userId,
        lessonId,
        createdAt: new Date().toISOString(),
      });
      if (sql) {
        try {
          await sql`
            INSERT INTO bookmarks (id, user_id, lesson_id, created_at)
            VALUES (${bmId}, ${userId}, ${lessonId}, NOW())
            ON CONFLICT (user_id, lesson_id) DO NOTHING;
          `;
        } catch (err) {
          console.warn('Neon insert bookmark error:', err);
        }
      }
      return true;
    }
  }

  public async getFavorites(userId: string): Promise<Favorite[]> {
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, user_id as "userId", course_id as "courseId", created_at as "createdAt"
          FROM favorites WHERE user_id = ${userId}
        `;
        if (rows && rows.length > 0) {
          const list: Favorite[] = await Promise.all(
            rows.map(async (r: any) => {
              const course = await this.getCourseById(r.courseId);
              return {
                id: r.id,
                userId: r.userId,
                courseId: r.courseId,
                createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
                course: course || undefined,
              };
            })
          );
          return list;
        }
      } catch (err) {
        console.warn('Neon getFavorites error:', err);
      }
    }

    const list = Array.from(this.favorites.values()).filter(f => f.userId === userId);
    return Promise.all(
      list.map(async f => {
        const course = await this.getCourseById(f.courseId);
        return { ...f, course: course || undefined };
      })
    );
  }

  public async toggleFavorite(userId: string, courseId: string): Promise<boolean> {
    const key = `${userId}_${courseId}`;
    const sql = await getReadyNeonSql();

    if (this.favorites.has(key)) {
      this.favorites.delete(key);
      if (sql) {
        try {
          await sql`DELETE FROM favorites WHERE user_id = ${userId} AND course_id = ${courseId};`;
        } catch (err) {
          console.warn('Neon delete favorite error:', err);
        }
      }
      return false;
    } else {
      const favId = `fav-${Date.now()}`;
      this.favorites.set(key, {
        id: favId,
        userId,
        courseId,
        createdAt: new Date().toISOString(),
      });
      if (sql) {
        try {
          await sql`
            INSERT INTO favorites (id, user_id, course_id, created_at)
            VALUES (${favId}, ${userId}, ${courseId}, NOW())
            ON CONFLICT (user_id, course_id) DO NOTHING;
          `;
        } catch (err) {
          console.warn('Neon insert favorite error:', err);
        }
      }
      return true;
    }
  }

  public async getNote(userId: string, lessonId: string): Promise<Note | null> {
    const key = `${userId}_${lessonId}`;
    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT id, user_id as "userId", lesson_id as "lessonId", content, updated_at as "updatedAt"
          FROM notes WHERE user_id = ${userId} AND lesson_id = ${lessonId} LIMIT 1
        `;
        if (rows && rows.length > 0) {
          const r = rows[0];
          const note: Note = {
            id: r.id,
            userId: r.userId,
            lessonId: r.lessonId,
            content: r.content,
            createdAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
            updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
          };
          this.notes.set(key, note);
          return { ...note };
        }
      } catch (err) {
        console.warn('Neon getNote error:', err);
      }
    }

    const note = this.notes.get(key);
    return note ? { ...note } : null;
  }

  public async saveNote(userId: string, lessonId: string, content: string): Promise<Note> {
    const key = `${userId}_${lessonId}`;
    const now = new Date().toISOString();
    const existing = this.notes.get(key);

    const note: Note = {
      id: existing ? existing.id : `note-${Date.now()}`,
      userId,
      lessonId,
      content,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
    };

    this.notes.set(key, note);

    const sql = await getReadyNeonSql();
    if (sql) {
      try {
        await sql`
          INSERT INTO notes (id, user_id, lesson_id, content, updated_at)
          VALUES (${note.id}, ${userId}, ${lessonId}, ${content}, NOW())
          ON CONFLICT (user_id, lesson_id) DO UPDATE SET
            content = EXCLUDED.content,
            updated_at = NOW();
        `;
      } catch (err) {
        console.warn('Neon saveNote error:', err);
      }
    }

    return { ...note };
  }

  // --- Achievements & Activity ---
  public async getAchievements(userId?: string): Promise<Achievement[]> {
    const list = Array.from(this.achievements.values());
    if (!userId) return list;

    const userAchKeys = new Set(
      Array.from(this.userAchievements.values())
        .filter(ua => ua.userId === userId)
        .map(ua => ua.achievementId)
    );

    return list.map(a => ({
      ...a,
      unlocked: userAchKeys.has(a.id) || a.code === 'FIRST_LESSON', // demo unlock
      unlockedAt: userAchKeys.has(a.id) ? new Date().toISOString() : undefined,
    }));
  }

  public async logActivity(userId: string, activityType: string, metadata?: string): Promise<void> {
    this.activities.push({
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      userId,
      activityType,
      metadata,
      createdAt: new Date().toISOString(),
    });
  }

  public async getActivities(limit = 50): Promise<LearningActivity[]> {
    return [...this.activities].reverse().slice(0, limit);
  }

  public async getAllLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).map(l => ({ ...l }));
  }
}

// Global Singleton (guaranteed persistence across all serverless requests/actions)
const globalForStore = globalThis as unknown as { educodeStore?: DataStore };
if (!globalForStore.educodeStore) {
  globalForStore.educodeStore = new DataStore();
}
export const db = globalForStore.educodeStore;
