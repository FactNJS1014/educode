import type { SeedCourseData } from '../seed-data';

export const rustCourseData: SeedCourseData = {
  course: {
    id: 'course-rust',
    slug: 'rust-programming',
    title: 'Rust Systems & Memory-Safe Programming',
    description: 'Master Ownership, Borrowing, Lifetimes, Traits, Concurrency, and high-performance REST APIs with Axum.',
    technology: 'Rust',
    category: 'Programming Languages',
    level: 'ADVANCED',
    estimatedHours: 45,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-rust-1',
      courseId: 'course-rust',
      title: 'Rust Toolchain & Memory Model',
      description: 'Cargo, variables, mutability, primitive types, control flow, and statements vs expressions.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-rust-1',
          chapterId: 'chap-rust-1',
          slug: 'cargo-toolchain-and-hello-rust',
          title: 'Cargo Toolchain, rustc & Hello Rust',
          description: 'Cargo.toml, Cargo.lock, compiling with rustc, and zero-cost abstractions philosophy.',
          duration: 20,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Initialize Rust projects with Cargo and understand compilation stages.

\`\`\`rust
fn main() {
    println!("🦀 Welcome to Rust Systems Programming on EduCode Academy!");
}
\`\`\`
`,
        },
        {
          id: 'les-rust-2',
          chapterId: 'chap-rust-1',
          slug: 'variables-mutability-and-shadowing',
          title: 'Variables, Mutability (mut) & Shadowing',
          description: 'Immutable by default, shadowing for type transformations, and const declarations.',
          duration: 20,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master variable shadowing and immutable defaults in Rust.
`,
        },
        {
          id: 'les-rust-3',
          chapterId: 'chap-rust-1',
          slug: 'data-types-and-tuples-arrays',
          title: 'Scalar & Compound Data Types',
          description: 'Integers, floats, bool, char (4-byte Unicode), fixed-size arrays, and tuples.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Differentiate between stack-allocated arrays \`[T; N]\` and dynamic vectors.
`,
        },
        {
          id: 'les-rust-4',
          chapterId: 'chap-rust-1',
          slug: 'functions-and-expressions',
          title: 'Functions, Statements vs Expressions & Return Values',
          description: 'Implicit returns without semicolon, typing parameters, and divergence functions.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write concise expressions as return values in Rust.
`,
        },
        {
          id: 'les-rust-5',
          chapterId: 'chap-rust-1',
          slug: 'control-flow-and-match-pattern',
          title: 'Control Flow: if expressions, loop, while & match',
          description: 'Returning values from loop expressions, exhaustive pattern matching with match.',
          duration: 25,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use exhaustive pattern matching to handle all enum variants safely.
`,
        },
      ],
    },
    {
      id: 'chap-rust-2',
      courseId: 'course-rust',
      title: 'Ownership, Borrowing & Structs',
      description: 'The 3 ownership rules, references, slices, structs, and enums.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-rust-6',
          chapterId: 'chap-rust-2',
          slug: 'the-ownership-rules-deep-dive',
          title: 'The 3 Core Rules of Ownership & Move Semantics',
          description: 'Stack vs Heap, drop trait execution, shallow copying vs moving ownership.',
          duration: 30,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand why Rust achieves memory safety without a garbage collector.

\`\`\`rust
fn main() {
    let s1 = String::from("Rust");
    let s2 = s1; // Ownership moved to s2
    // println!("{}", s1); // Compile Error!
    println!("Owned: {}", s2);
}
\`\`\`
`,
        },
        {
          id: 'les-rust-7',
          chapterId: 'chap-rust-2',
          slug: 'borrowing-and-references-rules',
          title: 'Borrowing Rules: Shared (&T) vs Mutable (&mut T)',
          description: 'Aliasing XOR Mutability rule, preventing data races at compile time.',
          duration: 30,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Comply with the borrow checker: either one mutable reference or any number of immutable references.
`,
        },
        {
          id: 'les-rust-8',
          chapterId: 'chap-rust-2',
          slug: 'slices-str-and-slice-views',
          title: 'Slices (&str & &[T]): Safe Non-Owning References',
          description: 'String slices, string literals, array slices, and zero-cost substrings.',
          duration: 20,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Pass \`&str\` instead of \`&String\` for idiomatic API design.
`,
        },
        {
          id: 'les-rust-9',
          chapterId: 'chap-rust-2',
          slug: 'structs-impl-blocks-and-methods',
          title: 'Structs, Tuple Structs & Method impl Blocks',
          description: '&self, &mut self, self (consuming methods), and associated functions (Self::new).',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Model domain objects with structs and constructor methods.
`,
        },
        {
          id: 'les-rust-10',
          chapterId: 'chap-rust-2',
          slug: 'enums-and-option-type',
          title: 'Enums, Data Payload Variants & Option<T>',
          description: 'Eliminating null pointer bugs with Option<T> (Some / None), if let syntax.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Handle nullable values safely without exceptions using \`Option<T>\`.
`,
        },
      ],
    },
    {
      id: 'chap-rust-3',
      courseId: 'course-rust',
      title: 'Error Handling, Traits & Lifetimes',
      description: 'Result<T, E>, traits, generic types, lifetime annotations, and collections.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-rust-11',
          chapterId: 'chap-rust-3',
          slug: 'error-handling-with-result-and-question-mark',
          title: 'Error Handling with Result<T, E> & The ? Operator',
          description: 'Propagating errors cleanly with ?, map_err, and anyhow/thiserror crates.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Propagate errors without boilerplate using the \`?\` operator.
`,
        },
        {
          id: 'les-rust-12',
          chapterId: 'chap-rust-3',
          slug: 'generics-and-type-parameters',
          title: 'Generics, Generic Functions & Structs',
          description: 'Monomorphization, zero runtime overhead of generic code.',
          duration: 20,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Create generic algorithms that compile to specialized machine code.
`,
        },
        {
          id: 'les-rust-13',
          chapterId: 'chap-rust-3',
          slug: 'traits-and-shared-behavior',
          title: 'Traits: Defining Shared Behavior & Trait Bounds',
          description: 'impl Trait, dyn Trait (dynamic dispatch), Display, Debug, Clone, and Default traits.',
          duration: 30,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement polymorphic behavior with traits and trait bounds (\`T: Display + Clone\`).
`,
        },
        {
          id: 'les-rust-14',
          chapterId: 'chap-rust-3',
          slug: 'lifetimes-and-borrow-checker',
          title: 'Lifetimes (\'a): Lifetime Annotations in References',
          description: 'Lifetime elision rules, struct lifetime bounds, and static lifetime (\'static).',
          duration: 35,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Annotate reference lifetimes to guarantee references never outlive their referents.
`,
        },
        {
          id: 'les-rust-15',
          chapterId: 'chap-rust-3',
          slug: 'collections-vec-hashmap-and-string',
          title: 'Standard Collections: Vec, HashMap & String Internals',
          description: 'Vectors, HashMaps, entry API (or_insert), and UTF-8 byte representation.',
          duration: 25,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use HashMap entry API for atomic insert/update workflows.
`,
        },
      ],
    },
    {
      id: 'chap-rust-4',
      courseId: 'course-rust',
      title: 'Concurrency, Async & Axum Web APIs',
      description: 'Threads, channels, Arc/Mutex, smart pointers, Tokio, and Axum.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-rust-16',
          chapterId: 'chap-rust-4',
          slug: 'closures-and-iterators',
          title: 'Closures (Fn, FnMut, FnOnce) & Iterators',
          description: 'Capturing environment by reference or move, map, filter, fold on iterators.',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write functional pipelines with zero-cost iterators.
`,
        },
        {
          id: 'les-rust-17',
          chapterId: 'chap-rust-4',
          slug: 'smart-pointers-box-rc-refcell',
          title: 'Smart Pointers: Box<T>, Rc<T> & RefCell<T>',
          description: 'Heap allocation with Box, reference counting with Rc, and interior mutability.',
          duration: 30,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use smart pointers for recursive data types and shared references.
`,
        },
        {
          id: 'les-rust-18',
          chapterId: 'chap-rust-4',
          slug: 'multithreading-and-message-passing',
          title: 'Concurrency: std::thread & Message Passing (mpsc)',
          description: 'Spawning threads with move closures, multiple-producer single-consumer channels.',
          duration: 30,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Send data safely across thread boundaries without race conditions.
`,
        },
        {
          id: 'les-rust-19',
          chapterId: 'chap-rust-4',
          slug: 'shared-state-concurrency-arc-mutex',
          title: 'Shared State Concurrency with Arc<Mutex<T>>',
          description: 'Atomic reference counting (Arc) and thread-safe locking with Mutex.',
          duration: 30,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Share mutable state across threads safely using \`Arc<Mutex<T>>\`.
`,
        },
        {
          id: 'les-rust-20',
          chapterId: 'chap-rust-4',
          slug: 'tokio-async-runtime-and-futures',
          title: 'Asynchronous Programming with Tokio Runtime',
          description: 'async/await, Futures, tokio::spawn, and non-blocking network I/O.',
          duration: 30,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build non-blocking asynchronous systems with Tokio.
`,
        },
        {
          id: 'les-rust-21',
          chapterId: 'chap-rust-4',
          slug: 'axum-web-api-and-routing',
          title: 'Building REST Microservices with Axum',
          description: 'Axum Router, Json extractor, Path/Query extractors, and response status codes.',
          duration: 30,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build high-performance, type-safe HTTP services with Axum.
`,
        },
        {
          id: 'les-rust-22',
          chapterId: 'chap-rust-4',
          slug: 'sqlx-postgresql-and-docker-deployment',
          title: 'Compile-Time SQL Validation with SQLx & PostgreSQL',
          description: 'Compile-time checked queries (query!), connection pooling, and multi-stage Docker.',
          duration: 30,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Connect to PostgreSQL with compile-time verified SQL queries using SQLx.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-rust-1',
      courseId: 'course-rust',
      title: 'High-Performance Axum Async REST Microservice',
      description: 'Build a lightning-fast Rust web service using Axum, Tokio async runtime, SQLx PostgreSQL, and Docker.',
      difficulty: 'ADVANCED',
      estimatedHours: 14,
      techStack: ['Rust 1.78', 'Axum', 'Tokio', 'SQLx', 'Docker'],
      steps: [
        {
          id: 'step-rust-1',
          projectId: 'proj-rust-1',
          title: '1. Async Server & Route Configuration',
          description: 'Configure Axum router and Tokio multi-thread runtime.',
          order: 1,
          content: 'Setup Cargo.toml dependencies and application state.',
        },
      ],
    },
  ],
};
