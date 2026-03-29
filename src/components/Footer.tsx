'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О бренде' },
  { href: '/contact', label: 'Контакты' },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden"
    >
      {/* Subtle blob behind footer glass */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[500px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(74,124,89,0.12), transparent 70%)', filter: 'blur(60px)' }}
      />

      <div
        className="relative"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(16px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.1)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-10 py-10 sm:flex-row sm:justify-between sm:gap-0 md:px-[60px]">
          {/* Logo */}
          <Link href="/">
            <span className="font-heading text-xl font-light tracking-[0.16em] text-text-heading/60 transition-opacity duration-300 hover:opacity-70">
              TERRA
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-8">
                <Link
                  href={link.href}
                  className="text-[14px] text-text-muted transition-colors duration-500 hover:text-text-heading/80"
                >
                  {link.label}
                </Link>
                {i < navLinks.length - 1 && (
                  <span className="text-text-heading/10">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[12px] text-text-muted/60">
            &copy; 2026 TERRA
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
