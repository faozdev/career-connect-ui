// src/components/Header.tsx

'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CareerConnect
        </Link>

        <nav className="space-x-4">
          {!currentUser ? (
            <>
              <Link href="/(auth)/login" className="text-blue-600 hover:underline">
                Giriş Yap
              </Link>
              <Link href="/(auth)/register" className="text-blue-600 hover:underline">
                Kayıt Ol
              </Link>
            </>
          ) : (
            <>
              <Link href="/(dashboard)/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:underline"
              >
                Çıkış Yap
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
