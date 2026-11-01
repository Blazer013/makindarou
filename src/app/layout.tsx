import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Arabic, Vazirmatn } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Makian Darou Golestan | Veterinary Pharmaceutical Distributor',
    template: '%s | Makian Darou Golestan',
  },
  description: 'Leading veterinary pharmaceutical and vaccine distributor in Golestan Province, Iran. Vaccines, biologicals, drugs, supplements, and disinfectants for poultry, livestock, and aquatic animals.',
  keywords: [
    'veterinary pharmaceuticals',
    'vaccines',
    'animal health',
    'poultry medicine',
    'livestock medicine',
    'aquatic medicine',
    'Golestan',
    'Iran',
    'Makian Darou',
  ],
  authors: [{ name: 'Makian Darou Golestan' }],
  creator: 'Makian Darou Golestan',
  publisher: 'Makian Darou Golestan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://makiandarou.ir'),
  alternates: {
    canonical: 'https://makiandarou.ir',
    languages: {
      'fa': 'https://makiandarou.ir/fa/',
      'en': 'https://makiandarou.ir/en/',
      'ar': 'https://makiandarou.ir/ar/',
      'x-default': 'https://makiandarou.ir/fa/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://makiandarou.ir',
    siteName: 'Makian Darou Golestan',
    title: 'Makian Darou Golestan | Veterinary Pharmaceutical Distributor',
    description: 'Leading veterinary pharmaceutical and vaccine distributor in Golestan Province, Iran',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Makian Darou Golestan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makian Darou Golestan',
    description: 'Leading veterinary pharmaceutical and vaccine distributor in Golestan Province, Iran',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d9488' },
    { media: '(prefers-color-scheme: dark)', color: '#0f766e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      className={`${inter.variable} ${notoSansArabic.variable} ${vazirmatn.variable} h-full antialiased`}
      dir="rtl"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}