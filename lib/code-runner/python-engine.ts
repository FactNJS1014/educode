/**
 * Robust Python-to-JavaScript Transpiler & Execution Runtime
 * Runs entirely in client-side / serverless environments without needing /usr/bin/python3
 */

export interface PythonExecutionResult {
  output: string;
  error?: string;
  executionTimeMs: number;
  exitCode: number;
}

/**
 * Transforms Python syntax into valid executable JavaScript
 */
export function transpilePythonToJS(pyCode: string): string {
  const lines = pyCode.split('\n');
  const jsLines: string[] = [];

  // Track indentation stack for block closing
  const indentStack: number[] = [0];

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    const trimmed = rawLine.trim();

    // Preserve empty lines
    if (!trimmed) {
      continue;
    }

    // Skip comments
    if (trimmed.startsWith('#')) {
      continue;
    }

    // Skip if __name__ == '__main__':
    if (trimmed.startsWith('if __name__') && trimmed.includes('__main__')) {
      continue;
    }

    // Calculate current line indentation
    const indentMatch = rawLine.match(/^(\s*)/);
    const currentIndent = indentMatch ? indentMatch[1].length : 0;

    // Pop indent stack and close curly braces
    while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
    }

    let line = trimmed;

    // Remove Python type annotations from parameters: (n: int, text: str = "") -> (n, text = "")
    line = line.replace(/def\s+([a-zA-Z_]\w*)\s*\((.*?)\)(\s*->\s*[^:]+)?:/g, (_, name, params) => {
      const cleanParams = params
        .split(',')
        .map((p: string) => {
          const parts = p.trim().split(':');
          const paramName = parts[0].trim();
          if (parts.length > 1 && parts[1].includes('=')) {
            const defVal = parts[1].split('=')[1].trim();
            return `${paramName} = ${defVal}`;
          }
          return paramName;
        })
        .join(', ');
      return `function ${name}(${cleanParams}) {`;
    });

    // Handle function definitions
    const isDef = line.startsWith('function ');

    // Handle while loops
    const isWhile = /^while\s+(.+):$/.test(line);
    if (isWhile) {
      line = line.replace(/^while\s+(.+):$/, (_, cond) => `while (${pyExprToJS(cond)}) {`);
    }

    // Handle for ... in range(...)
    const rangeMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\((.*?)\):$/);
    if (rangeMatch) {
      const iterVar = rangeMatch[1];
      const args = rangeMatch[2].split(',').map((a: string) => pyExprToJS(a.trim()));
      let start = '0';
      let end = '0';
      let step = '1';

      if (args.length === 1) {
        end = args[0];
      } else if (args.length === 2) {
        start = args[0];
        end = args[1];
      } else if (args.length === 3) {
        start = args[0];
        end = args[1];
        step = args[2];
      }
      line = `for (let ${iterVar} = ${start}; ${iterVar} < ${end}; ${iterVar} += ${step}) {`;
    }

    // Handle for ... in enumerate(...)
    const enumMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s*,\s*([a-zA-Z_]\w*)\s+in\s+enumerate\((.*?)(?:,\s*start\s*=\s*(\d+))?\):$/);
    if (enumMatch) {
      const idxVar = enumMatch[1];
      const itemVar = enumMatch[2];
      const listExpr = pyExprToJS(enumMatch[3]);
      const startIdx = enumMatch[4] || '0';
      line = `for (let [__i, ${itemVar}] of ${listExpr}.entries()) { let ${idxVar} = __i + ${startIdx};`;
    }

    // Handle standard for ... in ...
    const forInMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
    if (forInMatch && !isWhile && !rangeMatch && !enumMatch) {
      const iterVar = forInMatch[1];
      const iterable = pyExprToJS(forInMatch[2]);
      line = `for (let ${iterVar} of ${iterable}) {`;
    }

    // Handle if, elif, else
    if (/^if\s+(.+):$/.test(line)) {
      line = line.replace(/^if\s+(.+):$/, (_, cond) => `if (${pyExprToJS(cond)}) {`);
    } else if (/^elif\s+(.+):$/.test(line)) {
      line = line.replace(/^elif\s+(.+):$/, (_, cond) => `} else if (${pyExprToJS(cond)}) {`);
    } else if (line === 'else:') {
      line = '} else {';
    }

    // Check if line opens a new block
    const opensBlock = line.endsWith('{');
    if (opensBlock && !isDef && !isWhile && !rangeMatch && !enumMatch && !line.startsWith('if ') && !line.startsWith('} else')) {
      // General block
    }

    if (opensBlock) {
      indentStack.push(currentIndent + 4);
    }

    // Convert statements inside block
    if (!opensBlock && line !== '} else {') {
      line = pyStatementToJS(line);
    }

    jsLines.push(' '.repeat(currentIndent) + line);
  }

  // Close remaining blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
  }

  return jsLines.join('\n');
}

