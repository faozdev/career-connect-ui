// src/app/(auth)/login/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'job-seeker' | 'employer'>('job-seeker');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, userType);
    if (success) {
      // Kullanıcı tipine göre farklı dashboard'a yönlendir
      if (userType === 'job-seeker') {
        router.push('/job-seeker-dashboard');
      } else {
        router.push('/employer-dashboard');
      }
    } else {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Giriş Yap</h2>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Şifre</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Kullanıcı Tipi</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="job-seeker"
                checked={userType === 'job-seeker'}
                onChange={() => setUserType('job-seeker')}
              />
              <span className="ml-2">İş Arayan</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="employer"
                checked={userType === 'employer'}
                onChange={() => setUserType('employer')}
              />
              <span className="ml-2">İşveren</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}