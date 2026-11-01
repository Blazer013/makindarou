import { Metadata } from 'next';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { Locale } from '@/config/i18n';

interface NewsPageProps {
  params: Promise<{ locale: Locale }>;
}

const newsCategories = [
  { id: 'announcement', icon: '📢' },
  { id: 'regulation', icon: '📋' },
  { id: 'event', icon: '🎪' },
  { id: 'education', icon: '🎓' },
];

const newsItems = [
  {
    id: '1',
    title: { fa: 'معرفی واکسن جدید نیوکاسل برای فصل بهار', en: 'New Newcastle Vaccine for Spring Season', ar: 'لقاح نيوكاسل الجديد لموسم الربيع' },
    excerpt: { fa: 'شرکت ماکیان دارو با همکاری کارخانه‌های برتر، واکسن جدید نیوکاسل با شاخه پیشرفته را برای فصل بهار عرضه کرده است.', en: 'Makian Darou, in collaboration with top factories, has launched a new advanced-strain Newcastle vaccine for spring.', ar: 'أطلقت شركة ماكيان دارو، بالتعاون مع المصانع الرائدة، لقاح نيوكاسل الجديد بسلالة متقدمة للربيع.' },
    category: 'announcement',
    date: '2025-03-15',
    image: null,
  },
  {
    id: '2',
    title: { fa: 'برگزاری کارگاه آموزشی مدیریت بهداشت مرغداری', en: 'Poultry Health Management Workshop Held', ar: 'عقد ورشة عمل إدارة صحة الدواجن' },
    excerpt: { fa: 'یک کارگاه آموزشی تخصصی با حضور دامپزشکان برتر برای بهبود مدیریت بهداشت در مرغداری‌های صنعتی برگزار شد.', en: 'A specialized workshop with leading veterinarians was held to improve health management in industrial poultry farms.', ar: 'عقدت ورشة عمل متخصصة بحضور أطباء بيطريين بارزين لتحسين إدارة الصحة في مزارع الدواجن الصناعية.' },
    category: 'education',
    date: '2025-02-28',
    image: null,
  },
  {
    id: '3',
    title: { fa: 'مقررات جدید وزارت جهاد کشاورزی برای واردات واکسن', en: 'New Ministry Regulations for Vaccine Imports', ar: 'لوائح وزارة الزراعة الجديدة لاستيراد اللقاحات' },
    excerpt: { fa: 'وزارت جهاد کشاورزی مقررات جدیدی را برای کنترل کیفیت واکسن‌های ورودی به کشور تصویب کرد.', en: 'The Ministry of Agriculture approved new regulations for quality control of imported vaccines.', ar: 'اعتمدت وزارة الزراعة لوائح جديدة لمراقبة جودة اللقاحات المستوردة.' },
    category: 'regulation',
    date: '2025-02-10',
    image: null,
  },
  {
    id: '4',
    title: { fa: 'شرکت در نمایشگاه بین‌المللی صنعت دامپزشکی تهران', en: 'Participation in Tehran International Veterinary Exhibition', ar: 'المشاركة في معرض طهران الدولي للصناعة البيطرية' },
    excerpt: { fa: 'ماکیان دارو در نمایشگاه بین‌المللی صنعت دامپزشکی با ستاند اختصاصی حضور یافت.', en: 'Makian Darou participated in the Tehran International Veterinary Exhibition with a dedicated booth.', ar: 'شاركت ماكيان دارو في معرض طهران الدولي للصناعة البيطرية بجناح مخصص.' },
    category: 'event',
    date: '2025-01-20',
    image: null,
  },
  {
    id: '5',
    title: { fa: 'راهنمای پیشگیری از عفونت‌های تنفسی در فصل سرما', en: 'Guide to Preventing Respiratory Infections in Winter', ar: 'دليل الوقاية من الالتهابات التنفسية في الشتاء' },
    excerpt: { fa: 'با توجه به فصل سرما، نکات مهم پیشگیری از بیماری‌های تنفسی در مرغ و طیور منتشر شد.', en: 'With winter approaching, important guidelines for preventing respiratory diseases in poultry have been published.', ar: 'مع اقتراب الشتاء، تم نشر إرشادات مهمة للوقاية من أمراض الجهاز التنفسي في الدواجن.' },
    category: 'education',
    date: '2024-12-05',
    image: null,
  },
  {
    id: '6',
    title: { fa: 'تأیید مجوز GMP برای انبار پخش جدید', en: 'GMP License Approved for New Distribution Warehouse', ar: 'الموافقة على ترخيص GMP لمستودع التوزيع الجديد' },
    excerpt: { fa: 'انبار پخش جدید ماکیان دارو در شهرک صنعتی آق‌قلا مجوز GMP را دریافت کرد.', en: 'Makian Darou\'s new distribution warehouse in Aq Qala Industrial Zone received GMP certification.', ar: 'حصل مستودع التوزيع الجديد لماكيان دارو في المنطقة الصناعية آق‌قلا على شهادة GMP.' },
    category: 'announcement',
    date: '2024-11-15',
    image: null,
  },
];

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  return {
    title: t('news.title'),
    description: t('news.subtitle'),
    openGraph: {
      title: t('news.title'),
      description: t('news.subtitle'),
      type: 'website',
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  const getCategoryLabel = (catId: string) => {
    const cat = newsCategories.find(c => c.id === catId);
    return cat ? t(`news.categories.${catId}`) : catId;
  };

  const getCategoryIcon = (catId: string) => {
    const cat = newsCategories.find(c => c.id === catId);
    return cat?.icon || '📰';
  };

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">{t('news.title')}</h1>
          <p className="text-neutral-600 text-lg max-w-2xl">{t('news.subtitle')}</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white py-6 border-b border-neutral-100 sticky top-20 z-10">
        <div className="container">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('news.categories')}>
            {newsCategories.map((cat) => (
              <button
                key={cat.id}
                className="badge badge-primary flex items-center gap-1 px-3 py-1.5"
              >
                {cat.icon} {t(`news.categories.${cat.id}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <section className="py-16 lg:py-24 bg-neutral-50" aria-labelledby="news-list">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news, index) => (
              <article key={news.id} className="animate-fade-up stagger-{index + 1}">
                <Link href={`/${locale}/news/${news.id}/`} className="block">
                  <Card hover padding="md" className="h-full flex flex-col">
                    <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden mb-4 relative">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl">{getCategoryIcon(news.category)}</span>
                      </div>
                      <Badge variant="primary" className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex items-center gap-1">
                        {getCategoryIcon(news.category)} {getCategoryLabel(news.category)}
                      </Badge>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <time className="text-xs text-neutral-500 mb-2" dateTime={news.date}>
                        {formatDate(news.date, locale)}
                      </time>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {locale === 'fa' ? news.title.fa : locale === 'ar' ? news.title.ar : news.title.en}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3 flex-1">
                        {locale === 'fa' ? news.excerpt.fa : locale === 'ar' ? news.excerpt.ar : news.excerpt.en}
                      </p>

                      <div className="mt-auto pt-3 border-t border-neutral-100">
                        <span className="btn btn-outline btn-sm btn-full">
                          {t('news.readMore')}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </article>
            ))}
          </div>

          {/* Load More / Pagination */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              {t('common.loadMore') || 'بارگذاری بیشتر'}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-primary-700 text-white" aria-labelledby="newsletter-title">
        <div className="container text-center">
          <h2 id="newsletter-title" className="text-3xl lg:text-4xl font-bold mb-4">
            {t('news.newsletterTitle') || 'از اخبار ما مطلع شوید'}
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            {t('news.newsletterDesc') || 'جدیدترین اخبار، اطلاعیه‌ها و رویدادهای صنعت دامپزشکی را در ایمیل خود دریافت کنید'}
          </p>
          <form className="max-w-md mx-auto flex gap-2" action={`/${locale}/newsletter/`} method="POST">
            <input
              type="email"
              name="email"
              placeholder={t('footer.newsletterPlaceholder')}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
              aria-label={t('footer.newsletterPlaceholder')}
            />
            <Button variant="accent" type="submit">
              {t('footer.subscribe')}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}