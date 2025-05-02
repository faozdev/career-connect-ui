// src/components/ProtectedRoute.tsx
'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.replace('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) return null; // veya yükleniyor spinner
  return <>{children}</>;
}
