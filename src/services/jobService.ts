// src/services/jobService.ts

import { jobs, Job } from './dummyData';

export function getAllJobs(): Job[] {
  return jobs;
}

export function getJobById(id: number): Job | undefined {
  return jobs.find((job) => job.id === id);
}

export function getJobsByEmployerId(employerId: number): Job[] {
  return jobs.filter((job) => job.employerId === employerId);
}

export function applyToJob(jobId: number, userId: number): boolean {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return false;

  if (!job.applicants.includes(userId)) {
    job.applicants.push(userId);
    return true;
  }
  return false; // zaten başvurmuş
}
