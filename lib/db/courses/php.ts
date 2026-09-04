import type { SeedCourseData } from '../seed-data';

export const phpCourseData: SeedCourseData = {
  course: {
    id: 'course-php',
    slug: 'php-programming',
    title: 'Modern PHP 8 & Object-Oriented Architecture',
    description: 'Master modern PHP 8 features, typed properties, Composer, PDO secure database queries, and REST APIs.',
    technology: 'PHP',
    category: 'Programming Languages',
    level: 'BASIC',
    estimatedHours: 25,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-php-1',
      courseId: 'course-php',
      title: 'PHP 8 Modern Syntax & Language Core',
      description: 'declare(strict_types=1), types, match expressions, arrays, and named arguments.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-php-1',
          chapterId: 'chap-php-1',
          slug: 'php-8-setup-and-strict-types',
          title: 'PHP 8.3 Setup & Strict Type Mode',
          description: 'declare(strict_types=1), PHP CLI, built-in development server (php -S).',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Enable strict typing in PHP 8 to eliminate type coercion bugs.

\`\`\`php
<?php
declare(strict_types=1);

function calculateAverage(array $scores): float {
    return array_sum($scores) / count($scores);
}

echo "Average: " . calculateAverage([85.5, 90.0, 94.5]);
\`\`\`
`,
        },
        {
          id: 'les-php-2',
          chapterId: 'chap-php-1',
          slug: 'variables-types-and-constants',
          title: 'Scalar Types, Union Types, Intersection Types & Constants',
          description: 'int, float, string, bool, string|int union types, and const vs define().',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Utilize union types and typed constants in modern PHP.
`,
        },
        {
          id: 'les-php-3',
          chapterId: 'chap-php-1',
          slug: 'match-expressions-vs-switch',
          title: 'Match Expressions vs Classic Switch',
          description: 'Strict comparison (===), returning values directly, and handling unhandled cases.',
          duration: 15,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Replace switch statements with clean \`match\` expressions.
`,
        },
        {
          id: 'les-php-4',
          chapterId: 'chap-php-1',
          slug: 'arrays-and-array-functions',
          title: 'Arrays, Destructuring & Powerful Array Functions',
          description: 'array_map, array_filter, array_reduce, [...$arr] array unpacking, and square bracket destructuring.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master array manipulations with array unpacking and array functions.
`,
        },
        {
          id: 'les-php-5',
          chapterId: 'chap-php-1',
          slug: 'functions-and-named-arguments',
          title: 'Functions, Named Arguments & First-Class Callables',
          description: 'Passing parameters by name, arrow functions (fn() => ...), and Closure::fromCallable.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write clean function invocations using named arguments.
`,
        },
      ],
    },
    {
      id: 'chap-php-2',
      courseId: 'course-php',
      title: 'Object-Oriented PHP & Design Patterns',
      description: 'Constructor property promotion, readonly classes, interfaces, traits, and autoloader.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-php-6',
          chapterId: 'chap-php-2',
          slug: 'constructor-property-promotion',
          title: 'Classes & Constructor Property Promotion',
          description: 'Eliminating boilerplate properties, readonly properties, and readonly classes.',
          duration: 20,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Define DTOs in a single line using constructor property promotion.

\`\`\`php
<?php
declare(strict_types=1);

readonly class CourseDto {
    public function __construct(
        public string $id,
        public string $title,
        public int $hours = 25
    ) {}
}
\`\`\`
`,
        },
        {
          id: 'les-php-7',
          chapterId: 'chap-php-2',
          slug: 'inheritance-and-abstract-classes',
          title: 'Inheritance, Abstract Classes & final Keyword',
          description: 'Extending base classes, abstract method enforcement, and preventing override with final.',
          duration: 25,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build extensible class hierarchies with abstract classes.
`,
        },
        {
          id: 'les-php-8',
          chapterId: 'chap-php-2',
          slug: 'interfaces-and-traits-composition',
          title: 'Interfaces & Traits for Horizontal Code Sharing',
          description: 'Decoupling contracts via interfaces, avoiding trait conflict resolution issues.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Share functionality across unrelated classes using Traits safely.
`,
        },
        {
          id: 'les-php-9',
          chapterId: 'chap-php-2',
          slug: 'php-enums-and-backed-enums',
          title: 'PHP 8.1+ Enums & Backed Enums with Methods',
          description: 'Pure Enums vs String/Int Backed Enums, implementing interfaces in Enums.',
          duration: 20,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Model fixed sets of states (UserRole, CourseLevel) with Backed Enums.
`,
        },
        {
          id: 'les-php-10',
          chapterId: 'chap-php-2',
          slug: 'magic-methods-and-autoloader',
          title: 'Magic Methods (__toString, __get, __invoke) & PSR-4',
          description: 'Customizing object behavior and understanding SPL autoloader standards.',
          duration: 20,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement magic methods and PSR-4 directory mapping.
`,
        },
      ],
    },
    {
      id: 'chap-php-3',
      courseId: 'course-php',
      title: 'Secure Database Access & Web Foundations',
      description: 'PDO, SQL injection defense, forms, sessions, cookies, and password hashing.',
      order: 3,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-php-11',
          chapterId: 'chap-php-3',
          slug: 'pdo-connection-and-prepared-statements',
          title: 'PDO Database Connections & Prepared Statements',
          description: 'Connecting to PostgreSQL/MySQL with PDO, parameter binding, and error modes (ERRMODE_EXCEPTION).',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute parameterized queries using PDO to prevent SQL injection.
`,
        },
        {
          id: 'les-php-12',
          chapterId: 'chap-php-3',
          slug: 'sql-injection-and-xss-prevention',
          title: 'Security: SQLi Prevention & XSS Sanitization (htmlspecialchars)',
          description: 'Sanitizing user output, htmlspecialchars with ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5.',
          duration: 20,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Sanitize inputs and outputs to prevent Cross-Site Scripting (XSS).
`,
        },
        {
          id: 'les-php-13',
          chapterId: 'chap-php-3',
          slug: 'sessions-cookies-and-authentication',
          title: 'Session Management, Secure Cookies & Session Fixation',
          description: 'session_regenerate_id(), HttpOnly cookies, SameSite attributes, and session timeout.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement secure, persistent login sessions in PHP.
`,
        },
        {
          id: 'les-php-14',
          chapterId: 'chap-php-3',
          slug: 'password-hashing-with-bcrypt-argon2',
          title: 'Password Hashing: password_hash & password_verify',
          description: 'PASSWORD_BCRYPT vs PASSWORD_ARGON2ID, password_needs_rehash() for automatic upgrades.',
          duration: 20,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Hash passwords securely with \`password_hash()\`.
`,
        },
        {
          id: 'les-php-15',
          chapterId: 'chap-php-3',
          slug: 'file-uploads-and-mime-validation',
          title: 'Secure File Uploads & MIME Type Verification',
          description: '$_FILES array, finfo_open for binary MIME inspection, and preventing PHP execution in upload folders.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Validate file uploads against spoofed extensions.
`,
        },
      ],
    },
    {
      id: 'chap-php-4',
      courseId: 'course-php',
      title: 'Composer, REST APIs & MVC Architecture',
      description: 'Composer, PSR standards, lightweight REST API, JSON, PHPUnit, and Docker.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-php-16',
          chapterId: 'chap-php-4',
          slug: 'composer-and-dependency-management',
          title: 'Composer Dependency Management & PSR-4 Autoloading',
          description: 'composer.json, require vs require-dev, composer dump-autoload -o (optimized).',
          duration: 20,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage third-party packages and autoload class namespaces with Composer.
`,
        },
        {
          id: 'les-php-17',
          chapterId: 'chap-php-4',
          slug: 'psr-standards-psr-7-psr-12',
          title: 'PHP FIG Standards: PSR-4, PSR-7, PSR-11 & PSR-12',
          description: 'Coding style compliance, HTTP message interfaces, and container interfaces.',
          duration: 20,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Comply with modern PHP interoperability standards.
`,
        },
        {
          id: 'les-php-18',
          chapterId: 'chap-php-4',
          slug: 'building-a-rest-api-from-scratch',
          title: 'Building a Fast REST API in Pure PHP',
          description: 'header("Content-Type: application/json"), parsing php://input, and status codes (200, 201, 400, 404).',
          duration: 25,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Handle JSON requests and return structured REST responses without third-party frameworks.
`,
        },
        {
          id: 'les-php-19',
          chapterId: 'chap-php-4',
          slug: 'mvc-framework-architecture-from-scratch',
          title: 'Building a Lightweight MVC Framework',
          description: 'Front Controller (index.php), Regex Router, Base Controller, and View Renderer.',
          duration: 30,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Design a zero-dependency MVC framework from scratch.
`,
        },
        {
          id: 'les-php-20',
          chapterId: 'chap-php-4',
          slug: 'exception-handling-and-error-logging',
          title: 'Global Exception Handling & Structured Logging',
          description: 'set_exception_handler, set_error_handler, Monolog package integration.',
          duration: 20,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Catch uncaught errors gracefully and write structured logs.
`,
        },
        {
          id: 'les-php-21',
          chapterId: 'chap-php-4',
          slug: 'unit-testing-with-phpunit',
          title: 'Automated Unit Testing with PHPUnit',
          description: 'TestCase, assertions (assertEquals, assertCount), data providers, and test fixtures.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write automated test suites with PHPUnit.
`,
        },
        {
          id: 'les-php-22',
          chapterId: 'chap-php-4',
          slug: 'production-opcache-and-docker',
          title: 'Production Optimization: OPcache, JIT & Docker',
          description: 'Enabling OPcache preloading, PHP 8 JIT compiler, and php:8.3-fpm container configuration.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Optimize PHP production throughput with OPcache preloading and Docker.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-php-1',
      courseId: 'course-php',
      title: 'Lightweight MVC PHP REST API Framework',
      description: 'Build a custom zero-dependency PHP MVC framework with router, controllers, middleware, and database pooling.',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 10,
      techStack: ['PHP 8.3', 'PostgreSQL / MySQL', 'Composer', 'PHPUnit'],
      steps: [
        {
          id: 'step-php-1',
          projectId: 'proj-php-1',
          title: '1. Front Controller & URI Router',
          description: 'Direct all requests through index.php with regex route matching.',
          order: 1,
          content: 'Setup PSR-4 autoloading via Composer.',
        },
      ],
    },
  ],
};
