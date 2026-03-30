'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import { useCart } from '@/store/cart';
import { useToast } from '@/components/CartToast';

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU') + '₽';
}

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const addItem = useCart((s) => s.addItem);
  const showToast = useToast((s) => s.show);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    showToast();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={`/catalog/${product.slug}`}
        className="glass-card group flex h-full cursor-pointer flex-col overflow-hidden"
      >
        {/* Image — 3:4 */}
        <div className="img-shimmer relative aspect-[3/4] overflow-hidden rounded-t-[15px]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Info — flex column */}
        <div className="flex flex-1 flex-col p-5">
          {/* Category pill */}
          <span
            className="mb-2 inline-block self-start rounded-full px-3 py-1 text-[11px] text-text-muted"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {product.category.name}
          </span>

          <h3 className="mb-1 font-body text-[15px] font-medium text-text-heading/80">
            {product.name}
          </h3>

          {/* Price row */}
          <div className="mb-0.5 flex items-center gap-3">
            <span className="font-body text-lg tabular-nums text-accent-gold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[14px] tabular-nums text-text-disabled line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Volume */}
          <p className="mb-4 text-[12px] text-text-muted">{product.volume}</p>

          {/* "В корзину" button — collapses when not hovered, reveals on card hover */}
          <div className="mt-auto grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:pt-4">
            <div className="overflow-hidden">
              <button
                className="w-full cursor-pointer rounded-lg py-3 text-[13px] uppercase tracking-wider text-text-heading opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
                onClick={handleAddToCart}
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
