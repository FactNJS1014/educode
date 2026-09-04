'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Code2, ChevronDown, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { toggleProjectStepAction } from '@/app/actions/quiz.actions';
import { CodeBlock } from '../ui/CodeBlock';
import type { Project, ProjectStep } from '@/lib/types';

interface ProjectStepListProps {
  project: Project;
  isLoggedIn?: boolean;
}

export function ProjectStepList({ project, isLoggedIn = false }: ProjectStepListProps) {
  const [steps, setSteps] = useState<ProjectStep[]>(project.steps || []);
  const [openStepIds, setOpenStepIds] = useState<Record<string, boolean>>({
    [project.steps?.[0]?.id || '']: true,
  });
  const [loadingStepId, setLoadingStepId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenStepIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleComplete = async (stepId: string, currentCompleted: boolean) => {
    if (!isLoggedIn) return;

    setLoadingStepId(stepId);
    const newStatus = !currentCompleted;

    // Optimistic update
    setSteps(prev =>
      prev.map(s => (s.id === stepId ? { ...s, completed: newStatus } : s))
    );

    const res = await toggleProjectStepAction(project.id, stepId, newStatus);
    setLoadingStepId(null);

    if (!res.success) {
      // Revert on error
      setSteps(prev =>
        prev.map(s => (s.id === stepId ? { ...s, completed: currentCompleted } : s))
      );
    }
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / (steps.length || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-slate-400">Workshop Progress</span>
          <div className="text-xl font-bold text-slate-100 mt-0.5">
            {completedCount} of {steps.length} Steps Completed ({progressPercent}%)
          </div>
        </div>

        <div className="flex items-center gap-3">
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </a>
          )}
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isOpen = openStepIds[step.id];
          return (
            <div
              key={step.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-lg"
            >
              <div
                className="flex items-center justify-between p-5 hover:bg-slate-800/40 transition-colors cursor-pointer"
                onClick={() => toggleOpen(step.id)}
              >
                <div className="flex items-center gap-3.5">
                  <button
                    id={`toggle-step-btn-${step.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(step.id, !!step.completed);
                    }}
                    disabled={!isLoggedIn || loadingStepId === step.id}
                    title={step.completed ? 'Mark step as incomplete' : 'Mark step as complete'}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/10" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div>
                    <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <span>{step.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </div>

              {isOpen && (
                <div className="p-6 border-t border-slate-800 bg-slate-950/60 text-sm text-slate-300 space-y-4">
                  <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {step.content}
                  </div>

                  {step.codeExample && (
                    <div className="mt-4">
                      <div className="text-xs font-mono text-emerald-400 mb-1 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Implementation Code Example:</span>
                      </div>
                      <CodeBlock code={step.codeExample} language="typescript" />
                    </div>
                  )}

                  {isLoggedIn && (
                    <div className="pt-3 border-t border-slate-800/80 flex justify-end">
                      <button
                        onClick={() => handleToggleComplete(step.id, !!step.completed)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          step.completed
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                        }`}
                      >
                        {step.completed ? 'Mark Step Incomplete' : '✓ Mark Step as Completed'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
