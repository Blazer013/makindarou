'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn, getCategoryColor, getAnimalTypeLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Product } from '@/data/products';
import type { Locale } from '@/config/i18n';

interface ProductCardProps {
  product: Product;
  locale: Locale;
  t: (key: string) => string;
}

function getCategoryLabel(category: string, locale: Locale): string {
  const labels: Record<string, Record<'fa' | 'en' | 'ar', string>> = {
    vaccines: { fa: 'واکسن‌ها', en: 'Vaccines', ar: 'اللقاحات' },
    drugs: { fa: 'داروهای دامپزشکی', en: 'Veterinary Drugs', ar: 'الأدوية البيطرية' },
    biologicals: { fa: 'مواد بیولوژیک', en: 'Biologicals', ar: 'المواد البيولوجية' },
    supplements: { fa: 'مکمل‌ها', en: 'Supplements', ar: 'المكملات' },
    disinfectants: { fa: 'ضدعفونی‌کننده‌ها', en: 'Disinfectants', ar: 'المطهرات' },
    feed: { fa: 'غذا و کنسانتره', en: 'Feed & Concentrates', ar: 'الأعلاف والتركيزات' },
    concentrates: { fa: 'کانسانتره‌ها', en: 'Concentrates', ar: 'التركيزات' },
    equipment: { fa: 'تجهیزات', en: 'Equipment', ar: 'المعدات' },
  };
  return labels[category]?.[locale] || category;
}

const categoryIcons: Record<string, string> = {
  vaccines: '💉',
  drugs: '💊',
  biologicals: '🧬',
  supplements: '💊',
  disinfectants: '🧴',
  feed: '🌾',
  concentrates: '🌾',
  equipment: '🔧',
};

export function ProductCard({ product, locale, t }: ProductCardProps) {
  const categoryColor = getCategoryColor(product.category);
  const categoryLabel = getCategoryLabel(product.category, locale);
  const animalLabel = getAnimalTypeLabel(product.animalType, locale);
  const categoryIcon = categoryIcons[product.category] || '📦';

  // Get localized content
  const title = locale === 'fa' ? product.titleFa : locale === 'ar' ? product.titleAr : product.titleEn;
  const shortDesc = locale === 'fa' ? product.shortDescriptionFa : locale === 'ar' ? product.shortDescriptionAr : product.shortDescriptionEn;

  return (
    <Card hover padding="md" className="flex flex-col h-full animate-fade-up">
      <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-4 relative">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-5xl opacity-50">{categoryIcon}</span>
        </div>
        {product.featured && (
          <Badge variant="amber" className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
            {t('products.featured')}
          </Badge>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <Badge variant={categoryColor as any} className="mb-2 w-fit">
          {categoryLabel}
        </Badge>

        <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1">
          {shortDesc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant="neutral" size="sm">
            {animalLabel}
          </Badge>
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-100">
          <Link href={`/${locale}/products/${product.slug}/`}>
            <Button variant="outline" fullWidth size="sm">
              {t('products.viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}