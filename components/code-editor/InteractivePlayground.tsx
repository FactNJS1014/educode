'use client';

import React, { useState, useRef } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle,
  Terminal,
  Sparkles,
  Copy,
  Check,
  Trash2,
  FileCode,
  AlertCircle,
  Info
} from 'lucide-react';
import { executeJavaScript, executeInterpretedLanguage } from '@/lib/code-runner/executor';
import { executePython } from '@/lib/code-runner/python-engine';

interface CodePreset {
  name: string;
  code: string;
}

interface LanguageConfig {
  id: string;
  name: string;
  extension: string;
  boilerplate: string;
  challengeTitle: string;
  challengeDescription: string;
  expectedOutput: string;
  presets: CodePreset[];
}

const LANGUAGES: LanguageConfig[] = [
  {
    id: 'python',
    name: 'Python',
    extension: 'py',
    challengeTitle: 'Fibonacci Sequence Generator',
    challengeDescription: 'Generate the first 8 numbers in the Fibonacci sequence and print the result as a list.',
    expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13]',
    boilerplate: `def generate_fibonacci(n: int) -> list[int]:
    """Generates the first n Fibonacci numbers."""
    if n <= 0:
        return []
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib[:n]

if __name__ == "__main__":
    result = generate_fibonacci(8)
    print(result)
`,
    presets: [
      {
        name: 'Fibonacci (Challenge)',
        code: `def generate_fibonacci(n: int) -> list[int]:
    if n <= 0:
        return []
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib[:n]

print(generate_fibonacci(8))
`,
      },
      {
        name: 'Hello World & Math',
        code: `print("👋 Welcome to EduCode Python Sandbox!")

languages = ["Python", "TypeScript", "Go", "Rust"]
for i, lang in enumerate(languages, start=1):
    print(f"{i}. Learning {lang}")

total = sum([x * 2 for x in range(1, 6)])
print(f"Computed total: {total}")
`,
      },
      {
        name: 'Prime Number Checker',
        code: `def is_prime(num: int) -> bool:
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

primes = [n for n in range(2, 30) if is_prime(n)]
print("Primes under 30:", primes)
`,
      },
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'ts',
    challengeTitle: 'Generic Filter & Map Utility',
    challengeDescription: 'Filter active courses and transform them into uppercase title records.',
    expectedOutput: `[ { id: 'TS01', title: 'TYPESCRIPT GENERICS' }, { id: 'TS02', title: 'REACT 19 ARCHITECTURE' } ]`,
    boilerplate: `interface Course {
  id: string;
  title: string;
  active: boolean;
}

const courses: Course[] = [
  { id: 'TS01', title: 'TypeScript Generics', active: true },
  { id: 'TS02', title: 'React 19 Architecture', active: true },
  { id: 'TS03', title: 'Deprecated Legacy Stack', active: false },
];

const activeTitles = courses
  .filter(c => c.active)
  .map(c => ({ id: c.id, title: c.title.toUpperCase() }));

console.log(activeTitles);
`,
    presets: [
      {
        name: 'Generics Filter (Challenge)',
        code: `interface Course {
  id: string;
  title: string;
  active: boolean;
}

const courses: Course[] = [
  { id: 'TS01', title: 'TypeScript Generics', active: true },
  { id: 'TS02', title: 'React 19 Architecture', active: true },
  { id: 'TS03', title: 'Deprecated Legacy Stack', active: false },
];

const activeTitles = courses
  .filter(c => c.active)
  .map(c => ({ id: c.id, title: c.title.toUpperCase() }));

console.log(activeTitles);
`,
      },
      {
        name: 'Array Transformations',
        code: `const scores = [85, 92, 78, 96, 60, 88];

const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
const honors = scores.filter(s => s >= 85).sort((a, b) => b - a);

console.log('Class Average:', average.toFixed(1));
console.log('Honors Students:', honors);
`,
      },
      {
        name: 'Async Promise Pipeline',
        code: `const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchStats() {
  console.log('Fetching live learner telemetry...');
  const users = [{ name: 'Somchai', level: 5 }, { name: 'Alice', level: 8 }];
  console.log('Loaded ' + users.length + ' active learners.');
  return users;
}

fetchStats().then(data => console.log('Final payload:', data));
`,
      },
    ],
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    extension: 'go',
    challengeTitle: 'Concurrent Worker Pool Pipeline',
    challengeDescription: 'Distribute 3 async tasks across Goroutines using sync.WaitGroup.',
    expectedOutput: `Task 1 completed\nTask 2 completed\nTask 3 completed\nAll 3 tasks processed concurrently.`,
    boilerplate: `package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(10 * time.Millisecond)
	fmt.Printf("Task %d completed\\n", id)
}

func main() {
	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, &wg)
	}
	wg.Wait()
	fmt.Println("All 3 tasks processed concurrently.")
}
`,
    presets: [
      {
        name: 'Goroutines (Challenge)',
        code: `package main

import (
	"fmt"
	"sync"
)

func main() {
	for i := 1; i <= 3; i++ {
		fmt.Printf("Task %d completed\\n", i)
	}
	fmt.Println("All 3 tasks processed concurrently.")
}
`,
      },
      {
        name: 'Structs & Slices',
        code: `package main

import "fmt"

type Learner struct {
	Name   string
	Points int
}

func main() {
	students := []Learner{
		{"Nattawut", 950},
		{"Siriporn", 1200},
	}
	for _, s := range students {
		fmt.Printf("Student: %s, Score: %d\\n", s.Name, s.Points)
	}
}
`,
      },
    ],
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: 'rs',
    challengeTitle: 'Pattern Matching & Result Handling',
    challengeDescription: 'Safely parse a numeric string using Result and match expressions.',
    expectedOutput: `Successfully parsed: 2026`,
    boilerplate: `fn parse_year(input: &str) -> Result<u32, std::num::ParseIntError> {
    input.trim().parse::<u32>()
}

fn main() {
    let raw_year = "2026";
    match parse_year(raw_year) {
        Ok(year) => println!("Successfully parsed: {}", year),
        Err(e) => eprintln!("Parse error: {}", e),
    }
}
`,
    presets: [
      {
        name: 'Result Matching (Challenge)',
        code: `fn parse_year(input: &str) -> Result<u32, std::num::ParseIntError> {
    input.trim().parse::<u32>()
}

fn main() {
    let raw_year = "2026";
    match parse_year(raw_year) {
        Ok(year) => println!("Successfully parsed: {}", year),
        Err(e) => eprintln!("Parse error: {}", e),
    }
}
`,
      },
      {
        name: 'Vector Operations',
        code: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let squares: Vec<i32> = numbers.iter().map(|&x| x * x).collect();
    println!("Squared values: {:?}", squares);
}
`,
      },
    ],
  },
  {
    id: 'java',
    name: 'Java',
    extension: 'java',
    challengeTitle: 'Java 21 Record & Functional Stream',
    challengeDescription: 'Filter active students and compute average GPA.',
    expectedOutput: `Average Passing GPA: 3.85`,
    boilerplate: `import java.util.List;

public class Main {
    public record Student(String name, double gpa, boolean passed) {}

    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Somchai", 3.9, true),
            new Student("Alice", 3.8, true),
            new Student("Bob", 1.9, false)
        );

        double avgGpa = students.stream()
            .filter(Student::passed)
            .mapToDouble(Student::gpa)
            .average()
            .orElse(0.0);

        System.out.printf("Average Passing GPA: %.2f%n", avgGpa);
    }
}
`,
    presets: [
      {
        name: 'Streams & Records (Challenge)',
        code: `import java.util.List;

public class Main {
    public record Student(String name, double gpa, boolean passed) {}

    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Somchai", 3.9, true),
            new Student("Alice", 3.8, true),
            new Student("Bob", 1.9, false)
        );

        double avgGpa = students.stream()
            .filter(Student::passed)
            .mapToDouble(Student::gpa)
            .average()
            .orElse(0.0);

        System.out.printf("Average Passing GPA: %.2f%n", avgGpa);
    }
}
`,
      },
    ],
  },
  {
    id: 'php',
    name: 'PHP',
    extension: 'php',
    challengeTitle: 'Modern PHP 8 Match Expression',
    challengeDescription: 'Categorize HTTP status codes using PHP 8 match expressions.',
    expectedOutput: `Status 201 is: Resource Created Successfully`,
    boilerplate: `<?php
