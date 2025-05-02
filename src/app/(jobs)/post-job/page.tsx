// src/app/(jobs)/post-job/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    if (!currentUser || currentUser.type !== 'employer') {
      router.push('/(auth)/login');
    }
  }, [currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Gerçek backend'e gitmiyoruz, sadece alert veriyoruz
    console.log({
      title,
      location,
      type,
      salary,
      description,
      requirements,
      skills,
      postedBy: currentUser?.name,
    });

    alert('İş ilanı başarıyla eklendi!');
    router.push('/(dashboard)/employer-dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Yeni İş İlanı Oluştur</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Pozisyon Başlığı</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Lokasyon</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Çalışma Türü</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Freelance</option>
            <option>Remote</option>
            <option>Internship</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Maaş Aralığı</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Örn: 20.000₺ - 30.000₺"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">İş Açıklaması</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Gereklilikler</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Beceriler (virgül ile ayır)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="React, TypeScript, SQL"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          İlanı Yayınla
        </button>
      </form>
    </div>
  );
}
