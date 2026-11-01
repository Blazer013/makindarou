import type { Locale } from '@/config/i18n';
import { translations } from '@/config/translations';

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] || key;
}

export function createTranslator(locale: Locale) {
  return (key: string) => t(locale, key);
}

export { translations };
export type { Locale } from '@/config/i18n';