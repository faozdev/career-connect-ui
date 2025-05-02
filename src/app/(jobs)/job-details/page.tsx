// src/app/(jobs)/job-details/page.tsx

'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [job, setJob] = useState<Job | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Burada jobId query'den alınmalı (şimdilik dummy job)
    const dummyJob: Job = {
      id: 1,
      title: 'Frontend Developer',
      company: 'Acme Inc.',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80,000 - $100,000',
      description: 'React.js ile arayüz geliştirecek ekip arkadaşı arıyoruz.',
      requirements: '2+ yıl frontend deneyimi, TypeScript bilgisi.',
      skills: 'React, TypeScript, CSS',
      applicants: [2], // örnek başvuran ID
    };

    setJob(dummyJob);
    if (currentUser && dummyJob.applicants.includes(currentUser.id)) {
      setHasApplied(true);
    }
  }, [currentUser]);

  const handleApply = () => {
    if (!currentUser) {
      router.push('/(auth)/login');
      return;
    }

    if (hasApplied) {
      alert('Bu ilana zaten başvurdunuz.');
      return;
    }

    alert('Başvuru başarılı! İşveren sizinle iletişime geçebilir.');
    setHasApplied(true);
  };

  if (!job) return <p className="text-center mt-10">Yükleniyor...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company} | {job.location}</p>
      <p className="text-sm text-gray-500 mb-4">{job.type} | {job.salary}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">İş Tanımı</h3>
      <p className="mb-4">{job.description}</p>

      <h3 className="text-lg font-semibold mb-2">Gereklilikler</h3>
      <p className="mb-4">{job.requirements}</p>

      <h3 className="text-lg font-semibold mb-2">Aranan Beceriler</h3>
      <p className="mb-6">{job.skills}</p>

      {currentUser?.type === 'job-seeker' && (
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {hasApplied ? 'Başvuru Yapıldı' : 'Bu İşi İstiyorum'}
        </button>
      )}

      {currentUser?.type === 'employer' && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Başvuran Adaylar</h3>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {job.applicants.map((id) => (
              <li key={id}>Aday ID: {id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
