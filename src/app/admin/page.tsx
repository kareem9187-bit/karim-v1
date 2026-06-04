import { db } from '@/db';
import { works, testimonials, bookings, contactSubmissions, emails } from '@/db/schema';
import { count, eq, and } from 'drizzle-orm';
import { Image as ImageIcon, Star, CalendarDays, Inbox, Mail } from 'lucide-react';

export const metadata = { title: 'Dashboard | Admin' };

export default async function AdminPage() {
  const [worksCount, testimonialsCount, bookingsCount, unreadCount, unreadEmailsCount] = await Promise.all([
    db.select({ count: count() }).from(works),
    db.select({ count: count() }).from(testimonials),
    db.select({ count: count() }).from(bookings),
    db.select({ count: count() }).from(contactSubmissions).where(eq(contactSubmissions.read, false)),
    db.select({ count: count() }).from(emails).where(and(eq(emails.read, false), eq(emails.folder, 'inbox'))),
  ]);

  const statsCards = [
    { label: 'Portfolio Items', value: worksCount[0]?.count || 0, icon: ImageIcon, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Testimonials', value: testimonialsCount[0]?.count || 0, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Bookings', value: bookingsCount[0]?.count || 0, icon: CalendarDays, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Unread Messages', value: unreadCount[0]?.count || 0, icon: Inbox, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Unread Emails', value: unreadEmailsCount[0]?.count || 0, icon: Mail, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400 font-medium">Welcome back, Karim. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="p-6 bg-[#0F0F0F] border border-white/5 rounded-xl flex flex-col hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tight text-white mb-1">{card.value}</div>
              <div className="text-sm font-medium text-neutral-500">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
