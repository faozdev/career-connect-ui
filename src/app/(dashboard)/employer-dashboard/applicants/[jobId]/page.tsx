// src/app/(dashboard)/employer-dashboard/applicants/[jobId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { FiMessageCircle, FiLogOut } from 'react-icons/fi';
import api from '@/lib/api';

interface Job {
  id: number;
  title: string;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  experience?: string;
  matchRate?: number;
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

    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('token');

        // 1. Başvuranların ID listesini al
        const res = await api.get<{ seekerId: number }[]>(`/job/${jobId}/applicants`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 2. 0 olmayan ID'ler için aday bilgilerini topla
        const applicants = await Promise.all(
          res.data
            .filter(app => app.seekerId !== 0)
            .map(async ({ seekerId }) => {
              const userRes = await api.get<{ id: number; name: string; email: string }>(`/auth/profile/${seekerId}`, {

                headers: { Authorization: `Bearer ${token}` },
              });

              return {
                id: seekerId,
                name: userRes.data.name,
                email: userRes.data.email,
                experience: 'Deneyim bilgisi henüz eklenmedi.',
                matchRate: Math.floor(Math.random() * 21) + 80,
              };
            })
        );

        setApplicants(applicants);

        // 3. İş başlığını getir
        const jobRes = await api.get<Job>(`/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobTitle(jobRes.data.title);
      } catch (error) {
        console.error('Aday verileri alınamadı:', error);
      }
    };

    fetchApplicants();
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
