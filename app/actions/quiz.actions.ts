'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth, requireAdmin } from '@/lib/auth';
import { QuizService } from '@/lib/services/quiz.service';
import { ProjectService } from '@/lib/services/project.service';
import { AdminService } from '@/lib/services/statistics.service';
import { db } from '@/lib/db/store';

export async function submitQuizAction(quizId: string, answers: Record<string, string>) {
  try {
    const user = await requireAuth();
    const result = await QuizService.submitQuiz(user.id, quizId, answers);
    revalidatePath('/dashboard');
    revalidatePath('/my-learning');
    return { success: true, result };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleProjectStepAction(projectId: string, stepId: string, completed: boolean) {
  try {
    const user = await requireAuth();
    const updated = await ProjectService.toggleStep(user.id, projectId, stepId, completed);
    revalidatePath(`/projects/${projectId}`);
    revalidatePath('/dashboard');
    return { success: true, userProject: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleUserStatusAction(userId: string) {
  try {
    await requireAdmin();
    const updated = await AdminService.toggleUserStatus(userId);
    revalidatePath('/admin/users');
    return { success: true, user: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function changeUserRoleAction(userId: string, role: 'USER' | 'ADMIN') {
  try {
    await requireAdmin();
    const updated = await AdminService.changeUserRole(userId, role);
    revalidatePath('/admin/users');
    return { success: true, user: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createCourseAction(courseData: any) {
  try {
    await requireAdmin();
    const course = await db.createCourse(courseData);
    revalidatePath('/admin/courses');
    revalidatePath('/courses');
    return { success: true, course };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createLessonAction(lessonData: any) {
  try {
    await requireAdmin();
    const lesson = await db.createLesson(lessonData);
    revalidatePath('/admin/lessons');
    return { success: true, lesson };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
