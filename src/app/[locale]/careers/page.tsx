import { Metadata } from 'next';
import Link from 'next/link';
import { createTranslator } from '@/lib/i18n';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { Locale } from '@/config/i18n';

interface CareersPageProps {
  params: Promise<{ locale: Locale }>;
}

const jobs = [
  {
    id: 'sales-rep',
    title: { fa: 'نماینده فروش داروهای دامپزشکی', en: 'Veterinary Pharmaceutical Sales Representative', ar: 'ممثل مبيعات أدوية بيطرية' },
    department: { fa: 'فروش و بازاریابی', en: 'Sales & Marketing', ar: 'المبيعات والتسويق' },
    location: 'گلستان (گرگان)',
    type: { fa: 'دوام کامل', en: 'Full-time', ar: 'دوام كامل' },
    experience: { fa: '۲-۵ سال', en: '2-5 years', ar: '2-5 سنوات' },
    description: {
      fa: 'مسئول فروش و توزیع محصولات دامپزشکی به داروخانه‌ها، کارخانه‌ها و دامپزشکان در منطقه مشخص شده.',
      en: 'Responsible for sales and distribution of veterinary products to pharmacies, factories, and veterinarians in assigned territory.',
      ar: 'مسؤول عن مبيعات وتوزيع المنتجات البيطرية للصيدليات والمصانع والأطباء البيطريين في المنطقة المحددة.',
    },
    requirements: {
      fa: ['مدرک دیپلم/لیسانس دامپزشکی، علوم حیوانات یا رشته‌های مرتبط', 'حداقل ۲ سال تجربه در فروش داروهای دامپزشکی', 'آشنایی با بازار مرغداری و دامداری در استان گلستان', 'مهارت ارتباطی و مذاکره قوی', 'دارای گواهینامه راننده معتبر'],
      en: ['Diploma/Bachelor in Veterinary Medicine, Animal Science or related', 'Minimum 2 years experience in veterinary pharmaceutical sales', 'Knowledge of poultry and livestock market in Golestan Province', 'Strong communication and negotiation skills', 'Valid driver license'],
      ar: ['دبلوم/بكالوريوس في الطب البيطري، علوم الحيوان أو مجالات ذات صلة', 'خبرة لا تقل عن سنتين في مبيعات الأدوية البيطرية', 'معرفة بسوق الدواجن والمواشي في محافظة گلستان', 'مهارات تواصل وتفاوض قوية', 'رخصة قيادة سارية'],
    },
    benefits: {
      fa: ['حقوق پایه رقابتی + کمیسیون فروش', 'بیمه درمان کامل', 'خودروی شرکتی و بنزین‌کارت', 'دوره‌های آموزشی تخصصی', 'فرصت رشد شغلی'],
      en: ['Competitive base salary + sales commission', 'Comprehensive health insurance', 'Company car and fuel card', 'Specialized training programs', 'Career growth opportunities'],
      ar: ['راتب أساسي تنافسي + عمولة مبيعات', 'تأمين صحي شامل', 'سيارة شركة وبدل وقود', 'برامج تدريبية متخصصة', 'فرص نمو وظيفي'],
    },
  },
  {
    id: 'technical-support',
    title: { fa: 'پشتیبان فنی و دامپزشک مشاور', en: 'Technical Support Veterinarian', ar: 'طبيب بيطري دعم فني' },
    department: { fa: 'پشتیبانی فنی', en: 'Technical Support', ar: 'الدعم الفني' },
    location: 'گرگان',
    type: { fa: 'دوام کامل', en: 'Full-time', ar: 'دوام كامل' },
    experience: { fa: '۳-۷ سال', en: '3-7 years', ar: '3-7 سنوات' },
    description: {
      fa: 'ارائه مشاوره فنی به مرغداران و دامپزشکان، ارزیابی چالش‌های بیماری، توصیه پروتکل‌های واکسیناسیون و درمان.',
      en: 'Provide technical consultation to poultry farmers and veterinarians, assess disease challenges, recommend vaccination and treatment protocols.',
      ar: 'تقديم الاستشارات الفنية لمربي الدواجن والأطباء البيطريين، تقييم التحديات المرضية، التوصية ببروتوكولات التطعيم والعلاج.',
    },
    requirements: {
      fa: ['دکتری دامپزشکی (DVM) با جواز مزاوله معتبر', 'حداقل ۳ سال تجربه در مرغداری‌های تجاری یا دامداری', 'دانش عمیق بیماری‌های مرغ، دام و آبزیان', 'تجربه در پروتکل‌های واکسیناسیون و بیوسکیورتی', 'قدرت برگزاری کارگاه‌های آموزشی'],
      en: ['DVM with valid license', 'Minimum 3 years in commercial poultry or livestock', 'Deep knowledge of poultry, livestock and aquatic diseases', 'Experience with vaccination protocols and biosecurity', 'Ability to conduct training workshops'],
      ar: ['دكتوراه في الطب البيطري (DVM) مع ترخيص مزاولة ساري', 'خبرة لا تقل عن 3 سنوات في الدواجن التجارية أو المواشي', 'معرفة متعمقة بأمراض الدواجن والمواشي والأسماك', 'خبرة في بروتوكولات التطعيم والأمن الحيوي', 'القدرة على عقد ورش عمل تدريبية'],
    },
    benefits: {
      fa: ['حقوق بسیار جذاب بر اساس تجربه', 'بیمه درمانی برتر', 'بودجه سالانه konferans و آموزش', 'فرصت مشارکت در پروژه‌های پژوهشی', 'محیط کاری حرفه‌ای و محترم'],
      en: ['Highly competitive salary based on experience', 'Premium health insurance', 'Annual conference and training budget', 'Research project participation opportunities', 'Professional and respectful work environment'],
      ar: ['راتب تنافسي جداً حسب الخبرة', 'تأمين صحي متميز', 'ميزانية سنوية للمؤتمرات والتدريب', 'فرص المشاركة في مشاريع بحثية', 'بيئة عمل مهنية ومحترمة'],
    },
  },
  {
    id: 'warehouse-manager',
    title: { fa: 'مدیر انبار و زنجیره تأمین', en: 'Warehouse & Supply Chain Manager', ar: 'مدير مستودع وسلسلة التوريد' },
    department: { fa: 'عملیات و لجستیک', en: 'Operations & Logistics', ar: 'العمليات واللوجستيات' },
    location: 'گرگان (شهرک صنعتی آق‌قلا)',
    type: { fa: 'دوام کامل', en: 'Full-time', ar: 'دوام كامل' },
    experience: { fa: '۵+ سال', en: '5+ years', ar: '5+ سنوات' },
    description: {
      fa: 'مدیریت انبار توزیع واکسن و دارو، نظارت بر زنجیره یخچالی، کنترل موجودی، هماهنگی با تامین‌کنندگان و حمل‌ونقل.',
      en: 'Manage vaccine and drug distribution warehouse, oversee cold chain, inventory control, coordinate with suppliers and transport.',
      ar: 'إدارة مستودع توزيع اللقاحات والأدوية، الإشراف على السلسلة الباردة، التحكم في المخزون، التنسيق مع الموردين والنقل.',
    },
    requirements: {
      fa: ['مدرک ارشد زنجیره تأمین، مهندسی صنایع یا مرتبط', 'حداقل ۵ سال تجربه مدیریت انبار دارو/واکسن (تجربه زنجیره یخچالی الزامی)', ' تسلط بر سیستم‌های WMS و ERP', 'آشنایی با مقررات سازمان دامپزشکی و GMP', 'مهارت رهبری تیم و مدیریت بحران'],
      en: ['Master in Supply Chain, Industrial Engineering or related', 'Minimum 5 years pharma/vaccine warehouse management (cold chain experience mandatory)', 'Proficiency in WMS and ERP systems', 'Knowledge of Veterinary Org regulations and GMP', 'Team leadership and crisis management skills'],
      ar: ['ماجستير في سلسلة التوريد، الهندسة الصناعية أو ذات الصلة', 'خبرة لا تقل عن 5 سنوات في إدارة مستودعات الأدوية/اللقاحات (خبرة السلسلة الباردة إلزامية)', 'إتقان أنظمة WMS و ERP', 'المعرفة بلوائح المنظمة البيطرية و GMP', 'مهارات قيادة الفريق وإدارة الأزمات'],
    },
    benefits: {
      fa: ['بسته حقوقی جذاب', 'بیمه درمانی برتر', 'حق غذا و انتقال', 'شراکت در سود سالانه', 'مسیر ترقی به مدیرعامل'],
      en: ['Attractive compensation package', 'Premium health insurance', 'Meal and transport allowance', 'Annual profit sharing', 'Path to General Manager'],
      ar: ['حزمة تعويضات جذابة', 'تأمين صحي متميز', 'بدل وجبات ونقل', 'مشاركة في الأرباح السنوية', 'مسار للترقية إلى مدير عام'],
    },
  },
];

