export type Role = 'USER' | 'ADMIN';
export type CourseLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
export type QuizQuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'CODE_OUTPUT' | 'CODE_COMPLETION';
export type ProjectStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordHash?: string;
  avatarUrl?: string | null;
  role: Role;
  isActive: boolean;
  streakCount: number;
  lastActiveDate?: string | null;
  dailyGoalMinutes: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string | null;
}

export interface SessionUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  avatarUrl?: string | null;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  technology: string;
  category: string;
  level: CourseLevel;
  estimatedHours: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  chapters?: Chapter[];
  projects?: Project[];
  totalLessons?: number;
  completedLessons?: number;
  progressPercentage?: number;
  isFavorite?: boolean;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description?: string | null;
  order: number;
  level: CourseLevel;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  chapterId: string;
  slug: string;
  title: string;
  description?: string | null;
  content: string;
  videoUrl?: string | null;
  order: number;
  duration: number; // in minutes
  published: boolean;
  createdAt: string;
  updatedAt: string;
  completed?: boolean;
  isBookmarked?: boolean;
  userNote?: string | null;
  quizzes?: Quiz[];
  chapter?: Chapter;
  courseSlug?: string;
  courseTitle?: string;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string | null;
  lastAccessedAt: string;
}

export interface QuizOption {
  id: string;
  questionId: string;
  text: string;
  isCorrect?: boolean; // Hidden from client until submitted
  explanation?: string | null;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  type: QuizQuestionType;
  codeSnippet?: string | null;
  order: number;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  chapterId?: string | null;
  lessonId?: string | null;
  courseId?: string | null;
  title: string;
  description?: string | null;
  passingScore?: number;
  questions?: QuizQuestion[];
  totalQuestions?: number;
  bestAttempt?: QuizAttempt | null;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalScore: number;
  percentage: number;
  passed: boolean;
  answersJson?: string | null;
  startedAt?: string;
  completedAt: string;
}

export interface ProjectStep {
  id: string;
  projectId?: string;
  title: string;
  description: string;
  content?: string;
  codeExample?: string | null;
  order?: number;
  completed?: boolean;
}

export interface Project {
  id: string;
  courseId: string;
  title: string;
  description: string;
  difficulty?: CourseLevel;
  estimatedHours?: number;
  repositoryUrl?: string | null;
  demoUrl?: string | null;
  techStack?: string[];
  steps?: ProjectStep[];
  userStatus?: ProjectStatus;
  userProgress?: number;
  courseSlug?: string;
  courseTitle?: string;
}

export interface UserProject {
  id: string;
  userId: string;
  projectId: string;
  status: ProjectStatus;
  progress: number;
  completedSteps: string[];
  startedAt: string;
  completedAt?: string | null;
}

export interface Bookmark {
  id: string;
  userId: string;
  lessonId: string;
  createdAt: string;
  lesson?: Lesson;
}

export interface Favorite {
  id: string;
  userId: string;
  courseId: string;
  createdAt: string;
  course?: Course;
}

export interface Note {
  id: string;
  userId: string;
  lessonId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  lesson?: Lesson;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked?: boolean;
  unlockedAt?: string | null;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: string;
}

export interface LearningActivity {
  id: string;
  userId: string;
  activityType: string;
  metadata?: string | null;
  createdAt: string;
}

export interface UserStats {
  totalCoursesStarted: number;
  totalCoursesCompleted: number;
  totalLessonsCompleted: number;
  totalQuizzesPassed: number;
  totalProjectsCompleted: number;
  learningStreakDays: number;
  estimatedHoursLearned: number;
  dailyGoalProgressMinutes: number;
  dailyGoalTargetMinutes: number;
}
