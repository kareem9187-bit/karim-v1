import { db } from '@/db';
import { works, testimonials, bookings, contactSubmissions, emails } from '@/db/schema';
import { count, eq, and } from 'drizzle-orm';

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
    { label: 'Portfolio Items', value: worksCount[0]?.count || 0, icon: '🖼️' },
    { label: 'Testimonials', value: testimonialsCount[0]?.count || 0, icon: '⭐' },
    { label: 'Bookings', value: bookingsCount[0]?.count || 0, icon: '📅' },
    { label: 'Unread Messages', value: unreadCount[0]?.count || 0, icon: '📨' },
    { label: 'Unread Emails', value: unreadEmailsCount[0]?.count || 0, icon: '📧' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-[-0.5px]">Dashboard</h1>
        <p className="text-sm text-[rgba(255,255,255,0.5)] mt-1">Welcome back, Karim</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="p-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl"
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <div className="text-3xl font-bold tracking-[-1px] text-white">{card.value}</div>
            <div className="text-[12px] text-[rgba(255,255,255,0.4)] mt-1 tracking-[0.5px]">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
