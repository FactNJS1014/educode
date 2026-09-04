import type { SeedCourseData } from '../seed-data';

export const pythonCourseData: SeedCourseData = {
  course: {
    id: 'course-python',
    slug: 'python-programming',
    title: 'Python Programming Masterclass',
    description: 'Master Python from core syntax and OOP to building asynchronous REST APIs, SQLite databases, and scalable backend applications.',
    technology: 'Python',
    category: 'Programming Languages',
    level: 'BASIC',
    estimatedHours: 40,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-py-1',
      courseId: 'course-python',
      title: 'Python Fundamentals & Data Types',
      description: 'Environment setup, variables, dynamic typing, operators, and data collections.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-py-1',
          chapterId: 'chap-py-1',
          slug: 'python-introduction-and-setup',
          title: 'Introduction to Python & Setup',
          description: 'Why Python is dominant, interpreter architecture, and writing your first script.',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand Python's execution model (Bytecode & PVM).
- Set up a robust development environment with virtual environments (\`venv\`).
- Write and execute readable Python scripts using clean PEP 8 standards.

---

## 💡 Concept & Why Python?
Python is a high-level, interpreted, dynamically-typed programming language emphasizing **readability** and **developer productivity**.

\`\`\`python
import sys
from datetime import datetime

def greet_developer(name: str, language: str = "Python") -> str:
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"[{current_time}] Welcome {name}! Mastering {language} on EduCode Academy."

if __name__ == "__main__":
    print(greet_developer("Somchai"))
\`\`\`

### 🖥️ Expected Output
\`\`\`text
[2026-09-03 20:00:00] Welcome Somchai! Mastering Python on EduCode Academy.
\`\`\`
`,
          quiz: {
            id: 'quiz-py-1',
            lessonId: 'les-py-1',
            title: 'Python Setup & Syntax Check',
            description: 'Validate your understanding of Python bytecode and execution.',
            passingScore: 70,
            questions: [
              {
                id: 'q-py-1',
                quizId: 'quiz-py-1',
                question: 'What is the primary role of the Python Virtual Machine (PVM)?',
                type: 'MULTIPLE_CHOICE',
                order: 1,
                options: [
                  { id: 'opt-py-1-1', questionId: 'q-py-1', text: 'To compile Python code directly to machine assembly.', isCorrect: false },
                  { id: 'opt-py-1-2', questionId: 'q-py-1', text: 'To interpret and execute compiled Python bytecode (.pyc).', isCorrect: true, explanation: 'The PVM executes compiled bytecode instructions.' },
                  { id: 'opt-py-1-3', questionId: 'q-py-1', text: 'To manage git repository versions.', isCorrect: false },
                  { id: 'opt-py-1-4', questionId: 'q-py-1', text: 'To act as an HTTP web proxy.', isCorrect: false },
                ],
              },
            ],
          },
        },
        {
          id: 'les-py-2',
          chapterId: 'chap-py-1',
          slug: 'variables-and-dynamic-typing',
          title: 'Variables, Memory Model & Dynamic Typing',
          description: 'Names, references, mutability, and type annotations in Python.',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master Python's reference-based memory model (\`id()\`, \`is\`, \`==\`).
- Understand mutable vs immutable types.
- Utilize type annotations for clean code.

\`\`\`python
# Primitive and typed variables
age: int = 25
name: str = "EduCode"
scores: list[float] = [98.5, 87.0, 92.5]

print(f"User: {name}, Age: {age}, Average: {sum(scores)/len(scores):.2f}")
\`\`\`
`,
        },
        {
          id: 'les-py-3',
          chapterId: 'chap-py-1',
          slug: 'control-flow-and-match-case',
          title: 'Control Flow, Loops & Pattern Matching',
          description: 'If-elif-else, while loops, for loops with enumerate/zip, and structural pattern matching.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use \`for...in\` loops with \`enumerate\` and \`zip\`.
- Implement modern structural pattern matching (\`match...case\`).

\`\`\`python
def handle_command(command: str) -> str:
    match command.split():
        case ["start", service]:
            return f"Starting {service}..."
        case ["stop", service]:
            return f"Stopping {service}..."
        case ["restart", service]:
            return f"Restarting {service}..."
        case _:
            return "Unknown command"

print(handle_command("start web-server"))
\`\`\`
`,
        },
        {
          id: 'les-py-4',
          chapterId: 'chap-py-1',
          slug: 'lists-tuples-and-dictionaries',
          title: 'Lists, Tuples & Dictionaries Deep Dive',
          description: 'Indexing, slicing, dictionary views, and memory performance.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master list slicing with step intervals (\`list[start:stop:step]\`).
- Leverage dictionary methods (\`get\`, \`setdefault\`, \`items\`).

\`\`\`python
developer = {
    "name": "Nattawat",
    "role": "Full Stack Engineer",
    "skills": ["Python", "TypeScript", "PostgreSQL"]
}

for key, value in developer.items():
    print(f"{key.capitalize()}: {value}")
\`\`\`
`,
        },
        {
          id: 'les-py-5',
          chapterId: 'chap-py-1',
          slug: 'sets-and-comprehensions',
          title: 'Sets, Dictionary & List Comprehensions',
          description: 'Writing concise, expressive, and high-performance Pythonic expressions.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Construct list, set, and dictionary comprehensions with conditional filters.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
square_map = {n: n ** 2 for n in numbers if n <= 5}

print("Even squares:", even_squares)
print("Square map:", square_map)
\`\`\`
`,
        },
      ],
    },
    {
      id: 'chap-py-2',
      courseId: 'course-python',
      title: 'Functions, Scope & OOP',
      description: 'First-class functions, closures, classes, inheritance, and dunder methods.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-py-6',
          chapterId: 'chap-py-2',
          slug: 'functions-args-kwargs-and-scope',
          title: 'Functions, *args, **kwargs & Variable Scope',
          description: 'Positional-only, keyword-only arguments, default parameter mutability trap, and LEGB scope.',
          duration: 20,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use \`*args\` and \`**kwargs\` for dynamic parameter handling.
- Avoid the mutable default argument pitfall (\`def fn(a, list=None)\`).

\`\`\`python
def build_profile(username: str, *roles: str, **metadata: str) -> dict:
    return {
        "username": username,
        "roles": list(roles),
        "metadata": metadata
    }

user = build_profile("admin", "INSTRUCTOR", "ADMIN", department="IT", location="Bangkok")
print(user)
\`\`\`
`,
        },
        {
          id: 'les-py-7',
          chapterId: 'chap-py-2',
          slug: 'lambda-map-filter-and-reduce',
          title: 'Lambdas, Map, Filter & Functional Programming',
          description: 'Anonymous functions, higher-order functions, and functools.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use lambda expressions for sorting and mapping.
- Apply \`functools.reduce\` and \`functools.partial\`.

\`\`\`python
from functools import reduce

products = [
    {"name": "Laptop", "price": 1200},
    {"name": "Mouse", "price": 25},
    {"name": "Monitor", "price": 300}
]

# Sort by price descending
sorted_products = sorted(products, key=lambda p: p["price"], reverse=True)
total_val = reduce(lambda acc, p: acc + p["price"], products, 0)

print(f"Total inventory value: {total_val} USD")
\`\`\`
`,
        },
        {
          id: 'les-py-8',
          chapterId: 'chap-py-2',
          slug: 'classes-and-object-oriented-programming',
          title: 'Classes, Objects & Encapsulation',
          description: 'Class attributes, instance methods, properties with @property decorator.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Construct classes with \`__init__\`.
- Use \`@property\` and setters for encapsulation.

\`\`\`python
class BankAccount:
    def __init__(self, owner: str, initial_balance: float = 0.0):
        self.owner = owner
        self._balance = initial_balance

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self._balance += amount

account = BankAccount("Somsak", 500)
account.deposit(250)
print(f"{account.owner}'s balance: {account.balance} USD")
\`\`\`
`,
        },
        {
          id: 'les-py-9',
          chapterId: 'chap-py-2',
          slug: 'inheritance-and-polymorphism',
          title: 'Inheritance, Super & Polymorphism',
          description: 'Single and multiple inheritance, method resolution order (MRO), and abstract base classes.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Extend classes using \`super()\`.
- Define abstract base classes using \`abc.ABC\` and \`@abstractmethod\`.

\`\`\`python
from abc import ABC, abstractmethod

class NotificationSender(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str) -> bool:
        pass

class EmailNotifier(NotificationSender):
    def send(self, recipient: str, message: str) -> bool:
        print(f"📧 Sending Email to {recipient}: {message}")
        return True

notifier: NotificationSender = EmailNotifier()
notifier.send("user@example.com", "Your course certificate is ready!")
\`\`\`
`,
        },
        {
          id: 'les-py-10',
          chapterId: 'chap-py-2',
          slug: 'magic-dunder-methods',
          title: 'Special Magic (Dunder) Methods',
          description: '__str__, __repr__, __len__, __getitem__, __eq__, and operator overloading.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement Pythonic magic methods to customize object behavior.

\`\`\`python
class Vector2D:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __add__(self, other: "Vector2D") -> "Vector2D":
        return Vector2D(self.x + other.x, self.y + other.y)

    def __repr__(self) -> str:
        return f"Vector2D({self.x}, {self.y})"

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
print("Vector sum:", v1 + v2)
\`\`\`
`,
        },
      ],
    },
    {
      id: 'chap-py-3',
      courseId: 'course-python',
      title: 'Advanced Python & Concurrency',
      description: 'Decorators, generators, context managers, asyncio, and threading.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-py-11',
          chapterId: 'chap-py-3',
          slug: 'decorators-and-closures',
          title: 'Closures & Function Decorators',
          description: 'Lexical scoping, higher-order wrappers, and functools.wraps.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write performance measurement and authentication decorators.

\`\`\`python
import time
from functools import wraps

def timing_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"⏱️ {func.__name__} took {duration:.6f}s")
        return result
    return wrapper

@timing_decorator
def compute_heavy_task():
    return sum(i * i for i in range(1_000_000))

print("Result:", compute_heavy_task())
\`\`\`
`,
        },
        {
          id: 'les-py-12',
          chapterId: 'chap-py-3',
          slug: 'generators-and-iterators',
          title: 'Generators, Yield & Memory Efficiency',
          description: 'Generator functions, generator expressions, and building custom iterators.',
          duration: 20,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Stream large datasets without loading everything into RAM using \`yield\`.

\`\`\`python
def fibonacci_sequence(limit: int):
    a, b = 0, 1
    for _ in range(limit):
        yield a
        a, b = b, a + b

for num in fibonacci_sequence(8):
    print(num, end=" ")
print()
\`\`\`
`,
        },
        {
          id: 'les-py-13',
          chapterId: 'chap-py-3',
          slug: 'context-managers-and-with',
          title: 'Context Managers & contextlib',
          description: '__enter__ and __exit__ protocol, resource management, and @contextmanager.',
          duration: 20,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Safely manage file locks, database connections, and sockets with context managers.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def temporary_database_session():
    print("🔌 Connected to Database...")
    try:
        yield {"status": "ACTIVE"}
    finally:
        print("🔒 Closed Database Connection.")

with temporary_database_session() as session:
    print(f"Running queries with session: {session['status']}")
\`\`\`
`,
        },
        {
          id: 'les-py-14',
          chapterId: 'chap-py-3',
          slug: 'asyncio-and-coroutines',
          title: 'Asynchronous Programming with Asyncio',
          description: 'Coroutines, event loops, async/await, and asyncio.gather.',
          duration: 30,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build non-blocking I/O concurrent tasks with \`asyncio\`.

\`\`\`python
import asyncio

async def fetch_user_data(user_id: int):
    await asyncio.sleep(0.5)
    return {"id": user_id, "name": f"User_{user_id}"}

async def main():
    tasks = [fetch_user_data(i) for i in range(1, 4)]
    results = await asyncio.gather(*tasks)
    print("Fetched users concurrently:", results)

# asyncio.run(main())
\`\`\`
`,
        },
        {
          id: 'les-py-15',
          chapterId: 'chap-py-3',
          slug: 'multithreading-vs-multiprocessing',
          title: 'Multithreading vs Multiprocessing & GIL',
          description: 'Global Interpreter Lock (GIL), CPU-bound vs I/O-bound workloads, and concurrent.futures.',
          duration: 25,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Choose between threads (I/O) and processes (CPU-intensive).

\`\`\`python
from concurrent.futures import ThreadPoolExecutor

def ping_service(service_name: str) -> str:
    return f"{service_name}: ONLINE"

services = ["AuthService", "BillingService", "NotificationService"]
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(ping_service, services))
    print(results)
\`\`\`
`,
        },
      ],
    },
    {
      id: 'chap-py-4',
      courseId: 'course-python',
      title: 'Databases, Networking & APIs',
      description: 'File handling, JSON, SQLite, REST APIs with FastAPI, and Pytest.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-py-16',
          chapterId: 'chap-py-4',
          slug: 'file-io-and-json-handling',
          title: 'File I/O, Pathlib & JSON Processing',
          description: 'Reading/writing text and binary files, structured JSON serialization.',
          duration: 20,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use \`pathlib.Path\` and Python \`json\` module.

\`\`\`python
import json
from pathlib import Path

data = {"course": "Python Masterclass", "lessons": 22, "certified": True}
json_string = json.dumps(data, indent=2)
print("Formatted JSON:\\n", json_string)
\`\`\`
`,
        },
        {
          id: 'les-py-17',
          chapterId: 'chap-py-4',
          slug: 'exception-handling-and-custom-errors',
          title: 'Exception Handling & Custom Error Classes',
          description: 'Try, except, else, finally blocks and raising custom domain exceptions.',
          duration: 20,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build robust fault-tolerant applications with hierarchical exception handling.

\`\`\`python
class InsufficientFundsError(Exception):
    def __init__(self, balance: float, requested: float):
        super().__init__(f"Cannot withdraw {requested} with balance {balance}")

def withdraw(balance: float, amount: float) -> float:
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount
\`\`\`
`,
        },
        {
          id: 'les-py-18',
          chapterId: 'chap-py-4',
          slug: 'http-requests-and-web-scraping',
          title: 'HTTP Requests & API Consumption',
          description: 'Consuming external REST APIs with requests / httpx.',
          duration: 25,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Make GET/POST requests with query params, headers, and timeout handling.

\`\`\`python
import urllib.request
import json

def get_ip_info():
    url = "https://httpbin.org/get"
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        print("Connected from origin:", data.get("origin"))

get_ip_info()
\`\`\`
`,
        },
        {
          id: 'les-py-19',
          chapterId: 'chap-py-4',
          slug: 'sqlite-and-sql-databases',
          title: 'SQLite Database & Parameterized Queries',
          description: 'Creating tables, inserting rows, parameterized queries to prevent SQL Injection.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Connect to SQLite and execute secure transactional statements.

\`\`\`python
import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)")
cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", ("Somchai", "somchai@example.com"))
conn.commit()

cursor.execute("SELECT * FROM users")
print("Inserted user:", cursor.fetchone())
\`\`\`
`,
        },
        {
          id: 'les-py-20',
          chapterId: 'chap-py-4',
          slug: 'fastapi-rest-microservice',
          title: 'Building REST APIs with FastAPI & Pydantic',
          description: 'Type-driven API development, automatic OpenAPI docs, and async route handlers.',
          duration: 30,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build a lightweight REST API with FastAPI and Pydantic schemas.

\`\`\`python
# FastAPI Example
from typing import Optional
from pydantic import BaseModel

class CourseItem(BaseModel):
    id: str
    title: str
    price: float
    is_published: bool = True

def get_course_summary(course: CourseItem) -> str:
    return f"{course.title} - {course.price} USD"

print(get_course_summary(CourseItem(id="py-1", title="Python Pro", price=49.99)))
\`\`\`
`,
        },
        {
          id: 'les-py-21',
          chapterId: 'chap-py-4',
          slug: 'unit-testing-with-pytest',
          title: 'Unit Testing & Fixtures with Pytest',
          description: 'Test discovery, assertions, pytest fixtures, and test coverage.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write automated tests and setup fixtures with pytest.

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
\`\`\`
`,
        },
        {
          id: 'les-py-22',
          chapterId: 'chap-py-4',
          slug: 'packaging-poetry-and-production',
          title: 'Packaging, Poetry & Production Deployment',
          description: 'Dependency locking with Poetry, pyproject.toml, and Docker packaging.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build production-ready Python packages and deploy with Docker containers.

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN pip install poetry && poetry install --no-root
COPY . .
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-python-1',
      courseId: 'course-python',
      title: 'Full-Stack E-Commerce Backend API with SQLite',
      description: 'Build a production-grade FastAPI microservice featuring JWT auth, SQLite persistence, and automated Pytest suites.',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 12,
      repositoryUrl: 'https://github.com/educode-academy/python-fastapi-backend',
      techStack: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLite', 'Pytest', 'Docker'],
      steps: [
        {
          id: 'step-py-1',
          projectId: 'proj-python-1',
          title: '1. Architecture & Virtual Environment Setup',
          description: 'Configure Poetry, dependencies, and environment variables.',
          order: 1,
          content: 'Set up pyproject.toml with FastAPI, Uvicorn, and Pytest.',
        },
        {
          id: 'step-py-2',
          projectId: 'proj-python-1',
          title: '2. Database Models & CRUD Endpoints',
          description: 'Implement SQLite repository pattern with parameterized queries.',
          order: 2,
          content: 'Create schemas for Products, Orders, and Users.',
        },
      ],
    },
  ],
};
