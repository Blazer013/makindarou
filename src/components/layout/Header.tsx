'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { createTranslator } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/config/i18n';

interface HeaderProps {
  currentLocale: Locale;
  currentPath: string;
}

const navItems: Array<{ href: string; labelKey: string }> = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/products/', labelKey: 'nav.products' },
  { href: '/about/', labelKey: 'nav.about' },
  { href: '/news/', labelKey: 'nav.news' },
  { href: '/careers/', labelKey: 'nav.careers' },
  { href: '/contact/', labelKey: 'nav.contact' },
];

export function Header({ currentLocale, currentPath }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dir = currentLocale === 'en' ? 'ltr' : 'rtl';
  const t = createTranslator(currentLocale);

  return (
    <header className={cn('sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-neutral-200', dir === 'rtl' && 'rtl')}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link
            href={`/${currentLocale}/`}
            className="flex items-center gap-3 shrink-0"
            aria-label={t('nav.home')}
          >
            <img
              src="/logo.png"
              alt=""
              className="h-10 w-auto"
              width="120"
              height="40"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label={t('nav.home')}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${currentLocale}${item.href}`}
                className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600 rounded-lg transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right side: Language + Contact CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <LanguageSwitcher currentLocale={currentLocale} currentPath={currentPath} />

            <Link
              href={`/${currentLocale}/contact/`}
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              {t('nav.contact')}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden btn btn-ghost btn-sm"
              aria-label={t('common.menu') || 'Toggle menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          role="navigation"
          aria-label={t('common.mobileMenu') || 'Mobile navigation'}
        >
          <div className="py-4 space-y-1 border-t border-neutral-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${currentLocale}${item.href}`}
                className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <Link
              href={`/${currentLocale}/contact/`}
              className="btn btn-primary btn-full mt-2 block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}