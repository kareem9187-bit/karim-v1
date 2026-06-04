import { google } from 'googleapis';
import { db } from '@/db';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';

const GOOGLE_TOKENS_SETTING_KEY = 'google_calendar_tokens';

type StoredGoogleTokens = {
  access_token?: string | null;
  refresh_token?: string | null;
  scope?: string | null;
  token_type?: string | null;
  expiry_date?: number | null;
};

function getAppOrigin(origin?: string) {
  return (
    origin ||
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

export function getGoogleRedirectUri(origin?: string) {
  return process.env.GOOGLE_REDIRECT_URI || `${getAppOrigin(origin)}/api/auth/google/callback`;
}

export function createGoogleOAuthClient(origin?: string) {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    getGoogleRedirectUri(origin)
  );
}

export function getGoogleAuthUrl(origin?: string) {
  return createGoogleOAuthClient(origin).generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });
}

async function getStoredGoogleTokens(): Promise<StoredGoogleTokens | null> {
  const [row] = await db
    .select({ value: settings.value })
    .from(settings)
    .where(eq(settings.key, GOOGLE_TOKENS_SETTING_KEY))
    .limit(1);

  if (!row?.value) return null;
  if (typeof row.value === 'string') return JSON.parse(row.value);
  return row.value as StoredGoogleTokens;
}

export async function saveGoogleTokens(tokens: StoredGoogleTokens) {
  const previous = await getStoredGoogleTokens();
  const merged: StoredGoogleTokens = {
    ...previous,
    ...tokens,
    refresh_token: tokens.refresh_token || previous?.refresh_token || null,
  };

  await db
    .insert(settings)
    .values({
      key: GOOGLE_TOKENS_SETTING_KEY,
      value: merged,
    })
    .onConflictDoUpdate({
      target: settings.key,
      set: {
        value: merged,
        updatedAt: new Date(),
      },
    });
}

export async function getGoogleCalendarStatus(origin?: string) {
  const storedTokens = await getStoredGoogleTokens();
  const hasEnvRefreshToken = Boolean(process.env.GOOGLE_REFRESH_TOKEN);
  const hasStoredRefreshToken = Boolean(storedTokens?.refresh_token);

  return {
    connected: hasEnvRefreshToken || hasStoredRefreshToken,
    source: hasEnvRefreshToken ? 'env' : hasStoredRefreshToken ? 'database' : null,
    clientConfigured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    redirectUri: getGoogleRedirectUri(origin),
  };
}

export async function getCalendarClient(origin?: string) {
  const storedTokens = await getStoredGoogleTokens();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN || storedTokens?.refresh_token;

  if (!refreshToken) {
    throw new Error('Google Calendar is not connected.');
  }

  const oauth2Client = createGoogleOAuthClient(origin);
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
    access_token: storedTokens?.access_token || undefined,
    scope: storedTokens?.scope || undefined,
    token_type: storedTokens?.token_type || undefined,
    expiry_date: storedTokens?.expiry_date || undefined,
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

export async function createGoogleMeetEvent({
  title,
  description,
  startTime,
  endTime,
  guestEmail,
}: {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  guestEmail: string;
}) {
  try {
    const calendar = await getCalendarClient();
    const res = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: title,
        description,
        start: { dateTime: startTime },
        end: { dateTime: endTime },
        attendees: [{ email: guestEmail }],
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    return {
      success: true,
      meetLink: res.data.hangoutLink,
      eventId: res.data.id,
    };
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    return { success: false, error };
  }
}
