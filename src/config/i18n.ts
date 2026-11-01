export type Locale = 'fa' | 'en' | 'ar';

export const locales: Locale[] = ['fa', 'en', 'ar'];
export const defaultLocale: Locale = 'fa';

export const localeNames: Record<Locale, string> = {
  fa: 'فارسی',
  en: 'English',
  ar: 'العربية',
};

export const localeDirs: Record<Locale, 'rtl' | 'ltr'> = {
  fa: 'rtl',
  en: 'ltr',
  ar: 'rtl',
};

export const localeFlags: Record<Locale, string> = {
  fa: '🇮🇷',
  en: '🇺🇸',
  ar: '🇸🇦',
};

export function getDir(locale: Locale): 'rtl' | 'ltr' {
  return localeDirs[locale];
}

export function getLang(locale: Locale): string {
  const langMap: Record<Locale, string> = {
    fa: 'fa-IR',
    en: 'en-US',
    ar: 'ar-SA',
  };
  return langMap[locale];
}

export function isRtl(locale: Locale): boolean {
  return localeDirs[locale] === 'rtl';
}