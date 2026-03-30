'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const values = [
  {
    icon: '🌿',
    title: 'Натуральность',
    text: 'Только природные компоненты без синтетических добавок, красителей и консервантов.',
  },
  {
    icon: '🔍',
    title: 'Прозрачность',
    text: 'Полный состав на каждой упаковке. Мы публикуем результаты лабораторных тестов.',
  },
  {
    icon: '⭐',
    title: 'Качество',
    text: 'Сертифицированное производство по стандартам GMP. Контроль на каждом этапе.',
  },
  {
    icon: '🌍',
    title: 'Ответственность',
    text: 'Экологичная упаковка и этичный sourcing. Забота о планете — часть нашей миссии.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Page blobs */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.12), transparent 70%)', filter: 'blur(100px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-[5%] right-[5%] h-[300px] w-[300px]"
        style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.1), transparent 70%)', filter: 'blur(70px)' }}
      />

      {/* Hero */}
      <section className="pb-32 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-heading text-6xl font-light text-text-heading md:text-[72px]">
            О бренде
          </h1>
          <p className="mt-6 text-[16px] tracking-wide text-text-muted">
            Натуральные добавки для осознанной жизни
          </p>
        </motion.div>
      </section>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Section 1 — Philosophy */}
        <section className="py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-xl p-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Натуральные ингредиенты"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="font-heading text-[36px] font-light text-text-heading">
                Наша философия
              </h2>
              <p className="mt-6 text-[15px] leading-[1.8] text-text-muted">
                TERRA создана из убеждения, что природа уже содержит всё необходимое для здоровья и энергии. Мы не изобретаем формулы — мы бережно извлекаем лучшее из растений, минералов и морских организмов, сохраняя их природную силу.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-text-muted">
                Каждый продукт проходит путь от тщательно отобранного сырья до клинически проверенной формулы. Мы работаем с фермерами и поставщиками, которые разделяют наши ценности устойчивого и этичного производства.
              </p>
              <div className="mt-8 h-[2px] w-10 bg-accent-gold" />
            </motion.div>
          </div>
        </section>

        {/* Section 2 — Quality (reversed) */}
        <section className="py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text (first on desktop via order) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-heading text-[36px] font-light text-text-heading">
                От сырья до капсулы
              </h2>
              <p className="mt-6 text-[15px] leading-[1.8] text-text-muted">
                Мы отбираем сырьё из регионов с идеальными климатическими условиями: спирулину — из чистых озёр, ашваганду — с органических ферм Индии, коллаген — из вод Аляски. Каждая партия проходит независимый лабораторный анализ.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-text-muted">
                Производство сертифицировано по стандартам GMP. Мы используем запатентованные формы нутриентов с доказанной биодоступностью — чтобы каждая капсула действительно работала, а не просто проходила транзитом через организм.
              </p>
              <div className="mt-8 h-[2px] w-10 bg-accent-gold" />
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 overflow-hidden rounded-xl p-2 lg:order-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Контроль качества"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="relative py-32">
          {/* Green blob behind cards */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'radial-gradient(ellipse, rgba(74,124,89,0.15), transparent 70%)', filter: 'blur(80px)' }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-10 text-center"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(24px) saturate(1.2)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-4 font-heading text-[18px] font-light text-text-heading">
                  {v.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
