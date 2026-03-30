import { products as mockProducts, categories as mockCategories, type Product as MockProduct, type Category as MockCategory } from '@/data/products';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/* ── Strapi response types ── */

interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

interface StrapiBlockChild {
  type: string;
  text?: string;
  children?: StrapiBlockChild[];
}

interface StrapiBlock {
  type: string;
  children: StrapiBlockChild[];
}

interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | StrapiBlock[] | null;
  price: number;
  oldPrice: number | null;
  volume: string;
  inStock: boolean;
  featured: boolean;
  ingredients: string | null;
  usage: string | null;
  images: StrapiImage[];
  category: StrapiCategory | null;
}

interface StrapiResponse<T> {
  data: T;
  meta: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

/* ── Image URL builder ── */

export function strapiImageUrl(img: StrapiImage): string {
  if (img.url.startsWith('http')) return img.url;
  return `${STRAPI_URL}${img.url}`;
}

/* ── Extract plain text from Strapi Blocks JSON ── */

function blocksToText(blocks: StrapiBlock[] | string | null): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  return blocks
    .map((block) => {
      const extractText = (children: StrapiBlockChild[]): string =>
        children.map((c) => c.text ?? (c.children ? extractText(c.children) : '')).join('');
      return extractText(block.children);
    })
    .join('\n');
}

/* ── Fallback images by slug (when Strapi has no uploaded media) ── */

const fallbackImages: Record<string, string> = {
  'vitamin-d3-k2': 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
  'spirulina-organicheskaya': 'https://images.pexels.com/photos/3850810/pexels-photo-3850810.jpeg?auto=compress&cs=tinysrgb&w=600',
  'magnij-bisglycinat': 'https://images.pexels.com/photos/13787566/pexels-photo-13787566.jpeg?auto=compress&cs=tinysrgb&w=600',
  'kollagen-morskoj': 'https://images.pexels.com/photos/3652097/pexels-photo-3652097.jpeg?auto=compress&cs=tinysrgb&w=600',
  'ashvaganda-ksm-66': 'https://images.pexels.com/photos/3622479/pexels-photo-3622479.jpeg?auto=compress&cs=tinysrgb&w=600',
  'hlorella-detoks': 'https://images.pexels.com/photos/4047184/pexels-photo-4047184.jpeg?auto=compress&cs=tinysrgb&w=600',
  'omega-3-premium': 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=600',
  'kurkumin-piperin': 'https://images.pexels.com/photos/5945720/pexels-photo-5945720.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600';

/* ── Normalize Strapi data → app types ── */

function normalizeProduct(sp: StrapiProduct): MockProduct {
  const images = sp.images && sp.images.length > 0
    ? sp.images.map(strapiImageUrl)
    : [fallbackImages[sp.slug] ?? DEFAULT_IMAGE];

  return {
    id: sp.id,
    name: sp.name,
    slug: sp.slug,
    description: blocksToText(sp.description),
    price: sp.price,
    oldPrice: sp.oldPrice ?? undefined,
    volume: sp.volume,
    inStock: sp.inStock,
    featured: sp.featured,
    images,
    ingredients: sp.ingredients ?? undefined,
    usage: sp.usage ?? undefined,
    category: sp.category
      ? { id: sp.category.id, name: sp.category.name, slug: sp.category.slug }
      : { id: 0, name: 'Без категории', slug: 'uncategorized' },
  };
}

function normalizeCategory(sc: StrapiCategory): MockCategory {
  return { id: sc.id, name: sc.name, slug: sc.slug };
}

/* ── Typed fetch wrapper ── */

async function strapiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`);
  return res.json();
}

/* ── Public API ── */

export async function getProducts(): Promise<MockProduct[]> {
  try {
    const res = await strapiFetch<StrapiResponse<StrapiProduct[]>>(
      '/products?populate=*&pagination[pageSize]=100&sort=id:asc'
    );
    if (res.data.length === 0) return mockProducts;
    return res.data.map(normalizeProduct);
  } catch {
    return mockProducts;
  }
}

export async function getFeaturedProducts(): Promise<MockProduct[]> {
  try {
    const res = await strapiFetch<StrapiResponse<StrapiProduct[]>>(
      '/products?populate=*&filters[featured][$eq]=true&sort=id:asc'
    );
    if (res.data.length === 0) return mockProducts.filter((p) => p.featured);
    return res.data.map(normalizeProduct);
  } catch {
    return mockProducts.filter((p) => p.featured);
  }
}

export async function getProductBySlug(slug: string): Promise<MockProduct | null> {
  try {
    const res = await strapiFetch<StrapiResponse<StrapiProduct[]>>(
      `/products?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`
    );
    if (res.data.length === 0) {
      const mock = mockProducts.find((p) => p.slug === slug);
      return mock ?? null;
    }
    return normalizeProduct(res.data[0]);
  } catch {
    const mock = mockProducts.find((p) => p.slug === slug);
    return mock ?? null;
  }
}

export async function getRelatedProducts(categorySlug: string, excludeId: number): Promise<MockProduct[]> {
  try {
    const res = await strapiFetch<StrapiResponse<StrapiProduct[]>>(
      `/products?populate=*&filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}&filters[id][$ne]=${excludeId}&pagination[pageSize]=4`
    );
    if (res.data.length === 0) {
      return mockProducts.filter((p) => p.category.slug === categorySlug && p.id !== excludeId).slice(0, 4);
    }
    return res.data.map(normalizeProduct);
  } catch {
    return mockProducts.filter((p) => p.category.slug === categorySlug && p.id !== excludeId).slice(0, 4);
  }
}

export async function getCategories(): Promise<MockCategory[]> {
  try {
    const res = await strapiFetch<StrapiResponse<StrapiCategory[]>>(
      '/categories?sort=id:asc'
    );
    if (res.data.length === 0) return mockCategories;
    return res.data.map(normalizeCategory);
  } catch {
    return mockCategories;
  }
}
