import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createGoogleOAuthClient, saveGoogleTokens } from '@/utils/google-calendar';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/admin/booking-profile?google=error', request.url));
  }

  try {
    const oauth2Client = createGoogleOAuthClient(request.nextUrl.origin);
    const { tokens } = await oauth2Client.getToken(code);
    await saveGoogleTokens(tokens);
    return NextResponse.redirect(new URL('/admin/booking-profile?google=connected', request.url));
  } catch (e) {
    console.error('Google Calendar OAuth callback failed:', e);
    return NextResponse.redirect(new URL('/admin/booking-profile?google=error', request.url));
  }
}
