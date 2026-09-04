import React from 'react';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { FolderGit2, ArrowLeft, Layers, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { ProjectService } from '@/lib/services/project.service';
import { getSession } from '@/lib/auth';
import { ProjectStepList } from '@/components/projects/ProjectStepList';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const sessionUser = await getSession();
  const project = await ProjectService.getProjectById(projectId, sessionUser?.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Back button */}
      <div>
        <NextLink
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </NextLink>
      </div>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
            Real Application Workshop
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">{project.title}</h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{project.description}</p>
      </div>

      {/* Steps List with Interactive Checklist */}
      <ProjectStepList project={project} isLoggedIn={!!sessionUser} />
    </div>
  );
}
