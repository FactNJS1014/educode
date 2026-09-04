import type { SeedCourseData } from '../seed-data';

export const laravelCourseData: SeedCourseData = {
  course: {
    id: 'course-laravel',
    slug: 'laravel-framework',
    title: 'Laravel Enterprise PHP Framework',
    description: 'Master Laravel routing, Eloquent ORM, Service Containers, Blade/Inertia, REST APIs, Queues, and Authentication.',
    technology: 'Laravel',
    category: 'Web Development',
    level: 'INTERMEDIATE',
    estimatedHours: 35,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-lar-1',
      courseId: 'course-laravel',
      title: 'Laravel Architecture & Routing',
      description: 'Directory structure, artisan CLI, routing, controllers, and Blade templates.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-lar-1',
          chapterId: 'chap-lar-1',
          slug: 'laravel-architecture-and-artisan',
          title: 'Laravel 11 Architecture & Artisan CLI',
          description: 'Request lifecycle, bootstrap process, Service Providers, and Artisan commands.',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand Laravel's HTTP request lifecycle through public/index.php.

\`\`\`php
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('welcome', ['framework' => 'Laravel 11']);
    }
}
\`\`\`
`,
        },
        {
          id: 'les-lar-2',
          chapterId: 'chap-lar-1',
          slug: 'routes-and-route-parameters',
          title: 'Routing, Named Routes & Route Model Binding',
          description: 'web.php vs api.php, route parameters, prefix groups, and implicit model binding.',
          duration: 20,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use Route Model Binding to automatically fetch database records by ID or slug.
`,
        },
        {
          id: 'les-lar-3',
          chapterId: 'chap-lar-1',
          slug: 'controllers-and-dependency-injection',
          title: 'Controllers, Resource Controllers & Dependency Injection',
          description: 'Invokable controllers, RESTful resource verbs (index, show, store, update, destroy).',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Inject service classes and repositories directly into controller method signatures.
`,
        },
        {
          id: 'les-lar-4',
          chapterId: 'chap-lar-1',
          slug: 'blade-templating-and-components',
          title: 'Blade Templates, Layouts & Blade Components',
          description: '@extends, @section, @yield, and modern class-based / anonymous <x-component> tags.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build reusable UI components with Blade and Alpine.js.
`,
        },
        {
          id: 'les-lar-5',
          chapterId: 'chap-lar-1',
          slug: 'middleware-and-pipeline',
          title: 'Middleware, Global vs Route Middleware & Pipeline',
          description: 'Creating custom middleware for logging, rate limiting, and role authorization.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Filter incoming HTTP requests with custom middleware guards.
`,
        },
      ],
    },
    {
      id: 'chap-lar-2',
      courseId: 'course-laravel',
      title: 'Database & Eloquent ORM',
      description: 'Migrations, Seeders, Eloquent relationships, and Query Builder.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-lar-6',
          chapterId: 'chap-lar-2',
          slug: 'database-migrations-and-schema-builder',
          title: 'Database Migrations, Schema Builder & Rollbacks',
          description: 'Writing migrations, foreign key constraints, indexes, and schema modifications.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage version-controlled relational database schemas with Artisan migrations.
`,
        },
        {
          id: 'les-lar-7',
          chapterId: 'chap-lar-2',
          slug: 'eloquent-models-and-active-record',
          title: 'Eloquent Models, Mass Assignment & Accessors/Mutators',
          description: '$fillable vs $guarded, Casts (AsArrayObject, hashed), and Attribute accessors.',
          duration: 25,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Define safe Eloquent models with custom attribute casts.
`,
        },
        {
          id: 'les-lar-8',
          chapterId: 'chap-lar-2',
          slug: 'eloquent-relationships-1-to-many',
          title: 'Model Relationships: hasOne, hasMany, belongsTo',
          description: 'Defining relational links and querying related child models.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Model courses, chapters, and lessons relationships cleanly.
`,
        },
        {
          id: 'les-lar-9',
          chapterId: 'chap-lar-2',
          slug: 'many-to-many-and-polymorphic-relationships',
          title: 'Many-to-Many & Polymorphic Relationships',
          description: 'belongsToMany with pivot tables, morphTo, morphMany for comments and tags.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage pivot data (e.g. user course enrollments) using \`withPivot()\`.
`,
        },
        {
          id: 'les-lar-10',
          chapterId: 'chap-lar-2',
          slug: 'preventing-n-plus-1-and-eager-loading',
          title: 'Eager Loading (with()) & Eliminating N+1 Query Traps',
          description: 'Model::preventLazyLoading(), debugbar profiling, and chunking large datasets.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Optimize high-traffic database queries by eliminating N+1 queries.
`,
        },
      ],
    },
    {
      id: 'chap-lar-3',
      courseId: 'course-laravel',
      title: 'Validation, Security & Authentication',
      description: 'Form Requests, Sanctum, Policies, Gates, and CSRF protection.',
      order: 3,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-lar-11',
          chapterId: 'chap-lar-3',
          slug: 'form-requests-and-validation-rules',
          title: 'Form Request Classes & Complex Validation Rules',
          description: 'authorize() method, custom validation error messages, and Rule::unique().',
          duration: 20,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Extract validation rules into dedicated FormRequest classes.
`,
        },
        {
          id: 'les-lar-12',
          chapterId: 'chap-lar-3',
          slug: 'laravel-sanctum-api-tokens',
          title: 'API Authentication with Laravel Sanctum',
          description: 'Issuing personal access tokens, token abilities, and SPA cookie authentication.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Secure REST APIs with Sanctum bearer tokens.
`,
        },
        {
          id: 'les-lar-13',
          chapterId: 'chap-lar-3',
          slug: 'authorization-with-gates-and-policies',
          title: 'Authorization: Gates & Eloquent Policies',
          description: 'Gate::define, Policy methods (view, create, update, delete), and @can Blade directives.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Enforce fine-grained user permissions with Model Policies.
`,
        },
        {
          id: 'les-lar-14',
          chapterId: 'chap-lar-3',
          slug: 'file-storage-and-s3-disks',
          title: 'File Storage System & Public/S3 Disks',
          description: 'Storage facade, uploading user avatars, symbolic links (storage:link).',
          duration: 20,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Handle secure multi-file uploads and S3 cloud storage.
`,
        },
        {
          id: 'les-lar-15',
          chapterId: 'chap-lar-3',
          slug: 'session-and-csrf-protection',
          title: 'Session Management & CSRF Token Protection',
          description: 'Session drivers (database/redis), VerifyCsrfToken middleware, and X-XSRF-TOKEN headers.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Protect against Cross-Site Request Forgery across stateful forms.
`,
        },
      ],
    },
    {
      id: 'chap-lar-4',
      courseId: 'course-laravel',
      title: 'APIs, Queues & Production Architecture',
      description: 'API Resources, Queues, Jobs, Events, Mail, Redis, and Pest testing.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-lar-16',
          chapterId: 'chap-lar-4',
          slug: 'eloquent-api-resources',
          title: 'Eloquent API Resources & JSON Response Transformers',
          description: 'JsonResource, ResourceCollection, wrapping data, and conditional fields.',
          duration: 20,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Format clean, decoupled JSON payloads for mobile and frontend clients.
`,
        },
        {
          id: 'les-lar-17',
          chapterId: 'chap-lar-4',
          slug: 'background-queues-and-jobs',
          title: 'Queues, Asynchronous Jobs & Redis Worker',
          description: 'ShouldQueue interface, dispatching jobs, retry strategies, and failed jobs handling.',
          duration: 25,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Offload heavy tasks (email sending, video encoding) to Redis background queues.
`,
        },
        {
          id: 'les-lar-18',
          chapterId: 'chap-lar-4',
          slug: 'events-listeners-and-observers',
          title: 'Events, Listeners & Model Observers',
          description: 'Decoupled domain events, auto-triggering on Eloquent created/updated hooks.',
          duration: 20,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement the Observer pattern on database models.
`,
        },
        {
          id: 'les-lar-19',
          chapterId: 'chap-lar-4',
          slug: 'mailable-and-notifications',
          title: 'Mailables, Markdown Emails & Notification Channels',
          description: 'Mail facade, queueable mailables, database notifications, and SMS/Slack channels.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Send rich transactional emails and notifications to users.
`,
        },
        {
          id: 'les-lar-20',
          chapterId: 'chap-lar-4',
          slug: 'caching-and-redis-optimization',
          title: 'Caching Strategies & Redis Performance',
          description: 'Cache::remember, tag-based caching, rate limiting with Redis.',
          duration: 25,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Cache database results to achieve sub-millisecond response times.
`,
        },
        {
          id: 'les-lar-21',
          chapterId: 'chap-lar-4',
          slug: 'automated-testing-with-pest',
          title: 'Automated Testing with Pest & PHPUnit',
          description: 'Feature tests, database refresh, actingAs authentication, and HTTP assertions.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write concise, readable test suites with Pest PHP.
`,
        },
        {
          id: 'les-lar-22',
          chapterId: 'chap-lar-4',
          slug: 'production-deployment-and-octane',
          title: 'Production Deployment, Laravel Octane & Docker',
          description: 'FrankenPHP / Swoole performance acceleration, OPcache tuning, and Docker deployment.',
          duration: 30,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Supercharge Laravel throughput using Laravel Octane and FrankenPHP.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-lar-1',
      courseId: 'course-laravel',
      title: 'Multi-Tenant Inventory & Order Management API',
      description: 'Build a robust Laravel backend with policy authorization, database queues, and PDF report generation.',
      difficulty: 'ADVANCED',
      estimatedHours: 15,
      techStack: ['PHP 8.3', 'Laravel 11', 'PostgreSQL', 'Redis', 'Docker'],
      steps: [
        {
          id: 'step-lar-1',
          projectId: 'proj-lar-1',
          title: '1. Model Relationships & Policy Setup',
          description: 'Configure User, Organization, Product, and Order models.',
          order: 1,
          content: 'Define Eloquent relationships and RBAC permissions.',
        },
      ],
    },
  ],
};
