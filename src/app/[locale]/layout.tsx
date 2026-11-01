import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createTranslator } from '@/lib/i18n';
import { locales, getDir, getLang, type Locale } from '@/config/i18n';
import { organizationJsonLd, websiteJsonLd, generateJsonLd } from '@/lib/utils';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const dir = getDir(locale);
  const lang = getLang(locale);
  const t = createTranslator(locale);

  const structuredData = [
    organizationJsonLd,
    websiteJsonLd(),
  ];

  return (
    <html lang={lang} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateJsonLd(structuredData) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <SkipLink />
        <Header currentLocale={locale} currentPath={`/${locale}/`} />
        <main id="main-content" className="flex-grow" role="main">
          {children}
        </main>
        <Footer currentLocale={locale} />
      </body>
    </html>
  );
}