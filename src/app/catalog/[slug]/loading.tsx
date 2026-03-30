export default function ProductLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blobs */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Breadcrumb skeleton */}
        <div className="pt-32">
          <div
            className="inline-block h-9 w-48 animate-pulse rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-[55%_1fr] lg:gap-20">
          {/* Image skeleton */}
          <div>
            <div
              className="overflow-hidden rounded-xl p-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="aspect-[3/4] animate-pulse rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>
            <div className="mt-3 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square w-20 animate-pulse rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                />
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-6 w-20 animate-pulse rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="h-12 w-3/4 animate-pulse rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="h-4 w-24 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="mt-4 h-10 w-40 animate-pulse rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="my-4 h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="h-4 w-full animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="h-4 w-5/6 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="h-4 w-2/3 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="mt-6 h-12 w-full animate-pulse rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
