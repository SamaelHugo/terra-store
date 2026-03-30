'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── glass input styles ── */

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
};

const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.04)';
};

const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
  e.currentTarget.style.boxShadow = 'none';
};

/* ── contact info data ── */

const contactInfo = [
  {
    label: 'Email',
    value: 'info@terra-supplements.ru',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    value: '@terra_supplements',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@terra.supplements',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Время работы',
    value: 'Пн–Пт, 10:00–19:00',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

/* ── glass card wrapper style ── */

const glassCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px) saturate(1.2)',
  WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Page blobs */}
      <div
        className="pointer-events-none absolute left-[5%] top-[10%] h-[300px] w-[300px]"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-[5%] right-[5%] h-[250px] w-[250px]"
        style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.1), transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Header */}
      <section className="pb-20 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-heading text-6xl font-light text-text-heading md:text-[72px]">
            Контакты
          </h1>
          <p className="mt-6 text-[16px] tracking-wide text-text-muted">
            Вопросы по продукции или сотрудничеству
          </p>
        </motion.div>
      </section>

      {/* Two columns */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-12"
            style={glassCardStyle}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Имя"
                      required
                      className="w-full rounded-lg p-4 text-[15px] text-text-heading outline-none transition-all duration-300 placeholder:text-text-muted/50"
                      style={inputStyle}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full rounded-lg p-4 text-[15px] text-text-heading outline-none transition-all duration-300 placeholder:text-text-muted/50"
                      style={inputStyle}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Сообщение"
                      rows={4}
                      required
                      className="w-full resize-none rounded-lg p-4 text-[15px] text-text-heading outline-none transition-all duration-300 placeholder:text-text-muted/50"
                      style={inputStyle}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                    />
                  </div>
                  <button
                    type="submit"
                    className="glass-btn mt-2 w-full cursor-pointer py-4 text-[13px] uppercase tracking-[0.2em] text-text-heading"
                  >
                    Отправить
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex min-h-[320px] flex-col items-center justify-center text-center"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      background: 'rgba(74,124,89,0.15)',
                      border: '1px solid rgba(74,124,89,0.25)',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="mt-6 text-[18px] font-light text-text-heading">
                    Спасибо!
                  </p>
                  <p className="mt-2 text-[14px] text-text-muted">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl p-8 md:p-12"
            style={glassCardStyle}
          >
            <div className="flex h-full flex-col justify-center gap-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 text-text-muted">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[12px] uppercase tracking-widest text-text-muted/60">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[15px] text-text-heading/80">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
