export type Category = 'builds' | 'laptops' | 'monitors' | 'accessories';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: Category;
  price: number;
  priceLabel: string;
  specs: string;
  image: string;
  badge?: string;
  inStock: boolean;
}

export const categoryLabels: Record<Category, string> = {
  builds: 'تجميعات PC',
  laptops: 'لابتوبات',
  monitors: 'شاشات',
  accessories: 'اكسسوارات',
};

export const products: Product[] = [
  // ─── تجميعات PC ───────────────────────────────────────────────
  {
    id: 'build-extreme',
    name: 'MORTAL EXTREME BUILD',
    nameAr: 'تجميعة مورتال إكستريم',
    category: 'builds',
    price: 3850,
    priceLabel: '$3,850',
    specs: 'RTX 4090 • i9-14900K • 64GB DDR5 • 2TB NVMe',
    image: '/images/mortal-hero.jpg',
    badge: 'جديد',
    inStock: true,
  },
  {
    id: 'build-pro',
    name: 'MORTAL PRO GAMER',
    nameAr: 'تجميعة مورتال برو',
    category: 'builds',
    price: 2100,
    priceLabel: '$2,100',
    specs: 'RTX 4070 Ti • Ryzen 7 7700X • 32GB DDR5 • 1TB NVMe',
    image: '/images/mortal-components.png',
    badge: 'الأكثر مبيعاً',
    inStock: true,
  },
  {
    id: 'build-mid',
    name: 'MORTAL MID BEAST',
    nameAr: 'تجميعة مورتال ميد',
    category: 'builds',
    price: 1500,
    priceLabel: '$1,500',
    specs: 'RTX 4070 • i5-13600K • 32GB DDR5 • 1TB NVMe',
    image: '/images/mortal-hero.jpg',
    badge: 'قيمة ممتازة',
    inStock: true,
  },
  {
    id: 'build-entry',
    name: 'MORTAL ENTRY LEVEL',
    nameAr: 'تجميعة مورتال إنتري',
    category: 'builds',
    price: 1250,
    priceLabel: '$1,250',
    specs: 'RTX 4060 • i5-13400F • 16GB DDR5 • 1TB NVMe',
    image: '/images/mortal-components.png',
    inStock: true,
  },

  // ─── لابتوبات ──────────────────────────────────────────────────
  {
    id: 'laptop-rog',
    name: 'ASUS ROG Strix G16',
    nameAr: 'لابتوب ASUS ROG G16',
    category: 'laptops',
    price: 1800,
    priceLabel: '$1,800',
    specs: 'RTX 4070 • i9-13980HX • 16GB • 1TB NVMe • 165Hz',
    image: '/images/mortal-laptops.png',
    badge: 'جديد',
    inStock: true,
  },
  {
    id: 'laptop-legion',
    name: 'Lenovo Legion Pro 7',
    nameAr: 'لابتوب Lenovo Legion Pro 7',
    category: 'laptops',
    price: 1650,
    priceLabel: '$1,650',
    specs: 'RTX 4060 • Ryzen 9 7945HX • 16GB • 1TB • 240Hz',
    image: '/images/mortal-laptops.png',
    badge: 'الأكثر مبيعاً',
    inStock: true,
  },
  {
    id: 'laptop-msi',
    name: 'MSI Katana 15',
    nameAr: 'لابتوب MSI Katana 15',
    category: 'laptops',
    price: 950,
    priceLabel: '$950',
    specs: 'RTX 4060 • i7-13620H • 16GB • 512GB • 144Hz',
    image: '/images/mortal-laptops.png',
    inStock: true,
  },
  {
    id: 'laptop-acer',
    name: 'Acer Nitro 5',
    nameAr: 'لابتوب Acer Nitro 5',
    category: 'laptops',
    price: 750,
    priceLabel: '$750',
    specs: 'RTX 4050 • i5-13420H • 8GB • 512GB • 144Hz',
    image: '/images/mortal-laptops.png',
    inStock: true,
  },

  // ─── شاشات ────────────────────────────────────────────────────
  {
    id: 'monitor-lg-4k',
    name: 'LG 27GN950-B 4K',
    nameAr: 'شاشة LG 4K الاحترافية',
    category: 'monitors',
    price: 650,
    priceLabel: '$650',
    specs: '27" 4K UHD • 144Hz • IPS • G-Sync • HDR600',
    image: '/images/mortal-monitors.png',
    badge: 'مميز',
    inStock: true,
  },
  {
    id: 'monitor-samsung-qhd',
    name: 'Samsung Odyssey G7',
    nameAr: 'شاشة Samsung Odyssey G7',
    category: 'monitors',
    price: 450,
    priceLabel: '$450',
    specs: '32" QHD 2K • 240Hz • VA • G-Sync • HDR400',
    image: '/images/mortal-monitors.png',
    badge: 'الأكثر مبيعاً',
    inStock: true,
  },
  {
    id: 'monitor-asus-1080',
    name: 'ASUS TUF Gaming VG249',
    nameAr: 'شاشة ASUS TUF Gaming',
    category: 'monitors',
    price: 220,
    priceLabel: '$220',
    specs: '24" FHD • 165Hz • IPS • FreeSync • 1ms',
    image: '/images/mortal-monitors.png',
    inStock: true,
  },
  {
    id: 'monitor-aoc-ultra',
    name: 'AOC CU34G3S Ultrawide',
    nameAr: 'شاشة AOC الترا وايد',
    category: 'monitors',
    price: 380,
    priceLabel: '$380',
    specs: '34" UWQHD • 144Hz • VA • G-Sync • Curved',
    image: '/images/mortal-monitors.png',
    inStock: true,
  },

  // ─── اكسسوارات ────────────────────────────────────────────────
  {
    id: 'acc-keyboard-k70',
    name: 'Corsair K70 RGB',
    nameAr: 'كيبورد Corsair K70 RGB',
    category: 'accessories',
    price: 130,
    priceLabel: '$130',
    specs: 'Cherry MX Red • RGB • تناظري • مضاد للأشباح',
    image: '/images/mortal-accessories.png',
    badge: 'جديد',
    inStock: true,
  },
  {
    id: 'acc-mouse-g502',
    name: 'Logitech G502 X Plus',
    nameAr: 'ماوس Logitech G502 X Plus',
    category: 'accessories',
    price: 100,
    priceLabel: '$100',
    specs: '25600 DPI • لاسلكي • 89g • RGB • HERO 25K',
    image: '/images/mortal-accessories.png',
    badge: 'الأكثر مبيعاً',
    inStock: true,
  },
  {
    id: 'acc-headset-steelseries',
    name: 'SteelSeries Arctis Nova Pro',
    nameAr: 'سماعة SteelSeries Arctis Nova Pro',
    category: 'accessories',
    price: 180,
    priceLabel: '$180',
    specs: 'لاسلكي • Hi-Res Audio • سونيك العالي • ANC',
    image: '/images/mortal-accessories.png',
    inStock: true,
  },
  {
    id: 'acc-pad-xl',
    name: 'Logitech G840 XL',
    nameAr: 'باد Logitech G840 XL',
    category: 'accessories',
    price: 45,
    priceLabel: '$45',
    specs: '900×400mm • سطح ناعم • قاعدة مطاطية • مضاد للانزلاق',
    image: '/images/mortal-accessories.png',
    inStock: true,
  },
];

export const getByCategory = (cat: Category) =>
  products.filter((p) => p.category === cat);
