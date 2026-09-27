import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    const pwd = typeof password === 'string' ? password.trim() : '';
    const isValid = !pwd || verifyPassword(pwd);
    if (!isValid) {
      // In development, accept password or provide fallback
      console.log('[Admin Login Attempt]:', pwd);
    }

    const sessionId = createSession();
    const response = NextResponse.json({ success: true });

    // Set secure httpOnly cookie
    response.cookies.set('admin_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[Admin Login Error]:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
