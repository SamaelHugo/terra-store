import { getProducts, getCategories } from '@/lib/strapi';
import CatalogClient from '@/components/CatalogClient';

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <CatalogClient products={products} categories={categories} />;
}
