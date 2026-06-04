import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getGoogleAuthUrl, getGoogleCalendarStatus } from '@/utils/google-calendar';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const status = await getGoogleCalendarStatus(request.nextUrl.origin);
  if (!status.clientConfigured) {
    return NextResponse.redirect(new URL('/admin/booking-profile?google=missing-config', request.url));
  }

  return NextResponse.redirect(getGoogleAuthUrl(request.nextUrl.origin));
}
