import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { cn, getCategoryColor, getAnimalTypeLabel } from '@/lib/utils';
import { products, categories, getFeaturedProducts } from '@/data/products';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { createTranslator } from '@/lib/i18n';
import type { Locale } from '@/config/i18n';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  return {
    title: t('hero.title'),
    description: t('hero.subtitle'),
    openGraph: {
      title: t('hero.title'),
      description: t('hero.subtitle'),
      type: 'website',
    },
  };
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

const features = [
  {
    icon: '🚚',
    titleKey: 'home.feature1.title',
    descKey: 'home.feature1.desc',
  },
  {
    icon: '❄️',
    titleKey: 'home.feature2.title',
    descKey: 'home.feature2.desc',
  },
  {
    icon: '🎓',
    titleKey: 'home.feature3.title',
    descKey: 'home.feature3.desc',
  },
  {
    icon: '🏆',
    titleKey: 'home.feature4.title',
    descKey: 'home.feature4.desc',
  },
];

const stats = [
  { value: '۱۵+', labelKey: 'hero.stats.yearsExperience', icon: '📅' },
  { value: '۱۰۰+', labelKey: 'hero.stats.pharmacies', icon: '🏥' },
  { value: '۵۶', labelKey: 'hero.stats.factories', icon: '🏭' },
  { value: '۳۵۰+', labelKey: 'hero.stats.trainingHours', icon: '📚' },
];

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white py-16 lg:py-24" aria-labelledby="hero-title">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <Badge variant="primary" className="mb-4 animate-slide-up">
                {t('hero.badge') || 'موزع معتبر داروهای دامپزشکی'}
              </Badge>
              <h1 id="hero-title" className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-neutral-900 leading-tight mb-6 animate-slide-up stagger-1">
                {t('hero.title')}
              </h1>
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0 animate-slide-up stagger-2">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-3">
                <Link href={`/${locale}/products/`}>
                  <Button size="lg" className="min-w-[200px]">
                    {t('hero.ctaPrimary')}
                  </Button>
                </Link>
                <Link href={`/${locale}/contact/`}>
                  <Button variant="outline" size="lg" className="min-w-[200px]">
                    {t('hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-neutral-200 animate-fade-in stagger-4">
                {stats.map((stat, index) => (
                  <div key={stat.labelKey} className="text-center">
                    <div className="text-3xl lg:text-4xl font-extrabold text-primary-600 mb-1">{stat.value}</div>
                    <div className="text-neutral-600 text-sm">{t(stat.labelKey)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-zoom-in stagger-2">
              <div className="aspect-square max-w-md mx-auto">
                <div className="w-full h-full bg-gradient-to-br from-primary-100 via-primary-50 to-white rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" aria-hidden="true" />
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="text-12xl opacity-30">🏥</span>
                  </div>
                  <div className="absolute -bottom-6 -left-6 lg:-left-10 w-48 h-48 bg-accent-500 rounded-2xl opacity-10 blur-3xl" aria-hidden="true" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 lg:-right-8 w-64 h-64 bg-primary-500 rounded-2xl opacity-5 blur-3xl" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="features-title">
        <div className="container">
          <header className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            <h2 id="features-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('home.featuresTitle') || 'چرا ماکیان دارو؟'}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('home.featuresDesc') || 'تمایزهای ما در خدمت صنعت دامپزشکی'}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.titleKey} hover padding="lg" className="text-center animate-fade-up stagger-{index + 1}">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t(feature.titleKey)}</h3>
                <p className="text-neutral-600">{t(feature.descKey)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-neutral-50" aria-labelledby="categories-title">
        <div className="container">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 animate-fade-in">
            <div>
              <h2 id="categories-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                {t('products.categories')}
              </h2>
              <p className="text-neutral-600">
                {t('products.subtitle')}
              </p>
            </div>
            <Link href={`/${locale}/products/`} className="btn btn-primary self-start">
              {t('products.viewAllProducts')}
            </Link>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/${locale}/products/?category=${category.id}`}
                className={cn(
                  'card p-6 text-center group animate-fade-up stagger-{index + 1}',
                  'border-2 border-transparent hover:border-primary-200'
                )}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {categoryIcons[category.id] || '📦'}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {locale === 'fa' ? category.nameFa : locale === 'ar' ? category.nameAr : category.nameEn}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="featured-title">
        <div className="container">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 animate-fade-in">
            <div>
              <h2 id="featured-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                {t('products.featuredProducts') || 'محصولات پیشنهادی'}
              </h2>
              <p className="text-neutral-600">
                {t('products.featuredDesc') || 'بهترین و پرمخاطره‌ترین محصولات ما'}
              </p>
            </div>
            <Link href={`/${locale}/products/`} className="btn btn-primary self-start">
              {t('products.viewAllProducts')}
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <article key={product.slug} className="animate-fade-up stagger-{index + 1}">
                <Link href={`/${locale}/products/${product.slug}/`} className="block">
                  <Card hover padding="md" className="h-full flex flex-col">
                    <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-4 relative">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl opacity-50">{categoryIcons[product.category] || '📦'}</span>
                      </div>
                      {product.featured && (
                        <Badge variant="amber" className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
                          {t('products.featured')}
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <Badge variant={getCategoryColor(product.category) as any} className="mb-2 w-fit">
                        {locale === 'fa' ? categories.find(c => c.id === product.category)?.nameFa :
                         locale === 'ar' ? categories.find(c => c.id === product.category)?.nameAr :
                         categories.find(c => c.id === product.category)?.nameEn}
                      </Badge>

                      <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {locale === 'fa' ? product.titleFa : locale === 'ar' ? product.titleAr : product.titleEn}
                      </h3>

                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1">
                        {locale === 'fa' ? product.shortDescriptionFa : locale === 'ar' ? product.shortDescriptionAr : product.shortDescriptionEn}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <Badge variant="neutral" size="sm">
                          {getAnimalTypeLabel(product.animalType, locale)}
                        </Badge>
                      </div>

                      <div className="mt-auto pt-3 border-t border-neutral-100">
                        <span className="btn btn-outline btn-sm btn-full">
                          {t('products.viewDetails')}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-700 text-white" aria-labelledby="cta-title">
        <div className="container text-center">
          <h2 id="cta-title" className="text-3xl lg:text-4xl font-bold mb-4">
            {t('home.ctaTitle') || 'مستعد همکاری هستید؟'}
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            {t('home.ctaDesc') || 'تیم ماکیان دارو برای پاسخگویی به سوالات و نیازهای شما در خدمتیست'}
          </p>
          <Link href={`/${locale}/contact/`}>
            <Button variant="accent" size="lg" className="min-w-[200px]">
              {t('hero.ctaSecondary')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}