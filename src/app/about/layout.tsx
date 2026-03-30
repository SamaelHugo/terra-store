import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О бренде — TERRA',
  description: 'Натуральные добавки для осознанной жизни. Наша философия, качество и ценности.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
