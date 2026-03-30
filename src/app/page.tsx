import { getFeaturedProducts } from '@/lib/strapi';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  const featured = await getFeaturedProducts();
  return <HomeClient featured={featured} />;
}
