// src/app/(dashboard)/employer-dashboard/applicants/[jobId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { FiMessageCircle, FiLogOut } from 'react-icons/fi';

interface Job {
  id: number;
  title: string;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  experience: string;
  matchRate: number;
}

export default function ApplicantsPage() {
  const { jobId } = useParams();
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState<string>('');
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const jobs: Job[] = [
      { id: 1, title: 'Full Stack Developer' },
      { id: 2, title: 'Data Analyst' },
      { id: 3, title: 'UX Researcher' },
      { id: 4, title: 'DevOps Engineer' },
    ];

    const job = jobs.find((j) => j.id === Number(jobId));
    if (job) setJobTitle(job.title);

    const dummyApplicants: Applicant[] = [
      {
        id: 1,
        name: 'Ayşe Yılmaz',
        email: 'ayse@example.com',
        experience: '3 yıl frontend geliştirme',
        matchRate: 92,
      },
      {
        id: 2,
        name: 'Mehmet Demir',
        email: 'mehmet@example.com',
        experience: '2 yıl backend geliştirme',
        matchRate: 87,
      },
      {
        id: 3,
        name: 'Zeynep Kara',
        email: 'zeynep@example.com',
        experience: '4 yıl fullstack deneyimi',
        matchRate: 95,
      },
    ];

    setApplicants(dummyApplicants);
  }, [jobId, currentUser, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleOffer = (name: string) => {
    alert(`${name} adlı adaya teklif başarıyla gönderildi!`);
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
            <div className="flex gap-4 items-center">
              <Link href="/messages" className="text-white hover:text-yellow-400 transition flex items-center">
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
              İlan: {jobTitle}
            </h2>
            <button
              onClick={() => router.back()}
              className="text-white bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition"
            >
              Geri
            </button>
          </div>

          {applicants.length === 0 ? (
            <p className="text-blue-200">Bu ilana henüz başvuru yapılmadı.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {applicants.map((applicant) => (
                <div key={applicant.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">{applicant.name}</h4>
                    <p className="text-blue-200">{applicant.email}</p>
                    <p className="text-blue-200 mt-1">{applicant.experience}</p>
                    <p className="text-blue-200 mt-1 mb-4">Uyum Oranı: %{applicant.matchRate}</p>
                  </div>
                  <div className="flex gap-4 mt-auto">
                    <button
                      onClick={() => handleOffer(applicant.name)}
                      className="flex-1 bg-yellow-400 text-indigo-900 font-semibold py-2 rounded-full hover:bg-yellow-300 transition"
                    >
                      Teklif Gönder
                    </button>
                    <button
                      onClick={() => router.push('/messages')}
                      className="flex-1 bg-white/20 text-white font-semibold py-2 rounded-full hover:bg-white/30 transition"
                    >
                      Mesaj Gönder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
