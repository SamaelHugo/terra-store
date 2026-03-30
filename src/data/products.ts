export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: Category;
  images: string[];
  inStock: boolean;
  featured: boolean;
  volume: string;
  ingredients?: string;
  usage?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: 1, name: 'Витамины', slug: 'vitaminy' },
  { id: 2, name: 'Суперфуды', slug: 'superfudy' },
  { id: 3, name: 'Энергия', slug: 'energiya' },
  { id: 4, name: 'Детокс', slug: 'detoks' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Витамин D3 + K2',
    slug: 'vitamin-d3-k2',
    description:
      'Синергетическая формула для поддержки костной ткани и иммунитета. Витамин D3 в форме холекальциферола усиливается витамином K2 (MK-7) для оптимального усвоения кальция.',
    price: 1890,
    category: categories[0],
    images: [
      'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: true,
    volume: '60 капсул',
  },
  {
    id: 2,
    name: 'Спирулина органическая',
    slug: 'spirulina-organicheskaya',
    description:
      'Сертифицированная органическая спирулина — источник растительного белка, железа и антиоксидантов. Выращена в экологически чистых водоёмах без применения пестицидов.',
    price: 2490,
    category: categories[1],
    images: [
      'https://images.pexels.com/photos/3850810/pexels-photo-3850810.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: false,
    volume: '120 таблеток',
  },
  {
    id: 3,
    name: 'Магний бисглицинат',
    slug: 'magnij-bisglycinat',
    description:
      'Хелатная форма магния с максимальной биодоступностью. Поддерживает нервную систему, качество сна и мышечное восстановление без побочных эффектов со стороны ЖКТ.',
    price: 1690,
    category: categories[0],
    images: [
      'https://images.pexels.com/photos/13787566/pexels-photo-13787566.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: false,
    volume: '90 капсул',
  },
  {
    id: 4,
    name: 'Коллаген морской',
    slug: 'kollagen-morskoj',
    description:
      'Гидролизованный морской коллаген I и III типа из дикой рыбы. Пептиды низкой молекулярной массы для максимального усвоения. Поддерживает кожу, суставы и связки.',
    price: 3290,
    oldPrice: 3990,
    category: categories[1],
    images: [
      'https://images.pexels.com/photos/3652097/pexels-photo-3652097.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: true,
    volume: '300г порошок',
  },
  {
    id: 5,
    name: 'Ашваганда KSM-66',
    slug: 'ashvaganda-ksm-66',
    description:
      'Запатентованный экстракт корня ашваганды KSM-66® полного спектра. Клинически доказано: снижает кортизол, повышает энергию и улучшает когнитивные функции.',
    price: 2190,
    category: categories[2],
    images: [
      'https://images.pexels.com/photos/3622479/pexels-photo-3622479.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: true,
    volume: '60 капсул',
  },
  {
    id: 6,
    name: 'Хлорелла детокс',
    slug: 'hlorella-detoks',
    description:
      'Хлорелла с разрушенной клеточной стенкой для эффективного связывания токсинов и тяжёлых металлов. Богата хлорофиллом, витаминами группы B и нуклеиновыми кислотами.',
    price: 1990,
    category: categories[3],
    images: [
      'https://images.pexels.com/photos/4047184/pexels-photo-4047184.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: false,
    volume: '180 таблеток',
  },
  {
    id: 7,
    name: 'Омега-3 премиум',
    slug: 'omega-3-premium',
    description:
      'Концентрат омега-3 из дикого аляскинского лосося. Высокое содержание EPA и DHA в триглицеридной форме. Молекулярная дистилляция гарантирует чистоту от тяжёлых металлов.',
    price: 2890,
    category: categories[0],
    images: [
      'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: true,
    volume: '120 капсул',
  },
  {
    id: 8,
    name: 'Куркумин + пиперин',
    slug: 'kurkumin-piperin',
    description:
      'Стандартизированный экстракт куркумы (95% куркуминоидов) с пиперином из чёрного перца для повышения биодоступности в 20 раз. Мощная антиоксидантная поддержка.',
    price: 1490,
    category: categories[2],
    images: [
      'https://images.pexels.com/photos/5945720/pexels-photo-5945720.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    inStock: true,
    featured: false,
    volume: '60 капсул',
  },
];
