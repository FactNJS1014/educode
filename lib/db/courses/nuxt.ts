import type { SeedCourseData } from '../seed-data';

export const nuxtCourseData: SeedCourseData = {
  course: {
    id: 'course-nuxt',
    slug: 'nuxt-framework',
    title: 'Nuxt 3 Full-Stack Universal Framework',
    description: 'Master Nuxt 3 SSR, Nitro Server Engine, Auto-imports, Server Routes, Pinia, and SEO-friendly universal web apps.',
    technology: 'Nuxt',
    category: 'Web Development',
    level: 'INTERMEDIATE',
    estimatedHours: 35,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-nuxt-1',
      courseId: 'course-nuxt',
      title: 'Nuxt 3 Architecture & Universal Routing',
      description: 'Directory structure, file-based routing, pages/, layouts/, and auto-imports.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-nuxt-1',
          chapterId: 'chap-nuxt-1',
          slug: 'nuxt-3-architecture-and-nitro',
          title: 'Nuxt 3 Architecture & Nitro Server Engine',
          description: 'Universal SSR/SSG/SPA modes, Nitro server engine, and zero-config TypeScript.',
          duration: 20,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand Nuxt 3 full-stack universal execution model.

\`\`\`vue
<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
\`\`\`
`,
        },
        {
          id: 'les-nuxt-2',
          chapterId: 'chap-nuxt-1',
          slug: 'file-based-routing-and-pages',
          title: 'File-Based Routing in pages/ Directory',
          description: 'index.vue, [id].vue, [...slug].vue, and programmatic navigation with navigateTo().',
          duration: 20,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Create dynamic nested routes effortlessly via file naming conventions.
`,
        },
        {
          id: 'les-nuxt-3',
          chapterId: 'chap-nuxt-1',
          slug: 'layouts-and-templates',
          title: 'Layouts System: default.vue, custom.vue & Per-Page Layouts',
          description: '<slot /> in layouts, definePageMeta({ layout: "custom" }), and dynamic layout switching.',
          duration: 15,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Share visual shells across groups of pages using layouts.
`,
        },
        {
          id: 'les-nuxt-4',
          chapterId: 'chap-nuxt-1',
          slug: 'auto-imports-and-components-directory',
          title: 'Auto-Imports: Composables, Components & Vue APIs',
          description: 'Zero manual import statements, component prefixing based on subdirectory names.',
          duration: 15,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Accelerate development with Nuxt automated import resolution.
`,
        },
        {
          id: 'les-nuxt-5',
          chapterId: 'chap-nuxt-1',
          slug: 'seo-and-usehead-meta',
          title: 'SEO & Metadata: useHead(), useSeoMeta() & OpenGraph',
          description: 'Server-rendered title, description, og:image, and Twitter cards.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render dynamic SEO tags directly from server response HTML.
`,
        },
      ],
    },
    {
      id: 'chap-nuxt-2',
      courseId: 'course-nuxt',
      title: 'Universal Data Fetching & State',
      description: 'useAsyncData, useFetch, useState, and preventing hydration mismatch.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-nuxt-6',
          chapterId: 'chap-nuxt-2',
          slug: 'usefetch-and-useasyncdata',
          title: 'Data Fetching with useFetch() & useAsyncData()',
          description: 'Preventing double-fetching during SSR and client hydration, caching with keys.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Fetch data seamlessly on server and pass serialized payload to client without re-fetching.
`,
        },
        {
          id: 'les-nuxt-7',
          chapterId: 'chap-nuxt-2',
          slug: 'lazy-data-fetching-and-pick',
          title: 'Lazy Data Fetching (useLazyFetch) & Payload Pick Optimization',
          description: 'Non-blocking navigation with useLazyFetch, picking only required JSON keys to minimize payload size.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Trim hydration payload size using \`pick: ['id', 'title']\`.
`,
        },
        {
          id: 'les-nuxt-8',
          chapterId: 'chap-nuxt-2',
          slug: 'usestate-ssr-friendly-shared-state',
          title: 'SSR-Friendly Shared State with useState()',
          description: 'Cross-request isolation, avoiding memory leaks on Node server, and hydration state preservation.',
          duration: 20,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Share reactive state across components safely during SSR.
`,
        },
        {
          id: 'les-nuxt-9',
          chapterId: 'chap-nuxt-2',
          slug: 'pinia-integration-in-nuxt-3',
          title: 'Pinia Store Integration (@pinia/nuxt)',
          description: 'Universal store hydration, persisting store data across server and client.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Integrate Pinia for structured full-stack state management.
`,
        },
        {
          id: 'les-nuxt-10',
          chapterId: 'chap-nuxt-2',
          slug: 'error-handling-and-error-page',
          title: 'Error Handling: error.vue, showError & clearError',
          description: 'Catching 404s, 500s during SSR, and custom error layout presentation.',
          duration: 20,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Display custom error pages with recovery actions.
`,
        },
      ],
    },
    {
      id: 'chap-nuxt-3',
      courseId: 'course-nuxt',
      title: 'Nitro Server Engine & Backend APIs',
      description: 'server/api, server/routes, event handlers, PostgreSQL, and server middleware.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-nuxt-11',
          chapterId: 'chap-nuxt-3',
          slug: 'nitro-event-handlers-and-server-api',
          title: 'Nitro Server Routes: defineEventHandler & H3 Utility',
          description: 'server/api/[...].ts, readBody, getQuery, setResponseStatus, and sendRedirect.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build type-safe full-stack API endpoints directly within the Nuxt project.
`,
        },
        {
          id: 'les-nuxt-12',
          chapterId: 'chap-nuxt-3',
          slug: 'server-middleware-and-auth-context',
          title: 'Server Middleware & Attaching User Auth Context',
          description: 'server/middleware/*.ts, extracting cookies, verifying JWT tokens, and injecting event.context.auth.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Protect server API routes with centralized server middleware.
`,
        },
        {
          id: 'les-nuxt-13',
          chapterId: 'chap-nuxt-3',
          slug: 'postgresql-and-drizzle-in-nitro',
          title: 'Connecting Nitro to PostgreSQL with Drizzle / Prisma',
          description: 'Configuring runtimeConfig database URL, executing queries inside event handlers.',
          duration: 30,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Query PostgreSQL databases directly from Nitro backend handlers.
`,
        },
        {
          id: 'les-nuxt-14',
          chapterId: 'chap-nuxt-3',
          slug: 'nitro-storage-layer-and-caching',
          title: 'Nitro Server Storage Layer & Cached Event Handlers',
          description: 'defineCachedEventHandler, redis driver, TTL invalidation, and server-side response caching.',
          duration: 25,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Cache server-side API responses with Nitro multi-driver storage.
`,
        },
        {
          id: 'les-nuxt-15',
          chapterId: 'chap-nuxt-3',
          slug: 'runtime-config-and-secret-keys',
          title: 'Runtime Config: Public vs Private Environment Keys',
          description: 'useRuntimeConfig(), NUXT_ prefix overrides, and preventing secret exposure in client bundles.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Protect sensitive API keys in Nitro runtimeConfig.
`,
        },
      ],
    },
    {
      id: 'chap-nuxt-4',
      courseId: 'course-nuxt',
      title: 'Middleware, Modules & Production Deployment',
      description: 'Route middleware, Nuxt modules, Tailwind CSS, Docker, and Netlify/Cloudflare.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-nuxt-16',
          chapterId: 'chap-nuxt-4',
          slug: 'route-middleware-and-auth-guards',
          title: 'Client Route Middleware (middleware/auth.ts)',
          description: 'defineNuxtRouteMiddleware, abortNavigation(), and redirecting unauthenticated users.',
          duration: 20,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Guard client page navigation with Nuxt route middleware.
`,
        },
        {
          id: 'les-nuxt-17',
          chapterId: 'chap-nuxt-4',
          slug: 'cookie-management-with-usecookie',
          title: 'Universal Cookies with useCookie()',
          description: 'Reading and writing cookies synchronously during SSR and on client with secure flags.',
          duration: 20,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage session tokens universally with \`useCookie()\`.
`,
        },
        {
          id: 'les-nuxt-18',
          chapterId: 'chap-nuxt-4',
          slug: 'nuxt-modules-ecosystem',
          title: 'Nuxt Modules: @nuxtjs/tailwindcss, @nuxt/image, @vueuse/nuxt',
          description: 'Extending Nuxt capabilities with official module ecosystem.',
          duration: 20,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Configure Nuxt modules for instant tooling enhancements.
`,
        },
        {
          id: 'les-nuxt-19',
          chapterId: 'chap-nuxt-4',
          slug: 'clientonly-and-hydration-mismatch',
          title: '<ClientOnly> Component & Eliminating Hydration Mismatches',
          description: 'Handling browser-only libraries (e.g. Leaflet, Canvas) without breaking SSR.',
          duration: 20,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render client-specific widgets cleanly with \`<ClientOnly>\`.
`,
        },
        {
          id: 'les-nuxt-20',
          chapterId: 'chap-nuxt-4',
          slug: 'hybrid-rendering-and-route-rules',
          title: 'Hybrid Rendering & Route Rules (SSR + SWR + Static)',
          description: 'routeRules in nuxt.config.ts for granular per-route caching and rendering strategies.',
          duration: 25,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Mix static, SWR-cached, and live SSR pages in a single app.
`,
        },
        {
          id: 'les-nuxt-21',
          chapterId: 'chap-nuxt-4',
          slug: 'testing-nuxt-with-vitest-and-nuxt-test-utils',
          title: 'Testing Nuxt with @nuxt/test-utils & Vitest',
          description: 'Mounting pages in full Nuxt test environment, testing Nitro endpoints.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Test universal page rendering and server handlers.
`,
        },
        {
          id: 'les-nuxt-22',
          chapterId: 'chap-nuxt-4',
          slug: 'production-deployment-presets',
          title: 'Production Deployment: Node, Docker, Netlify & Cloudflare',
          description: 'NITRO_PRESET configuration, standalone Node server deployment, and edge runtime.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Deploy production Nuxt 3 full-stack apps to cloud platforms.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-nuxt-1',
      courseId: 'course-nuxt',
      title: 'Full Stack Content Publishing Platform with Nitro & PostgreSQL',
      description: 'Build an SSR news and article publication portal with Nitro backend, user authentication, and hybrid rendering.',
      difficulty: 'ADVANCED',
      estimatedHours: 12,
      techStack: ['Nuxt 3', 'Vue 3', 'Nitro', 'PostgreSQL', 'Tailwind CSS'],
      steps: [
        {
          id: 'step-nuxt-1',
          projectId: 'proj-nuxt-1',
          title: '1. Nitro Backend & Route Setup',
          description: 'Configure server/api handlers and database connection.',
          order: 1,
          content: 'Setup Nuxt 3 project with Tailwind CSS and Pinia.',
        },
      ],
    },
  ],
};
