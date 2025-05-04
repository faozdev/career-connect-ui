// src/context/RelevantJobsContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';

export interface Job {
    id: number;
    title: string;
    location: string;
    type: string;
    salary: string;
    company: string;
    description: string;
    requirements: string | string[];
    skills?: string[];
    applicants?: any[];
  }

interface RelevantJobsContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  getJobById: (id: number) => Promise<Job | null>;
}

const RelevantJobsContext = createContext<RelevantJobsContextType>({
    jobs: [],
    loading: false,
    error: null,
    getJobById: async () => null, // default
  });

export const useRelevantJobs = () => useContext(RelevantJobsContext);

export const RelevantJobsProvider = ({ children }: { children: React.ReactNode }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchAllJobs = async () => {
          try {
            const token = localStorage.getItem('token');
            const res = await api.get<Job[]>('/job/all', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setJobs(res.data);
          } catch (err: any) {
            setError(err.message || 'İlanlar alınırken hata oluştu.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchAllJobs();
      }, []);
      const getJobById = async (id: number): Promise<Job | null> => {
        try {
          const token = localStorage.getItem('token');
          const res = await api.get<Job>(`/job/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });   
          const data = res.data;
          const parsedJob: Job = {
            ...data,
            requirements: Array.isArray(data.requirements)
              ? data.requirements
              : [data.requirements], // düzeltme
          };
      
          return parsedJob;
        } catch (err) {
          console.error("İş detayı alınamadı:", err);
          return null;
        }
      };
      

  return (
    <RelevantJobsContext.Provider value={{ jobs, loading, error, getJobById }}>
    {children}
    </RelevantJobsContext.Provider>
  );
};
