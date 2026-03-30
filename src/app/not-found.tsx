import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="pointer-events-none absolute left-[10%] top-1/2 h-[350px] w-[350px] -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-[15%] right-[10%] h-[250px] w-[250px]"
        style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.1), transparent 70%)', filter: 'blur(60px)' }}
      />

      <h1 className="relative z-10 font-heading text-[120px] font-light leading-none text-text-heading/10 md:text-[160px]">
        404
      </h1>
      <p className="relative z-10 mt-4 text-lg text-text-muted">
        Страница не найдена
      </p>
      <Link
        href="/"
        className="glass-btn relative z-10 mt-8 inline-block px-8 py-3 text-[13px] uppercase tracking-[0.15em] text-text-heading/70 hover:text-text-heading"
      >
        На главную
      </Link>
    </div>
  );
}
