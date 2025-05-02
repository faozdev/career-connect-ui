// src/services/dummyData.ts

// Kullanıcı tipi
export type UserType = 'job-seeker' | 'employer';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: '1234', type: 'job-seeker' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'abcd', type: 'job-seeker' },
  { id: 3, name: 'Acme Inc.', email: 'jobs@acme.com', password: 'acme', type: 'employer' },
  { id: 4, name: 'Tech Solutions', email: 'careers@techsolutions.com', password: 'tech', type: 'employer' },
];

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  skills: string;
  employerId: number;
  applicants: number[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Acme Inc.',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    description: 'React.js ile frontend geliştirme',
    requirements: '2 yıl deneyim, TypeScript bilgisi',
    skills: 'React, TypeScript, CSS',
    employerId: 3,
    applicants: [1, 2],
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'Tech Solutions',
    location: 'İstanbul',
    type: 'Part-time',
    salary: '20.000₺ - 30.000₺',
    description: 'Kullanıcı odaklı arayüz tasarımı',
    requirements: 'Figma, kullanıcı testi deneyimi',
    skills: 'Figma, Sketch, Adobe XD',
    employerId: 4,
    applicants: [],
  }
];

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  jobId: number;
  content: string;
  timestamp: string;
}

export const messages: Message[] = [
  {
    id: 1,
    senderId: 1,
    receiverId: 3,
    jobId: 1,
    content: 'Merhaba, ilginizi çekecek bir başvuru yaptım.',
    timestamp: '10:00',
  },
  {
    id: 2,
    senderId: 3,
    receiverId: 1,
    jobId: 1,
    content: 'Teşekkürler, inceliyorum.',
    timestamp: '10:05',
  }
];
