import { NextRequest, NextResponse } from 'next/server';
import { createTranslator } from '@/lib/i18n';
import type { Locale } from '@/config/i18n';

export async function POST(request: NextRequest) {
  try {
    const locale = request.nextUrl.pathname.split('/')[1] as Locale;
    const t = createTranslator(locale);

    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: t('contact.form.validationError') || 'All required fields must be filled' },
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
    // 1. Send email via service like SendGrid, Nodemailer, etc.
    // 2. Store in database
    // 3. Send notification to team

    // For now, we'll simulate success and log the submission
    console.log('Contact form submission:', {
      locale,
      name,
      email,
      phone,
      company,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // Example:
    // await sendEmail({
    //   to: 'sales@makiandarou.ir',
    //   subject: `[Contact Form] ${subject}: ${name}`,
    //   html: generateContactEmailHTML(body),
    // });

    return NextResponse.json(
      { success: true, message: t('contact.form.success') },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}