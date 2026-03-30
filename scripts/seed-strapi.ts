/**
 * Seed Strapi with product data.
 * Usage: npm run seed
 *
 * Requires Strapi running on localhost:1337 with public create/delete enabled
 * for Product content type.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/* ── Category slug → documentId mapping (fetched at runtime) ── */

type CategoryMap = Record<string, string>;

/* ── Convert plain text to Strapi Blocks JSON ── */

function toBlocks(text: string) {
  return [{ type: 'paragraph', children: [{ type: 'text', text }] }];
}

/* ── Seed data ── */

const products = [
  {
    name: 'Витамин D3 + K2',
    slug: 'vitamin-d3-k2',
    description:
      'Синергетическая формула для поддержки костной ткани и иммунитета. Витамин D3 в форме холекальциферола усиливается витамином K2 (MK-7) для оптимального усвоения кальция.',
    price: 1890,
    oldPrice: null,
    volume: '60 капсул',
    inStock: true,
    featured: true,
    ingredients:
      'Витамин D3 (холекальциферол) — 2000 МЕ, Витамин K2 (менахинон MK-7) — 100 мкг, оливковое масло первого отжима, желатиновая капсула, глицерин.',
    usage:
      'Принимать по 1 капсуле в день во время еды. Рекомендуется принимать с пищей, содержащей жиры, для лучшего усвоения. Не превышать рекомендуемую дозу.',
    categorySlug: 'vitaminy',
  },
  {
    name: 'Спирулина органическая',
    slug: 'spirulina-organicheskaya',
    description:
      'Сертифицированная органическая спирулина — источник растительного белка, железа и антиоксидантов. Выращена в экологически чистых водоёмах без применения пестицидов.',
    price: 2490,
    oldPrice: null,
    volume: '120 таблеток',
    inStock: true,
    featured: false,
    ingredients:
      'Органическая спирулина (Arthrospira platensis) — 500 мг, фикоцианин, хлорофилл, бета-каротин, железо, витамин B12. Без добавок и наполнителей.',
    usage:
      'Принимать по 4 таблетки в день, запивая водой. Начинать с 2 таблеток и постепенно увеличивать дозу. Можно добавлять в смузи.',
    categorySlug: 'superfudy',
  },
  {
    name: 'Магний бисглицинат',
    slug: 'magnij-bisglycinat',
    description:
      'Хелатная форма магния с максимальной биодоступностью. Поддерживает нервную систему, качество сна и мышечное восстановление без побочных эффектов со стороны ЖКТ.',
    price: 1690,
    oldPrice: null,
    volume: '90 капсул',
    inStock: true,
    featured: false,
    ingredients:
      'Магний (в форме бисглицината) — 200 мг, целлюлозная капсула (HPMC), рисовая мука. Без стеарата магния, без глютена.',
    usage:
      'Принимать по 1 капсуле вечером за 30 минут до сна. Можно принимать на пустой желудок. При необходимости — до 2 капсул в день.',
    categorySlug: 'vitaminy',
  },
  {
    name: 'Коллаген морской',
    slug: 'kollagen-morskoj',
    description:
      'Гидролизованный морской коллаген I и III типа из дикой рыбы. Пептиды низкой молекулярной массы для максимального усвоения. Поддерживает кожу, суставы и связки.',
    price: 3290,
    oldPrice: 3990,
    volume: '300г порошок',
    inStock: true,
    featured: true,
    ingredients:
      'Гидролизованный коллаген из дикой рыбы (тип I и III) — 10 г, витамин C — 80 мг, гиалуроновая кислота — 50 мг. Без ароматизаторов и красителей.',
    usage:
      'Растворить 1 мерную ложку (10 г) в 200 мл воды или сока. Принимать утром натощак за 30 минут до еды. Курс: 3 месяца.',
    categorySlug: 'superfudy',
  },
  {
    name: 'Ашваганда KSM-66',
    slug: 'ashvaganda-ksm-66',
    description:
      'Запатентованный экстракт корня ашваганды KSM-66® полного спектра. Клинически доказано: снижает кортизол, повышает энергию и улучшает когнитивные функции.',
    price: 2190,
    oldPrice: null,
    volume: '60 капсул',
    inStock: true,
    featured: true,
    ingredients:
      'Экстракт корня ашваганды KSM-66® — 600 мг (5% витанолидов), целлюлозная капсула, рисовый экстракт. Сертификация USP.',
    usage:
      'Принимать по 1 капсуле 2 раза в день во время еды. Курс: 2–3 месяца с перерывом в 1 месяц. Не рекомендуется перед сном.',
    categorySlug: 'energiya',
  },
  {
    name: 'Хлорелла детокс',
    slug: 'hlorella-detoks',
    description:
      'Хлорелла с разрушенной клеточной стенкой для эффективного связывания токсинов и тяжёлых металлов. Богата хлорофиллом, витаминами группы B и нуклеиновыми кислотами.',
    price: 1990,
    oldPrice: null,
    volume: '180 таблеток',
    inStock: true,
    featured: false,
    ingredients:
      'Хлорелла (Chlorella vulgaris) с разрушенной клеточной стенкой — 500 мг, хлорофилл, CGF (фактор роста хлореллы), витамины группы B.',
    usage:
      'Принимать по 6 таблеток в день (по 3 утром и вечером) с водой. Начинать с 2 таблеток, увеличивая дозу в течение недели.',
    categorySlug: 'detoks',
  },
  {
    name: 'Омега-3 премиум',
    slug: 'omega-3-premium',
    description:
      'Концентрат омега-3 из дикого аляскинского лосося. Высокое содержание EPA и DHA в триглицеридной форме. Молекулярная дистилляция гарантирует чистоту от тяжёлых металлов.',
    price: 2890,
    oldPrice: null,
    volume: '120 капсул',
    inStock: true,
    featured: true,
    ingredients:
      'Рыбий жир (дикий аляскинский лосось) — 1000 мг, EPA — 360 мг, DHA — 240 мг, витамин E (смешанные токоферолы) — антиоксидант. Молекулярная дистилляция.',
    usage:
      'Принимать по 2 капсулы в день во время еды. Хранить в холодильнике после вскрытия. Не нагревать.',
    categorySlug: 'vitaminy',
  },
  {
    name: 'Куркумин + пиперин',
    slug: 'kurkumin-piperin',
    description:
      'Стандартизированный экстракт куркумы (95% куркуминоидов) с пиперином из чёрного перца для повышения биодоступности в 20 раз. Мощная антиоксидантная поддержка.',
    price: 1490,
    oldPrice: null,
    volume: '60 капсул',
    inStock: true,
    featured: false,
    ingredients:
      'Экстракт куркумы (95% куркуминоидов) — 500 мг, экстракт чёрного перца (пиперин 95%) — 5 мг, целлюлозная капсула. Повышение биодоступности в 20 раз.',
    usage:
      'Принимать по 1 капсуле 2 раза в день во время еды. Пиперин в составе обеспечивает оптимальное усвоение куркумина.',
    categorySlug: 'energiya',
  },
];

