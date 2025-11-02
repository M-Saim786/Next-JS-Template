export default function FullPageLoader() {
  return (
    <div className="flex h-screen items-center justify-center gap-2 bg-background">
      <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      <span className="text-slate-600">Loading…</span>
    </div>
  );
}
