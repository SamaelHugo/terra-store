'use client';

import { create } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Toast state ── */

interface ToastState {
  visible: boolean;
  show: () => void;
}

export const useToast = create<ToastState>((set) => ({
  visible: false,
  show: () => {
    set({ visible: true });
    setTimeout(() => set({ visible: false }), 2000);
  },
}));

/* ── Toast component ── */

export default function CartToast() {
  const visible = useToast((s) => s.visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[60] rounded-xl px-5 py-3 text-[13px] text-text-heading"
          style={{
            background: 'rgba(20,20,20,0.9)',
            backdropFilter: 'blur(20px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          Добавлено в корзину
        </motion.div>
      )}
    </AnimatePresence>
  );
}
