import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(50),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Please enter your email or username'),
  password: z.string().min(1, 'Please enter your password'),
});

export const noteSchema = z.object({
  lessonId: z.string().min(1),
  content: z.string().max(5000, 'Note cannot exceed 5000 characters'),
});

export const quizSubmitSchema = z.object({
  quizId: z.string().min(1),
  answers: z.record(z.string(), z.string()),
});

export const projectStepSchema = z.object({
  projectId: z.string().min(1),
  stepId: z.string().min(1),
  completed: z.boolean(),
});

export const courseCreateSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(2),
  description: z.string().min(10),
  technology: z.string().min(1),
  category: z.string().min(1),
  level: z.enum(['BASIC', 'INTERMEDIATE', 'ADVANCED']),
  estimatedHours: z.number().min(1).default(10),
  published: z.boolean().default(true),
});

export const lessonCreateSchema = z.object({
  chapterId: z.string().min(1),
  title: z.string().min(3),
  slug: z.string().min(2),
  description: z.string().optional(),
  content: z.string().min(20),
  duration: z.number().min(1).default(15),
  order: z.number().default(0),
  videoUrl: z.string().url().optional().or(z.literal('')),
  published: z.boolean().default(true),
});
