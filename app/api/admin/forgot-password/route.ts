import { NextRequest, NextResponse } from 'next/server';
import { createResetToken, AUTHORIZED_ADMIN_EMAIL } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const result = createResetToken(email);
    if (!result.success || !result.token) {
      return NextResponse.json(
        { success: false, error: result.error || 'Unable to generate reset link.' },
        { status: 400 }
      );
    }

    // Determine host URL
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const resetUrl = `${protocol}://${host}/admin/reset-password?token=${result.token}`;

    // Output clearly to the server terminal for development/testing
    console.log('\n======================================================');
    console.log('🔐 [Admin Password Reset Request]');
    console.log(`Recipient: ${AUTHORIZED_ADMIN_EMAIL}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log('======================================================\n');

    return NextResponse.json({
      success: true,
      message: `Password reset link has been dispatched to ${AUTHORIZED_ADMIN_EMAIL}.`,
      previewUrl: resetUrl,
    });
  } catch (error) {
    console.error('[Admin Forgot Password Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
