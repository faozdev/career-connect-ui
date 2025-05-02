// src/app/(dashboard)/dashboard/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardRedirectPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    } else if (currentUser.type === 'job-seeker') {
      router.push('/job-seeker-dashboard');
    } else if (currentUser.type === 'employer') {
      router.push('/employer-dashboard');
    }
  }, [currentUser, router]);

  return (
    <div className="text-center mt-20 text-gray-500">
      Yönlendiriliyorsunuz...
    </div>
  );
}
