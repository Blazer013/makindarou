import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import { getProductBySlug, products, getCategoryColor, getAnimalTypeLabel } from '@/data/products';
import { productJsonLd, breadcrumbJsonLd, generateJsonLd } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Locale } from '@/config/i18n';

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  return products.flatMap(product =>
    ['fa', 'en', 'ar'].map(locale => ({ locale, slug: product.slug }))
  );
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  const t = createTranslator(locale);

  const product = getProductBySlug(slug);
  if (!product) {
    return { title: t('products.notFound') || 'Product Not Found' };
  }

  const title = locale === 'fa' ? product.titleFa : locale === 'ar' ? product.titleAr : product.titleEn;
  const description = locale === 'fa' ? product.shortDescriptionFa : locale === 'ar' ? product.shortDescriptionAr : product.shortDescriptionEn;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: product.image ? [{ url: product.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [product.image] : [],
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

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  const t = createTranslator(locale);

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const dir = locale === 'en' ? 'ltr' : 'rtl';
  const lang = locale === 'fa' ? 'fa-IR' : locale === 'ar' ? 'ar-SA' : 'en-US';

  // Localized content
  const title = locale === 'fa' ? product.titleFa : locale === 'ar' ? product.titleAr : product.titleEn;
  const shortDesc = locale === 'fa' ? product.shortDescriptionFa : locale === 'ar' ? product.shortDescriptionAr : product.shortDescriptionEn;
  const fullDesc = locale === 'fa' ? product.fullDescriptionFa : locale === 'ar' ? product.fullDescriptionAr : product.fullDescriptionEn;
  const categoryLabel = locale === 'fa' ? product.categoryFa : locale === 'ar' ? product.categoryAr : product.categoryEn;
  const animalLabel = getAnimalTypeLabel(product.animalType, locale);

  const categoryColor = getCategoryColor(product.category);

  // JSON-LD
  const jsonLd = productJsonLd({
    name: title,
    description: shortDesc,
    image: product.image,
    brand: 'Makian Darou',
    category: categoryLabel,
    sku: product.id,
  });

  const breadcrumbs = [
    { name: t('nav.home'), url: `https://makiandarou.ir/${locale}/` },
    { name: t('nav.products'), url: `https://makiandarou.ir/${locale}/products/` },
    { name: title, url: `https://makiandarou.ir/${locale}/products/${slug}/` },
  ];

  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <div className="flex flex-col" dir={dir} lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJsonLd([jsonLd, breadcrumbLd]) }}
      />

      {/* Hero/Breadcrumb */}
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-4" dir={dir}>
            <ol className="flex items-center gap-2 text-sm" role="list">
              <li><Link href={`/${locale}/`} className="text-neutral-500 hover:text-primary-600 transition-colors">{t('nav.home')}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${locale}/products/`} className="text-neutral-500 hover:text-primary-600 transition-colors">{t('nav.products')}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-neutral-900 font-medium" aria-current="page">{title}</li>
            </ol>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">{title}</h1>
          <p className="text-neutral-600 mb-4 max-w-2xl">{shortDesc}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant={categoryColor as any}>{categoryLabel}</Badge>
            <Badge variant="accent">{t('products.for')}: {animalLabel}</Badge>
            {product.featured && <Badge variant="amber">{t('products.featured')}</Badge>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 lg:py-24" aria-labelledby="product-details">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              {/* Product Image */}
              <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl opacity-50">{categoryIcons[product.category] || '📦'}</span>
                </div>
              </div>

              {/* Specifications */}
              <article className="card p-6 lg:p-8">
                <h2 id="product-details" className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-6">
                  {t('productDetail.specifications')}
                </h2>
                <div className="space-y-4">
                  {product.specifications.map((spec) => (
                    <div key={spec.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-neutral-100 last:border-0">
                      <dt className="font-medium text-neutral-700 sm:w-48 flex-shrink-0">
                        {locale === 'fa' ? spec.nameFa : locale === 'ar' ? spec.nameAr : spec.nameEn}
                      </dt>
                      <dd className="text-neutral-900 text-right sm:text-left">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </article>

              {/* Full Description */}
              {fullDesc && (
                <article className="card p-6 lg:p-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                    {t('productDetail.description') || 'توضیحات کامل'}
                  </h2>
                  <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed whitespace-pre-line">
                    {fullDesc}
                  </div>
                </article>
              )}

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <article className="card p-6 lg:p-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-6">
                    {t('productDetail.certifications')}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4">
                    {product.certifications.map((cert) => (
                      <div key={cert.name} className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-lg">
                        <span className="text-2xl">{cert.icon}</span>
                        <span className="font-medium text-neutral-700">
                          {locale === 'fa' ? cert.nameFa : locale === 'ar' ? cert.nameAr : cert.nameEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* Inquiry Form */}
              <article className="card p-6 lg:p-8 bg-primary-50 border-primary-100">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">{t('productDetail.inquiry')}</h2>
                <p className="text-neutral-600 mb-6">{t('productDetail.inquiryDescription')}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/${locale}/contact/?product=${product.slug}`}>
                    <Button className="w-full sm:w-auto" size="lg">
                      {t('productDetail.requestQuote') || t('products.requestQuote')}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/contact/`}>
                    <Button variant="outline" className="w-full sm:w-auto border-primary-600 text-primary-600 hover:bg-primary-50" size="lg">
                      {t('productDetail.contactSales') || t('products.contactSales')}
                    </Button>
                  </Link>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Download PDFs */}
                <Card padding="lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">{t('productDetail.downloadPdf')}</h3>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors" download>
                      <svg className="w-8 h-8 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <div>
                        <p className="font-medium text-neutral-900">{t('productDetail.datasheetFa') || 'دیتاشیت فنی (PDF)'}</p>
                        <p className="text-xs text-neutral-500">{t('productDetail.persianVersion') || 'نسخه فارسی'}</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors" download>
                      <svg className="w-8 h-8 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <div>
                        <p className="font-medium text-neutral-900">{t('productDetail.datasheetEn') || 'Technical Datasheet (PDF)'}</p>
                        <p className="text-xs text-neutral-500">{t('productDetail.englishVersion') || 'English Version'}</p>
                      </div>
                    </a>
                    {product.certifications && product.certifications.map((cert) => (
                      <a key={cert.name} href="#" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors" download>
                        <span className="text-xl">{cert.icon}</span>
                        <div>
                          <p className="font-medium text-neutral-900">{t('productDetail.certificate') || 'گواهی‌نامه'} {locale === 'fa' ? cert.nameFa : locale === 'ar' ? cert.nameAr : cert.nameEn}</p>
                          <p className="text-xs text-neutral-500">PDF</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </Card>

                {/* Quick Specs */}
                <Card padding="lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{t('productDetail.quickSpecs') || 'مشخصات سریع'}</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">{t('products.category')}</dt>
                      <dd className="font-medium text-neutral-900">{categoryLabel}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">{t('products.for')}</dt>
                      <dd className="font-medium text-neutral-900">{animalLabel}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">{t('productDetail.brand') || 'برند'}</dt>
                      <dd className="font-medium text-neutral-900">Makian Darou</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-neutral-500">{t('productDetail.availability') || 'وضعیت'}</dt>
                      <dd className="font-medium text-success-600">{t('productDetail.inStock') || 'موجود در انبار'}</dd>
                    </div>
                  </dl>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 lg:py-24 bg-neutral-50 border-y border-neutral-200" aria-labelledby="related-title">
        <div className="container">
          <header className="mb-12">
            <h2 id="related-title" className="text-2xl lg:text-3xl font-bold text-neutral-900">
              {t('products.relatedProducts')}
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(p => p.category === product.category && p.slug !== product.slug)
              .slice(0, 3)
              .map((related, index) => (
                <article key={related.slug} className="animate-fade-up stagger-{index + 1}">
                  <Link href={`/${locale}/products/${related.slug}/`} className="block">
                    <Card hover padding="md" className="h-full">
                      <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-4">
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl">{categoryIcons[related.category] || '📦'}</span>
                        </div>
                      </div>
                      <Badge variant={getCategoryColor(related.category) as any} className="mb-3">
                        {locale === 'fa' ? related.categoryFa : locale === 'ar' ? related.categoryAr : related.categoryEn}
                      </Badge>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {locale === 'fa' ? related.titleFa : locale === 'ar' ? related.titleAr : related.titleEn}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {locale === 'fa' ? related.shortDescriptionFa : locale === 'ar' ? related.shortDescriptionAr : related.shortDescriptionEn}
                      </p>
                      <Button variant="outline" size="sm" fullWidth>
                        {t('products.viewDetails')}
                      </Button>
                    </Card>
                  </Link>
                </article>
              ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/products/`}>
              <Button variant="secondary">{t('products.viewAllProducts')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}