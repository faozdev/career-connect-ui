// src/app/(dashboard)/job-seeker-dashboard/page.tsx

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
}

export default function JobSeekerDashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [cvUploaded, setCvUploaded] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    // Sahte veriyle çalışıyorsak burada load edebiliriz
    const dummyJobs: Job[] = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Acme Inc.',
        location: 'Remote',
        type: 'Full-time',
        salary: '$70,000 - $90,000',
      },
      {
        id: 2,
        title: 'UX Designer',
        company: 'Tech Solutions',
        location: 'İstanbul',
        type: 'Part-time',
        salary: '15.000₺ - 20.000₺',
      }
    ];

    setJobs(dummyJobs);
  }, [currentUser, router]);

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvUploaded(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Hoş geldin, {currentUser?.name}
      </h2>

      {/* CV Upload */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-lg font-semibold mb-2">CV Yükle</h3>
        <input
          type="file"
          onChange={handleCVUpload}
          className="block w-full border rounded px-3 py-2"
        />
        {!cvUploaded && (
          <p className="text-red-500 text-sm mt-2">
            Lütfen CV’nizi yükleyin. Yüklemeden iş önerisi alamazsınız.
          </p>
        )}
      </div>

      {/* Önerilen İşler */}
      {cvUploaded && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Sana Uygun İşler</h3>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded p-4 hover:shadow transition"
              >
                <h4 className="font-bold text-blue-600">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company} – {job.location}</p>
                <p className="text-sm mt-1">{job.type} | {job.salary}</p>
                <button className="mt-3 text-sm text-blue-500 hover:underline">
                  Detayları Gör
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
