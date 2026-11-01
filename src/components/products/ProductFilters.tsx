'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { createTranslator } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { categories } from '@/data/products';
import type { Locale } from '@/config/i18n';

interface ProductFiltersProps {
  locale: Locale;
}

export function ProductFilters({ locale }: ProductFiltersProps) {
  const t = createTranslator(locale);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get('category') || '';
  const currentAnimal = searchParams.get('animal') || '';
  const currentSearch = searchParams.get('q') || '';

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleAnimalChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('animal', value);
    } else {
      params.delete('animal');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('q') as string;
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('q', search);
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  const hasFilters = currentCategory || currentAnimal || currentSearch;

  const animalOptions = [
    { value: '', label: t('products.allAnimals') },
    { value: 'poultry', label: t('products.animals.poultry') },
    { value: 'livestock', label: t('products.animals.livestock') },
    { value: 'aquatic', label: t('products.animals.aquatic') },
  ];

  const categoryOptions = [
    { value: '', label: t('products.allCategories') },
    ...categories.map((cat) => ({
      value: cat.id,
      label: locale === 'fa' ? cat.nameFa : locale === 'ar' ? cat.nameAr : cat.nameEn,
    })),
  ];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 lg:p-8 sticky top-24">
      <form onSubmit={handleSearch} className="space-y-6">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-2">
            {t('products.searchPlaceholder')}
          </label>
          <div className="relative">
            <input
              type="search"
              name="q"
              id="search"
              defaultValue={currentSearch}
              placeholder={t('products.searchPlaceholder')}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label={t('products.searchPlaceholder')}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-3 rtl:left-3 rtl:right-auto flex items-center text-neutral-400 hover:text-primary-600"
              aria-label={t('common.search')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-2">
            {t('products.filterByCategory')}
          </label>
          <Select
            id="category"
            value={currentCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            options={categoryOptions}
            placeholder={t('products.allCategories')}
            fullWidth
          />
        </div>

        {/* Animal Type Filter */}
        <div>
          <label htmlFor="animal" className="block text-sm font-medium text-neutral-700 mb-2">
            {t('products.filterByAnimal')}
          </label>
          <Select
            id="animal"
            value={currentAnimal}
            onChange={(e) => handleAnimalChange(e.target.value)}
            options={animalOptions}
            placeholder={t('products.allAnimals')}
            fullWidth
          />
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <Button type="button" variant="ghost" fullWidth onClick={handleClearFilters}>
            {t('common.clearFilters')}
          </Button>
        )}
      </form>
    </div>
  );
}