declare(strict_types=1);

function getStatusDescription(int $code): string {
    return match ($code) {
        200 => 'OK',
        201 => 'Resource Created Successfully',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        404 => 'Not Found',
        default => 'Unknown Status',
    };
}

echo "Status 201 is: " . getStatusDescription(201) . "\\n";
`,
    presets: [
      {
        name: 'Match Expression (Challenge)',
        code: `<?php
function getStatusDescription(int $code): string {
    return match ($code) {
        200 => 'OK',
        201 => 'Resource Created Successfully',
        400 => 'Bad Request',
        default => 'Unknown',
    };
}

echo "Status 201 is: " . getStatusDescription(201) . "\\n";
`,
      },
    ],
  },
  {
    id: 'csharp',
    name: 'C#',
    extension: 'cs',
    challengeTitle: 'LINQ Query & Record Transformation',
    challengeDescription: 'Filter scores using LINQ query syntax.',
    expectedOutput: `Top Scores: 98, 92, 85`,
    boilerplate: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        int[] scores = { 45, 92, 85, 30, 98, 60 };
        var topScores = scores.Where(s => s >= 80).OrderByDescending(s => s);
        Console.WriteLine("Top Scores: " + string.Join(", ", topScores));
    }
}
`,
    presets: [
      {
        name: 'LINQ Query (Challenge)',
        code: `using System;
using System.Linq;

class Program {
    static void Main() {
        int[] scores = { 45, 92, 85, 30, 98, 60 };
        var topScores = scores.Where(s => s >= 80).OrderByDescending(s => s);
        Console.WriteLine("Top Scores: " + string.Join(", ", topScores));
    }
}
`,
      },
    ],
  },
];

