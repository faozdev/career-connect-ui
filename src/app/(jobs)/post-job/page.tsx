// src/app/(jobs)/post-job/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { FiMessageCircle, FiLogOut } from 'react-icons/fi';
import { useJob, JobForm } from '@/context/JobContext';

export default function PostJobPage() {
  const { currentUser, logout } = useAuth();
  const { postJob } = useJob();
  const router = useRouter();

  const [form, setForm] = useState<JobForm>({
    title: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    skills: '',
  });

  useEffect(() => {
    if (!currentUser || currentUser.type !== 'employer') {
      router.push('/login');
    }
  }, [currentUser, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postJob({ ...form, postedBy: currentUser?.name });
      alert('İş ilanı başarıyla eklendi!');
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error posting job:', err);
      alert(err.message || 'İlan ekleme sırasında bir hata oluştu');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        {/* Floating Nav */}
        <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
            <div className="text-xl font-bold">
              CareerConnect<span className="text-yellow-400">.AI</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/messages"
                className="text-white hover:text-yellow-400 transition flex items-center"
              >
                <FiMessageCircle className="mr-1" /> Mesajlar
              </Link>
              <Link
                href="/dashboard" 
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
              >
                {currentUser?.name}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-400 hover:text-red-200 transition"
              >
                <FiLogOut className="mr-1" /> Çıkış
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto pt-36 pb-24 px-6 md:px-12 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Yeni İş İlanı Oluştur
            </h2>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-white bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition"
            >
              Geri
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              {/* Title */}
              <div>
                <label className="block mb-1 text-yellow-400">Pozisyon Başlığı</label>
                <input
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1 text-yellow-400">Lokasyon</label>
                <input
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block mb-1 text-yellow-400">Çalışma Türü</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Freelance</option>
                  <option>Remote</option>
                  <option>Internship</option>
                </select>
              </div>

              {/* Salary */}
              <div>
                <label className="block mb-1 text-yellow-400">Maaş Aralığı</label>
                <input
                  name="salary"
                  type="text"
                  placeholder="Örn: 20.000₺ - 30.000₺"
                  value={form.salary}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 text-yellow-400">İş Açıklaması</label>
                <textarea
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block mb-1 text-yellow-400">Gereklilikler</label>
                <textarea
                  name="requirements"
                  rows={3}
                  value={form.requirements}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block mb-1 text-yellow-400">Beceriler (virgül ile ayır)</label>
                <input
                  name="skills"
                  type="text"
                  placeholder="React, TypeScript, SQL"
                  value={form.skills}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-4 w-full bg-yellow-400 text-indigo-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition shadow-lg shadow-yellow-500/20"
              >
                İlanı Yayınla
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}



