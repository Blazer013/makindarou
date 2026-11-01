'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { createTranslator } from '@/lib/i18n';
import type { Locale } from '@/config/i18n';

interface FooterProps {
  currentLocale: Locale;
}

const footerLinks = {
  quickLinks: [
    { href: '/', key: 'nav.home' },
    { href: '/products/', key: 'nav.products' },
    { href: '/about/', key: 'nav.about' },
    { href: '/news/', key: 'nav.news' },
    { href: '/careers/', key: 'nav.careers' },
    { href: '/contact/', key: 'nav.contact' },
  ],
  products: [
    { href: '/products/?category=vaccines', key: 'category.vaccines' },
    { href: '/products/?category=drugs', key: 'category.drugs' },
    { href: '/products/?category=biologicals', key: 'category.biologicals' },
    { href: '/products/?category=supplements', key: 'category.supplements' },
    { href: '/products/?category=disinfectants', key: 'category.disinfectants' },
  ],
  services: [
    { href: '/contact/?subject=distribution', key: 'footer.distribution' },
    { href: '/contact/?subject=consultation', key: 'footer.consultation' },
    { href: '/contact/?subject=training', key: 'footer.training' },
    { href: '/contact/?subject=cold-chain', key: 'footer.coldChain' },
  ],
};

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram', icon: '📷' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: '💼' },
  { href: 'https://twitter.com', label: 'Twitter', icon: '🐦' },
  { href: 'https://telegram.org', label: 'Telegram', icon: '📱' },
];

export function Footer({ currentLocale }: FooterProps) {
  const dir = currentLocale === 'en' ? 'ltr' : 'rtl';
  const t = createTranslator(currentLocale);

  return (
    <footer className={cn('bg-neutral-900 text-neutral-300', dir === 'rtl' && 'rtl')} role="contentinfo">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 md:col-span-2 space-y-6">
            <Link href={`/${currentLocale}/`} className="flex items-center gap-3" aria-label={t('nav.home')}>
              <img
                src="/logo.png"
                alt=""
                className="h-10 w-auto"
                width="120"
                height="40"
              />
            </Link>
            <p className="text-neutral-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors text-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label={t('footer.quickLinks')}>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${currentLocale}${link.href}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label={t('footer.products')}>
            <h3 className="text-white font-semibold mb-4">{t('footer.products')}</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${currentLocale}${link.href}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t('footer.services')}>
            <h3 className="text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${currentLocale}${link.href}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h3>
              <address className="not-italic space-y-3 text-neutral-400">
                <p>
                  <strong className="text-white">{t('contact.info.headOffice')}</strong>
                  <br />
                  Nahar Khoran Blvd, Between Adalat 105 & 107, Safir Complex, 3rd Floor
                  <br />
                  Gorgan, Golestan, Iran
                </p>
                <p>
                  <strong className="text-white">{t('contact.info.warehouse')}</strong>
                  <br />
                  Industrial Zone, Aq Qala, Golestan
                </p>
                <p>
                  <a href="tel:+981732520903" className="hover:text-white transition-colors">
                    {t('contact.info.phone')}: +98-17-32520903
                  </a>
                </p>
                <p>
                  <a href="mailto:makiandarou@gmail.com" className="hover:text-white transition-colors">
                    {t('contact.info.email')}: makiandarou@gmail.com
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.newsletter')}</h3>
              <form className="space-y-3" action={`/${currentLocale}/newsletter/`} method="POST">
                <div className="flex gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder={t('footer.newsletterPlaceholder')}
                    className="flex-1 px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    aria-label={t('footer.newsletterPlaceholder')}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary whitespace-nowrap"
                  >
                    {t('footer.subscribe')}
                  </button>
                </div>
                <p className="text-xs text-neutral-500">
                  {t('footer.privacy')} | {t('footer.terms')}
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href={`/${currentLocale}/privacy/`} className="text-neutral-500 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href={`/${currentLocale}/terms/`} className="text-neutral-500 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}