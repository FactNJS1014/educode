import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { executeJavaScript, executeInterpretedLanguage } from '@/lib/code-runner/executor';
import { executePython } from '@/lib/code-runner/python-engine';

const execFileAsync = promisify(execFile);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language, code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const lang = (language || 'typescript').toLowerCase();

    // 1. PYTHON EXECUTION
    if (lang === 'python' || lang === 'py') {
      const startTime = performance.now();
      try {
        // Attempt system python3 if available
        const { stdout, stderr } = await execFileAsync('python3', ['-c', code], {
          timeout: 3500,
          maxBuffer: 1024 * 1024,
        });

        const duration = Math.round((performance.now() - startTime) * 100) / 100;
        const output = (stdout || '') + (stderr ? `\n[Standard Error]:\n${stderr}` : '');

        return NextResponse.json({
          output: output.trim() || 'Code executed successfully with no output.',
          executionTimeMs: duration,
          exitCode: 0,
        });
      } catch (execErr: any) {
        // If python binary does not exist (e.g. Netlify/Vercel serverless environment), fall back to universal Python engine
        if (execErr.code === 'ENOENT' || execErr.message?.includes('ENOENT')) {
          const pyResult = executePython(code);
          return NextResponse.json(pyResult);
        }

        if (execErr.killed) {
          return NextResponse.json({
            output: 'Error: Execution timed out (exceeded 3.5s limit). Possible infinite loop.',
            error: 'Timeout',
            exitCode: 124,
          });
        }

        // Return real stderr from python execution
        const duration = Math.round((performance.now() - startTime) * 100) / 100;
        const stderrMsg = execErr.stderr || execErr.stdout || execErr.message;

        return NextResponse.json({
          output: stderrMsg ? stderrMsg.trim() : 'Execution failed.',
          error: execErr.message,
          executionTimeMs: duration,
          exitCode: execErr.code || 1,
        });
      }
    }

    // 2. TYPESCRIPT / JAVASCRIPT EXECUTION
    if (lang === 'typescript' || lang === 'ts' || lang === 'javascript' || lang === 'js') {
      const result = executeJavaScript(code);
      return NextResponse.json(result);
    }

    // 3. OTHER LANGUAGES (GO, RUST, JAVA, PHP, C#)
    const result = executeInterpretedLanguage(lang, code);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Playground execution error:', err);
    return NextResponse.json(
      {
        output: `Server error executing code: ${err?.message || String(err)}`,
        error: err?.message,
        exitCode: 1,
      },
      { status: 500 }
    );
  }
}
