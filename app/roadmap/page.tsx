import React from 'react';
import NextLink from 'next/link';
import { Compass, ArrowRight, Code, Server, Smartphone, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

const ROADMAPS = [
  {
    id: 'backend',
    title: 'Backend & Cloud Infrastructure Engineer',
    icon: Server,
    color: 'emerald',
    description: 'Master server-side architectures, concurrency models, database optimization, and cloud microservices.',
    stages: [
      {
        stage: 'Stage 1: Core Fundamentals',
        topics: ['Python Masterclass', 'Java Enterprise', 'Go Fundamentals'],
        courses: ['/courses/python-programming', '/courses/java-programming', '/courses/go-programming'],
      },
      {
        stage: 'Stage 2: Web Frameworks & APIs',
        topics: ['Django & DRF APIs', 'Flask REST microservices', 'Laravel 11 PHP'],
        courses: ['/courses/django-framework', '/courses/flask-framework', '/courses/laravel-framework'],
      },
      {
        stage: 'Stage 3: High Performance Systems',
        topics: ['Rust Systems Programming', 'Go Concurrency & Goroutines', 'C# .NET 8 Web APIs'],
        courses: ['/courses/rust-programming', '/courses/go-programming', '/courses/csharp-programming'],
      },
      {
        stage: 'Stage 4: Capstone & Deployment',
        topics: ['Go Distributed Microservices', 'Rust Axum Real-Time Service'],
        courses: ['/projects/proj-3', '/projects/proj-5'],
      },
    ],
  },
  {
    id: 'fullstack',
    title: 'Modern Full-Stack Developer',
    icon: Layers,
    color: 'indigo',
    description: 'Build end-to-end applications from responsive UI components to relational databases and automated CI/CD.',
    stages: [
      {
        stage: 'Stage 1: Frontend Core',
        topics: ['React 19 & Modern Hooks', 'TypeScript Typing', 'Tailwind CSS & State Management'],
        courses: ['/courses/react-framework', '/courses/vue-framework'],
      },
      {
        stage: 'Stage 2: Full-Stack Frameworks',
        topics: ['Next.js 15 App Router & Server Actions', 'Nuxt 3 Vue', 'Node.js Express REST APIs'],
        courses: ['/courses/nextjs-framework', '/courses/nuxt-framework', '/courses/nodejs-backend'],
      },
      {
        stage: 'Stage 3: Enterprise Stacks',
        topics: ['Laravel 11 & Inertia.js', 'PostgreSQL & Prisma ORM', 'JWT Authentication & RBAC'],
        courses: ['/courses/laravel-framework', '/courses/python-programming'],
      },
      {
        stage: 'Stage 4: Real-World SaaS Product',
        topics: ['Next.js 15 Project Task Manager SaaS with PostgreSQL'],
        courses: ['/projects/proj-2'],
      },
    ],
  },
  {
    id: 'mobile',
    title: 'Cross-Platform Mobile Engineer',
    icon: Smartphone,
    color: 'cyan',
    description: 'Create fluid 60fps native mobile applications for iOS & Android with shared codebases.',
    stages: [
      {
        stage: 'Stage 1: Mobile UI & State',
        topics: ['Flutter & Dart Widget Tree', 'React Native Components & Navigation'],
        courses: ['/courses/flutter-mobile', '/courses/react-native-mobile'],
      },
      {
        stage: 'Stage 2: Device Hardware & Offline DB',
        topics: ['Async storage', 'Camera/Geolocation permissions', 'REST API sync'],
        courses: ['/courses/flutter-mobile'],
      },
      {
        stage: 'Stage 3: App Store Deployment',
        topics: ['App bundle generation', 'Testing on iOS Simulator and Android Emulator'],
        courses: ['/courses/react-native-mobile'],
      },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Career Pathways</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Developer Roadmaps
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Follow structured learning sequences designed to take you from foundational syntax to senior-level architectural mastery.
        </p>
      </div>

      {/* Roadmaps list */}
      <div className="space-y-10">
        {ROADMAPS.map(road => {
          const Icon = road.icon;
          return (
            <div
              key={road.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{road.title}</h2>
                  <p className="text-sm text-slate-400 mt-1">{road.description}</p>
                </div>
              </div>

              {/* Stages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {road.stages.map((stg, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                        {stg.stage}
                      </span>
                      <ul className="mt-3 space-y-2 text-xs text-slate-300">
                        {stg.topics.map((top, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{top}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80">
                      <NextLink
                        href={stg.courses[0] || '/courses'}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
                      >
                        <span>Start Stage Course</span>
                        <ArrowRight className="w-3 h-3" />
                      </NextLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