export function InteractivePlayground() {
  const [selectedLang, setSelectedLang] = useState<LanguageConfig>(LANGUAGES[0]);
  const [code, setCode] = useState<string>(LANGUAGES[0].boilerplate);
  const [output, setOutput] = useState<string>('Ready. Click "Run Code" to compile and execute your latest code.');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionStats, setExecutionStats] = useState<{ timeMs?: number; exitCode?: number } | null>(null);
  const [hasPassed, setHasPassed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLanguageChange = (lang: LanguageConfig) => {
    setSelectedLang(lang);
    setCode(lang.boilerplate);
    setOutput('Ready. Click "Run Code" to compile and execute your latest code.');
    setHasPassed(false);
    setExecutionStats(null);
  };

  const handlePresetSelect = (presetCode: string) => {
    setCode(presetCode);
    setOutput('Loaded snippet. Click "Run Code" to execute.');
    setHasPassed(false);
    setExecutionStats(null);
  };

  /**
   * Runs the exact code currently present in the editor dynamically
   */
  const handleRun = async () => {
    setIsRunning(true);
    setOutput('⚡ Compiling & executing your new code...');
    setExecutionStats(null);
    setHasPassed(false);

    const currentCode = code;
    const currentLang = selectedLang.id;

    try {
      // 1. Attempt server-side execution API
      const res = await fetch('/api/playground/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: currentLang,
          code: currentCode,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const resultOutput = data.output || 'Code executed with no output.';
        setOutput(resultOutput);
        setExecutionStats({
          timeMs: data.executionTimeMs,
          exitCode: data.exitCode ?? 0,
        });

        // Determine if target output is achieved
        checkPassCondition(resultOutput, selectedLang.expectedOutput);
        setIsRunning(false);
        return;
      }
    } catch (apiErr) {
      console.warn('API execution notice, executing in client sandbox fallback:', apiErr);
    }

    // 2. Client-side execution fallback
    try {
      let localResult;
      if (currentLang === 'python' || currentLang === 'py') {
        localResult = executePython(currentCode);
      } else if (currentLang === 'typescript' || currentLang === 'ts' || currentLang === 'javascript' || currentLang === 'js') {
        localResult = executeJavaScript(currentCode);
      } else {
        localResult = executeInterpretedLanguage(currentLang, currentCode);
      }

      setOutput(localResult.output);
      setExecutionStats({
        timeMs: localResult.executionTimeMs,
        exitCode: localResult.exitCode,
      });
      checkPassCondition(localResult.output, selectedLang.expectedOutput);
    } catch (fallbackErr: any) {
      setOutput(`Execution Error: ${fallbackErr?.message || String(fallbackErr)}`);
      setExecutionStats({ exitCode: 1 });
    } finally {
      setIsRunning(false);
    }
  };

  const checkPassCondition = (actualOutput: string, targetExpected: string) => {
    const cleanActual = actualOutput.replace(/\s+/g, ' ').trim();
    const cleanExpected = targetExpected.replace(/\s+/g, ' ').trim();
    if (cleanActual.includes(cleanExpected)) {
      setHasPassed(true);
    } else {
      setHasPassed(false);
    }
  };

  const handleReset = () => {
    setCode(selectedLang.boilerplate);
    setOutput('Reset to default challenge template.');
    setHasPassed(false);
    setExecutionStats(null);
  };

  const handleClearOutput = () => {
    setOutput('Console cleared.');
    setExecutionStats(null);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Handle Tab key indentation inside the textarea
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + '  ' + val.substring(end);
      setCode(updated);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="w-full space-y-6">
      {/* Header bar with language selection */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-thin">
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              id={`playground-lang-${lang.id}`}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedLang.id === lang.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 self-end lg:self-auto flex-wrap">
          <button
            id="playground-copy-btn"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            id="playground-reset-btn"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            id="playground-run-btn"
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Challenge Description & Presets Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Practice Task: {selectedLang.challengeTitle}</span>
          </div>
          <p className="text-slate-400">{selectedLang.challengeDescription}</p>
        </div>

        {/* Code Presets Selector */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <span className="text-slate-400 flex items-center gap-1">
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>Examples:</span>
          </span>
          {selectedLang.presets.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${selectedLang.id}-${idx}`}
              onClick={() => handlePresetSelect(preset.code)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dual Pane Editor & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Pane (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-medium text-slate-200">main.{selectedLang.extension}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-[11px] text-slate-400">Press Tab to indent</span>
              <span>{lines.length} lines</span>
            </div>
          </div>

          <div className="flex-1 flex p-4 font-mono text-sm overflow-auto max-h-[520px]">
            {/* Line numbers gutter */}
            <div className="select-none pr-3 text-right text-slate-600 font-mono text-xs leading-relaxed border-r border-slate-800/80 mr-3">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Editable code area */}
            <textarea
              ref={textareaRef}
              id="code-editor-textarea"
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={Math.max(16, lines.length)}
              spellCheck={false}
              className="w-full h-full bg-transparent text-slate-100 focus:outline-none leading-relaxed font-mono resize-none selection:bg-emerald-500/30 whitespace-pre"
              placeholder="Write or edit code here..."
            />
          </div>
        </div>

        {/* Terminal Output Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-slate-200">Terminal & Execution Output</span>
            </div>
            
            <div className="flex items-center gap-2">
              {hasPassed ? (
                <span className="flex items-center gap-1 text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px]">
                  <CheckCircle className="w-3 h-3" />
                  <span>Goal Met</span>
                </span>
              ) : executionStats?.exitCode === 0 ? (
                <span className="flex items-center gap-1 text-indigo-400 font-medium px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[11px]">
                  <Info className="w-3 h-3" />
                  <span>Custom Executed</span>
                </span>
              ) : null}

              <button
                id="clear-console-btn"
                onClick={handleClearOutput}
                title="Clear console output"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-auto whitespace-pre-wrap leading-relaxed min-h-[300px] max-h-[460px]">
            {output}
          </div>

          <div className="p-3 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Runtime: {selectedLang.name}</span>
              {executionStats?.timeMs !== undefined && (
                <span className="text-emerald-400 font-mono">({executionStats.timeMs}ms)</span>
              )}
            </div>
            {executionStats?.exitCode !== undefined && (
              <span className={`font-mono ${executionStats.exitCode === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                Exit Code: {executionStats.exitCode}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
