import { neon, neonConfig } from '@neondatabase/serverless';
import { SEED_USERS, SEED_ACHIEVEMENTS, SEED_COURSES_DATA } from './seed-data';

// In serverless environments (Netlify/Vercel), disable fetch connection cache to prevent stale socket "Connection closed" errors
neonConfig.fetchConnectionCache = false;

const DEFAULT_NEON_DATABASE_URL =
  'postgresql://neondb_owner:npg_R3TNSAVYca5p@ep-divine-truth-azitnmln-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

export function getNeonUrl(): string | null {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL ||
    DEFAULT_NEON_DATABASE_URL;
  if (!url || url.includes('ep-sample-pooler')) {
    return null;
  }
  // Strip channel_binding if present since HTTP serverless driver does not require it
  return url.replace(/[?&]channel_binding=[^&]+/g, '').replace(/\?&/, '?').replace(/\?$/, '');
}

export function isNeonConfigured(): boolean {
  return !!getNeonUrl();
}

/**
 * Returns a raw neon SQL client
 */
export function getNeonSql() {
  const url = getNeonUrl();
  if (!url) return null;
  return neon(url);
}

let schemaInitializationPromise: Promise<boolean> | null = null;
let seedDataPromise: Promise<boolean> | null = null;

/**
 * Ensures all tables exist in Neon PostgreSQL.
 * Guarantees that any query executed afterwards will find all required relations.
 */
