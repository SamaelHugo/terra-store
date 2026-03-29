'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О бренде' },
  { href: '/contact', label: 'Контакты' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[rgba(255,255,255,0.06)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.12)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
        style={scrolled ? { WebkitBackdropFilter: 'blur(24px) saturate(1.2)', backdropFilter: 'blur(24px) saturate(1.2)' } : undefined}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-heading text-lg font-light tracking-[0.3em] text-text-heading/90 transition-opacity duration-300 hover:opacity-70">
              TERRA
            </span>
          </Link>

          {/* Center links — desktop */}
          <div className="hidden items-center gap-12 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-heading/40 transition-all duration-500 hover:text-text-heading/80"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — cart + hamburger */}
          <div className="flex items-center gap-5">
            <button
              className="group relative text-text-heading/40 transition-all duration-500 hover:text-text-heading/80"
              aria-label="Корзина"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>

            {/* Hamburger — mobile */}
            <button
              className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1px] w-5 bg-text-heading/70"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[1px] w-5 bg-text-heading/70"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-[1px] w-5 bg-text-heading/70"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{
              background: 'rgba(10, 10, 10, 0.85)',
              backdropFilter: 'blur(32px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(32px) saturate(1.3)',
            }}
          >
            {/* Blobs behind mobile menu links */}
            <div className="blob blob-green absolute top-[20%] left-[10%] h-[300px] w-[300px] blur-[80px]" />
            <div className="blob blob-gold absolute bottom-[25%] right-[15%] h-[250px] w-[250px] blur-[60px]" />

            <nav className="relative z-10 flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-4xl font-light tracking-[0.15em] text-text-heading/60 transition-colors duration-500 hover:text-text-heading"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
