import type { SeedCourseData } from '../seed-data';

export const nodejsCourseData: SeedCourseData = {
  course: {
    id: 'course-nodejs',
    slug: 'nodejs-backend',
    title: 'Node.js & Express REST API Mastery',
    description: 'Master asynchronous event loops, Express/Fastify middleware, JWT security, PostgreSQL connections, and Docker deployment.',
    technology: 'Node.js',
    category: 'Web Development',
    level: 'BASIC',
    estimatedHours: 30,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-node-1',
      courseId: 'course-nodejs',
      title: 'Node.js Core Architecture & Asynchronous I/O',
      description: 'V8 engine, libuv event loop, phases, CommonJS vs ESM, and streams.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-node-1',
          chapterId: 'chap-node-1',
          slug: 'v8-engine-and-event-loop',
          title: 'V8 Engine & Libuv Event Loop Internals',
          description: 'Timers, I/O polling, Check (setImmediate), Close callbacks, and process.nextTick vs Promise microtasks.',
          duration: 20,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master the execution phases of the Node.js event loop and microtask queues.

\`\`\`javascript
console.log('1: Sync');
setTimeout(() => console.log('2: Timer MacroTask'), 0);
Promise.resolve().then(() => console.log('3: MicroTask'));
process.nextTick(() => console.log('4: NextTick Priority'));
console.log('5: Sync End');
\`\`\`
`,
        },
        {
          id: 'les-node-2',
          chapterId: 'chap-node-1',
          slug: 'commonjs-vs-es-modules',
          title: 'CommonJS (require) vs Modern ES Modules (import/export)',
          description: 'Top-level await, dynamic imports, and module resolution in Node 20+.',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Configure package.json "type": "module" and write clean ESM code.
`,
        },
        {
          id: 'les-node-3',
          chapterId: 'chap-node-1',
          slug: 'file-system-and-buffers',
          title: 'File System (fs/promises) & Binary Buffers',
          description: 'Reading/writing files asynchronously, Buffer allocations, and character encodings (utf-8, hex, base64).',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Process binary files safely using \`fs/promises\` and \`Buffer\`.
`,
        },
        {
          id: 'les-node-4',
          chapterId: 'chap-node-1',
          slug: 'streams-and-pipes',
          title: 'Streams & Pipelines for High-Performance I/O',
          description: 'Readable, Writable, Transform streams, and stream/promises pipeline for multi-gigabyte files.',
          duration: 25,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Stream massive CSV/JSON files with minimal RAM consumption.
`,
        },
        {
          id: 'les-node-5',
          chapterId: 'chap-node-1',
          slug: 'child-processes-and-cluster',
          title: 'Child Processes, Worker Threads & Cluster Module',
          description: 'Offloading CPU-bound tasks to worker threads and scaling across multi-core CPUs.',
          duration: 25,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Utilize multi-core CPU architecture using worker threads.
`,
        },
      ],
    },
    {
      id: 'chap-node-2',
      courseId: 'course-nodejs',
      title: 'Express Server & REST APIs',
      description: 'Express setup, routing, middleware pipeline, error handling, and request validation.',
      order: 2,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-node-6',
          chapterId: 'chap-node-2',
          slug: 'express-routing-and-controllers',
          title: 'Express Setup, Routers & MVC Architecture',
          description: 'Express app instance, express.Router(), parameter extraction (req.params, req.query, req.body).',
          duration: 20,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Structure scalable Express REST services into Routes, Controllers, and Services.
`,
        },
        {
          id: 'les-node-7',
          chapterId: 'chap-node-2',
          slug: 'middleware-pipeline-and-custom-middleware',
          title: 'Middleware Architecture & Execution Pipeline',
          description: 'next() invocation, error forwarding with next(err), and request enrichment.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build custom logging, request-id, and timing middleware.
`,
        },
        {
          id: 'les-node-8',
          chapterId: 'chap-node-2',
          slug: 'centralized-error-handling-middleware',
          title: 'Centralized Error Handling & Custom AppError',
          description: 'Catching async errors (express-async-errors), formatting HTTP error responses.',
          duration: 20,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement 4-argument error handling middleware \`(err, req, res, next)\`.
`,
        },
        {
          id: 'les-node-9',
          chapterId: 'chap-node-2',
          slug: 'request-validation-with-zod',
          title: 'Type-Safe Request Validation with Zod in Express',
          description: 'Validating body, params, and query schemas before controller execution.',
          duration: 20,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Auto-validate incoming HTTP payloads with Zod schemas.
`,
        },
        {
          id: 'les-node-10',
          chapterId: 'chap-node-2',
          slug: 'environment-configuration-with-dotenv',
          title: 'Config Management, Dotenv & Graceful Shutdown',
          description: 'Handling SIGTERM/SIGINT signals to close database pools cleanly.',
          duration: 20,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement graceful server shutdown for zero-downtime rolling deploys.
`,
        },
      ],
    },
    {
      id: 'chap-node-3',
      courseId: 'course-nodejs',
      title: 'Databases & PostgreSQL Integration',
      description: 'pg client, connection pooling, SQL transactions, and Prisma/Drizzle.',
      order: 3,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-node-11',
          chapterId: 'chap-node-3',
          slug: 'connecting-to-postgresql-with-pg-pool',
          title: 'PostgreSQL Connection Pooling with node-postgres (pg)',
          description: 'Pool configuration (max connections, idleTimeoutMillis), query execution.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage high-throughput database pools safely in Node.js.
`,
        },
        {
          id: 'les-node-12',
          chapterId: 'chap-node-3',
          slug: 'sql-injection-prevention-and-transactions',
          title: 'Parameterized Queries & ACID Transactions',
          description: 'BEGIN, COMMIT, ROLLBACK statements, and preventing SQL injection.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute atomic multi-table transactions in PostgreSQL.
`,
        },
        {
          id: 'les-node-13',
          chapterId: 'chap-node-3',
          slug: 'prisma-orm-in-nodejs-services',
          title: 'Prisma ORM Integration & Type-Safe Queries',
          description: 'Prisma Client, CRUD queries, relational filtering, and pagination.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Integrate Prisma ORM with Node.js REST services.
`,
        },
        {
          id: 'les-node-14',
          chapterId: 'chap-node-3',
          slug: 'caching-with-redis-in-node',
          title: 'High-Speed Caching with Redis & ioredis',
          description: 'Key-value caching, TTL expiration, cache-aside pattern.',
          duration: 25,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Speed up database response times with Redis caching.
`,
        },
        {
          id: 'les-node-15',
          chapterId: 'chap-node-3',
          slug: 'database-migration-management',
          title: 'Database Migrations & Seeders in Production',
          description: 'Automating database migrations on container startup.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute automated migrations during container deployments.
`,
        },
      ],
    },
    {
      id: 'chap-node-4',
      courseId: 'course-nodejs',
      title: 'Security, WebSockets & Production',
      description: 'JWT Auth, Helmet, CORS, Socket.io, Supertest, and Docker.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-node-16',
          chapterId: 'chap-node-4',
          slug: 'jwt-authentication-and-bcrypt',
          title: 'JWT Token Authentication & Password Hashing with bcrypt',
          description: 'Salt rounds, signing JWTs with expiration, and auth middleware guards.',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Secure user passwords and API endpoints with JWTs.
`,
        },
        {
          id: 'les-node-17',
          chapterId: 'chap-node-4',
          slug: 'helmet-cors-and-rate-limiting',
          title: 'API Hardening: Helmet, CORS & express-rate-limit',
          description: 'Preventing brute-force attacks and setting secure HTTP headers.',
          duration: 20,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Harden Express applications against common web vulnerabilities.
`,
        },
        {
          id: 'les-node-18',
          chapterId: 'chap-node-4',
          slug: 'real-time-websockets-with-socket-io',
          title: 'Real-time Bi-directional Events with Socket.io',
          description: 'Rooms, broadcasting, namespaces, and client-server synchronization.',
          duration: 25,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build real-time chat and live dashboard events with WebSockets.
`,
        },
        {
          id: 'les-node-19',
          chapterId: 'chap-node-4',
          slug: 'background-jobs-with-bullmq',
          title: 'Background Job Queues with BullMQ & Redis',
          description: 'Delayed jobs, recurring cron jobs, retry logic, and concurrency.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Run background tasks asynchronously with BullMQ.
`,
        },
        {
          id: 'les-node-20',
          chapterId: 'chap-node-4',
          slug: 'api-documentation-with-swagger-openapi',
          title: 'API Documentation with Swagger & OpenAPI 3.0',
          description: 'swagger-ui-express, JSDoc annotations, and auto-generating client SDKs.',
          duration: 20,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Generate interactive API docs for frontend developers.
`,
        },
        {
          id: 'les-node-21',
          chapterId: 'chap-node-4',
          slug: 'automated-testing-with-jest-and-supertest',
          title: 'Automated REST Testing with Jest & Supertest',
          description: 'Integration tests, mocking database queries, and verifying HTTP response codes.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write automated API integration test suites.
`,
        },
        {
          id: 'les-node-22',
          chapterId: 'chap-node-4',
          slug: 'docker-containerization-and-healthchecks',
          title: 'Production Docker Containerization & Healthchecks',
          description: 'Multi-stage Dockerfile, non-root user security, and Kubernetes readiness probes.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Package and deploy Node.js applications with Docker.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-node-1',
      courseId: 'course-nodejs',
      title: 'Scalable Microservices E-Commerce API',
      description: 'Build an Express/TypeScript REST service with rate-limiting, CORS, PostgreSQL database pooling, and unit tests.',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 12,
      techStack: ['Node.js 20', 'TypeScript', 'Express', 'PostgreSQL', 'Jest'],
      steps: [
        {
          id: 'step-node-1',
          projectId: 'proj-node-1',
          title: '1. Modular Architecture Setup',
          description: 'Create Controller, Service, and Repository layers.',
          order: 1,
          content: 'Setup TypeScript config, linting, and directory structure.',
        },
      ],
    },
  ],
};
