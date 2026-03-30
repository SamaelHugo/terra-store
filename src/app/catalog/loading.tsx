export default function CatalogLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blobs */}
      <div
        className="pointer-events-none absolute top-[10%] right-[5%] h-[400px] w-[400px]"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.2), transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Header skeleton */}
      <section className="flex justify-center pb-20 pt-40">
        <div className="h-16 w-64 animate-pulse rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </section>

      {/* Toolbar skeleton */}
      <div className="px-6 py-4 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <section className="px-6 pt-16 pb-32 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <div className="aspect-[3/4] animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
                <div className="p-5">
                  <div className="mb-2 h-5 w-16 animate-pulse rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="h-4 w-3/4 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="mt-3 h-4 w-1/3 animate-pulse rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
