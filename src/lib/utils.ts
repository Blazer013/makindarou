import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: 'fa' | 'en' | 'ar' = 'fa'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (locale === 'fa') {
    return d.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  if (locale === 'ar') {
    return d.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num: number, locale: 'fa' | 'en' | 'ar' = 'fa'): string {
  if (locale === 'fa') {
    return num.toLocaleString('fa-IR');
  }
  if (locale === 'ar') {
    return num.toLocaleString('ar-SA');
  }
  return num.toLocaleString('en-US');
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    vaccines: 'primary',
    biologicals: 'accent',
    drugs: 'primary',
    supplements: 'accent',
    disinfectants: 'primary',
    feed: 'accent',
    concentrates: 'primary',
    equipment: 'neutral',
    poultry: 'primary',
    livestock: 'accent',
    aquatic: 'primary',
  };
  return colors[category.toLowerCase()] || 'neutral';
}

export function getAnimalTypeLabel(type: string, locale: 'fa' | 'en' | 'ar'): string {
  const labels: Record<string, Record<'fa' | 'en' | 'ar', string>> = {
    poultry: { fa: 'مرغ و طیور', en: 'Poultry', ar: 'الدواجن' },
    livestock: { fa: 'دام و گله', en: 'Livestock', ar: 'المواشي' },
    aquatic: { fa: 'آبزیان', en: 'Aquatic', ar: 'الأسماك' },
    all: { fa: 'همه', en: 'All', ar: 'الكل' },
  };
  return labels[type]?.[locale] || type;
}

export function generateJsonLd(data: Record<string, any>): string {
  return JSON.stringify(data, null, 2);
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Makian Darou Golestan',
  alternateName: 'ماکیان دارو گلستان',
  url: 'https://makiandarou.ir',
  logo: 'https://makiandarou.ir/logo.png',
  description: 'Leading veterinary pharmaceutical and vaccine distributor in Golestan Province, Iran',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nahar Khoran Blvd, Between Adalat 105 & 107, Safir Complex, 3rd Floor',
    addressLocality: 'Gorgan',
    addressRegion: 'Golestan',
    addressCountry: 'IR',
    postalCode: '49178',
  },
  telephone: '+98-17-32520903',
  email: 'makiandarou@gmail.com',
  foundingDate: '2008',
  numberOfEmployees: '50-100',
  knowsAbout: [
    'Veterinary Pharmaceuticals',
    'Vaccines',
    'Biological Products',
    'Animal Health',
    'Poultry Medicine',
    'Livestock Medicine',
    'Aquatic Medicine',
    'Cold Chain Distribution',
  ],
  sameAs: [],
};

export function productJsonLd(product: {
  name: string;
  description: string;
  image?: string;
  brand: string;
  category: string;
  sku?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category,
    sku: product.sku,
    offers: product.offers
      ? {
          '@type': 'Offer',
          price: product.offers.price,
          priceCurrency: product.offers.priceCurrency || 'IRR',
          availability: product.offers.availability || 'https://schema.org/InStock',
        }
      : undefined,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Makian Darou Golestan',
    alternateName: 'ماکیان دارو گلستان',
    url: 'https://makiandarou.ir',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://makiandarou.ir/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}