/**
 * Converts a Python statement into JS
 */
function pyStatementToJS(stmt: string): string {
  // print(...)
  const printMatch = stmt.match(/^print\((.*)\)$/);
  if (printMatch) {
    const args = splitArguments(printMatch[1]).map(a => pyExprToJS(a.trim()));
    return `__py_print(${args.join(', ')});`;
  }

  // return ...
  const returnMatch = stmt.match(/^return(\s+(.*))?$/);
  if (returnMatch) {
    const retVal = returnMatch[2] ? pyExprToJS(returnMatch[2].trim()) : '';
    return retVal ? `return ${retVal};` : 'return;';
  }

  // append: list.append(val) -> list.push(val)
  if (stmt.includes('.append(')) {
    stmt = stmt.replace(/([a-zA-Z_]\w*)\.append\((.*)\)/g, (_, listName, arg) => {
      return `${listName}.push(${pyExprToJS(arg)})`;
    });
  }

  // variable assignment: a = ...
  const assignMatch = stmt.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
  if (assignMatch && !stmt.startsWith('let ') && !stmt.startsWith('const ')) {
    const varName = assignMatch[1];
    const valExpr = pyExprToJS(assignMatch[2]);
    return `var ${varName} = ${valExpr};`;
  }

  return pyExprToJS(stmt) + ';';
}

/**
 * Converts a Python expression into JS
 */
