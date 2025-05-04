// src/dashboard/job-seeker-dashboard/InnerDashboard.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { FiMessageCircle, FiLogOut, FiTrash2 } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import api from '@/lib/api';

interface CV {
  id: number;
  userId: number;
  skills: string[];
  education: string[];
  experience: string[];
}

interface Job {
  id: number;
  title: string;
  location: string;
  type: string | number;
  salary: string;
  description: string;
  requirements: string;
}

interface MatchResult {
  job: Job;
  score: number;
}

export default function InnerDashboard() {
  const { currentUser, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cv, setCv] = useState<CV | null>(null);
  const [cvSectionVisible, setCvSectionVisible] = useState(true);
  const [editingCV, setEditingCV] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState<MatchResult[]>([]);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await api.get<CV[]>(`/cv/user/${currentUser?.id}`);
        const userCV = res.data[0];
    
        if (userCV) {
          setCv(userCV);
    
          try {
            const matchRes = await api.get<MatchResult[]>(`/cv/match-jobs/${userCV.id}`);
            setMatchedJobs(matchRes.data.filter(m => m.score >= 20));
          } catch (matchErr) {
            console.warn('Eşleşen iş bulunamadı:', matchErr);
            setMatchedJobs([]);
          }
    
        } else {
          setCv(null);
          setMatchedJobs([]);
        }
    
      } catch (err: any) {
        if (err.response?.status === 404) {
          // CV hiç yoksa bu durum normaldir
          setCv(null);
          setMatchedJobs([]);
        } else {
          console.error('CV verisi alınamadı:', err);
        }
      }
    };
    

    if (currentUser) fetchCV();
  }, [currentUser]);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login');
    }
  }, [authLoading, currentUser, router]);

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;
  
    const formData = new FormData();
    formData.append('file', file); // 👈 parametre ismi doğru
  
    try {
      const res = await api.post<CV>(
        `/CV/upload/${currentUser.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // ✅ override et
          },
        }
      );
      setCv(res.data);
      setEditingCV(false);
    } catch (error) {
      console.error('CV yüklenemedi:', error);
    }
  };

  const handleDeleteCV = async () => {
    if (!cv) return;
    try {
      await api.delete(`/cv/${cv.id}`);
      setCv(null);
      setMatchedJobs([]);
    } catch (error) {
      console.error('CV silinemedi:', error);
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

          {/* CV Section */}
          {cvSectionVisible && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8 w-full">
              {!cv || editingCV ? (
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-4">CV Yükle</h3>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="cv-upload"
                      className="cursor-pointer inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
                    >
                      Dosya Seç
                    </label>
                    <span className="text-white text-sm">PDF dosyanı yükle</span>
                  </div>
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    onChange={handleCVUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Üst Bar */}
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">📄 CV Yüklendi</span>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setEditingCV(true)} className="text-yellow-400 hover:underline text-sm">
                        Düzenle
                      </button>
                      <button onClick={handleDeleteCV} className="text-red-400 hover:text-red-200 text-xl" aria-label="Sil">
                        <FiTrash2 />
                      </button>
                      <button onClick={() => setCvSectionVisible(false)} className="text-red-400 hover:text-red-200 text-xl" aria-label="Kapat">
                        <MdClose />
                      </button>
                    </div>
                  </div>

                  {/* CV Detayları */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-yellow-300 font-semibold">Beceriler:</p>
                      <ul className="list-disc list-inside text-white/90">
                        {cv.skills.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-yellow-300 font-semibold">Eğitim:</p>
                      <ul className="list-disc list-inside text-white/90">
                        {cv.education.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-yellow-300 font-semibold">Deneyim:</p>
                      <ul className="list-disc list-inside text-white/90">
                        {cv.experience.map((ex, i) => <li key={i}>{ex}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Matched Jobs */}
          {cv && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mt-8">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Sana Uygun İşler</h3>

              {matchedJobs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {matchedJobs.map(({ job, score }) => (
                    <div key={job.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 group hover:shadow-xl transition-all">
                      <h4 className="text-xl font-bold text-yellow-400 mb-2">{job.title}</h4>
                      <p className="text-blue-200">{job.location}</p>
                      <p className="text-blue-200 mt-2">{getReadableType(job.type)} | {job.salary}</p>
                      <p className="text-blue-200 mt-1">Uyum Skoru: %{score}</p>
                      <Link href={`/job-seeker-dashboard/job-details/${job.id}`} className="mt-4 inline-block text-yellow-400 font-semibold hover:underline">
                        Detayları Gör
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/80">CV’n incelendi ama sana uygun bir iş ilanı henüz bulunamadı. Yeni ilanlar geldikçe burası güncellenecektir.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}