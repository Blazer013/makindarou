import { Metadata } from 'next';
import { createTranslator } from '@/lib/i18n';
import { products, categories, type ProductCategory, type AnimalType } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/config/i18n';

export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; animal?: string; q?: string; page?: string }>;
}

export async function generateMetadata({ params, searchParams }: ProductsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  const category = resolvedSearchParams.category;
  const animal = resolvedSearchParams.animal;

  let title = t('products.title');
  if (category) {
    const cat = categories.find(c => c.id === category);
    if (cat) {
      title = `${cat.nameFa || cat.nameEn || cat.nameAr} - ${title}`;
    }
  }
  if (animal) {
    title = `${t(`products.animals.${animal}`)} - ${title}`;
  }

  return {
    title,
    description: t('products.subtitle'),
    openGraph: {
      title,
      description: t('products.subtitle'),
      type: 'website',
    },
  };
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  const currentCategory = (resolvedSearchParams.category as ProductCategory) || '';
  const currentAnimal = (resolvedSearchParams.animal as AnimalType) || '';
  const currentSearch = resolvedSearchParams.q || '';

  // Filter products
  let filteredProducts = [...products];

  if (currentCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
  }

  if (currentAnimal && currentAnimal !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.animalType === currentAnimal || p.animalType === 'all');
  }

  if (currentSearch) {
    const searchLower = currentSearch.toLowerCase();
    filteredProducts = filteredProducts.filter(p => {
      const title = locale === 'fa' ? p.titleFa : locale === 'ar' ? p.titleAr : p.titleEn;
      const desc = locale === 'fa' ? p.shortDescriptionFa : locale === 'ar' ? p.shortDescriptionAr : p.shortDescriptionEn;
      return title.toLowerCase().includes(searchLower) || desc.toLowerCase().includes(searchLower);
    });
  }

  const categoryOptions = [
    { value: '', label: t('products.allCategories') },
    ...categories.map(cat => ({
      value: cat.id,
      label: locale === 'fa' ? cat.nameFa : locale === 'ar' ? cat.nameAr : cat.nameEn,
    })),
  ];

  const animalOptions = [
    { value: '', label: t('products.allAnimals') },
    { value: 'poultry', label: t('products.animals.poultry') },
    { value: 'livestock', label: t('products.animals.livestock') },
    { value: 'aquatic', label: t('products.animals.aquatic') },
  ];

  return (
    <div>
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">{t('products.title')}</h1>
          <p className="text-neutral-600 text-lg max-w-2xl mb-6">{t('products.subtitle')}</p>

          {/* Active Filters */}
          {(currentCategory || currentAnimal || currentSearch) && (
            <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label={t('products.activeFilters') || 'Active filters'}>
              {currentCategory && (
                <Badge variant="primary" className="flex items-center gap-1">
                  {categories.find(c => c.id === currentCategory)?.nameFa || currentCategory}
                  <button
                    type="button"
                    onClick={() => window.location.href = `/${locale}/products/`}
                    className="hover:text-primary-700"
                    aria-label={`${t('common.remove')} ${categories.find(c => c.id === currentCategory)?.nameFa || currentCategory}`}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {currentAnimal && currentAnimal !== 'all' && (
                <Badge variant="accent" className="flex items-center gap-1">
                  {t(`products.animals.${currentAnimal}`)}
                  <button
                    type="button"
                    onClick={() => window.location.href = `/${locale}/products/`}
                    className="hover:text-accent-700"
                    aria-label={`${t('common.remove')} ${t(`products.animals.${currentAnimal}`)}`}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {currentSearch && (
                <Badge variant="neutral" className="flex items-center gap-1">
                  {t('common.search')}: "{currentSearch}"
                  <button
                    type="button"
                    onClick={() => window.location.href = `/${locale}/products/`}
                    className="hover:text-neutral-700"
                    aria-label={`${t('common.remove')} search`}
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <p className="text-neutral-500 mb-6">
            {filteredProducts.length} {t('products.resultsFound') || 'محصول یافت شد'}
          </p>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 hidden lg:block">
            <ProductFilters locale={locale} />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('products.noResults')}</h3>
                <p className="text-neutral-600 mb-6">{t('products.noResultsDesc') || 'تلاش کنید با فیلترهای دیگر یا کلمات کلیدی متفاوت'}</p>
                <Button variant="outline" onClick={() => window.location.href = `/${locale}/products/`}>
                  {t('common.clearFilters')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.slug} product={product} locale={locale} />
                ))}
              </div>
            )}

            {/* Pagination would go here for large datasets */}
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden mt-8">
          <ProductFilters locale={locale} />
        </div>
      </div>
    </div>
  );
}