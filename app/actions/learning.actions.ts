'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { ProgressService } from '@/lib/services/progress.service';
import { NoteService, BookmarkService, FavoriteService } from '@/lib/services/statistics.service';
import { noteSchema } from '@/lib/validations';

export async function toggleLessonCompleteAction(lessonId: string, completed: boolean, courseSlug?: string) {
  try {
    const user = await requireAuth();
    const progress = await ProgressService.toggleLessonComplete(user.id, lessonId, completed);

    if (courseSlug) {
      revalidatePath(`/learn/${courseSlug}`);
      revalidatePath(`/courses/${courseSlug}`);
    }
    revalidatePath('/dashboard');
    revalidatePath('/my-learning');

    return { success: true, progress };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveNoteAction(lessonId: string, content: string) {
  try {
    const user = await requireAuth();
    const parsed = noteSchema.safeParse({ lessonId, content });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message };
    }

    const note = await NoteService.saveNote(user.id, lessonId, content);
    revalidatePath('/bookmarks');
    return { success: true, note };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleBookmarkAction(lessonId: string) {
  try {
    const user = await requireAuth();
    const isBookmarked = await BookmarkService.toggleBookmark(user.id, lessonId);
    revalidatePath('/bookmarks');
    return { success: true, isBookmarked };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleFavoriteAction(courseId: string) {
  try {
    const user = await requireAuth();
    const isFavorite = await FavoriteService.toggleFavorite(user.id, courseId);
    revalidatePath('/favorites');
    revalidatePath('/courses');
    return { success: true, isFavorite };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
