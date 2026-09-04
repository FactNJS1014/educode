import type { SeedCourseData } from '../seed-data';

export const goCourseData: SeedCourseData = {
  course: {
    id: 'course-go',
    slug: 'go-programming',
    title: 'Go (Golang) Cloud Native Development',
    description: 'Build lightning-fast concurrent microservices with Goroutines, Channels, clean architecture, and PostgreSQL.',
    technology: 'Go',
    category: 'Programming Languages',
    level: 'INTERMEDIATE',
    estimatedHours: 35,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-go-1',
      courseId: 'course-go',
      title: 'Go Basics & Toolchain',
      description: 'Go module system, variables, types, control flow, functions, and pointers.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-go-1',
          chapterId: 'chap-go-1',
          slug: 'go-toolchain-and-hello-world',
          title: 'Go Toolchain, Modules & Workspace Setup',
          description: 'Understanding go.mod, go build, go run, and static single-binary compilation.',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Initialize Go modules with \`go mod init\`.
- Write idiomatic Go entrypoints with package main.

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("🚀 Welcome to Go Cloud Native on EduCode Academy!")
}
\`\`\`
`,
        },
        {
          id: 'les-go-2',
          chapterId: 'chap-go-1',
          slug: 'variables-constants-and-types',
          title: 'Variables, Zero Values, Constants & Basic Types',
          description: 'Explicit type declarations, short variable declarations (:=), and zero values.',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand zero value initialization and typed constants.

\`\`\`go
package main

import "fmt"

func main() {
    var port int = 8080
    host := "0.0.0.0"
    const isProduction = true

    fmt.Printf("Server starting on %s:%d (Prod: %v)\\n", host, port, isProduction)
}
\`\`\`
`,
        },
        {
          id: 'les-go-3',
          chapterId: 'chap-go-1',
          slug: 'control-structures-if-for-switch',
          title: 'Control Flow: if with statement, for loops & switch',
          description: 'Go loop semantics (while loop via for), break/continue, and tagless switch.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master if-conditions with inline assignments and switch statements.

\`\`\`go
package main

import "fmt"

func main() {
    if count := 10; count > 5 {
        fmt.Println("Count exceeds minimum threshold:", count)
    }
}
\`\`\`
`,
        },
        {
          id: 'les-go-4',
          chapterId: 'chap-go-1',
          slug: 'functions-and-multiple-returns',
          title: 'Functions, Multiple Return Values & Named Returns',
          description: 'Idiomatic error handling pattern (val, err) and variadic functions.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Return multiple values and handle errors idiomatically.

\`\`\`go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    res, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", res)
}
\`\`\`
`,
        },
        {
          id: 'les-go-5',
          chapterId: 'chap-go-1',
          slug: 'pointers-and-memory-allocation',
          title: 'Pointers, Value vs Reference & Escape Analysis',
          description: 'Pointer arithmetic absence, stack vs heap allocation via escape analysis.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Mutate struct fields via pointers and understand pass-by-value semantics.
`,
        },
      ],
    },
    {
      id: 'chap-go-2',
      courseId: 'course-go',
      title: 'Data Structures, Structs & Interfaces',
      description: 'Arrays, slices, maps, structs, methods, and interfaces.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-go-6',
          chapterId: 'chap-go-2',
          slug: 'arrays-and-slices-deep-dive',
          title: 'Arrays vs Slices, Capacity & append() Internals',
          description: 'Slice header (ptr, len, cap), slicing tricks, and copy().',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand slice reallocation when exceeding capacity.

\`\`\`go
package main

import "fmt"

func main() {
    languages := make([]string, 0, 5)
    languages = append(languages, "Go", "Rust", "TypeScript")
    fmt.Printf("Len: %d, Cap: %d, Data: %v\\n", len(languages), cap(languages), languages)
}
\`\`\`
`,
        },
        {
          id: 'les-go-7',
          chapterId: 'chap-go-2',
          slug: 'maps-and-hash-tables',
          title: 'Maps, Hash Tables & The comma-ok Idiom',
          description: 'Creating maps with make, key existence checks, and map deletion.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use the comma-ok idiom to safely inspect map keys.
`,
        },
        {
          id: 'les-go-8',
          chapterId: 'chap-go-2',
          slug: 'structs-and-method-receivers',
          title: 'Structs, Embedding & Value vs Pointer Receivers',
          description: 'Composition over inheritance with struct embedding.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Define methods on structs with pointer receivers.

\`\`\`go
package main

import "fmt"

type Course struct {
    ID    string
    Title string
    Hours int
}

func (c *Course) Extend(additional int) {
    c.Hours += additional
}

func main() {
    c := Course{ID: "G01", Title: "Go Cloud Native", Hours: 35}
    c.Extend(5)
    fmt.Printf("%s: %d hours\\n", c.Title, c.Hours)
}
\`\`\`
`,
        },
        {
          id: 'les-go-9',
          chapterId: 'chap-go-2',
          slug: 'interfaces-and-implicit-implementation',
          title: 'Interfaces, Duck Typing & Empty Interface any',
          description: 'Implicit interface fulfillment, type assertions, and type switches.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Design clean interfaces (like io.Reader, io.Writer).
`,
        },
        {
          id: 'les-go-10',
          chapterId: 'chap-go-2',
          slug: 'defer-panic-recover-and-errors',
          title: 'Defer, Panic, Recover & Custom Error Types',
          description: 'LIFO execution of defer, safe recovery, and wrapping errors with %w in fmt.Errorf.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Clean up resources (files, mutexes, connections) with \`defer\`.
`,
        },
      ],
    },
    {
      id: 'chap-go-3',
      courseId: 'course-go',
      title: 'Concurrency with Goroutines & Channels',
      description: 'Goroutines, channels, select, sync package, and context propagation.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-go-11',
          chapterId: 'chap-go-3',
          slug: 'goroutines-and-go-scheduler',
          title: 'Goroutines & Go Runtime M:N Scheduler',
          description: 'Lightweight green threads, work stealing, and GOMAXPROCS.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Launch lightweight concurrent goroutines using \`go func()\`.
`,
        },
        {
          id: 'les-go-12',
          chapterId: 'chap-go-3',
          slug: 'unbuffered-and-buffered-channels',
          title: 'Channels: Unbuffered vs Buffered Synchronization',
          description: 'Sending, receiving, closing channels, and channel directionality.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Synchronize goroutines without shared memory.

\`\`\`go
package main

import "fmt"

func worker(id int, ch chan string) {
    ch <- fmt.Sprintf("Worker %d completed task", id)
}

func main() {
    ch := make(chan string, 2)
    go worker(1, ch)
    go worker(2, ch)

    fmt.Println(<-ch)
    fmt.Println(<-ch)
}
\`\`\`
`,
        },
        {
          id: 'les-go-13',
          chapterId: 'chap-go-3',
          slug: 'select-statement-and-timeouts',
          title: 'Select Statement, Non-blocking Channels & Timeouts',
          description: 'Multiplexing channel operations with time.After and default cases.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Prevent deadlocks with select timeouts.
`,
        },
        {
          id: 'les-go-14',
          chapterId: 'chap-go-3',
          slug: 'sync-mutex-and-waitgroup',
          title: 'Sync Package: Mutex, RWMutex, WaitGroup & Once',
          description: 'Preventing race conditions with sync.Mutex and coordinating with sync.WaitGroup.',
          duration: 25,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Synchronize parallel batch processing with \`sync.WaitGroup\`.
`,
        },
        {
          id: 'les-go-15',
          chapterId: 'chap-go-3',
          slug: 'context-package-and-cancellation',
          title: 'Context Package: Timeouts, Cancellation & Values',
          description: 'context.WithTimeout, context.WithCancel, and propagating across microservices.',
          duration: 30,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Terminate abandoned HTTP requests cleanly with context cancellation.
`,
        },
      ],
    },
    {
      id: 'chap-go-4',
      courseId: 'course-go',
      title: 'REST APIs, Databases & Cloud Microservices',
      description: 'JSON, net/http, Chi router, PostgreSQL, JWT, testing, and Docker deployment.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-go-16',
          chapterId: 'chap-go-4',
          slug: 'json-encoding-and-struct-tags',
          title: 'JSON Encoding, Decoding & Struct Tags',
          description: 'json.Marshal, json.Unmarshal, omitempty, and streaming json.Decoder.',
          duration: 20,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Parse and serialize JSON using custom struct tags.
`,
        },
        {
          id: 'les-go-17',
          chapterId: 'chap-go-4',
          slug: 'building-http-server-with-net-http',
          title: 'HTTP Server with net/http & Go 1.22+ Routing',
          description: 'ServeMux method matching, handler functions, and response writers.',
          duration: 25,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build REST endpoints using modern Go 1.22+ routing (\`mux.HandleFunc("GET /items", ...)\`).
`,
        },
        {
          id: 'les-go-18',
          chapterId: 'chap-go-4',
          slug: 'http-middleware-pipeline',
          title: 'Writing Idiomatic HTTP Middleware',
          description: 'Logging, CORS, panic recovery, and authentication wrapper chains.',
          duration: 25,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement composable middleware functions (\`func(http.Handler) http.Handler\`).
`,
        },
        {
          id: 'les-go-19',
          chapterId: 'chap-go-4',
          slug: 'postgresql-with-pgxpool-and-sqlx',
          title: 'Connecting to PostgreSQL with pgxpool & SQLx',
          description: 'Connection pool tuning, parameterized SQL queries, and transaction management.',
          duration: 30,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute prepared statements safely on PostgreSQL with connection pooling.
`,
        },
        {
          id: 'les-go-20',
          chapterId: 'chap-go-4',
          slug: 'jwt-authentication-in-go',
          title: 'JWT Authentication & Password Hashing with bcrypt',
          description: 'Generating signed tokens with golang-jwt, claim validation, and middleware guards.',
          duration: 30,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Secure endpoints with signed JWT authorization tokens.
`,
        },
        {
          id: 'les-go-21',
          chapterId: 'chap-go-4',
          slug: 'unit-testing-and-benchmarks',
          title: 'Unit Testing, Table-Driven Tests & Benchmarking',
          description: 'Testing package, subtests (t.Run), test coverage, and benchmark functions (b.N).',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write table-driven test suites and profile memory allocations with benchmarks.
`,
        },
        {
          id: 'les-go-22',
          chapterId: 'chap-go-4',
          slug: 'clean-architecture-and-docker',
          title: 'Clean Architecture & Multi-Stage Docker Builds',
          description: 'Handler, Service, Repository layering, and scratch/distroless minimal Docker images (<15MB).',
          duration: 30,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Package a production Go binary into an ultra-small, secure Docker container.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-go-1',
      courseId: 'course-go',
      title: 'High-Throughput Distributed Rate Limiter & JWT API',
      description: 'Create a production-ready REST service with JWT middleware, PostgreSQL connection pooling, and Docker containerization.',
      difficulty: 'ADVANCED',
      estimatedHours: 12,
      repositoryUrl: 'https://github.com/educode-academy/go-jwt-api',
      techStack: ['Go 1.22', 'PostgreSQL', 'Docker', 'JWT', 'Chi Router'],
      steps: [
        {
          id: 'step-go-1',
          projectId: 'proj-go-1',
          title: '1. Project Setup & Database Driver Configuration',
          description: 'Configure pgxpool connection management.',
          order: 1,
          content: 'Setup clean Go project structure according to standard Go layout guidelines.',
        },
      ],
    },
  ],
};
