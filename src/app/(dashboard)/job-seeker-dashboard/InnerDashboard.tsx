// src/dashboard/job-seeker-dashboard/InnerDashboard.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { FiMessageCircle, FiLogOut } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { useRelevantJobs } from '@/context/RelevantJobsContext';

export default function InnerDashboard() {
    const { currentUser, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const [cvUploaded, setCvUploaded] = useState(false);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [cvSectionVisible, setCvSectionVisible] = useState(true);
  const [editingCV, setEditingCV] = useState(false);

  const { jobs, loading: jobsLoading, error } = useRelevantJobs();

  useEffect(() => {
    const storedFileName = localStorage.getItem('cvFileName');
    if (storedFileName) {
      setCvFileName(storedFileName);
      setCvUploaded(true);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login');
    }
  }, [authLoading, currentUser, router]);

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCvFileName(file.name);
      setCvUploaded(true);
      setEditingCV(false);
      localStorage.setItem('cvFileName', file.name);
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

  const getReadableType = (type: string | number) => {
    return type === 0 || type === '0'
      ? 'Full-time'
      : type === 1 || type === '1'
      ? 'Part-time'
      : String(type);
  };

  // 💡 Yeni eklenen: auth loading durumunda ekranı gösterme
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white text-xl">
        Kullanıcı bilgileri yükleniyor...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
            <div className="text-xl font-bold">
              CareerConnect<span className="text-yellow-400">.AI</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/messages" className="text-white hover:text-yellow-400 transition flex items-center">
                <FiMessageCircle className="mr-1" /> Mesajlar
              </Link>
              <span className="px-3 py-1 rounded-full bg-white/20">{currentUser?.name}</span>
              <button onClick={handleLogout} className="flex items-center text-red-400 hover:text-red-200 transition">
                <FiLogOut className="mr-1" /> Çıkış
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto pt-36 pb-24 px-6 md:px-12 relative z-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-8">
            Hoş geldin, {currentUser?.name}
          </h2>

          {/* CV Yükleme */}
          {cvSectionVisible && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8 flex justify-between items-center flex-wrap gap-4">
              {!cvUploaded || editingCV ? (
                <div className="w-full">
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-4">CV Yükle</h3>
                  <div className="flex items-center gap-4">
                    <label htmlFor="cv-upload" className="cursor-pointer inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition">
                      Dosya Seç
                    </label>
                    <span className="text-white text-sm">{cvFileName || "Henüz dosya seçilmedi"}</span>
                  </div>
                  <input id="cv-upload" type="file" onChange={handleCVUpload} className="hidden" />
                  {!cvUploaded && (
                    <div className="mt-4 bg-red-400/10 border border-red-400/30 text-red-300 p-4 rounded-xl text-sm flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 4.354a4.002 4.002 0 012.828 6.827l-.83.828A3.978 3.978 0 0012 16.646a3.978 3.978 0 01-2.828-1.163l-.83-.828A4.002 4.002 0 0112 4.354z" />
                      </svg>
                      <span>Lütfen CV’nizi yükleyin. Yüklemeden iş önerisi alamazsınız.</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span className="text-white text-sm font-medium">📄 {cvFileName}</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setEditingCV(true)} className="text-yellow-400 hover:underline text-sm">
                      Düzenle
                    </button>
                    <button onClick={() => setCvSectionVisible(false)} className="text-red-400 hover:text-red-200 text-xl" aria-label="Kapat">
                      <MdClose />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* İş Önerileri */}
          {cvUploaded && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Sana Uygun İşler</h3>

              {jobsLoading  && <p>Yükleniyor...</p>}
              {error && <p className="text-red-400">{error}</p>}
              {!jobsLoading  && !error && jobs.length === 0 && <p className="text-blue-200">Henüz uygun iş bulunamadı.</p>}
              {!jobsLoading  && !error && jobs.length > 0 && <p className="text-blue-200 mb-4">İşte sana uygun bazı işler:</p>}

              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 group hover:shadow-xl transition-all">
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">{job.title}</h4>
                    <p className="text-blue-200">{job.location}</p>
                    <p className="text-blue-200 mt-2">
                      {getReadableType(job.type)} | {job.salary}
                    </p>
                    <Link href={`/job-seeker-dashboard/job-details/${job.id}`} className="mt-4 inline-block text-yellow-400 font-semibold hover:underline">
                      Detayları Gör
                    </Link>
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
