'use client';

export default function ProductError({ reset }: { reset: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-lg text-text-muted">Не удалось загрузить продукт</p>
        <button
          onClick={reset}
          className="glass-btn mt-6 px-8 py-3 text-[13px] uppercase tracking-[0.15em] text-text-heading/70 hover:text-text-heading"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
