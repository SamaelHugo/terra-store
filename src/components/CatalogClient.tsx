'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, Category } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function CatalogClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = !activeCategory || p.category.slug === activeCategory;
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const resetFilters = () => {
    setActiveCategory(null);
    setSearchQuery('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Page background blobs */}
      <div
        className="pointer-events-none absolute top-[10%] right-[5%] h-[400px] w-[400px]"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.2), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-[10%] left-[5%] h-[300px] w-[300px]"
        style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.15), transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Header */}
      <section className="pb-20 pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center font-heading text-6xl font-light text-text-heading md:text-[72px]"
        >
          Каталог
        </motion.h1>
      </section>

      {/* Sticky toolbar */}
      <div
        className="sticky top-20 z-30"
        style={{
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          {/* Filter pills — horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <FilterPill
              label="Все"
              active={activeCategory === null}
              onClick={() => setActiveCategory(null)}
            />
            {categories.map((cat) => (
              <FilterPill
                key={cat.id}
                label={cat.name}
                active={activeCategory === cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
              />
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full py-2.5 pl-10 pr-5 text-[14px] text-text-heading placeholder-text-disabled/60 outline-none transition-all duration-300 focus:border-[rgba(255,255,255,0.2)] md:w-[240px]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="px-6 pt-16 pb-32 md:px-10 lg:px-16">
        <div className="relative z-10 mx-auto max-w-[1440px]">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-32"
            >
              <p className="text-lg text-text-muted">Ничего не найдено</p>
              <button
                onClick={resetFilters}
                className="glass-btn mt-6 px-8 py-3 text-[13px] uppercase tracking-[0.15em] text-text-heading/70 hover:text-text-heading"
              >
                Сбросить фильтры
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full px-6 py-2 text-[13px] transition-all duration-300"
      style={{
        background: active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
        border: active
          ? '1px solid rgba(255,255,255,0.2)'
          : '1px solid rgba(255,255,255,0.08)',
        color: active ? 'var(--text-heading)' : 'var(--text-muted)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {label}
    </button>
  );
}
