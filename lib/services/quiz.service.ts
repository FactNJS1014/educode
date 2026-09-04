import { db } from '../db/store';
import type { Quiz, QuizAttempt } from '../types';

export class QuizService {
  static async getQuizById(quizId: string, userId?: string): Promise<Quiz | null> {
    const quiz = await db.getQuizById(quizId);
    if (!quiz) return null;

    let bestAttempt: QuizAttempt | null = null;
    if (userId) {
      const attempts = await db.getUserQuizAttempts(userId, quizId);
      if (attempts.length > 0) {
        bestAttempt = attempts[0];
      }
    }

    return {
      ...quiz,
      bestAttempt,
    };
  }

  static async submitQuiz(userId: string, quizId: string, answers: Record<string, string>): Promise<{
    attempt: QuizAttempt;
    totalQuestions: number;
    correctAnswers: number;
    scorePercentage: number;
    passed: boolean;
    results: { questionId: string; correct: boolean; explanation?: string | null; selectedOptionId: string; correctOptionId: string }[];
  }> {
    const quiz = await db.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    const questions = quiz.questions || [];
    let correctCount = 0;
    const results: { questionId: string; correct: boolean; explanation?: string | null; selectedOptionId: string; correctOptionId: string }[] = [];

    for (const q of questions) {
      const selectedOptionId = answers[q.id];
      const correctOption = q.options.find(opt => opt.isCorrect);
      const isCorrect = selectedOptionId === correctOption?.id;

      if (isCorrect) {
        correctCount++;
      }

      results.push({
        questionId: q.id,
        correct: isCorrect,
        explanation: correctOption?.explanation,
        selectedOptionId,
        correctOptionId: correctOption?.id || '',
      });
    }

    const totalQuestions = questions.length || 1;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= (quiz.passingScore ?? 70);

    const attempt = await db.recordQuizAttempt({
      userId,
      quizId,
      score: correctCount,
      totalScore: totalQuestions,
      percentage: scorePercentage,
      passed,
      answersJson: JSON.stringify(answers),
      startedAt: new Date(Date.now() - 60000).toISOString(),
      completedAt: new Date().toISOString(),
    });

    return {
      attempt,
      totalQuestions,
      correctAnswers: correctCount,
      scorePercentage,
      passed,
      results,
    };
  }
}
