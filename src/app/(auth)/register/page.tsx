// src/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'job-seeker' | 'employer'>('job-seeker');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor.');
      return;
    }

    const newUser: User = {
      id: Math.floor(Math.random() * 10000),
      name,
      email,
      type: userType,
    };

    const existingUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
    const updatedUsers = [...existingUsers, { ...newUser, password }];
    localStorage.setItem('dummyUsers', JSON.stringify(updatedUsers));

    alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600">
      {/* Floating Nav */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
          <div className="text-xl font-bold">CareerConnect<span className="text-yellow-400">.AI</span></div>
          <div className="flex gap-4">
            <Link href="/login" className="text-white hover:text-yellow-400 transition">Giriş</Link>
            <Link href="/register" className="bg-yellow-400 text-indigo-900 px-5 py-1 rounded-full font-medium hover:bg-yellow-300 transition">Kayıt Ol</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Kayıt Ol
          </h2>

          {error && <p className="text-red-400 mb-4 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Ad Soyad</label>
              <input
                type="text"
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Şifre</label>
              <input
                type="password"
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Şifre Tekrar</label>
              <input
                type="password"
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-blue-100 mb-2">Hesap Türü</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('job-seeker')}
                  className={`p-4 rounded-xl border transition-all ${
                    userType === 'job-seeker' 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-900 border-yellow-400'
                      : 'bg-white/5 border-white/10 hover:border-yellow-400/30'
                  }`}
                >
                  İş Arayan
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('employer')}
                  className={`p-4 rounded-xl border transition-all ${
                    userType === 'employer' 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-900 border-yellow-400'
                      : 'bg-white/5 border-white/10 hover:border-yellow-400/30'
                  }`}
                >
                  İşveren
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-900 font-semibold py-3 rounded-lg hover:from-yellow-300 hover:to-yellow-200 transition duration-300 shadow-lg shadow-yellow-500/20"
            >
              Kayıt Ol
            </button>
          </form>

          <p className="text-center mt-6 text-blue-200">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 transition">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}