function pyExprToJS(expr: string): string {
  let e = expr.trim();

  // Boolean & None
  e = e.replace(/\bTrue\b/g, 'true');
  e = e.replace(/\bFalse\b/g, 'false');
  e = e.replace(/\bNone\b/g, 'null');
  e = e.replace(/\band\b/g, '&&');
  e = e.replace(/\bor\b/g, '||');
  e = e.replace(/\bnot\b/g, '!');

  // len(x) -> (x).length
  e = e.replace(/len\(([^)]+)\)/g, '($1).length');

  // f-strings: f"..." -> `...`
  e = e.replace(/f"([^"]*)"/g, (_, content) => {
    return '`' + content.replace(/\{([^}]+)\}/g, '${$1}') + '`';
  });
  e = e.replace(/f'([^']*)'/g, (_, content) => {
    return '`' + content.replace(/\{([^}]+)\}/g, '${$1}') + '`';
  });

  // sum(...)
  e = e.replace(/sum\(([^)]+)\)/g, '($1).reduce((__acc, __v) => __acc + __v, 0)');

  // list comprehension: [x * 2 for x in range(1, 6)]
  const compRangeMatch = e.match(/^\[(.*?)\s+for\s+([a-zA-Z_]\w*)\s+in\s+range\((.*?)\)(?:\s+if\s+(.*?))?\]$/);
  if (compRangeMatch) {
    const mapExpr = compRangeMatch[1];
    const iterVar = compRangeMatch[2];
    const rangeArgs = compRangeMatch[3].split(',').map(s => s.trim());
    const ifCond = compRangeMatch[4];

    let start = '0';
    let end = '0';
    if (rangeArgs.length === 1) end = rangeArgs[0];
    else if (rangeArgs.length === 2) {
      start = rangeArgs[0];
      end = rangeArgs[1];
    }

    return `(() => {
      const __res = [];
      for (let ${iterVar} = ${start}; ${iterVar} < ${end}; ${iterVar}++) {
        ${ifCond ? `if (${pyExprToJS(ifCond)})` : ''} __res.push(${pyExprToJS(mapExpr)});
      }
      return __res;
    })()`;
  }

  // list comprehension over list: [n for n in list if ...]
  const compListMatch = e.match(/^\[(.*?)\s+for\s+([a-zA-Z_]\w*)\s+in\s+([a-zA-Z_]\w*)(?:\s+if\s+(.*?))?\]$/);
  if (compListMatch) {
    const mapExpr = compListMatch[1];
    const iterVar = compListMatch[2];
    const srcList = compListMatch[3];
    const ifCond = compListMatch[4];

    return `(() => {
      const __res = [];
      for (let ${iterVar} of ${srcList}) {
        ${ifCond ? `if (${pyExprToJS(ifCond)})` : ''} __res.push(${pyExprToJS(mapExpr)});
      }
      return __res;
    })()`;
  }

  // Python negative indexing and slicing: list[-1], list[:n], list[-2]
  // fib[-1] -> fib[fib.length - 1]
  e = e.replace(/([a-zA-Z_]\w*)\[-(\d+)\]/g, '$1[$1.length - $2]');
  // fib[:n] -> fib.slice(0, n)
  e = e.replace(/([a-zA-Z_]\w*)\[:([^\]]+)\]/g, '$1.slice(0, $2)');
  // fib[n:] -> fib.slice(n)
  e = e.replace(/([a-zA-Z_]\w*)\[([^:\]]+):\]/g, '$1.slice($2)');

  // Power operator ** -> **
  // Python float / int conversions: int(x), float(x), str(x)
  e = e.replace(/\bint\(([^)]+)\)/g, 'parseInt($1, 10)');
  e = e.replace(/\bfloat\(([^)]+)\)/g, 'parseFloat($1)');
  e = e.replace(/\bstr\(([^)]+)\)/g, 'String($1)');

  return e;
}

/**
 * Splits argument string respecting nested brackets and strings
 */
function splitArguments(argStr: string): string[] {
  const result: string[] = [];
  let current = '';
  let depth = 0;
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < argStr.length; i++) {
    const char = argStr[i];

    if ((char === '"' || char === "'") && argStr[i - 1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === '(' || char === '[' || char === '{') depth++;
      else if (char === ')' || char === ']' || char === '}') depth--;
      else if (char === ',' && depth === 0) {
        result.push(current.trim());
        current = '';
        continue;
      }
    }

    current += char;
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

/**
 * Execute Python code in JavaScript runtime
 */
export function executePython(code: string): PythonExecutionResult {
  const startTime = performance.now();
  const outputs: string[] = [];

  try {
    const transpiledJS = transpilePythonToJS(code);

    const runner = new Function('__py_print', `
      "use strict";
      try {
        ${transpiledJS}
      } catch (err) {
        throw err;
      }
    `);

    runner((...args: any[]) => {
      const formatted = args
        .map(a => {
          if (a === null) return 'None';
          if (a === true) return 'True';
          if (a === false) return 'False';
          if (Array.isArray(a)) return JSON.stringify(a);
          if (typeof a === 'object') return JSON.stringify(a);
          return String(a);
        })
        .join(' ');
      outputs.push(formatted);
    });

    const duration = Math.round((performance.now() - startTime) * 100) / 100;
    const outputText = outputs.length > 0 ? outputs.join('\n') : 'Code executed with no output.';

    return {
      output: `${outputText}\n\n[Python 3 Engine] Finished in ${duration}ms with exit code 0.`,
      executionTimeMs: duration,
      exitCode: 0,
    };
  } catch (err: any) {
    const duration = Math.round((performance.now() - startTime) * 100) / 100;
    const msg = err?.message || String(err);
    const existing = outputs.length > 0 ? outputs.join('\n') + '\n\n' : '';

    return {
      output: `${existing}Python Runtime Error: ${msg}\n\nExecution terminated with exit code 1 in ${duration}ms.`,
      error: msg,
      executionTimeMs: duration,
      exitCode: 1,
    };
  }
}
