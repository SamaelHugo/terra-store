import type { Metadata } from 'next';
import { getProductBySlug, getRelatedProducts } from '@/lib/strapi';
import ProductDetailClient from '@/components/ProductDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Продукт не найден — TERRA' };
  return {
    title: `${product.name} — TERRA`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <ProductDetailClient product={null} related={[]} />;
  }

  const related = await getRelatedProducts(product.category.slug, product.id);

  return <ProductDetailClient product={product} related={related} />;
}
