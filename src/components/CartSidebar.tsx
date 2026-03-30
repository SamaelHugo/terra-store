'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/store/cart';

function formatPrice(price: number) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

export default function CartSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const getTotal = useCart((s) => s.getTotal);
  const getCount = useCart((s) => s.getCount);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col sm:w-[400px]"
            style={{
              background: 'rgba(20,20,20,0.95)',
              backdropFilter: 'blur(24px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6">
              <h2 className="font-heading text-[24px] font-light text-text-heading">
                Корзина
              </h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[18px] text-text-muted transition-colors hover:text-text-heading"
              >
                ✕
              </button>
            </div>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Items */}
            {getCount() === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
                <p className="text-[15px] text-text-muted">Корзина пуста</p>
                <Link
                  href="/catalog"
                  onClick={onClose}
                  className="text-[13px] text-accent-gold transition-opacity hover:opacity-70"
                >
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-none">
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 rounded-xl p-3"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {/* Image */}
                        <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[13px] font-medium leading-tight text-text-heading/80">
                                {item.product.name}
                              </p>
                              <p className="mt-0.5 text-[11px] text-text-muted">
                                {item.product.volume}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="shrink-0 cursor-pointer text-[12px] text-text-disabled transition-colors hover:text-text-heading"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[13px] text-text-heading/60 transition-colors hover:text-text-heading"
                                style={{
                                  background: 'rgba(255,255,255,0.04)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                }}
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-[13px] tabular-nums text-text-heading">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[13px] text-text-heading/60 transition-colors hover:text-text-heading"
                                style={{
                                  background: 'rgba(255,255,255,0.04)',
                                  border: '1px solid rgba(255,255,255,0.08)',
                                }}
                              >
                                +
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-[14px] tabular-nums text-accent-gold">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div
                  className="shrink-0 px-6 pb-6 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-text-muted">Итого:</span>
                    <span className="font-body text-[24px] font-medium tabular-nums text-accent-gold">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                  <p className="mt-2 text-center text-[12px] text-text-muted">
                    Бесплатная доставка от 3 000 ₽
                  </p>
                  <button className="glass-btn mt-4 w-full cursor-pointer py-4 text-[13px] uppercase tracking-[0.2em] text-text-heading">
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
