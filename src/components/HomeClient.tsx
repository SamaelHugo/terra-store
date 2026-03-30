'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/products';

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU') + '₽';
}

export default function HomeClient({ featured }: { featured: Product[] }) {
  return (
    <>
      {/* ===== HERO — 100vh poster ===== */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* Video background — local file, image fallback via poster */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Layered gradient overlay — NOT flat */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.3)] via-[rgba(10,10,10,0.5)] to-[rgba(10,10,10,0.95)]" />

        {/* Colored blobs — visible through the navbar glass when scrolling */}
        <div
          className="pointer-events-none absolute top-[8%] left-[15%] h-[400px] w-[400px]"
          style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.3), transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="pointer-events-none absolute top-[12%] right-[10%] h-[300px] w-[300px]"
          style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.15), transparent 70%)', filter: 'blur(60px)' }}
        />

        {/* Content: just the name */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[clamp(80px,15vw,200px)] font-light leading-none tracking-[0.12em] text-text-heading"
          >
            TERRA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 text-[13px] uppercase tracking-[0.4em] text-text-heading/40"
          >
            Сила природы
          </motion.p>
        </div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="h-12 w-[1px] origin-top bg-text-heading/20"
          />
        </motion.div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="relative overflow-hidden px-6 pt-[200px] pb-[160px] md:px-10 lg:px-16">
        {/* Colored blobs BEHIND the glass cards */}
        <div
          className="pointer-events-none absolute top-[15%] left-[5%] h-[500px] w-[500px]"
          style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.3), transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="pointer-events-none absolute bottom-[10%] right-[8%] h-[450px] w-[450px]"
          style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.2), transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="pointer-events-none absolute top-[50%] left-[50%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.12), transparent 70%)', filter: 'blur(90px)' }}
        />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl font-light text-text-heading md:text-[64px]"
          >
            Избранное
          </motion.h2>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/catalog/${product.slug}`} className="glass-card group block overflow-hidden">
                  {/* Image — 3:4 */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Info — name + price only */}
                  <div className="p-5">
                    <h3 className="font-body text-[15px] font-medium text-text-heading/80">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="font-body text-sm tabular-nums text-accent-gold">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs tabular-nums text-text-disabled line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Catalog button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 flex justify-center"
          >
            <Link
              href="/catalog"
              className="glass-btn px-10 py-4 text-[13px] uppercase tracking-[0.2em] text-text-heading/70 transition-all duration-300 hover:text-text-heading"
            >
              Каталог &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== BRAND STORY — cinematic image with Ken Burns ===== */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {/* Background image with slow Ken Burns zoom */}
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 20, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Природа"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient overlay — transparent top → dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.7)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.3)] to-transparent" />

        {/* Text overlay — bottom left, 80px padding */}
        <div className="absolute bottom-12 left-6 z-10 md:bottom-20 md:left-20 lg:left-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl font-light text-white md:text-[56px] md:leading-[1.1]"
          >
            Чистые ингредиенты.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg tracking-wide text-white/50"
          >
            Без компромиссов.
          </motion.p>
        </div>
      </section>

      {/* ===== BENEFITS — glass pills with blob behind ===== */}
      <section className="relative overflow-hidden px-6 py-[120px] md:px-10 lg:px-16">
        {/* Green blob centered behind the row */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[500px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(60px)' }}
        />

        <div className="relative z-10 mx-auto grid max-w-[800px] grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
          {[
            { icon: '🌿', text: 'Натуральное' },
            { icon: '🔬', text: 'Проверено' },
            { icon: '✓', text: 'Без ГМО' },
            { icon: '📦', text: 'Доставка' },
          ].map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3 rounded-full px-8 py-4"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px) saturate(1.2)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-[14px] text-text-heading">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
