import React from 'react';
import NextLink from 'next/link';
import { FolderGit2, ArrowRight, CheckCircle2, Github, ExternalLink, Clock, Layers } from 'lucide-react';
import { ProjectService } from '@/lib/services/project.service';
import { getSession } from '@/lib/auth';

export default async function ProjectsPage() {
  const sessionUser = await getSession();
  const projects = await ProjectService.getProjects(sessionUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Real-World Workshops</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Application Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Step beyond trivial syntax. Build production-grade full-stack applications with database schemas, auth patterns, REST endpoints, and automated tests.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => {
          const completedCount = (proj.steps || []).filter(s => s.completed).length;
          const totalCount = (proj.steps || []).length;
          const percent = Math.round((completedCount / (totalCount || 1)) * 100);

          return (
            <div
              key={proj.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between shadow-xl transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold border border-emerald-500/20">
                    Workshop
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {totalCount} Steps
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {sessionUser && (
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span className="font-mono text-emerald-400">{completedCount}/{totalCount} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <NextLink
                  href={`/projects/${proj.id}`}
                  className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Open Workshop Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </NextLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
