import Link from 'next/link';
import AdminLayoutClient from './admin-layout-client';

const SIDEBAR_LINKS = [
  { group: 'Content', items: [
    { href: '/admin', label: 'Overview', icon: '📊' },
    { href: '/admin/hero', label: 'Hero', icon: '🎬' },
    { href: '/admin/welcome', label: 'Welcome', icon: '✨' },
    { href: '/admin/about', label: 'About', icon: '👤' },
    { href: '/admin/services', label: 'Services', icon: '⚙️' },
    { href: '/admin/work', label: 'Work', icon: '🖼️' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
    { href: '/admin/training', label: 'Training', icon: '🎓' },
    { href: '/admin/brands', label: 'Brands', icon: '🏷️' },
    { href: '/admin/stats', label: 'Stats', icon: '📈' },
    { href: '/admin/faq', label: 'FAQ', icon: '❓' },
  ]},
  { group: 'Booking', items: [
    { href: '/admin/event-types', label: 'Event Types', icon: '📅' },
    { href: '/admin/availability', label: 'Availability', icon: '🕐' },
    { href: '/admin/booking-profile', label: 'Profile', icon: '🪪' },
    { href: '/admin/bookings', label: 'Bookings', icon: '📋' },
  ]},
  { group: 'System', items: [
    { href: '/admin/mail', label: 'Mail', icon: '📧' },
    { href: '/admin/contact', label: 'Contact Info', icon: '📞' },
    { href: '/admin/submissions', label: 'Submissions', icon: '📨' },
    { href: '/admin/media', label: 'Media', icon: '🖼️' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
    { href: '/admin/seo', label: 'SEO', icon: '🔍' },
  ]},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebar = (
    <aside className="w-[260px] border-e border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.3)] backdrop-blur-[20px] overflow-y-auto fixed inset-y-0 start-0 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/admin" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2d6aab] to-[#224f81] flex items-center justify-center text-white font-bold text-[12px]">
            KA
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Karim Abdelaziz</div>
            <div className="text-[11px] text-[rgba(255,255,255,0.4)]">Dashboard</div>
          </div>
        </Link>
      </div>

      {/* Nav groups */}
      <div className="p-4">
        {SIDEBAR_LINKS.map((group) => (
          <div key={group.group} className="mb-6">
            <div className="text-[10px] tracking-[2px] uppercase text-[rgba(255,255,255,0.3)] font-semibold mb-2 px-3">
              {group.group}
            </div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-[10px] rounded-lg text-[13px] text-[rgba(255,255,255,0.6)] no-underline transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
              >
                <span className="text-[14px]">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* View site link */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-[rgba(255,255,255,0.4)] no-underline hover:text-white transition-colors"
        >
          ↗ View Site
        </Link>
      </div>
    </aside>
  );

  return <AdminLayoutClient sidebar={sidebar}>{children}</AdminLayoutClient>;
}
