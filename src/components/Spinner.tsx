export function Spinner() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin-slow" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}
