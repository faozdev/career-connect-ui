// src/context/AuthContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserType = 'job-seeker' | 'employer';

export interface User {
  id: number;
  name: string;
  email: string;
  type: UserType;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, type: UserType) => boolean;
  logout: () => void;
}

const dummyUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', type: 'job-seeker' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'job-seeker' },
  { id: 3, name: 'Acme Inc.', email: 'jobs@acme.com', type: 'employer' },
  { id: 4, name: 'Tech Solutions', email: 'careers@techsolutions.com', type: 'employer' }
];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Optional: persist login with localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string, type: UserType): boolean => {
    // Şimdilik şifre kontrolü yok, dummy data üzerinden eşleşme
    const user = dummyUsers.find(
      (u) => u.email === email && u.type === type
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
