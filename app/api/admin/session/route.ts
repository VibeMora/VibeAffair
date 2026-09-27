import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('admin_session')?.value;
    const authenticated = verifySession(sessionId);
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error('[Admin Session Check Error]:', error);
    return NextResponse.json({ authenticated: false });
  }
}
