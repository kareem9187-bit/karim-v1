import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'
);

// Retrieve from DB or env (usually you store this in your settings table after the admin connects their account)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export async function createGoogleMeetEvent({
  title,
  description,
  startTime, // e.g., '2026-05-31T10:00:00+03:00'
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

export function getGoogleAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ],
  });
}
