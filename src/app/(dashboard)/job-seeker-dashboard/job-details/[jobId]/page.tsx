//// src/app/(dashboard)/job-seeker-dashboard/job-details/[jobId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  requirements: string[];
}

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const dummyJobs: Job[] = [
      {
        id: 1,
        title: 'Frontend Developer',
        description: 'React ve Tailwind ile modern web uygulamaları geliştirmek.',
        company: 'Acme Inc.',
        location: 'Remote',
        salary: '70.000₺ - 90.000₺',
        type: 'Full-time',
        requirements: ['3+ yıl deneyim', 'React.js bilgisi', 'Responsive tasarım'],
      },
      {
        id: 2,
        title: 'UX Designer',
        description: 'Kullanıcı deneyimini artırmaya yönelik tasarım süreçlerine katkı sağlamak.',
        company: 'Tech Solutions',
        location: 'İstanbul',
        salary: '15.000₺ - 20.000₺',
        type: 'Part-time',
        requirements: ['Figma bilgisi', 'Kullanıcı araştırması deneyimi'],
      },
    ];

    const foundJob = dummyJobs.find(j => j.id === Number(jobId));
    if (foundJob) setJob(foundJob);
  }, [jobId, currentUser, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleApply = () => {
    setApplied(true);
    // Gerçek sistemde burada başvuru API isteği yapılır
    alert('Başvurunuz başarıyla alınmıştır!');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        {/* Navbar */}
        <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
            <div className="text-xl font-bold">
              CareerConnect<span className="text-yellow-400">.AI</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-white/20">
                {currentUser?.name}
              </span>
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
          <button
            onClick={() => router.back()}
            className="mb-6 bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-full text-white"
          >
            ← Geri
          </button>

          {!job ? (
            <p className="text-blue-200">İlan bilgisi bulunamadı.</p>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">{job.title}</h2>
              <p className="text-blue-200 mb-1">{job.company} – {job.location}</p>
              <p className="text-blue-200 mb-4">{job.type} | {job.salary}</p>
              <p className="mb-6 text-white/90 leading-relaxed">{job.description}</p>

              <h3 className="text-xl font-semibold text-yellow-300 mb-3">Gereksinimler</h3>
              <ul className="list-disc list-inside text-white/90 space-y-1 mb-8">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>

              {/* Başvur butonu */}
              {!applied ? (
                <button
                  onClick={handleApply}
                  className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold px-6 py-3 rounded-full transition"
                >
                  Başvur
                </button>
              ) : (
                <div className="text-green-300 font-semibold text-lg">
                  ✅ Bu ilana başvurdunuz
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
