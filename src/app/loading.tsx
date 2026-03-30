export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-80 animate-pulse rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>

      {/* Featured skeleton */}
      <div className="px-6 py-40 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="h-16 w-60 animate-pulse rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      <div className="aspect-[3/4] animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="p-5">
        <div className="h-4 w-3/4 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="mt-3 h-4 w-1/3 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>
    </div>
  );
}
