// src/app/(dashboard)/employer-dashboard/page.tsx

'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

    // Dummy işler, gerçek veri yerine geçici
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
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Hoş geldiniz, {currentUser?.name}
      </h2>

      <button
        onClick={handlePostJob}
        className="mb-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Yeni İş İlanı Oluştur
      </button>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">İlanlarınız</h3>

        {jobs.length === 0 ? (
          <p>Henüz ilanınız yok.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded p-4 hover:shadow transition"
              >
                <h4 className="font-bold text-blue-600">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.location} | {job.type}</p>
                <p className="text-sm mt-1">{job.salary}</p>
                <p className="text-sm mt-2 text-gray-500">
                  Başvuran Adaylar: {job.applicants}
                </p>
                <button className="mt-2 text-sm text-blue-500 hover:underline">
                  Adayları Gör
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
