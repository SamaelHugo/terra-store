'use client';

export default function HomeError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <p className="text-lg text-text-muted">Не удалось загрузить данные</p>
      <button
        onClick={reset}
        className="glass-btn mt-6 px-8 py-3 text-[13px] uppercase tracking-[0.15em] text-text-heading/70 hover:text-text-heading"
      >
        Попробовать снова
      </button>
    </div>
  );
}
