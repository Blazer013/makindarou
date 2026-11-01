'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { locales, localeNames, localeFlags, type Locale } from '@/config/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  currentPath: string;
}

function getLocalizedPath(path: string, targetLocale: Locale): string {
  const segments = path.split('/').filter(Boolean);
  if (segments[0] === 'fa' || segments[0] === 'en' || segments[0] === 'ar') {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return '/' + segments.join('/') + '/';
}

export function LanguageSwitcher({ currentLocale, currentPath }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 rounded-lg transition-colors',
          'bg-white border border-neutral-200 hover:bg-neutral-50'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={currentLocale === 'fa' ? 'انتخاب زبان' : currentLocale === 'ar' ? 'اختر اللغة' : 'Select language'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span aria-hidden="true" className="text-lg">{localeFlags[currentLocale]}</span>
        <span>{localeNames[currentLocale]}</span>
        <svg className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={currentLocale === 'fa' ? 'زبان‌های موجود' : currentLocale === 'ar' ? 'اللغات المتاحة' : 'Available languages'}
          className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 opacity-0 visible animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ zIndex: 50 }}
        >
          {locales.map((locale) => (
            <li key={locale}>
              <a
                href={getLocalizedPath(currentPath, locale)}
                role="option"
                aria-selected={locale === currentLocale}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                  locale === currentLocale
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                )}
              >
                <span aria-hidden="true" className="text-lg">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
                {locale === currentLocale && (
                  <svg className="w-4 h-4 ml-auto text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}