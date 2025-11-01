export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-7 w-44 rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border p-4">
            <div className="h-4 w-24 rounded bg-muted mb-3" />
            <div className="h-8 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border p-4 h-48" />
    </div>
  );
}
