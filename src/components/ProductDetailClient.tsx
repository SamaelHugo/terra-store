'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/store/cart';
import { useToast } from '@/components/CartToast';

/* ── helpers ── */

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

function discountPercent(oldPrice: number, price: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/* ── fallback extra images (used when product has only 1 image) ── */

const fallbackExtraImages: Record<string, string[]> = {
  'vitamin-d3-k2': [
    'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/13787566/pexels-photo-13787566.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  'spirulina-organicheskaya': [
    'https://images.pexels.com/photos/3850810/pexels-photo-3850810.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4047184/pexels-photo-4047184.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  'magnij-bisglycinat': [
    'https://images.pexels.com/photos/13787566/pexels-photo-13787566.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3652097/pexels-photo-3652097.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  'kollagen-morskoj': [
    'https://images.pexels.com/photos/3652097/pexels-photo-3652097.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3622479/pexels-photo-3622479.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3850810/pexels-photo-3850810.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  'ashvaganda-ksm-66': [
    'https://images.pexels.com/photos/3622479/pexels-photo-3622479.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5945720/pexels-photo-5945720.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  'hlorella-detoks': [
    'https://images.pexels.com/photos/4047184/pexels-photo-4047184.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3850810/pexels-photo-3850810.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3622479/pexels-photo-3622479.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  'omega-3-premium': [
    'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3652097/pexels-photo-3652097.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  'kurkumin-piperin': [
    'https://images.pexels.com/photos/5945720/pexels-photo-5945720.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3622479/pexels-photo-3622479.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4047184/pexels-photo-4047184.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
};

/* ── fallback ingredients / usage for mock products ── */

const fallbackIngredients: Record<string, string> = {
  'vitamin-d3-k2': 'Витамин D3 (холекальциферол) — 2000 МЕ, Витамин K2 (менахинон MK-7) — 100 мкг, оливковое масло первого отжима, желатиновая капсула, глицерин.',
  'spirulina-organicheskaya': 'Органическая спирулина (Arthrospira platensis) — 500 мг, фикоцианин, хлорофилл, бета-каротин, железо, витамин B12. Без добавок и наполнителей.',
  'magnij-bisglycinat': 'Магний (в форме бисглицината) — 200 мг, целлюлозная капсула (HPMC), рисовая мука. Без стеарата магния, без глютена.',
  'kollagen-morskoj': 'Гидролизованный коллаген из дикой рыбы (тип I и III) — 10 г, витамин C — 80 мг, гиалуроновая кислота — 50 мг. Без ароматизаторов и красителей.',
  'ashvaganda-ksm-66': 'Экстракт корня ашваганды KSM-66® — 600 мг (5% витанолидов), целлюлозная капсула, рисовый экстракт. Сертификация USP.',
  'hlorella-detoks': 'Хлорелла (Chlorella vulgaris) с разрушенной клеточной стенкой — 500 мг, хлорофилл, CGF (фактор роста хлореллы), витамины группы B.',
  'omega-3-premium': 'Рыбий жир (дикий аляскинский лосось) — 1000 мг, EPA — 360 мг, DHA — 240 мг, витамин E (смешанные токоферолы) — антиоксидант. Молекулярная дистилляция.',
  'kurkumin-piperin': 'Экстракт куркумы (95% куркуминоидов) — 500 мг, экстракт чёрного перца (пиперин 95%) — 5 мг, целлюлозная капсула. Повышение биодоступности в 20 раз.',
};

const fallbackUsage: Record<string, string> = {
  'vitamin-d3-k2': 'Принимать по 1 капсуле в день во время еды. Рекомендуется принимать с пищей, содержащей жиры, для лучшего усвоения. Не превышать рекомендуемую дозу.',
  'spirulina-organicheskaya': 'Принимать по 4 таблетки в день, запивая водой. Начинать с 2 таблеток и постепенно увеличивать дозу. Можно добавлять в смузи.',
  'magnij-bisglycinat': 'Принимать по 1 капсуле вечером за 30 минут до сна. Можно принимать на пустой желудок. При необходимости — до 2 капсул в день.',
  'kollagen-morskoj': 'Растворить 1 мерную ложку (10 г) в 200 мл воды или сока. Принимать утром натощак за 30 минут до еды. Курс: 3 месяца.',
  'ashvaganda-ksm-66': 'Принимать по 1 капсуле 2 раза в день во время еды. Курс: 2–3 месяца с перерывом в 1 месяц. Не рекомендуется перед сном.',
  'hlorella-detoks': 'Принимать по 6 таблеток в день (по 3 утром и вечером) с водой. Начинать с 2 таблеток, увеличивая дозу в течение недели.',
  'omega-3-premium': 'Принимать по 2 капсулы в день во время еды. Хранить в холодильнике после вскрытия. Не нагревать.',
  'kurkumin-piperin': 'Принимать по 1 капсуле 2 раза в день во время еды. Пиперин в составе обеспечивает оптимальное усвоение куркумина.',
};

/* ── Accordion section ── */

function AccordionSection({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-[14px] font-medium text-text-heading/80 transition-colors duration-200 hover:text-text-heading"
      >
        {title}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-text-muted"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-[13px] leading-relaxed text-text-muted">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── 404 ── */

function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute left-[10%] top-1/2 h-[350px] w-[350px] -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-[120px] font-light leading-none text-text-heading/10"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-lg text-text-muted"
        >
          Продукт не найден
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/catalog"
            className="glass-btn mt-8 inline-block px-8 py-3 text-[13px] uppercase tracking-[0.15em] text-text-heading/70 hover:text-text-heading"
          >
            Вернуться в каталог
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Main component ── */

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product | null;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);
  const showToast = useToast((s) => s.show);

  if (!product) return <NotFound />;

  // Use product images if multiple exist (from Strapi), otherwise fall back to mock extras
  const images = product.images.length >= 3
    ? product.images
    : fallbackExtraImages[product.slug] ?? [product.images[0], product.images[0], product.images[0]];

  const ingredientsText = product.ingredients ?? fallbackIngredients[product.slug];
  const usageText = product.usage ?? fallbackUsage[product.slug];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[250px] w-[250px]"
        style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.1), transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-32"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-text-muted"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Link href="/catalog" className="transition-colors hover:text-text-heading">
              Каталог
            </Link>
            <span className="text-text-disabled">/</span>
            <span className="text-text-heading/70">{product.name}</span>
          </div>
        </motion.nav>

        {/* Product section — two columns */}
        <div className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-[55%_1fr] lg:gap-20">
          {/* LEFT — Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div
              className="overflow-hidden rounded-xl p-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeImage]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative aspect-square w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: i === activeImage
                      ? '1px solid rgba(255,255,255,0.25)'
                      : '1px solid rgba(255,255,255,0.06)',
                    padding: '2px',
                  }}
                >
                  <Image
                    src={src}
                    alt={`${product.name} — фото ${i + 1}`}
                    fill
                    sizes="80px"
                    className="rounded-md object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category pill */}
            <span
              className="mb-4 inline-block self-start rounded-full px-4 py-1.5 text-[11px] text-text-muted"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {product.category.name}
            </span>

            {/* Name */}
            <h1 className="font-heading text-[40px] font-light leading-[1.15] text-text-heading">
              {product.name}
            </h1>

            {/* Volume */}
            <p className="mt-2 text-[14px] text-text-muted">{product.volume}</p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-body text-[36px] font-medium tabular-nums text-accent-gold">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-[16px] tabular-nums text-text-disabled line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[12px] font-medium text-accent-green-light"
                    style={{
                      background: 'rgba(74,124,89,0.15)',
                      border: '1px solid rgba(74,124,89,0.2)',
                    }}
                  >
                    −{discountPercent(product.oldPrice, product.price)}%
                  </span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="my-8 h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Description */}
            <p className="text-[15px] leading-[1.8] text-text-muted">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-[18px] text-text-heading/70 transition-all duration-200 hover:text-text-heading"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                −
              </button>
              <div
                className="flex h-12 w-16 items-center justify-center rounded-xl text-[16px] tabular-nums text-text-heading"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {qty}
              </div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-[18px] text-text-heading/70 transition-all duration-200 hover:text-text-heading"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                +
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={() => {
                addItem(product, qty);
                showToast();
              }}
              className="glass-btn mt-6 w-full cursor-pointer py-4 text-[13px] uppercase tracking-[0.2em] text-text-heading"
            >
              Добавить в корзину
            </button>

            {/* Free shipping note */}
            <p className="mt-3 text-center text-[12px] text-text-muted">
              Бесплатная доставка от 3 000 ₽
            </p>

            {/* Accordion sections */}
            <div className="mt-8 flex flex-col gap-3">
              {ingredientsText && (
                <AccordionSection
                  title="Состав"
                  content={ingredientsText}
                />
              )}
              {usageText && (
                <AccordionSection
                  title="Применение"
                  content={usageText}
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="pb-32 pt-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="font-heading text-[32px] font-light text-text-heading"
            >
              Похожие
            </motion.h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
