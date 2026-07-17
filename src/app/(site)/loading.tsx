export default function Loading() {
  return (
    <div className="pt-[72px]">
      <div className="bg-cream py-16 sm:py-20">
        <div className="container-x animate-pulse">
          <div className="h-3 w-32 rounded bg-ink/10" />
          <div className="mt-6 h-10 w-2/3 rounded bg-ink/10" />
          <div className="mt-3 h-10 w-1/2 rounded bg-ink/10" />
          <div className="mt-6 h-4 w-3/4 rounded bg-ink/5" />
        </div>
      </div>
      <div className="container-x py-20">
        <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 rounded-3xl bg-ink/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
