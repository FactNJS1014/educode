'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Download, CheckCircle, X, Share2, Sparkles } from 'lucide-react';

interface CertificateProps {
  userName: string;
  courseTitle: string;
  completionDate?: string;
  certificateId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({
  userName,
  courseTitle,
  completionDate = 'September 2026',
  certificateId = 'EDU-CERT-2026',
  isOpen,
  onClose,
}: CertificateProps) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-emerald-500/40 rounded-3xl shadow-2xl p-6 sm:p-10 text-center overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          id="close-certificate-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-emerald-500/30 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Award className="w-7 h-7" />
            </div>
          </div>

          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold mb-1">
            EduCode Academy
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 mb-2">
            Certificate of Completion
          </h2>

          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6">
            This certifies that
          </p>

          <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 mb-4 font-mono">
            {userName}
          </div>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
            has successfully fulfilled all curriculum requirements, exercises, and real-world project modules for
          </p>

          <div className="inline-block px-4 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-base font-bold text-slate-100 mb-6">
            {courseTitle}
          </div>

          <div className="pt-6 border-t border-slate-800 grid grid-cols-2 text-left text-xs text-slate-400">
            <div>
              <div className="font-semibold text-slate-300">Date Issued</div>
              <div className="font-mono text-slate-500">{completionDate}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-slate-300">Verification ID</div>
              <div className="font-mono text-emerald-400">{certificateId}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            id="print-certificate-btn"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download / Print Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
          >
            Back to Course
          </button>
        </div>
      </div>
    </div>
  );
}
