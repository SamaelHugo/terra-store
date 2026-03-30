import { getProductBySlug, getRelatedProducts } from '@/lib/strapi';
import ProductDetailClient from '@/components/ProductDetailClient';

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
