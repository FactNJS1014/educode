import type { SeedCourseData } from '../seed-data';

export const nextjsCourseData: SeedCourseData = {
  course: {
    id: 'course-nextjs',
    slug: 'nextjs-framework',
    title: 'Next.js App Router & Full Stack Mastery',
    description: 'Build production-ready full stack web applications with Next.js 15+, Server Components, Server Actions, Prisma, and PostgreSQL.',
    technology: 'Next.js',
    category: 'Web Development',
    level: 'ADVANCED',
    estimatedHours: 40,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-next-1',
      courseId: 'course-nextjs',
      title: 'Next.js App Router & Server Components',
      description: 'App Router architecture, React Server Components (RSC), Client Components, nested layouts, and route groups.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-next-1',
          chapterId: 'chap-next-1',
          slug: 'app-router-vs-pages-router',
          title: 'App Router Architecture & Paradigm Shift',
          description: 'Understanding the App directory, file-based routing conventions (page.tsx, layout.tsx, loading.tsx, error.tsx).',
          duration: 20,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master Next.js App Router hierarchy and special file conventions.

\`\`\`tsx
export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Next.js Full Stack Mastery</h1>
      <p className="text-slate-600">Built with Server Components & App Router.</p>
    </main>
  );
}
\`\`\`
`,
        },
        {
          id: 'les-next-2',
          chapterId: 'chap-next-1',
          slug: 'server-vs-client-components',
          title: 'React Server Components (RSC) vs Client Components ("use client")',
          description: 'Zero bundle size benefits, data fetching on server, when to add "use client" directive.',
          duration: 25,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Keep client bundle lean by pushing "use client" to the leaf nodes of the component tree.
`,
        },
        {
          id: 'les-next-3',
          chapterId: 'chap-next-1',
          slug: 'nested-layouts-and-templates',
          title: 'Nested Layouts, Templates & Route Groups ((folder))',
          description: 'State preservation in layouts, template remounting, and route grouping without URL impact.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Organize multiple dashboard sections with route groups and shared shell layouts.
`,
        },
        {
          id: 'les-next-4',
          chapterId: 'chap-next-1',
          slug: 'dynamic-routes-and-catch-all',
          title: 'Dynamic Routes ([slug]), Catch-all ([...slug]) & Optional Catch-all',
          description: 'Extracting route parameters via params promise in Next.js 15+.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Handle dynamic params and generate static params (\`generateStaticParams\`).
`,
        },
        {
          id: 'les-next-5',
          chapterId: 'chap-next-1',
          slug: 'metadata-and-seo-optimization',
          title: 'Static & Dynamic Metadata, OpenGraph & Favicons',
          description: 'generateMetadata function, Twitter cards, and structured JSON-LD schemas.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Configure SEO-friendly meta tags dynamically based on database contents.
`,
        },
      ],
    },
    {
      id: 'chap-next-2',
      courseId: 'course-nextjs',
      title: 'Data Fetching, Mutations & Caching',
      description: 'Server Actions, Route Handlers, fetch cache, revalidatePath, and streaming.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-next-6',
          chapterId: 'chap-next-2',
          slug: 'server-side-data-fetching-and-caching',
          title: 'Direct Database Fetching & fetch() Extended Cache',
          description: 'Server component async await, Request deduplication, and cache tags.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Fetch data directly in async Server Components without client-side waterfalls.
`,
        },
        {
          id: 'les-next-7',
          chapterId: 'chap-next-2',
          slug: 'server-actions-and-form-mutations',
          title: 'Server Actions ("use server") & Form Mutations',
          description: 'Type-safe server actions, Zod input validation, and progressive enhancement.',
          duration: 30,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute server mutations securely with Server Actions.
`,
        },
        {
          id: 'les-next-8',
          chapterId: 'chap-next-2',
          slug: 'route-handlers-rest-api',
          title: 'Route Handlers (/app/api/*) & HTTP Methods',
          description: 'GET, POST, PUT, DELETE, PATCH handlers with NextRequest and NextResponse.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build internal and external REST API endpoints in Route Handlers.
`,
        },
        {
          id: 'les-next-9',
          chapterId: 'chap-next-2',
          slug: 'caching-revalidatepath-and-revalidatetag',
          title: 'Cache Invalidation: revalidatePath & revalidateTag',
          description: 'On-demand ISR, Time-based revalidation, and clearing Next.js Data Cache.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Invalidate specific cache partitions immediately upon database updates.
`,
        },
        {
          id: 'les-next-10',
          chapterId: 'chap-next-2',
          slug: 'streaming-and-suspense-boundaries',
          title: 'Streaming UI with loading.tsx & React Suspense',
          description: 'Instant loading states, skeleton screens, and progressive HTML streaming from edge nodes.',
          duration: 20,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Stream slow database widgets without blocking initial page render.
`,
        },
      ],
    },
    {
      id: 'chap-next-3',
      courseId: 'course-nextjs',
      title: 'Authentication, Middleware & Security',
      description: 'Next.js Middleware, HttpOnly cookies, JWT sessions, and role guards.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-next-11',
          chapterId: 'chap-next-3',
          slug: 'nextjs-middleware-and-route-guards',
          title: 'Next.js Edge Middleware & Path Matching',
          description: 'middleware.ts, NextResponse.redirect, rewriting URLs, and inspecting cookies.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Guard protected routes (/admin, /dashboard) at the edge before rendering starts.
`,
        },
        {
          id: 'les-next-12',
          chapterId: 'chap-next-3',
          slug: 'session-cookies-and-jwt-protection',
          title: 'Secure JWT Session Cookies & bcrypt Hashing',
          description: 'Setting HttpOnly, SameSite, Secure cookies in Server Actions and Route Handlers.',
          duration: 30,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement secure 24-hour authentication sessions without exposing tokens to JavaScript.
`,
        },
        {
          id: 'les-next-13',
          chapterId: 'chap-next-3',
          slug: 'role-based-access-control-rbac',
          title: 'Role-Based Access Control (RBAC): Admin vs Student',
          description: 'Validating user role claims on server actions and preventing privilege escalation.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Enforce strict server-side authorization checks for admin management panels.
`,
        },
        {
          id: 'les-next-14',
          chapterId: 'chap-next-3',
          slug: 'environment-variables-and-secret-protection',
          title: 'Environment Variables & Preventing Secret Leakage',
          description: 'process.env vs NEXT_PUBLIC_, server-only package, and security audits.',
          duration: 20,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Ensure private API keys and database credentials are never bundled into client bundles.
`,
        },
        {
          id: 'les-next-15',
          chapterId: 'chap-next-3',
          slug: 'security-headers-and-csp',
          title: 'Security Headers, CSP & CSRF Protection',
          description: 'Configuring Content Security Policy, X-Frame-Options, and Strict-Transport-Security in next.config.ts.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Protect against XSS and clickjacking attacks using HTTP headers.
`,
        },
      ],
    },
    {
      id: 'chap-next-4',
      courseId: 'course-nextjs',
      title: 'Databases, Optimistic UI & Production',
      description: 'Neon PostgreSQL, Prisma / Drizzle ORM, optimistic updates, and Docker/Netlify deployment.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-next-16',
          chapterId: 'chap-next-4',
          slug: 'neon-postgresql-connection-pooling',
          title: 'Serverless PostgreSQL with Neon & Connection Pooling',
          description: '@neondatabase/serverless driver, WebSocket proxy, and serverless scale-to-zero.',
          duration: 30,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Connect to Neon PostgreSQL using serverless connection pools.
`,
        },
        {
          id: 'les-next-17',
          chapterId: 'chap-next-4',
          slug: 'prisma-orm-modeling-and-migrations',
          title: 'Prisma ORM: Schema Modeling, Relations & Migrations',
          description: 'prisma.schema, prisma migrate dev, 1-to-many, many-to-many relationships, and type generation.',
          duration: 30,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Model complex domain entities with Prisma ORM.
`,
        },
        {
          id: 'les-next-18',
          chapterId: 'chap-next-4',
          slug: 'drizzle-orm-lightweight-sql',
          title: 'Drizzle ORM: Type-Safe SQL Queries & Zero Overhead',
          description: 'drizzle-orm, pgTable definitions, schema migrations, and relational queries.',
          duration: 25,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write fast type-safe SQL queries with Drizzle ORM.
`,
        },
        {
          id: 'les-next-19',
          chapterId: 'chap-next-4',
          slug: 'optimistic-ui-with-useoptimistic',
          title: 'Instant UI Feedback with React 19 useOptimistic',
          description: 'Rendering immediate state updates before server action completion, rollback on failure.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Deliver zero-latency UX for likes, comments, and bookmark actions.
`,
        },
        {
          id: 'les-next-20',
          chapterId: 'chap-next-4',
          slug: 'next-image-and-asset-optimization',
          title: 'Image & Font Optimization (next/image & next/font)',
          description: 'Automatic WebP/AVIF conversion, layout shift prevention (CLS), and self-hosted Google Fonts.',
          duration: 20,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Achieve 100% Google Lighthouse Core Web Vitals score.
`,
        },
        {
          id: 'les-next-21',
          chapterId: 'chap-next-4',
          slug: 'testing-nextjs-with-playwright',
          title: 'End-to-End Testing Next.js Apps with Playwright',
          description: 'Testing full user journeys: registration, login, course enrollment, and quiz completion.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Automate E2E browser test flows with Playwright.
`,
        },
        {
          id: 'les-next-22',
          chapterId: 'chap-next-4',
          slug: 'production-deployment-to-cloud',
          title: 'Production Deployment to Netlify, Vercel & Docker',
          description: 'Standalone output (output: "standalone"), multi-stage Dockerfile, and CDN caching configuration.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build and deploy production Next.js apps to global container platforms.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-next-1',
      courseId: 'course-nextjs',
      title: 'Full Stack SaaS Education Platform with Neon & Netlify',
      description: 'Build, secure, and deploy a complete LMS platform with user authentication, course progress, quiz grading, and admin analytics.',
      difficulty: 'ADVANCED',
      estimatedHours: 20,
      techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Neon PostgreSQL', 'Prisma', 'Netlify'],
      steps: [
        {
          id: 'step-next-1',
          projectId: 'proj-next-1',
          title: '1. Database Architecture & Prisma Setup',
          description: 'Define models for Users, Courses, Lessons, Quizzes, and Progress.',
          order: 1,
          content: 'Configure Prisma schema and execute migrations on Neon PostgreSQL.',
        },
        {
          id: 'step-next-2',
          projectId: 'proj-next-1',
          title: '2. Authentication & 24h JWT Session Protection',
          description: 'Implement secure login, bcrypt hashing, and route middleware.',
          order: 2,
          content: 'Set HttpOnly cookies and verify tokens server-side.',
        },
        {
          id: 'step-next-3',
          projectId: 'proj-next-1',
          title: '3. Real-time Progress Tracking & Quiz Engine',
          description: 'Calculate streak counters, grade attempts, and award certificates.',
          order: 3,
          content: 'Provide interactive feedback and statistics.',
        },
      ],
    },
  ],
};
