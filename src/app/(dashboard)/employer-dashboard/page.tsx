// src/app/(dashboard)/employer-dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  applicants: number;
}

export default function EmployerDashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const dummyJobs: Job[] = [
      {
        id: 1,
        title: 'Full Stack Developer',
        location: 'İzmir',
        type: 'Full-time',
        salary: '30.000₺ - 40.000₺',
        applicants: 4,
      },
      {
        id: 2,
        title: 'Data Analyst',
        location: 'Remote',
        type: 'Part-time',
        salary: '20.000₺ - 25.000₺',
        applicants: 2,
      }
    ];

    setJobs(dummyJobs);
  }, [currentUser, router]);

  const handlePostJob = () => {
    router.push('/post-job');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        {/* Floating Nav */}
        <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
            <div className="text-xl font-bold">CareerConnect<span className="text-yellow-400">.AI</span></div>
            <div className="flex gap-4 items-center">
              <Link href="/login" className="text-white hover:text-yellow-400 transition py-1 px-3 flex items-center">Giriş</Link>
              <Link href="/register" className="bg-yellow-400 text-indigo-900 px-5 py-1.5 rounded-full font-medium hover:bg-yellow-300 transition flex items-center">Kayıt Ol</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto pt-36 pb-24 px-6 md:px-12 relative z-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-8">
            Hoş geldiniz, {currentUser?.name}
          </h2>

          <button
            onClick={handlePostJob}
            className="mb-8 bg-yellow-400 text-indigo-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition shadow-lg shadow-yellow-500/20"
          >
            Yeni İş İlanı Oluştur
          </button>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">İlanlarınız</h3>

            {jobs.length === 0 ? (
              <p className="text-blue-200">Henüz ilanınız yok.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 group hover:shadow-xl transition-all">
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">{job.title}</h4>
                    <p className="text-blue-200">{job.location} | {job.type}</p>
                    <p className="text-blue-200 mt-2">{job.salary}</p>
                    <p className="text-blue-200 mt-2">Başvuran Adaylar: {job.applicants}</p>
                    <button className="mt-4 text-yellow-400 font-semibold hover:underline">Adayları Gör</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}