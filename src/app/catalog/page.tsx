import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/strapi';
import CatalogClient from '@/components/CatalogClient';

export const metadata: Metadata = {
  title: 'Каталог — TERRA',
  description: 'Премиальные натуральные добавки для здоровья и энергии. Витамины, суперфуды, адаптогены.',
};

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <CatalogClient products={products} categories={categories} />;
}
