// src/app/(dashboard)/job-seeker-dashboard/page.tsx
'use client';

import { RelevantJobsProvider } from '@/context/RelevantJobsContext';
import InnerDashboard from './InnerDashboard';

export default function JobSeekerDashboardPage() {
  return (
    <RelevantJobsProvider>
      <InnerDashboard />
    </RelevantJobsProvider>
  );
}
