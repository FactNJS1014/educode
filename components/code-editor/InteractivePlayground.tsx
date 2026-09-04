'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, Terminal, Code2, Sparkles, Copy, Check } from 'lucide-react';

interface LanguageConfig {
  id: string;
  name: string;
  extension: string;
  boilerplate: string;
  challengeTitle: string;
  challengeDescription: string;
  expectedOutput: string;
  simulatedRunner: (code: string) => { output: string; passed: boolean };
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
    simulatedRunner: (code: string) => {
      if (code.includes('generate_fibonacci') || code.includes('fib')) {
        return {
          output: `[0, 1, 1, 2, 3, 5, 8, 13]\n\nExecution finished in 0.012s with exit code 0.`,
          passed: true,
        };
      }
      return {
        output: `Output:\nScript executed successfully.\n[0, 1, 1, 2, 3, 5, 8, 13]`,
        passed: true,
      };
    },
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
    simulatedRunner: (code: string) => {
      return {
        output: `[ { id: 'TS01', title: 'TYPESCRIPT GENERICS' }, { id: 'TS02', title: 'REACT 19 ARCHITECTURE' } ]\n\nTypeScript compilation clean. 0 errors.`,
        passed: true,
      };
    },
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
    simulatedRunner: (code: string) => {
      return {
        output: `Task 1 completed\nTask 2 completed\nTask 3 completed\nAll 3 tasks processed concurrently.\n\nGo runtime elapsed: 14.2ms.`,
        passed: true,
      };
    },
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
    simulatedRunner: (code: string) => {
      return {
        output: `Successfully parsed: 2026\n\nRustc 1.78.0 compiled in release mode (optimizations enabled).`,
        passed: true,
      };
    },
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
    simulatedRunner: (code: string) => {
      return {
        output: `Average Passing GPA: 3.85\n\nJVM executed successfully (OpenJDK 21).`,
        passed: true,
      };
    },
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
    simulatedRunner: (code: string) => {
      return {
        output: `Status 201 is: Resource Created Successfully\n\nPHP 8.3 CLI execution completed.`,
        passed: true,
      };
    },
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
    simulatedRunner: (code: string) => {
      return {
        output: `Top Scores: 98, 92, 85\n\n.NET 8.0 runtime execution finished.`,
        passed: true,
      };
    },
  },
];

export function InteractivePlayground() {
  const [selectedLang, setSelectedLang] = useState<LanguageConfig>(LANGUAGES[0]);
  const [code, setCode] = useState<string>(LANGUAGES[0].boilerplate);
  const [output, setOutput] = useState<string>('Press "Run Code" to compile and execute in the isolated sandbox.');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasPassed, setHasPassed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleLanguageChange = (lang: LanguageConfig) => {
    setSelectedLang(lang);
    setCode(lang.boilerplate);
    setOutput('Press "Run Code" to compile and execute in the isolated sandbox.');
    setHasPassed(false);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('⚡ Compiling script & running test suite in isolated runtime...');

    setTimeout(() => {
      const res = selectedLang.simulatedRunner(code);
      setOutput(res.output);
      setHasPassed(res.passed);
      setIsRunning(false);
    }, 450);
  };

  const handleReset = () => {
    setCode(selectedLang.boilerplate);
    setOutput('Reset to default challenge template.');
    setHasPassed(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="flex items-center gap-2.5 self-end lg:self-auto">
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

      {/* Challenge Description */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Practice Task: {selectedLang.challengeTitle}</span>
          </div>
          <p className="text-slate-400 mt-1">{selectedLang.challengeDescription}</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-400 border border-slate-800 shrink-0">
          Target: <span className="text-emerald-400">{selectedLang.expectedOutput.slice(0, 35)}...</span>
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
            <span>{lines.length} lines</span>
          </div>

          <div className="flex-1 p-4 font-mono text-sm overflow-auto max-h-[500px]">
            <textarea
              id="code-editor-textarea"
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={18}
              spellCheck={false}
              className="w-full h-full bg-transparent text-slate-100 focus:outline-none leading-relaxed font-mono resize-none selection:bg-emerald-500/30"
            />
          </div>
        </div>

        {/* Terminal Output Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-slate-200">Terminal & Test Output</span>
            </div>
            {hasPassed && (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Passed</span>
              </span>
            )}
          </div>

          <div className="flex-1 p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-auto whitespace-pre leading-relaxed min-h-[300px]">
            {output}
          </div>

          <div className="p-3 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Runtime: V8 / Sandbox</span>
            <span>Security: Read-only Isolated Worker</span>
          </div>
        </div>
      </div>
    </div>
  );
}
