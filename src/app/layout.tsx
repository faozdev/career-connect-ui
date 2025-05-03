'use client';

import '../styles/globals.css';
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { JobProvider } from '@/context/JobContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          <JobProvider>
            {children}
          </JobProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
