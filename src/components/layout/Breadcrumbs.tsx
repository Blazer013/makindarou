import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Locale } from '@/config/i18n';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: Locale;
  className?: string;
}

export function Breadcrumbs({ items, locale, className }: BreadcrumbsProps) {
  const dir = locale === 'en' ? 'ltr' : 'rtl';

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-4', className)} dir={dir}>
      <ol className="flex items-center gap-2 text-sm" role="list">
        {items.map((item, index) => (
          <li key={item.href || item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span className={cn('text-neutral-400', dir === 'rtl' && 'rotate-180')} aria-hidden="true">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-neutral-500 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-900 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}