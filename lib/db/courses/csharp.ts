import type { SeedCourseData } from '../seed-data';

export const csharpCourseData: SeedCourseData = {
  course: {
    id: 'course-csharp',
    slug: 'csharp-programming',
    title: 'C# & .NET Web API Architecture',
    description: 'Master modern C# 12, .NET 8 Web APIs, Entity Framework Core, LINQ, Dependency Injection, and microservices.',
    technology: 'C#',
    category: 'Programming Languages',
    level: 'INTERMEDIATE',
    estimatedHours: 35,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-cs-1',
      courseId: 'course-csharp',
      title: 'C# Core & .NET SDK',
      description: '.NET SDK, C# types, control flow, pattern matching, arrays, and nullable reference types.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-cs-1',
          chapterId: 'chap-cs-1',
          slug: 'dotnet-sdk-and-top-level-statements',
          title: '.NET 8 SDK, CLI & Top-Level Statements',
          description: 'dotnet new, dotnet run, dotnet watch, and minimal top-level Program.cs.',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master the modern .NET CLI and top-level statement syntax.

\`\`\`csharp
Console.WriteLine("Welcome to C# & .NET 8 on EduCode Academy!");
\`\`\`
`,
        },
        {
          id: 'les-cs-2',
          chapterId: 'chap-cs-1',
          slug: 'types-value-vs-reference-and-nullability',
          title: 'Value Types, Reference Types & Nullable Types (?)',
          description: 'Stack vs heap, nullable reference types (#nullable enable), and null-coalescing operators (??, ??=).',
          duration: 20,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Eliminate NullReferenceException with nullable reference type checks.
`,
        },
        {
          id: 'les-cs-3',
          chapterId: 'chap-cs-1',
          slug: 'pattern-matching-and-switch-expressions',
          title: 'Advanced Pattern Matching & Switch Expressions',
          description: 'Positional patterns, relational patterns (e.g. > 100), and property patterns.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write expressive switch expressions in modern C#.
`,
        },
        {
          id: 'les-cs-4',
          chapterId: 'chap-cs-1',
          slug: 'collections-lists-and-dictionaries',
          title: 'Collections: List<T>, Dictionary<TKey, TValue> & Spans',
          description: 'Generic collections, collection expressions ([1, 2, 3]), and ReadOnlySpan for performance.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Leverage collection expressions and fast dictionary lookups.
`,
        },
        {
          id: 'les-cs-5',
          chapterId: 'chap-cs-1',
          slug: 'methods-params-and-in-out-ref',
          title: 'Methods, in, out, ref Parameters & Extension Methods',
          description: 'Method overloading, extension methods on existing types, and pass-by-reference.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Create clean extension methods to enrich domain models.
`,
        },
      ],
    },
    {
      id: 'chap-cs-2',
      courseId: 'course-csharp',
      title: 'Object-Oriented C# & Records',
      description: 'Classes, encapsulation, inheritance, interfaces, records, and delegates.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-cs-6',
          chapterId: 'chap-cs-2',
          slug: 'classes-properties-and-constructors',
          title: 'Classes, Auto-Properties & Primary Constructors',
          description: 'C# 12 primary constructors on classes, init-only setters, and access modifiers.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Simplify class definitions with primary constructors.

\`\`\`csharp
public class Course(string id, string title, int hours)
{
    public string Id { get; init; } = id;
    public string Title { get; set; } = title;
    public int Hours { get; set; } = hours;
}
\`\`\`
`,
        },
        {
          id: 'les-cs-7',
          chapterId: 'chap-cs-2',
          slug: 'records-and-immutable-data-structures',
          title: 'Records & Immutable Data Structures (with Expressions)',
          description: 'Value-based equality in record class / record struct, with expressions for non-destructive mutation.',
          duration: 25,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Model DTOs with C# records.
`,
        },
        {
          id: 'les-cs-8',
          chapterId: 'chap-cs-2',
          slug: 'inheritance-abstract-classes-and-interfaces',
          title: 'Inheritance, Abstract Classes & Interface Default Implementations',
          description: 'Polymorphic dispatch with virtual/override, explicit interface implementation.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Design clean object hierarchies with interfaces and abstract base classes.
`,
        },
        {
          id: 'les-cs-9',
          chapterId: 'chap-cs-2',
          slug: 'generics-and-generic-constraints',
          title: 'Generics & Constraints (where T : class, new())',
          description: 'Type-safe generic repositories and factory methods.',
          duration: 20,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Enforce generic constraints in generic services.
`,
        },
        {
          id: 'les-cs-10',
          chapterId: 'chap-cs-2',
          slug: 'delegates-events-and-lambdas',
          title: 'Delegates, Func<T>, Action<T>, Events & Lambdas',
          description: 'Event-driven architecture, lambda expressions, and predicate filters.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use \`Func<T>\` and \`Action<T>\` delegates for functional abstractions.
`,
        },
      ],
    },
    {
      id: 'chap-cs-3',
      courseId: 'course-csharp',
      title: 'LINQ & Asynchronous C#',
      description: 'LINQ queries, async/await, Task Parallel Library, exceptions, and JSON.',
      order: 3,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-cs-11',
          chapterId: 'chap-cs-3',
          slug: 'linq-method-and-query-syntax',
          title: 'LINQ: Where, Select, GroupBy, Join & Aggregate',
          description: 'Deferred execution, IEnumerable vs IQueryable, and expressive queries.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Transform collections with fluent LINQ operations.
`,
        },
        {
          id: 'les-cs-12',
          chapterId: 'chap-cs-3',
          slug: 'async-await-and-task-parallel-library',
          title: 'Asynchronous Programming with async, await & Task',
          description: 'Task.WhenAll, cancellation tokens (CancellationToken), avoiding deadlocks with ConfigureAwait.',
          duration: 30,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute non-blocking I/O operations with \`async/await\`.
`,
        },
        {
          id: 'les-cs-13',
          chapterId: 'chap-cs-3',
          slug: 'exception-handling-and-custom-exceptions',
          title: 'Structured Exception Handling (try-catch-when-finally)',
          description: 'Exception filters with when, domain-specific exception hierarchies.',
          duration: 20,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use \`when\` exception filters to handle specific error conditions.
`,
        },
        {
          id: 'les-cs-14',
          chapterId: 'chap-cs-3',
          slug: 'system-text-json-serialization',
          title: 'High-Performance JSON with System.Text.Json',
          description: 'Source generators for zero-reflection JSON serialization, custom converters.',
          duration: 20,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Serialize and deserialize JSON payloads with System.Text.Json.
`,
        },
        {
          id: 'les-cs-15',
          chapterId: 'chap-cs-3',
          slug: 'memory-management-and-idisposable',
          title: 'Garbage Collection, IDisposable & using Statements',
          description: 'GC generations (0, 1, 2), unmanaged resource cleanup, and using declarations.',
          duration: 25,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Release database connections and file streams cleanly with \`using\`.
`,
        },
      ],
    },
    {
      id: 'chap-cs-4',
      courseId: 'course-csharp',
      title: 'ASP.NET Core Web APIs & Entity Framework Core',
      description: 'Minimal APIs, EF Core, Dependency Injection, JWT Auth, and xUnit.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-cs-16',
          chapterId: 'chap-cs-4',
          slug: 'aspnet-core-minimal-apis',
          title: 'ASP.NET Core .NET 8 Minimal APIs & Route Groups',
          description: 'MapGet, MapPost, TypedResults, and RouteGroupBuilder.',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build lightweight, high-performance REST endpoints with Minimal APIs.
`,
        },
        {
          id: 'les-cs-17',
          chapterId: 'chap-cs-4',
          slug: 'dependency-injection-container',
          title: 'Dependency Injection: Scoped, Transient & Singleton',
          description: 'Service lifetimes in Microsoft.Extensions.DependencyInjection.',
          duration: 25,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Choose correct service lifetimes to avoid memory leaks.
`,
        },
        {
          id: 'les-cs-18',
          chapterId: 'chap-cs-4',
          slug: 'entity-framework-core-and-dbcontext',
          title: 'Entity Framework Core (EF Core) & DbContext',
          description: 'Code-First modeling, DbSet, migrations (dotnet ef migrations add), and PostgreSQL provider.',
          duration: 30,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Map entities and run migrations with EF Core.
`,
        },
        {
          id: 'les-cs-19',
          chapterId: 'chap-cs-4',
          slug: 'ef-core-performance-and-asnotracking',
          title: 'EF Core Query Optimization: AsNoTracking & Compiled Queries',
          description: 'Read-only query performance, Include/ThenInclude eager loading, and query splitting.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Speed up database reads using \`AsNoTracking()\`.
`,
        },
        {
          id: 'les-cs-20',
          chapterId: 'chap-cs-4',
          slug: 'jwt-authentication-and-authorization',
          title: 'JWT Bearer Authentication & Policy Authorization',
          description: 'AddAuthentication, AddJwtBearer, [Authorize], and claim-based security.',
          duration: 30,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Protect .NET Web API endpoints with JWT tokens.
`,
        },
        {
          id: 'les-cs-21',
          chapterId: 'chap-cs-4',
          slug: 'unit-testing-with-xunit-and-moq',
          title: 'Unit Testing with xUnit, FluentAssertions & Moq',
          description: 'Fact, Theory, InlineData tests, and mocking database repositories.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write robust automated tests with xUnit.
`,
        },
        {
          id: 'les-cs-22',
          chapterId: 'chap-cs-4',
          slug: 'clean-architecture-and-docker-deployment',
          title: 'Clean Architecture & Alpine Docker Containerization',
          description: 'Domain, Application, Infrastructure, WebApi layers, and lightweight Docker images.',
          duration: 30,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Package .NET 8 applications into production Docker containers.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-cs-1',
      courseId: 'course-csharp',
      title: 'Enterprise Hospital Appointment & Billing API',
      description: 'Build a production .NET 8 Web API with EF Core PostgreSQL, JWT Auth, and Swagger OpenAPI.',
      difficulty: 'ADVANCED',
      estimatedHours: 12,
      techStack: ['C# 12', '.NET 8', 'EF Core', 'PostgreSQL', 'Swagger'],
      steps: [
        {
          id: 'step-cs-1',
          projectId: 'proj-cs-1',
          title: '1. Entity Framework Core Setup & Migration',
          description: 'Create DbContext and configure model builders.',
          order: 1,
          content: 'Setup Code-First migrations with PostgreSQL.',
        },
      ],
    },
  ],
};
