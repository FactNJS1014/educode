import type { SeedCourseData } from '../seed-data';

export const reactCourseData: SeedCourseData = {
  course: {
    id: 'course-react',
    slug: 'react-framework',
    title: 'React & Modern Frontend Architecture',
    description: 'Master React 19, Hooks, State Management, Custom Hooks, Performance Optimization, and component design patterns.',
    technology: 'React',
    category: 'Web Development',
    level: 'BASIC',
    estimatedHours: 35,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-react-1',
      courseId: 'course-react',
      title: 'React Fundamentals & Component Architecture',
      description: 'JSX, components, props, conditional rendering, lists, and Virtual DOM.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-react-1',
          chapterId: 'chap-react-1',
          slug: 'react-architecture-and-jsx',
          title: 'React 19 Architecture & Declarative JSX',
          description: 'Understanding component reconciliation, JSX transpilation, and React element trees.',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand React's declarative component model and Virtual DOM reconciliation.

\`\`\`tsx
import React from 'react';

export function WelcomeBanner({ name }: { name: string }) {
  return (
    <div className="p-6 bg-slate-900 rounded-xl text-white">
      <h1 className="text-2xl font-bold">Welcome, {name}!</h1>
      <p className="text-slate-400">Master modern React on EduCode Academy.</p>
    </div>
  );
}
\`\`\`
`,
        },
        {
          id: 'les-react-2',
          chapterId: 'chap-react-1',
          slug: 'components-and-props-contract',
          title: 'Components, Typed Props & Children Composition',
          description: 'Functional components, destructuring props, default values, and ReactNode children.',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Design flexible container components using \`children\` props.
`,
        },
        {
          id: 'les-react-3',
          chapterId: 'chap-react-1',
          slug: 'conditional-rendering-patterns',
          title: 'Conditional Rendering & Guard Clauses',
          description: 'Ternary operators, logical && short-circuiting pitfalls, and early return guards.',
          duration: 15,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Avoid rendering \`0\` or \`NaN\` when short-circuiting with \`&&\`.
`,
        },
        {
          id: 'les-react-4',
          chapterId: 'chap-react-1',
          slug: 'rendering-lists-and-the-key-prop',
          title: 'Rendering Lists & The Critical Key Prop',
          description: 'Why array index as key causes bugs in reordered lists, stable unique IDs.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand how React uses keys to match Virtual DOM nodes across renders.
`,
        },
        {
          id: 'les-react-5',
          chapterId: 'chap-react-1',
          slug: 'handling-events-and-synthetic-events',
          title: 'Handling Events & React SyntheticEvent System',
          description: 'Event delegation, preventing default behavior, and passing handler callbacks.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Handle click, change, and submit events safely in React components.
`,
        },
      ],
    },
    {
      id: 'chap-react-2',
      courseId: 'course-react',
      title: 'State Management & Core Hooks',
      description: 'useState, useEffect, forms, useRef, and useReducer.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-react-6',
          chapterId: 'chap-react-2',
          slug: 'usestate-and-state-immutability',
          title: 'useState Hook & State Immutability Rules',
          description: 'Updater functions, batching in React 19, and immutable object/array updates.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use updater functions (\`setCount(prev => prev + 1)\`) for reliable state mutations.
`,
        },
        {
          id: 'les-react-7',
          chapterId: 'chap-react-2',
          slug: 'useeffect-and-side-effects-lifecycle',
          title: 'useEffect, Cleanup Functions & Dependency Arrays',
          description: 'Synchronizing with external systems, subscriptions, timers, and cleanup return functions.',
          duration: 25,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Prevent memory leaks and infinite re-render loops in \`useEffect\`.
`,
        },
        {
          id: 'les-react-8',
          chapterId: 'chap-react-2',
          slug: 'controlled-vs-uncontrolled-forms',
          title: 'Controlled vs Uncontrolled Forms & Inputs',
          description: 'Two-way binding with value and onChange, FormData API, and file inputs.',
          duration: 20,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build robust, validated forms with controlled inputs.
`,
        },
        {
          id: 'les-react-9',
          chapterId: 'chap-react-2',
          slug: 'useref-and-dom-manipulation',
          title: 'useRef: Preserving Mutable State & DOM Access',
          description: 'Focus management, scroll positions, and values that do not trigger re-renders.',
          duration: 20,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Access imperative DOM nodes and store interval timers without re-rendering.
`,
        },
        {
          id: 'les-react-10',
          chapterId: 'chap-react-2',
          slug: 'usereducer-for-complex-state',
          title: 'useReducer for Complex State Machines',
          description: 'Reducers, action objects, type-safe dispatch with TypeScript unions.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Replace entangled useState calls with a clean \`useReducer\` state machine.
`,
        },
      ],
    },
    {
      id: 'chap-react-3',
      courseId: 'course-react',
      title: 'Advanced Hooks & Performance Optimization',
      description: 'useContext, useMemo, useCallback, custom hooks, and React.memo.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-react-11',
          chapterId: 'chap-react-3',
          slug: 'usecontext-and-global-state',
          title: 'useContext & Provider Pattern',
          description: 'Eliminating prop drilling, creating theme/auth context providers.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build an AuthProvider and ThemeProvider with custom hook consumer wrappers.
`,
        },
        {
          id: 'les-react-12',
          chapterId: 'chap-react-3',
          slug: 'usememo-and-expensive-computations',
          title: 'useMemo: Caching Expensive Computations',
          description: 'When to use memoization vs when overhead exceeds benefits, referential stability.',
          duration: 20,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Optimize intensive calculations and filter operations with \`useMemo\`.
`,
        },
        {
          id: 'les-react-13',
          chapterId: 'chap-react-3',
          slug: 'usecallback-and-react-memo',
          title: 'useCallback & React.memo for Child Components',
          description: 'Preventing unnecessary re-renders of memoized child components by stabilizing function references.',
          duration: 20,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Pair \`React.memo\` and \`useCallback\` to prevent cascading child re-renders.
`,
        },
        {
          id: 'les-react-14',
          chapterId: 'chap-react-3',
          slug: 'custom-hooks-architecture',
          title: 'Custom Hooks Architecture & Logic Reuse',
          description: 'Extracting stateful business logic into reusable custom hooks (useLocalStorage, useDebounce, useMediaQuery).',
          duration: 25,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Design custom hooks that encapsulate async calls and localStorage synchronization.
`,
        },
        {
          id: 'les-react-15',
          chapterId: 'chap-react-3',
          slug: 'error-boundaries-and-suspense',
          title: 'Error Boundaries, Suspense & React 19 use Hook',
          description: 'Catching runtime rendering exceptions and streaming async promises directly with \`use()\`.',
          duration: 25,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Gracefully catch component tree crashes using ErrorBoundary.
`,
        },
      ],
    },
    {
      id: 'chap-react-4',
      courseId: 'course-react',
      title: 'Ecosystem, Testing & Production Architecture',
      description: 'Zustand, React Router, TanStack Query, Framer Motion, and Vitest.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-react-16',
          chapterId: 'chap-react-4',
          slug: 'client-routing-with-react-router',
          title: 'Client-Side Routing with React Router v6/v7',
          description: 'BrowserRouter, Routes, Route, useParams, useNavigate, and ProtectedRoute guards.',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Configure declarative SPA routes with authentication guards.
`,
        },
        {
          id: 'les-react-17',
          chapterId: 'chap-react-4',
          slug: 'tanstack-query-and-data-fetching',
          title: 'Server State Management with TanStack Query',
          description: 'useQuery, useMutation, background caching, refetching, and stale time.',
          duration: 30,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Eliminate manual loading/error states using automated TanStack Query caching.
`,
        },
        {
          id: 'les-react-18',
          chapterId: 'chap-react-4',
          slug: 'zustand-global-state-store',
          title: 'Lightweight Global State with Zustand',
          description: 'Creating centralized stores, selectors, and persisting state to localStorage.',
          duration: 25,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build boilerplate-free global stores with Zustand.
`,
        },
        {
          id: 'les-react-19',
          chapterId: 'chap-react-4',
          slug: 'form-validation-with-react-hook-form-and-zod',
          title: 'Form Validation with React Hook Form & Zod',
          description: 'Type-safe schema validation, error display, and high-performance uncontrolled form rendering.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Validate complex multi-step forms with Zod resolvers.
`,
        },
        {
          id: 'les-react-20',
          chapterId: 'chap-react-4',
          slug: 'animations-with-motion',
          title: 'Fluid Animations with Motion / Framer Motion',
          description: 'AnimatePresence, layout animations, spring physics, and scroll triggers.',
          duration: 25,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Animate route transitions and interactive cards with \`motion/react\`.
`,
        },
        {
          id: 'les-react-21',
          chapterId: 'chap-react-4',
          slug: 'unit-testing-with-vitest-and-rtl',
          title: 'Testing Components with Vitest & React Testing Library',
          description: 'User-centric queries (getByRole, getByText), userEvent simulation, and mocking API calls.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write automated component unit and integration tests.
`,
        },
        {
          id: 'les-react-22',
          chapterId: 'chap-react-4',
          slug: 'production-build-and-vite-optimization',
          title: 'Production Build, Code Splitting & Vite Optimization',
          description: 'React.lazy, dynamic imports, bundle analysis, and Netlify/Vercel deployment.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Split heavy route bundles with \`React.lazy\` and optimize production chunks.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-react-1',
      courseId: 'course-react',
      title: 'Real-time Collaborative Task Management Board',
      description: 'Build a modern drag-and-drop Kanban task board with optimistic UI updates and filtering.',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 10,
      techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Lucide React'],
      steps: [
        {
          id: 'step-react-1',
          projectId: 'proj-react-1',
          title: '1. State & Column Modeling',
          description: 'Setup initial column data structures and card moving logic.',
          order: 1,
          content: 'Define TypeScript interfaces for tasks and columns.',
        },
      ],
    },
  ],
};
