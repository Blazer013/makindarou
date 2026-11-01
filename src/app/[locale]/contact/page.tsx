'use client';

import { useState } from 'react';
import { createTranslator } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Locale } from '@/config/i18n';

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

const contactInfo = [
  {
    icon: '🏢',
    titleKey: 'contact.info.headOffice',
    lines: [
      'Nahar Khoran Blvd, Between Adalat 105 & 107',
      'Safir Complex, 3rd Floor',
      'Gorgan, Golestan, Iran',
      'Postal Code: 49178',
    ],
  },
  {
    icon: '🏭',
    titleKey: 'contact.info.warehouse',
    lines: [
      'Industrial Zone, Aq Qala',
      'Golestan, Iran',
      'Cold Chain Storage Facility',
      'GMP Certified',
    ],
  },
  {
    icon: '📞',
    titleKey: 'contact.info.phone',
    lines: [
      '+98-17-32520903',
      '+98-17-32520904',
      'Mobile: +98-911-XXX-XXXX',
      'WhatsApp Available',
    ],
  },
  {
    icon: '✉️',
    titleKey: 'contact.info.email',
    lines: [
      'makiandarou@gmail.com',
      'sales@makiandarou.ir',
      'support@makiandarou.ir',
      'hr@makiandarou.ir',
    ],
  },
  {
    icon: '🕐',
    titleKey: 'contact.info.hours',
    lines: [
      'Saturday - Wednesday: 8:00 - 17:00',
      'Thursday: 8:00 - 13:00',
      'Friday: Closed',
      'Emergency: 24/7 Hotline',
    ],
  },
];

export default async function ContactPage({ params }: ContactPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = createTranslator(locale);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('common.required');
    if (!formData.email.trim()) newErrors.email = t('common.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.form.invalidEmail') || 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = t('common.required');
    if (!formData.subject.trim()) newErrors.subject = t('common.required');
    if (!formData.message.trim()) newErrors.message = t('common.required');
    else if (formData.message.trim().length < 10) newErrors.message = t('contact.form.messageTooShort') || 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus('submitting');

    try {
      const response = await fetch(`/${locale}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">{t('contact.title')}</h1>
          <p className="text-neutral-600 text-lg max-w-2xl">{t('contact.subtitle')}</p>
        </div>
      </div>

      <div className="container py-16 lg:py-24 flex-grow">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={info.titleKey} padding="lg" className="animate-fade-up stagger-{index + 1}">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-3">{t(info.titleKey)}</h3>
                    <div className="space-y-1 text-neutral-600 text-sm">
                      {info.lines.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* 24/7 Support Badge */}
            <Card padding="lg" className="bg-primary-50 border-primary-100 text-center animate-fade-up stagger-6">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('contact.info.support247')}</h3>
              <p className="text-neutral-600 mb-4">برای موارد اضطراری و مشاوره فنی فوری</p>
              <a href="tel:+981732520903" className="btn btn-primary">
                {t('contact.callNow') || 'تماس فوری'}
              </a>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              <header className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-2">{t('contact.form.title') || 'فرم تماس'}</h2>
                <p className="text-neutral-600">{t('contact.form.desc') || 'فیلدهای ستاره‌دار الزامی هستند'}</p>
              </header>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800" role="alert">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>{t('contact.form.success')}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800" role="alert">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-7a1 1 0 10-2 0v4a1 1 0 102 0v-4zm1-1a1 1 0 10-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                    </svg>
                    <p>{t('contact.form.error')}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={t('contact.form.name')}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder={t('contact.form.namePlaceholder') || 'مثال: احمد محمدی'}
                    required
                    autoComplete="name"
                  />
                  <Input
                    label={t('contact.form.email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder={t('contact.form.emailPlaceholder') || 'مثال: ahmad@example.com'}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label={t('contact.form.phone')}
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder={t('contact.form.phonePlaceholder') || 'مثال: ۰۹۱۱۱۲۳۴۵۶۷'}
                    required
                    autoComplete="tel"
                  />
                  <Input
                    label={t('contact.form.company')}
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('contact.form.companyPlaceholder') || 'نام شرکت/سازمان (اختیاری)'}
                    autoComplete="organization"
                  />
                </div>

                <Input
                  label={t('contact.form.subject')}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder={t('contact.form.subjectPlaceholder') || 'موضوع پیام'}
                  required
                >
                  <option value="" disabled>{t('contact.form.selectSubject') || 'موضوع را انتخاب کنید'}</option>
                  <option value="general">{t('contact.subjects.general') || 'استعلام عمومی'}</option>
                  <option value="product">{t('contact.subjects.product') || 'استعلام محصول'}</option>
                  <option value="order">{t('contact.subjects.order') || 'سفارش و خرید'}</option>
                  <option value="technical">{t('contact.subjects.technical') || 'پشتیبانی فنی'}</option>
                  <option value="complaint">{t('contact.subjects.complaint') || 'شکایت و پیشنهاد'}</option>
                  <option value="partnership">{t('contact.subjects.partnership') || 'همکاری و نمایندگی'}</option>
                  <option value="career">{t('contact.subjects.career') || 'فرصت‌های شغلی'}</option>
                  <option value="other">{t('contact.subjects.other') || 'سایر'}</option>
                </Input>

                <Textarea
                  label={t('contact.form.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder={t('contact.form.messagePlaceholder') || 'پیام خود را اینجا بنویسید...'}
                  rows={6}
                  required
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" size="lg" loading={submitStatus === 'submitting'} className="w-full sm:w-auto">
                    {submitStatus === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' })} className="w-full sm:w-auto">
                    {t('common.clear') || 'پاک کردن'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 lg:mt-16">
          <div className="aspect-video bg-neutral-100 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-6xl mb-4 block">🗺️</span>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{t('contact.map')}</h3>
                <p className="text-neutral-600">{t('contact.mapDesc') || 'موقعیت دفتر مرکزی روی نقشه'}</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                  {t('contact.openInMaps') || 'باز کردن در نقشه گوگل'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}