const benefits = [
  { icon: '🏥', titleKey: 'careers.benefit1.title', descKey: 'careers.benefit1.desc' },
  { icon: '📚', titleKey: 'careers.benefit2.title', descKey: 'careers.benefit2.desc' },
  { icon: '📈', titleKey: 'careers.benefit3.title', descKey: 'careers.benefit3.desc' },
  { icon: '⚖️', titleKey: 'careers.benefit4.title', descKey: 'careers.benefit4.desc' },
  { icon: '🚗', titleKey: 'careers.benefit5.title', descKey: 'careers.benefit5.desc' },
  { icon: '💰', titleKey: 'careers.benefit6.title', descKey: 'careers.benefit6.desc' },
];

export async function generateMetadata({ params }: CareersPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  return {
    title: t('careers.title'),
    description: t('careers.subtitle'),
    openGraph: {
      title: t('careers.title'),
      description: t('careers.subtitle'),
      type: 'website',
    },
  };
}

export default async function CareersPage({ params }: CareersPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  const getLocaleString = (obj: Record<string, string>) => obj[locale] || obj.fa || obj.en;

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">{t('careers.title')}</h1>
          <p className="text-neutral-600 text-lg max-w-2xl">{t('careers.subtitle')}</p>
        </div>
      </div>

      {/* Open Positions */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="jobs-title">
        <div className="container">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2 id="jobs-title" className="text-2xl lg:text-3xl font-bold text-neutral-900">
              {t('careers.positions')}
            </h2>
          </header>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <article key={job.id} className="animate-fade-up stagger-{index + 1}">
                <Card hover padding="lg">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="primary">{getLocaleString(job.department)}</Badge>
                        <Badge variant="neutral">{job.location}</Badge>
                        <Badge variant="accent">{getLocaleString(job.type)}</Badge>
                        <Badge variant="neutral">{getLocaleString(job.experience)}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">{getLocaleString(job.title)}</h3>
                      <p className="text-neutral-600 leading-relaxed mb-6">{getLocaleString(job.description)}</p>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                            <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            {t('careers.requirements')}
                          </h4>
                          <ul className="space-y-2 text-neutral-700">
                            {getLocaleString(job.requirements).map((req, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" aria-hidden="true"></span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                            <span className="w-5 h-5 bg-accent-100 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-accent-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            {t('careers.benefitsList')}
                          </h4>
                          <ul className="space-y-2 text-neutral-700">
                            {getLocaleString(job.benefits).map((benefit, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent-500 rounded-full flex-shrink-0" aria-hidden="true"></span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start lg:self-start">
                      <Link href={`/${locale}/contact/?job=${job.id}`}>
                        <Button className="w-full mb-3">{t('careers.applyNow')}</Button>
                      </Link>
                      <Link href={`/${locale}/contact/`}>
                        <Button variant="outline" className="w-full">{t('careers.generalApplication') || 'ارسال رزومه عمومی'}</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </article>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg">{t('careers.noPositions')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-neutral-50 border-y border-neutral-200" aria-labelledby="benefits-title">
        <div className="container">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <h2 id="benefits-title" className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('careers.benefits')}
            </h2>
            <p className="text-lg text-neutral-600">
              {t('careers.benefitsDesc') || 'در ماکیان دارو، معتقدیم که سرمایه‌گذاری در تیم ما کلید موفقیت ماست'}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={benefit.titleKey} hover padding="lg" className="text-center animate-fade-up stagger-{index + 1}">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{t(benefit.titleKey)}</h3>
                <p className="text-neutral-600 leading-relaxed">{t(benefit.descKey)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary-700 text-white" aria-labelledby="cta-title">
        <div className="container text-center">
          <h2 id="cta-title" className="text-3xl lg:text-4xl font-bold mb-4">
            {t('careers.ctaTitle') || 'منصب مناسب پیدا نکردید؟'}
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            {t('careers.ctaDesc') || 'ما همیشه در جستجوی استعدادهای استثنایی هستیم. رزومه خود را برای فرصت‌های آینده ارسال کنید.'}
          </p>
          <Link href={`/${locale}/contact/`}>
            <Button variant="accent" size="lg">
              {t('careers.generalApplication') || 'ارسال رزومه عمومی'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}