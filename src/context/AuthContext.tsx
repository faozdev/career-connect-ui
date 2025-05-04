// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

export interface User {
  id: number;
  name: string;
  email: string;
  type: 'job-seeker' | 'employer';
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    type: User['type']
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ✅ loading state eklendi

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          const res = await api.get<User>('/auth/profile');
          setCurrentUser(res.data);
        } catch (err) {
          logout();
        } finally {
          setLoading(false); // ✅ loading her durumda biter
        }
      } else {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', String(res.data.user.id));
      setCurrentUser(res.data.user);
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    type: 'job-seeker' | 'employer'
  ): Promise<{ success: boolean; message?: string }> => {
    const numericType = type === 'job-seeker' ? 0 : 1;
    const payload = { name, email, password, userType: numericType };

    try {
      const res = await api.post<{ token: string; user: User }>('/auth/register', payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', String(res.data.user.id));
      setCurrentUser(res.data.user);
      return { success: true };
    } catch (err: any) {
      console.error('Registration error:', err.response?.data || err);
      const data = err.response?.data;
      const message = data?.errors
        ? Object.values(data.errors).flat().join(' ')
        : data?.title || err.message;
      return { success: false, message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