/* ── Helpers ── */

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

/* ── Steps ── */

async function fetchCategoryMap(): Promise<CategoryMap> {
  const res = await fetchJSON(`${STRAPI_URL}/api/categories?pagination[pageSize]=100`);
  const map: CategoryMap = {};
  for (const cat of res.data) {
    map[cat.slug] = cat.documentId;
  }
  return map;
}

async function deleteAllProducts() {
  console.log('Checking for existing products...');
  const res = await fetchJSON(`${STRAPI_URL}/api/products?pagination[pageSize]=100`);
  const existing = res.data as { id: number; documentId: string; name: string }[];

  if (existing.length === 0) {
    console.log('No existing products to delete.');
    return;
  }

  console.log(`Deleting ${existing.length} existing product(s)...`);
  for (const product of existing) {
    await fetchJSON(`${STRAPI_URL}/api/products/${product.documentId}`, {
      method: 'DELETE',
    });
    console.log(`  Deleted: ${product.name}`);
  }
}

async function createProduct(
  product: (typeof products)[number],
  categoryMap: CategoryMap,
) {
  const categoryDocumentId = categoryMap[product.categorySlug];
  if (!categoryDocumentId) {
    console.error(`  Category not found for slug: ${product.categorySlug}`);
    return null;
  }

  // description is a Blocks (rich text) field in Strapi 5
  const baseData: Record<string, unknown> = {
    name: product.name,
    slug: product.slug,
    description: toBlocks(product.description),
    price: product.price,
    oldPrice: product.oldPrice,
    volume: product.volume,
    inStock: product.inStock,
    featured: product.featured,
    category: categoryDocumentId,
  };

  // ingredients/usage may not exist in Strapi schema — try with them, fallback without
  const extraFields: Record<string, unknown> = {};
  if (product.ingredients) extraFields.ingredients = product.ingredients;
  if (product.usage) extraFields.usage = product.usage;

  const fullData = { ...baseData, ...extraFields };

  try {
    const res = await fetchJSON(`${STRAPI_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: fullData }),
    });
    return res.data;
  } catch (err: any) {
    if (err.message?.includes('Invalid key')) {
      // Retry without extra fields
      const res = await fetchJSON(`${STRAPI_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: baseData }),
      });
      return res.data;
    }
    throw err;
  }
}

/* ── Main ── */

async function main() {
  console.log(`\nSeeding Strapi at ${STRAPI_URL}\n`);

  // 1. Check Strapi is running
  try {
    await fetchJSON(`${STRAPI_URL}/api/categories`);
  } catch {
    console.error('Cannot reach Strapi. Make sure it is running on ' + STRAPI_URL);
    process.exit(1);
  }

  // 2. Get category mapping
  const categoryMap = await fetchCategoryMap();
  console.log(`Found ${Object.keys(categoryMap).length} categories:`, Object.keys(categoryMap).join(', '));

  // 3. Delete existing products
  await deleteAllProducts();

  // 4. Create products (Strapi 5 auto-publishes on public POST)
  console.log(`\nCreating ${products.length} products...`);
  for (const product of products) {
    const created = await createProduct(product, categoryMap);
    if (created) {
      console.log(`  Created: ${product.name} (${created.documentId})`);
    }
  }

  // 5. Verify
  const verify = await fetchJSON(`${STRAPI_URL}/api/products?pagination[pageSize]=100`);
  console.log(`\nDone! ${verify.data.length} products in Strapi.\n`);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
