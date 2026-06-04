'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function AdminLayoutClient({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // If it's the login page, hide the sidebar and don't add the left margin
  if (isLoginPage) {
    return <div className="min-h-screen bg-black text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {sidebar}
      <main style={{ marginLeft: '260px' }} className="p-8 md:p-10 lg:p-12 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