export async function ensureNeonSchema(): Promise<boolean> {
  const url = getNeonUrl();
  if (!url) return false;

  if (schemaInitializationPromise) {
    return schemaInitializationPromise;
  }

  schemaInitializationPromise = (async () => {
    try {
      const sql = neon(url);

      // 1. Create Users table
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(100) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(32) DEFAULT 'USER',
          is_active BOOLEAN DEFAULT TRUE,
          streak_count INTEGER DEFAULT 1,
          avatar_url TEXT,
          daily_goal_minutes INTEGER DEFAULT 30,
          last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 2. Create Courses table
      await sql`
        CREATE TABLE IF NOT EXISTS courses (
          id VARCHAR(64) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          technology VARCHAR(100) NOT NULL,
          category VARCHAR(100) DEFAULT 'Programming Languages',
          thumbnail TEXT,
          level VARCHAR(50) DEFAULT 'BASIC',
          estimated_hours INTEGER DEFAULT 10,
          published BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 3. Create Chapters table
      await sql`
        CREATE TABLE IF NOT EXISTS chapters (
          id VARCHAR(64) PRIMARY KEY,
          course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          level VARCHAR(50) DEFAULT 'BASIC',
          order_index INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 4. Create Lessons table
      await sql`
        CREATE TABLE IF NOT EXISTS lessons (
          id VARCHAR(64) PRIMARY KEY,
          chapter_id VARCHAR(64) REFERENCES chapters(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL,
          duration INTEGER DEFAULT 15,
          description TEXT,
          content TEXT NOT NULL,
          video_url TEXT,
          order_index INTEGER DEFAULT 0,
          published BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 5. Create Quizzes table
      await sql`
        CREATE TABLE IF NOT EXISTS quizzes (
          id VARCHAR(64) PRIMARY KEY,
          chapter_id VARCHAR(64) REFERENCES chapters(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          questions JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 6. Create Projects table
      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR(64) PRIMARY KEY,
          course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          steps JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 7. Create Lesson Progress table
      await sql`
        CREATE TABLE IF NOT EXISTS lesson_progress (
          id VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          lesson_id VARCHAR(64) REFERENCES lessons(id) ON DELETE CASCADE,
          is_completed BOOLEAN DEFAULT FALSE,
          last_tested_code TEXT,
          completed_at TIMESTAMP WITH TIME ZONE,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, lesson_id)
        );
      `;

      // 8. Create Quiz Attempts table
      await sql`
        CREATE TABLE IF NOT EXISTS quiz_attempts (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          quiz_id VARCHAR(64) REFERENCES quizzes(id) ON DELETE CASCADE,
          score INTEGER NOT NULL,
          max_score INTEGER NOT NULL,
          passed BOOLEAN DEFAULT FALSE,
          completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 9. Create User Projects table
      await sql`
        CREATE TABLE IF NOT EXISTS user_projects (
          id VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          project_id VARCHAR(64) REFERENCES projects(id) ON DELETE CASCADE,
          step_index INTEGER DEFAULT 0,
          is_completed BOOLEAN DEFAULT FALSE,
          submitted_code TEXT,
          completed_at TIMESTAMP WITH TIME ZONE,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, project_id, step_index)
        );
      `;

      // 10. Create Bookmarks table
      await sql`
        CREATE TABLE IF NOT EXISTS bookmarks (
          id VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          lesson_id VARCHAR(64) REFERENCES lessons(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, lesson_id)
        );
      `;

      // 11. Create Favorites table
      await sql`
        CREATE TABLE IF NOT EXISTS favorites (
          id VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, course_id)
        );
      `;

      // 12. Create Notes table
      await sql`
        CREATE TABLE IF NOT EXISTS notes (
          id VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          lesson_id VARCHAR(64) REFERENCES lessons(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, lesson_id)
        );
      `;

      // 13. Create Achievements table
      await sql`
        CREATE TABLE IF NOT EXISTS achievements (
          id VARCHAR(64) PRIMARY KEY,
          code VARCHAR(64) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          icon VARCHAR(100),
          category VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 14. Create User Achievements table
      await sql`
        CREATE TABLE IF NOT EXISTS user_achievements (
          id VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          achievement_id VARCHAR(64) REFERENCES achievements(id) ON DELETE CASCADE,
          unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, achievement_id)
        );
      `;

      // 15. Create Learning Activities table
      await sql`
        CREATE TABLE IF NOT EXISTS learning_activities (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          activity_type VARCHAR(100) NOT NULL,
          target_id VARCHAR(64),
          title VARCHAR(255) NOT NULL,
          metadata JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Trigger asynchronous background seeding to ensure data is present
      triggerBackgroundSeed(sql);

      return true;
    } catch (err) {
      console.error('Neon schema initialization error:', err);
      schemaInitializationPromise = null; // allow retry
      return false;
    }
  })();

  return schemaInitializationPromise;
}

/**
 * Triggers background seeding of default users, achievements, and courses.
 */
function triggerBackgroundSeed(sql: any) {
  if (seedDataPromise) return;

  seedDataPromise = (async () => {
    try {
      // 1. Seed Users
      for (const u of SEED_USERS) {
        const pwd = u.passwordHash || '';
        await sql`
          INSERT INTO users (id, email, username, name, password, role, is_active, streak_count, avatar_url)
          VALUES (${u.id}, ${u.email}, ${u.username}, ${u.name}, ${pwd}, ${u.role}, ${u.isActive}, ${u.streakCount}, ${u.avatarUrl || null})
          ON CONFLICT (id) DO NOTHING;
        `;
      }

      // 2. Seed Achievements
      for (const a of SEED_ACHIEVEMENTS) {
        await sql`
          INSERT INTO achievements (id, code, title, description, icon, category)
          VALUES (${a.id}, ${a.code}, ${a.title}, ${a.description || ''}, ${a.icon || null}, ${a.category || 'General'})
          ON CONFLICT (id) DO NOTHING;
        `;
      }

      // 3. Seed Courses, Chapters, Lessons, Quizzes, Projects
      for (const item of SEED_COURSES_DATA) {
        const c = item.course;
        await sql`
          INSERT INTO courses (id, title, slug, description, technology, category, thumbnail, level, estimated_hours, published)
          VALUES (${c.id}, ${c.title}, ${c.slug}, ${c.description || ''}, ${c.technology}, ${c.category || 'Programming Languages'}, ${c.thumbnail || null}, ${c.level}, ${c.estimatedHours || 10}, ${c.published ?? true})
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            slug = EXCLUDED.slug,
            description = EXCLUDED.description,
            technology = EXCLUDED.technology,
            category = EXCLUDED.category,
            level = EXCLUDED.level,
            estimated_hours = EXCLUDED.estimated_hours,
            published = EXCLUDED.published;
        `;

        for (const ch of item.chapters) {
          await sql`
            INSERT INTO chapters (id, course_id, title, description, level, order_index)
            VALUES (${ch.id}, ${ch.courseId}, ${ch.title}, ${ch.description || null}, ${ch.level || 'BASIC'}, ${ch.order || 0})
            ON CONFLICT (id) DO UPDATE SET
              course_id = EXCLUDED.course_id,
              title = EXCLUDED.title,
              description = EXCLUDED.description,
              level = EXCLUDED.level,
              order_index = EXCLUDED.order_index;
          `;

          for (const l of ch.lessons) {
            await sql`
              INSERT INTO lessons (id, chapter_id, title, slug, duration, description, content, video_url, order_index, published)
              VALUES (${l.id}, ${l.chapterId}, ${l.title}, ${l.slug}, ${l.duration || 15}, ${l.description || null}, ${l.content}, ${l.videoUrl || null}, ${l.order || 0}, ${l.published ?? true})
              ON CONFLICT (id) DO UPDATE SET
                chapter_id = EXCLUDED.chapter_id,
                title = EXCLUDED.title,
                slug = EXCLUDED.slug,
                duration = EXCLUDED.duration,
                description = EXCLUDED.description,
                content = EXCLUDED.content,
                video_url = EXCLUDED.video_url,
                order_index = EXCLUDED.order_index,
                published = EXCLUDED.published;
            `;

            if (l.quiz) {
              await sql`
                INSERT INTO quizzes (id, chapter_id, title, questions)
                VALUES (${l.quiz.id}, ${ch.id}, ${l.quiz.title}, ${JSON.stringify(l.quiz.questions || [])}::jsonb)
                ON CONFLICT (id) DO UPDATE SET
                  chapter_id = EXCLUDED.chapter_id,
                  title = EXCLUDED.title,
                  questions = EXCLUDED.questions;
              `;
            }
          }
        }

        for (const p of item.projects) {
          await sql`
            INSERT INTO projects (id, course_id, title, description, steps)
            VALUES (${p.id}, ${p.courseId || c.id}, ${p.title}, ${p.description || ''}, ${JSON.stringify(p.steps || [])}::jsonb)
            ON CONFLICT (id) DO UPDATE SET
              course_id = EXCLUDED.course_id,
              title = EXCLUDED.title,
              description = EXCLUDED.description,
              steps = EXCLUDED.steps;
          `;
        }
      }

      return true;
    } catch (seedErr) {
      console.warn('Background seed notice:', seedErr);
      seedDataPromise = null;
      return false;
    }
  })();
}

/**
 * Returns a Neon SQL executor after guaranteeing schema initialization
 */
export async function getReadyNeonSql() {
  const url = getNeonUrl();
  if (!url) return null;
  try {
    const isReady = await ensureNeonSchema();
    if (!isReady) return null;
    return neon(url);
  } catch (err) {
    console.warn('Neon SQL connection exception, falling back:', err);
    return null;
  }
}

export interface NeonHealthStatus {
  connected: boolean;
  configured: boolean;
  database?: string;
  version?: string;
  tablesCount?: number;
  usersCount?: number;
  coursesCount?: number;
  error?: string;
  latencyMs?: number;
}

/**
 * Checks connection health to Neon PostgreSQL instance
 */
export async function checkNeonHealth(): Promise<NeonHealthStatus> {
  const url = getNeonUrl();
  if (!url) {
    return {
      configured: false,
      connected: false,
      error: 'DATABASE_URL environment variable is not configured with a valid Neon connection string.',
    };
  }

  const startTime = Date.now();
  try {
    const isReady = await ensureNeonSchema();
    const sql = neon(url);

    const result = await sql`
      SELECT 
        current_database() as database, 
        version() as version,
        (SELECT count(*)::int FROM information_schema.tables WHERE table_schema = 'public') as tables_count
    `;
    const latencyMs = Date.now() - startTime;
    const row = result[0] || {};

    let usersCount = 0;
    let coursesCount = 0;

    try {
      const uRes = await sql`SELECT count(*)::int as count FROM users`;
      usersCount = uRes[0]?.count || 0;
    } catch {
      // ignore
    }

    try {
      const cRes = await sql`SELECT count(*)::int as count FROM courses`;
      coursesCount = cRes[0]?.count || 0;
    } catch {
      // ignore
    }

    return {
      configured: true,
      connected: true,
      database: row.database,
      version: row.version,
      tablesCount: row.tables_count,
      usersCount,
      coursesCount,
      latencyMs,
    };
  } catch (err: any) {
    return {
      configured: true,
      connected: false,
      latencyMs: Date.now() - startTime,
      error: err.message || 'Failed to connect to Neon PostgreSQL',
    };
  }
}

/**
 * Explicit schema initialization entry point
 */
export async function initializeNeonSchema() {
  schemaInitializationPromise = null;
  const success = await ensureNeonSchema();
  return { success };
}

/**
 * Seeds initial catalog data into Neon PostgreSQL
 */
export async function seedNeonData() {
  const url = getNeonUrl();
  if (!url) return { success: false, reason: 'NO_DATABASE_URL' };

  try {
    await ensureNeonSchema();
    const sql = neon(url);
    seedDataPromise = null;
    triggerBackgroundSeed(sql);
    if (seedDataPromise) {
      await seedDataPromise;
    }
    return { success: true };
  } catch (error: any) {
    console.error('Neon PostgreSQL Seeding error:', error);
    return { success: false, error: error.message };
  }
}
