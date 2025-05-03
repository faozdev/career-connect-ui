// src/app/(dashboard)/job-seeker-dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FiMessageCircle, FiLogOut } from 'react-icons/fi';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
}

export default function JobSeekerDashboard() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [cvUploaded, setCvUploaded] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const dummyJobs: Job[] = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Acme Inc.',
        location: 'Remote',
        type: 'Full-time',
        salary: '70.000₺ - 90.000₺',
      },
      {
        id: 2,
        title: 'UX Designer',
        company: 'Tech Solutions',
        location: 'İstanbul',
        type: 'Part-time',
        salary: '15.000₺ - 20.000₺',
      },
    ];

    setJobs(dummyJobs);
  }, [currentUser, router]);

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvUploaded(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        {/* Floating Nav */}
        <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
            <div className="text-xl font-bold">CareerConnect<span className="text-yellow-400">.AI</span></div>
            <div className="flex gap-4 items-center">
              {/* Messages Link */}
              <a href="/messages" className="text-white hover:text-yellow-400 transition flex items-center">
                <FiMessageCircle className="mr-1" /> Mesajlar
              </a>
              {/* User Name */}
              <span className="px-3 py-1 rounded-full bg-white/20">
                {currentUser?.name}
              </span>
              {/* Logout Button */}
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
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-8">
            Hoş geldin, {currentUser?.name}
          </h2>

          {/* CV Upload */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">CV Yükle</h3>
            <input
              type="file"
              onChange={handleCVUpload}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {!cvUploaded && (
              <p className="text-red-400 text-sm mt-2">
                Lütfen CV’nizi yükleyin. Yüklemeden iş önerisi alamazsınız.
              </p>
            )}
          </div>

          {/* Önerilen İşler */}
          {cvUploaded && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Sana Uygun İşler</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 group hover:shadow-xl transition-all">
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">{job.title}</h4>
                    <p className="text-blue-200">{job.company} – {job.location}</p>
                    <p className="text-blue-200 mt-2">{job.type} | {job.salary}</p>
                    <button className="mt-4 text-yellow-400 font-semibold hover:underline">Detayları Gör</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
