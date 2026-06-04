import AdminLayoutClient from './admin-layout-client';
import AdminSidebar from './admin-sidebar';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient sidebar={<AdminSidebar />}>{children}</AdminLayoutClient>;
}
