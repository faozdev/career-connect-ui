'use client';

import '../styles/globals.css';
import React, { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { JobProvider } from '@/context/JobContext';
import { RelevantJobsProvider } from '@/context/RelevantJobsContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          <JobProvider>
          <RelevantJobsProvider>
              {children}
            </RelevantJobsProvider>
          </JobProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
