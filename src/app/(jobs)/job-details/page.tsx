// src/app/(jobs)/job-details/page.tsx

'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FiArrowLeft } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  skills: string;
  applicants: number[];
}

export default function JobDetailsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const jobId = Number(params.get('jobId'));
  const [job, setJob] = useState<Job | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    // TODO: fetch real job by jobId
    const dummy: Job = {
      id: jobId,
      title: 'Frontend Developer',
      company: 'Acme Inc.',
      location: 'Remote',
      type: 'Full-time',
      salary: '80.000₺ - 100.000₺',
      description: 'React.js ile arayüz geliştirecek ekip arkadaşı arıyoruz.',
      requirements: '2+ yıl frontend deneyimi, TypeScript bilgisi.',
      skills: 'React, TypeScript, CSS',
      applicants: [2],
    };
    setJob(dummy);
    setHasApplied(currentUser && dummy.applicants.includes(currentUser.id));
  }, [currentUser, jobId]);

  const handleApply = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    if (hasApplied) {
      alert('Bu ilana zaten başvurdunuz.');
      return;
    }
    // TODO: POST application...
    alert('Başvuru başarılı! İşveren sizinle iletişime geçebilir.');
    setHasApplied(true);
  };

  if (!job) {
    return <p className="text-center mt-12 text-yellow-300">Yükleniyor…</p>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        {/* Floating Nav */}
        <nav className="fixed top-6 inset-x-0 px-6 md:px-12 z-50">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex items-center gap-4 border border-white/20">
            <button
              onClick={() => router.back()}
              className="text-white hover:text-yellow-400 flex items-center transition"
            >
              <FiArrowLeft className="mr-1" /> Geri
            </button>
            <h1 className="text-lg font-bold">İş Detayı</h1>
          </div>
        </nav>

        <div className="container mx-auto pt-36 pb-24 px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">{job.title}</h2>
            <p className="text-blue-200">{job.company} • {job.location}</p>
            <p className="text-blue-200 mb-6">{job.type} | {job.salary}</p>

            <section className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">İş Tanımı</h3>
              <p className="text-blue-100">{job.description}</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Gereklilikler</h3>
              <p className="text-blue-100">{job.requirements}</p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Aranan Beceriler</h3>
              <p className="text-blue-100">{job.skills}</p>
            </section>

            {/* Action */}
            {currentUser?.type === 'job-seeker' && (
              <button
                onClick={handleApply}
                className={`w-full py-3 rounded-full text-lg font-semibold transition
                  ${hasApplied
                    ? 'bg-gray-500 cursor-default'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-indigo-900'
                  }`}
                disabled={hasApplied}
              >
                {hasApplied ? 'Başvuru Yapıldı' : 'Bu İşi İstiyorum'}
              </button>
            )}

            {currentUser?.type === 'employer' && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-2">Başvuran Adaylar</h3>
                <ul className="list-disc list-inside text-blue-100">
                  {job.applicants.map((id) => (
                    <li key={id}>Aday ID: {id}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
