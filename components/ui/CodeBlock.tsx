'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'text',
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative my-4 rounded-xl border border-slate-700/60 bg-slate-950/90 text-slate-100 shadow-xl overflow-hidden font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename ? (
            <span className="font-medium text-slate-300">{filename}</span>
          ) : (
            <div className="flex items-center gap-1.5 uppercase font-semibold tracking-wider text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>{language}</span>
            </div>
          )}
        </div>

        <button
          id={`copy-btn-${language}`}
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs font-sans cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto text-slate-200 leading-relaxed scrollbar-thin">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 text-right text-slate-600 font-mono text-xs leading-relaxed border-r border-slate-800/80 mr-4">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="font-mono flex-1 whitespace-pre">{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}
