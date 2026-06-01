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
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      {sidebar}
      <main style={{ paddingLeft: '260px' }} className="p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
