import type { Course, Chapter, Lesson, Quiz, Project, Achievement, User } from '../types';
import bcrypt from 'bcryptjs';

import { pythonCourseData } from './courses/python';
import { javaCourseData } from './courses/java';
import { goCourseData } from './courses/go';
import { reactCourseData } from './courses/react';
import { nextjsCourseData } from './courses/nextjs';
import { laravelCourseData } from './courses/laravel';
import { nodejsCourseData } from './courses/nodejs';
import { rustCourseData } from './courses/rust';
import { csharpCourseData } from './courses/csharp';
import { phpCourseData } from './courses/php';
import { vueCourseData } from './courses/vue';
import { nuxtCourseData } from './courses/nuxt';
import { flaskCourseData } from './courses/flask';
import { djangoCourseData } from './courses/django';
import { flutterCourseData } from './courses/flutter';
import { reactNativeCourseData } from './courses/react-native';

// Pre-hashed passwords for seed users
// 'admin123' and 'student123'
export const SEED_ADMIN_HASH = bcrypt.hashSync('admin123', 10);
export const SEED_STUDENT_HASH = bcrypt.hashSync('student123', 10);

export const SEED_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'Admin Instructor',
    username: 'admin',
    email: 'admin@example.com',
    passwordHash: SEED_ADMIN_HASH,
    role: 'ADMIN',
    isActive: true,
    streakCount: 14,
    lastActiveDate: new Date().toISOString(),
    dailyGoalMinutes: 60,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  },
  {
    id: 'user-student-1',
    name: 'Somchai Developer',
    username: 'student',
    email: 'student@example.com',
    passwordHash: SEED_STUDENT_HASH,
    role: 'USER',
    isActive: true,
    streakCount: 5,
    lastActiveDate: new Date().toISOString(),
    dailyGoalMinutes: 45,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  },
];

export const SEED_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    code: 'FIRST_LESSON',
    title: 'First Step to Mastery',
    description: 'Completed your very first lesson on EduCode Academy',
    icon: 'Sparkles',
    category: 'Milestone',
  },
  {
    id: 'ach-2',
    code: 'TEN_LESSONS',
    title: 'Code Enthusiast',
    description: 'Completed 10 lessons across any course',
    icon: 'Flame',
    category: 'Milestone',
  },
  {
    id: 'ach-3',
    code: 'FIFTY_LESSONS',
    title: 'Knowledge Sponge',
    description: 'Completed 50 in-depth lessons',
    icon: 'Award',
    category: 'Milestone',
  },
  {
    id: 'ach-4',
    code: 'FIRST_QUIZ',
    title: 'Quiz Champion',
    description: 'Passed your first knowledge check quiz with flying colors',
    icon: 'CheckCircle',
    category: 'Quiz',
  },
  {
    id: 'ach-5',
    code: 'SEVEN_DAY_STREAK',
    title: 'Consistency King',
    description: 'Maintained a 7-day continuous learning streak',
    icon: 'Zap',
    category: 'Streak',
  },
  {
    id: 'ach-6',
    code: 'FIRST_PROJECT',
    title: 'Software Architect',
    description: 'Built and completed your first real-world application project',
    icon: 'FolderGit2',
    category: 'Project',
  },
  {
    id: 'ach-7',
    code: 'PYTHON_MASTER',
    title: 'Pythonista',
    description: 'Completed all core modules of the Python curriculum',
    icon: 'Terminal',
    category: 'Course',
  },
  {
    id: 'ach-8',
    code: 'FULLSTACK_PRO',
    title: 'Full Stack Engineer',
    description: 'Mastered frontend, backend API, and database deployment',
    icon: 'Layers',
    category: 'Special',
  },
];

export interface SeedCourseData {
  course: Course;
  chapters: (Chapter & { lessons: (Lesson & { quiz?: Quiz })[] })[];
  projects: Project[];
}

export const SEED_COURSES_DATA: SeedCourseData[] = [
  pythonCourseData,
  javaCourseData,
  goCourseData,
  reactCourseData,
  nextjsCourseData,
  laravelCourseData,
  nodejsCourseData,
  rustCourseData,
  csharpCourseData,
  phpCourseData,
  vueCourseData,
  nuxtCourseData,
  flaskCourseData,
  djangoCourseData,
  flutterCourseData,
  reactNativeCourseData,
];
