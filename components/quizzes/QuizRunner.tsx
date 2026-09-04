'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Award, RotateCcw, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import { submitQuizAction } from '@/app/actions/quiz.actions';
import type { Quiz, QuizQuestion } from '@/lib/types';

interface QuizRunnerProps {
  quiz: Quiz;
  onCompleted?: () => void;
}

export function QuizRunner({ quiz, onCompleted }: QuizRunnerProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const questions = quiz.questions || [];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submissionResult) return; // locked after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert('Please answer all questions before submitting the quiz.');
      return;
    }

    setIsSubmitting(true);
    const res = await submitQuizAction(quiz.id, selectedAnswers);
    setIsSubmitting(false);

    if (res.success && res.result) {
      setSubmissionResult(res.result);
      if (res.result.passed) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {}
      }
      onCompleted?.();
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmissionResult(null);
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-mono border border-indigo-500/20">
              Knowledge Check
            </span>
            <span className="text-xs text-slate-400">
              Pass score: {quiz.passingScore}%
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mt-1">{quiz.title}</h3>
          {quiz.description && <p className="text-xs text-slate-400 mt-0.5">{quiz.description}</p>}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Questions: <span className="text-emerald-400 font-bold">{answeredCount}/{questions.length}</span>
        </div>
      </div>

      {/* Submission Result banner */}
      {submissionResult && (
        <div
          className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 ${
            submissionResult.passed
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-3.5">
            {submissionResult.passed ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
            )}
            <div>
              <h4 className="text-base font-bold">
                {submissionResult.passed ? '🎉 Passed the Knowledge Check!' : 'Review Needed — Try Again'}
              </h4>
              <p className="text-xs opacity-90 mt-0.5">
                You scored {submissionResult.correctAnswers} / {submissionResult.totalQuestions} ({submissionResult.scorePercentage}%). Passing is {quiz.passingScore}%.
              </p>
            </div>
          </div>

          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-6">
        {questions.map((q: QuizQuestion, qIndex) => {
          const selectedOptionId = selectedAnswers[q.id];
          const questionResult = submissionResult?.results?.find((r: any) => r.questionId === q.id);

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-mono font-bold">
                  Q{qIndex + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-100">{q.question}</h4>
                </div>
              </div>

              {/* Code Snippet if any */}
              {q.codeSnippet && (
                <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto whitespace-pre">
                  {q.codeSnippet}
                </div>
              )}

              {/* Options */}
              <div className="space-y-2">
                {q.options.map(opt => {
                  const isSelected = selectedOptionId === opt.id;
                  const isSubmitted = !!submissionResult;
                  const isCorrectOption = questionResult?.correctOptionId === opt.id;
                  const isChosenWrong = isSubmitted && isSelected && !questionResult?.correct;

                  let optionStyles = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isSubmitted) {
                    if (isCorrectOption) {
                      optionStyles = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium';
                    } else if (isChosenWrong) {
                      optionStyles = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-indigo-950/50 border-indigo-500 text-indigo-200 shadow-sm';
                  }

                  return (
                    <button
                      key={opt.id}
                      id={`opt-btn-${opt.id}`}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      disabled={isSubmitted}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all cursor-pointer disabled:cursor-default ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            isSelected
                              ? 'border-indigo-400 bg-indigo-500 text-slate-950 font-bold'
                              : 'border-slate-700'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                        <span>{opt.text}</span>
                      </div>

                      {isSubmitted && isCorrectOption && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      {isSubmitted && isChosenWrong && (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation after submit */}
              {questionResult?.explanation && (
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-emerald-400 mr-1.5">Explanation:</span>
                  {questionResult.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submissionResult && (
        <div className="pt-4 flex justify-end">
          <button
            id="submit-quiz-btn"
            onClick={handleSubmit}
            disabled={isSubmitting || answeredCount < questions.length}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Grading Answers...' : 'Submit Answers for Grading'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
