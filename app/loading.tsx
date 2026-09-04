export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-emerald-400 animate-spin mb-4" />
      <div className="text-sm font-mono text-slate-400">Loading EduCode Academy...</div>
    </div>
  );
}
