'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { HeroUIProvider } from "@heroui/system";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Toaster position="top-center" />
      {children}
    </HeroUIProvider>
  );
}
