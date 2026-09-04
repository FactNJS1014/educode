'use client';

import React, { useState } from 'react';
import { Save, Check, FileText } from 'lucide-react';
import { saveNoteAction } from '@/app/actions/learning.actions';

interface NoteEditorProps {
  lessonId: string;
  initialContent?: string | null;
}

export function NoteEditor({ lessonId, initialContent = '' }: NoteEditorProps) {
  const [content, setContent] = useState(initialContent || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await saveNoteAction(lessonId, content);
    setIsSaving(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>My Personal Lesson Notes</span>
        </div>
        <button
          id="save-note-btn"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Note'}</span>
        </button>
      </div>

      <textarea
        id={`note-textarea-${lessonId}`}
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={6}
        placeholder="Write key takeaways, memory aids, syntax reminders, or questions here (private to your account)..."
        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-sans resize-y"
      />
      <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
        <span>Saved securely in your account database</span>
        <span className="font-mono">{content.length} / 5000 chars</span>
      </div>
    </div>
  );
}
