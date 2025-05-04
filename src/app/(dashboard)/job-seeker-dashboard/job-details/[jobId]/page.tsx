// src/app/(dashboard)/job-seeker-dashboard/job-details/[jobId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { FiLogOut, FiTrash2 } from 'react-icons/fi';
import api from '@/lib/api';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  requirements: string | string[];
  skills?: string[];
  applicants?: any[];
}

interface CV {
  id: number;
  userId: number;
  skills: string[];
  education: string[];
  experience: string[];
}

interface MatchResult {
  job: Job;
  score: number;
}

const getReadableType = (type: string | number) => {
  return type === 0 || type === '0'
    ? 'Full-time'
    : type === 1 || type === '1'
    ? 'Part-time'
    : String(type);
};

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState(false);
  const [cv, setCv] = useState<CV | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<MatchResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await api.get<Job>(`/job/${jobId}`);
        setJob(res.data);
      } catch (err) {
        console.error('Job load failed', err);
      }
    };

    const fetchCV = async () => {
      try {
        const res = await api.get<CV[]>(`/cv/user/${currentUser.id}`);
        const userCV = res.data[0];
        if (userCV) {
          setCv(userCV);
          const matchRes = await api.get<MatchResult[]>(`/cv/match-jobs/${userCV.id}`);
          setMatchedJobs(matchRes.data.filter(m => m.score >= 20));
        }
      } catch (err) {
        setCv(null);
      }
    };

    fetchJob();
    fetchCV();
  }, [jobId, currentUser, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post(`/job/${jobId}/apply`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplied(true);
      alert('Başvurunuz başarıyla alınmıştır!');
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || 'Başvuru sırasında hata oluştu.');
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

  const handleUploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await api.post<CV>(`/cv/upload/${currentUser.id}`, formData);
      setCv(res.data);
    } catch (error) {
      console.error('CV yüklenemedi:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
            <div className="text-xl font-bold">
              CareerConnect<span className="text-yellow-400">.AI</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-white/20">{currentUser?.name}</span>
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
            <p className="text-blue-200">İlan bilgisi yükleniyor...</p>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-10">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">{job.title}</h2>
              <p className="text-blue-200 mb-1">{job.company} – {job.location}</p>
              <p className="text-blue-200 mb-4">{getReadableType(job.type)} | {job.salary}</p>
              <p className="mb-6 text-white/90 leading-relaxed">{job.description}</p>

              <h3 className="text-xl font-semibold text-yellow-300 mb-3">Gereksinimler</h3>
              {Array.isArray(job.requirements) ? (
                <ul className="list-disc list-inside text-white/90 space-y-1 mb-8">
                  {job.requirements.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/90 mb-8">{job.requirements}</p>
              )}

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
