import { NextRequest, NextResponse } from 'next/server';
import { createTranslator } from '@/lib/i18n';
import type { Locale } from '@/config/i18n';

export async function POST(request: NextRequest) {
  try {
    const locale = request.nextUrl.pathname.split('/')[1] as Locale;
    const t = createTranslator(locale);

    const body = await request.json();
    const { email } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: t('footer.newsletterRequired') || 'Email is required' },
        { status: 400 }
      );
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: t('contact.form.invalidEmail') || 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Store in database or email marketing service (Mailchimp, ConvertKit, etc.)
    // 2. Send confirmation email
    // 3. Handle double opt-in if required

    // For now, we'll simulate success and log the subscription
    console.log('Newsletter subscription:', {
      locale,
      email,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email marketing service
    // Example:
    // await subscribeToNewsletter(email, locale);

    return NextResponse.json(
      { success: true, message: t('footer.newsletterSuccess') || 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}