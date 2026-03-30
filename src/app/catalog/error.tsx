'use client';

export default function CatalogError({ reset }: { reset: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute top-[10%] right-[5%] h-[400px] w-[400px]"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.2), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-lg text-text-muted">Не удалось загрузить каталог</p>
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
