// src/app/(auth)/register/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/context/AuthContext';

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
      id: Math.floor(Math.random() * 10000), // Dummy ID
      name,
      email,
      type: userType,
    };

    // Normalde sunucuya gönderirdik. Şimdilik localStorage’a kaydediyoruz.
    const existingUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]');
    const updatedUsers = [...existingUsers, { ...newUser, password }];
    localStorage.setItem('dummyUsers', JSON.stringify(updatedUsers));

    alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    router.push('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Kayıt Ol</h2>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Ad Soyad</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          <label className="block mb-1">Şifre Tekrar</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
