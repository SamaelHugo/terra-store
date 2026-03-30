import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты — TERRA',
  description: 'Свяжитесь с TERRA. Вопросы по продукции, сотрудничество, поддержка.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
