import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'indigo' | 'blue' | 'purple';
}

export function ProgressBar({
  progress,
  className = '',
  showLabel = false,
  size = 'md',
  color = 'emerald',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(progress || 0)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const colorGradients = {
    emerald: 'bg-emerald-500',
    indigo: 'bg-indigo-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
  }[color];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-1.5">
          <span>Progress</span>
          <span className="font-mono text-slate-200">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightClasses}`}>
        <div
          className={`${heightClasses} ${colorGradients} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
