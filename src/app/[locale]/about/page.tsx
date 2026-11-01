import { Metadata } from 'next';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { Locale } from '@/config/i18n';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  return {
    title: t('about.title'),
    description: t('about.subtitle'),
    openGraph: {
      title: t('about.title'),
      description: t('about.subtitle'),
      type: 'website',
    },
  };
}

const values = [
  { icon: '🎯', titleKey: 'about.value1.title', descKey: 'about.value1.desc' },
  { icon: '🤝', titleKey: 'about.value2.title', descKey: 'about.value2.desc' },
  { icon: '💡', titleKey: 'about.value3.title', descKey: 'about.value3.desc' },
  { icon: '🌱', titleKey: 'about.value4.title', descKey: 'about.value4.desc' },
];

const stats = [
  { value: '۱۵+', labelKey: 'about.stats.yearsExperience', icon: '📅' },
  { value: '۱۰۰+', labelKey: 'about.stats.pharmacies', icon: '🏥' },
  { value: '۵۶', labelKey: 'about.stats.factories', icon: '🏭' },
  { value: '۳۵۰+', labelKey: 'about.stats.trainingHours', icon: '📚' },
];

const certifications = [
  'GMP', 'ISO 9001', 'ISO 14001', 'ISO 45001', 'HACCP',
  'مجوز سازمان دامپزشکی', 'مجوز وزارة بهداشت', 'استاندارد ملی ایران',
];

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">{t('about.title')}</h1>
          <p className="text-neutral-600 text-lg max-w-3xl">{t('about.subtitle')}</p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 lg:py-24" aria-labelledby="mission-title">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="primary" className="mb-4">{t('about.mission')}</Badge>
              <h2 id="mission-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                {t('about.missionTitle') || 'ماموریت ما'}
              </h2>
              <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed">
                <p>{t('about.missionDesc') || 'فعالیت‌های تجاری شرکت ماکیان دارو گلستان شامل تامین و توزیع استانی بخش اعظم نیاز استان به محصولات دام و طیور و آبزیان شامل واکسن، مواد بیولوژیک، دارو، مکمل و ضدعفونی‌کننده، با هدف افزایش بازدهی تولید و پرورش و همچنین ارتقاء بهداشت و سلامت عمومی می‌باشد.'}</p>
                <p className="mt-4">{t('about.missionDesc2') || 'ما با التزام به کیفیت، شفافیت و رضایت مشتری، به عنوان شریک استراتژیک دامپزشکان، مرغداران و مالکان دام در استان گلستان، در تلاشیم تا با ارائه محصولات باکیفیت و خدمات متمایز، سهم مؤثری در توسعه صنعت دامپزشکی منطقه داشته باشیم.'}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🏢</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 lg:-left-10 w-48 h-48 bg-accent-500 rounded-2xl opacity-10" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 lg:py-24 bg-neutral-50" aria-labelledby="vision-title">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="accent" className="mb-4">{t('about.vision')}</Badge>
              <h2 id="vision-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                {t('about.visionTitle') || 'دیدگاه ما'}
              </h2>
              <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed">
                <p>{t('about.visionDesc') || 'تبدیل شدن به مطمئن‌ترین و پیشروترین شرکت توزیع محصولات دامپزشکی در شمال ایران، با تکیه بر نوآوری، دانش فنی و تعهد به توسعه پایدار صنعت دامپزشکی و ارتقای سطح بهداشت حیوانات و ایمنی غذایی.'}</p>
                <p className="mt-4">{t('about.visionDesc2') || 'ما تصور می‌کنیم که هر دامپزشک و مرغدار در گلستان به راحتی به بهترین محصولات و جدیدترین دانش فنی دسترسی داشته باشد تا بتواند با خیال راحت پرورش خود را مدیریت کند.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24" aria-labelledby="values-title">
        <div className="container">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <h2 id="values-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('about.values')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('about.valuesDesc') || 'ارزش‌های اصلی که در تمام تصمیمات و działania‌های ما راهنما هستند'}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.titleKey} hover padding="lg" className="text-center animate-fade-up stagger-{index + 1}">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{t(value.titleKey)}</h3>
                <p className="text-neutral-600 leading-relaxed">{t(value.descKey)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 border-y border-neutral-200" aria-labelledby="stats-title">
        <div className="container">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <h2 id="stats-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('about.companyStats') || 'ماکیان دارو در یک نگاه'}
            </h2>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.labelKey} className="text-center animate-fade-up stagger-{index + 1}">
                <div className="text-4xl lg:text-5xl font-extrabold text-primary-600 mb-3">{stat.value}</div>
                <div className="text-neutral-600 text-lg">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24" aria-labelledby="certifications-title">
        <div className="container">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="certifications-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('about.certifications')}
            </h2>
          </header>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-70 hover:opacity-100 transition-opacity">
            {certifications.map((cert) => (
              <Badge key={cert} variant="neutral" className="px-6 py-3 text-base">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary-700 text-white" aria-labelledby="cta-title">
        <div className="container text-center">
          <h2 id="cta-title" className="text-3xl lg:text-4xl font-bold mb-4">
            {t('about.ctaTitle') || 'می‌خواهید بیشتر بدانید؟'}
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            {t('about.ctaDesc') || 'برای اطلاعات بیشتر درباره شرکت، محصولات یا همکاری با ما، با تیم ما در تماس باشید.'}
          </p>
          <Link href={`/${locale}/contact/`}>
            <Button variant="accent" size="lg">
              {t('about.ctaButton') || 'تماس با ما'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}