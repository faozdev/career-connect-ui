// src/app/(jobs)/post-job/page.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export interface JobForm {
  title: string;
  location: string;
  type: string; // "Full-time", "Part-time", "Internship"
  salary: string;
  description: string;
  requirements: string;
  skills: string; // virgül ile ayrılmış: "React, SQL"
  postedBy?: string;
}

interface JobContextType {
  postJob: (form: JobForm) => Promise<any>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

// string'den .NET enum int'ine dönüştür
const mapJobTypeToEnumInt = (type: string): number => {
  switch (type) {
    case 'Full-time':
      return 0;
    case 'Part-time':
      return 1;
    case 'Internship':
      return 2;
    default:
      return 0;
  }
};

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const postJob = async (form: JobForm) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      throw new Error('Giriş yapmadan ilan oluşturamazsınız.');
    }

    const backendPayload = {
      id: 0,
      employerId: Number(userId),
      title: form.title,
      location: form.location,
      type: mapJobTypeToEnumInt(form.type), // enum string yerine int
      salary: form.salary,
      description: form.description,
      requirements: form.requirements,
      skills: form.skills.split(',').map((s) => s.trim()),
      applications: []
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Job/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(backendPayload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'İlan eklenirken bir hata oluştu');
    }

    return response.json();
  };

  return (
    <JobContext.Provider value={{ postJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = (): JobContextType => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJob must be used inside a JobProvider');
  return ctx;
};
