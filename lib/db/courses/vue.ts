import type { SeedCourseData } from '../seed-data';

export const vueCourseData: SeedCourseData = {
  course: {
    id: 'course-vue',
    slug: 'vue-framework',
    title: 'Vue.js 3 & Composition API Mastery',
    description: 'Master Vue 3 Composition API, <script setup>, Pinia State Management, Vue Router, and Component Architecture.',
    technology: 'Vue',
    category: 'Web Development',
    level: 'BASIC',
    estimatedHours: 30,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-vue-1',
      courseId: 'course-vue',
      title: 'Vue 3 & Reactivity Core',
      description: 'Single File Components (.vue), <script setup>, ref, reactive, template syntax, and directives.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-vue-1',
          chapterId: 'chap-vue-1',
          slug: 'vue-3-architecture-and-sfc',
          title: 'Vue 3 Single File Components (SFC) & <script setup>',
          description: 'Template, script, and style scoped blocks, createApp mount lifecycle.',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand Vue 3 Single File Component architecture with \`<script setup>\`.

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue';

const title = ref('Welcome to Vue 3 on EduCode Academy!');
</script>

<template>
  <div class="p-6 bg-emerald-900 text-white rounded-xl">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
  </div>
</template>
\`\`\`
`,
        },
        {
          id: 'les-vue-2',
          chapterId: 'chap-vue-1',
          slug: 'reactivity-ref-vs-reactive',
          title: 'Reactivity System: ref() vs reactive() & toRefs()',
          description: 'JavaScript Proxies, unwrapping in templates, and destructuring reactive state safely.',
          duration: 20,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Choose between \`ref()\` and \`reactive()\` without losing reactivity during destructuring.
`,
        },
        {
          id: 'les-vue-3',
          chapterId: 'chap-vue-1',
          slug: 'template-syntax-and-directives',
          title: 'Template Syntax & Directives: v-bind, v-if, v-for',
          description: 'Shorthand syntax (: and @), template conditionals, and key attribution in v-for.',
          duration: 15,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render dynamic lists and conditional views with Vue directives.
`,
        },
        {
          id: 'les-vue-4',
          chapterId: 'chap-vue-1',
          slug: 'two-way-binding-with-v-model',
          title: 'Two-Way Data Binding with v-model & Modifiers',
          description: 'v-model.lazy, v-model.number, v-model.trim, and custom component v-model.',
          duration: 15,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Synchronize form inputs with component state using \`v-model\`.
`,
        },
        {
          id: 'les-vue-5',
          chapterId: 'chap-vue-1',
          slug: 'event-handling-and-modifiers',
          title: 'Event Handling (v-on / @) & Event Modifiers',
          description: '@click.prevent, @click.stop, keyboard modifiers (@keyup.enter), and inline expressions.',
          duration: 15,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Handle UI user interactions cleanly with event modifiers.
`,
        },
      ],
    },
    {
      id: 'chap-vue-2',
      courseId: 'course-vue',
      title: 'Computed Properties, Watchers & Components',
      description: 'computed, watch, watchEffect, defineProps, defineEmits, and slots.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-vue-6',
          chapterId: 'chap-vue-2',
          slug: 'computed-properties-and-caching',
          title: 'Computed Properties: Caching & Writable Computed',
          description: 'Dependency tracking, getter/setter computed properties, and computed vs methods.',
          duration: 20,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Optimize expensive filtering computations using \`computed()\`.
`,
        },
        {
          id: 'les-vue-7',
          chapterId: 'chap-vue-2',
          slug: 'watch-and-watcheffect',
          title: 'Watchers: watch() vs watchEffect() & Deep Watch',
          description: 'Immediate triggers, deep watching nested objects, and cleanup callbacks in watchEffect.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute side effects (API calls, localStorage sync) when reactive dependencies change.
`,
        },
        {
          id: 'les-vue-8',
          chapterId: 'chap-vue-2',
          slug: 'defineprops-and-defineemits',
          title: 'Component Contracts: defineProps & defineEmits',
          description: 'TypeScript type-based props declaration, default values with withDefaults, and custom emits.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Establish type-safe parent-child component communication.
`,
        },
        {
          id: 'les-vue-9',
          chapterId: 'chap-vue-2',
          slug: 'slots-scoped-slots-and-dynamic-components',
          title: 'Slots, Scoped Slots & Dynamic Components (<component :is>)',
          description: 'Named slots (#header, #footer), passing child data to parent templates via scoped slots.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Create flexible compound UI components using scoped slots.
`,
        },
        {
          id: 'les-vue-10',
          chapterId: 'chap-vue-2',
          slug: 'lifecycle-hooks-in-composition-api',
          title: 'Lifecycle Hooks: onMounted, onUnmounted & onUpdated',
          description: 'Setting up timers, DOM subscriptions, and teardown logic.',
          duration: 20,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage setup and cleanup lifecycle in the Composition API.
`,
        },
      ],
    },
    {
      id: 'chap-vue-3',
      courseId: 'course-vue',
      title: 'Composables & State Management with Pinia',
      description: 'Custom Composables, provide/inject, Pinia Stores, Getters, and Actions.',
      order: 3,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-vue-11',
          chapterId: 'chap-vue-3',
          slug: 'writing-custom-composables',
          title: 'Custom Composables: useMouse, useFetch, useLocalStorage',
          description: 'Extracting stateful business logic into reusable composable functions.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Design composables following standard Vue conventions (\`useFeature()\`).
`,
        },
        {
          id: 'les-vue-12',
          chapterId: 'chap-vue-3',
          slug: 'provide-and-inject-pattern',
          title: 'Provide / Inject API for Deep Component Trees',
          description: 'Passing configuration and shared state without prop drilling.',
          duration: 20,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Provide reactive dependencies down the component hierarchy.
`,
        },
        {
          id: 'les-vue-13',
          chapterId: 'chap-vue-3',
          slug: 'pinia-store-architecture',
          title: 'Pinia Store Architecture: Setup Stores vs Option Stores',
          description: 'defineStore, state, getters, actions, and storeToRefs() destructuring.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build global state stores with Pinia.
`,
        },
        {
          id: 'les-vue-14',
          chapterId: 'chap-vue-3',
          slug: 'pinia-plugins-and-persistence',
          title: 'Pinia Plugins & State Persistence to LocalStorage',
          description: 'Subscribing to mutations with $subscribe, state persistence plugins.',
          duration: 20,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Persist Pinia store states across browser reloads.
`,
        },
        {
          id: 'les-vue-15',
          chapterId: 'chap-vue-3',
          slug: 'template-refs-and-expose',
          title: 'Template Refs & defineExpose for Child Controls',
          description: 'Accessing child component methods and variables explicitly with defineExpose.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Call imperative child component methods safely.
`,
        },
      ],
    },
    {
      id: 'chap-vue-4',
      courseId: 'course-vue',
      title: 'Vue Router, Transitions & Production',
      description: 'Vue Router 4, navigation guards, animations, Vitest, and Vite build.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-vue-16',
          chapterId: 'chap-vue-4',
          slug: 'vue-router-and-nested-routes',
          title: 'Vue Router 4: Dynamic Routes & Nested Views',
          description: 'createRouter, createWebHistory, route params, and <router-view> hierarchies.',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build client-side SPA routing with nested layouts.
`,
        },
        {
          id: 'les-vue-17',
          chapterId: 'chap-vue-4',
          slug: 'navigation-guards-and-auth-protection',
          title: 'Navigation Guards (beforeEach) & Auth Route Protection',
          description: 'Checking meta.requiresAuth and redirecting unauthenticated users to login.',
          duration: 20,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Guard protected routes with global navigation guards.
`,
        },
        {
          id: 'les-vue-18',
          chapterId: 'chap-vue-4',
          slug: 'vue-transitions-and-animations',
          title: 'Vue <Transition> & <TransitionGroup> Animations',
          description: 'CSS transition classes (v-enter-active, v-leave-active), list animations.',
          duration: 20,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Add smooth entry and leave transitions to dynamic elements.
`,
        },
        {
          id: 'les-vue-19',
          chapterId: 'chap-vue-4',
          slug: 'teleport-and-modals',
          title: '<Teleport> Component for Modals & Overlays',
          description: 'Rendering modals directly into document.body while keeping component context.',
          duration: 20,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render dialog overlays outside the root component DOM hierarchy.
`,
        },
        {
          id: 'les-vue-20',
          chapterId: 'chap-vue-4',
          slug: 'suspense-and-async-components',
          title: '<Suspense> & defineAsyncComponent Code Splitting',
          description: 'Lazy-loading heavy dialogs and chart components on demand.',
          duration: 20,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Reduce initial bundle size by lazy loading secondary routes.
`,
        },
        {
          id: 'les-vue-21',
          chapterId: 'chap-vue-4',
          slug: 'testing-vue-with-vitest-and-vue-test-utils',
          title: 'Unit Testing with Vitest & Vue Test Utils',
          description: 'Mounting SFCs, testing props, simulating click events, and inspecting emitted events.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write automated component tests for Vue SFCs.
`,
        },
        {
          id: 'les-vue-22',
          chapterId: 'chap-vue-4',
          slug: 'production-vite-build-and-optimization',
          title: 'Vite Production Build & Performance Tuning',
          description: 'Tree shaking, bundle visualization, and hosting on Netlify/Vercel.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Optimize production Vue 3 apps for ultra-fast loading speed.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-vue-1',
      courseId: 'course-vue',
      title: 'Interactive Real-Time Analytics Dashboard',
      description: 'Build a high-performance analytics dashboard using Vue 3 Composition API, Pinia, and Vite.',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 10,
      techStack: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Vite'],
      steps: [
        {
          id: 'step-vue-1',
          projectId: 'proj-vue-1',
          title: '1. Pinia Store & Composable Setup',
          description: 'Configure Pinia global stores for metrics and chart settings.',
          order: 1,
          content: 'Setup Vite project with Vue 3 and TypeScript.',
        },
      ],
    },
  ],
};
