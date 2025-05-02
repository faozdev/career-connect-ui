// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  type: 'job-seeker' | 'employer';
}

interface AuthContextType {
  currentUser: User | null;
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get<User>('/auth/profile')
        .then(res => setCurrentUser(res.data))
        .catch(() => logout());
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await api.post<{ token: string; user: User }>(
        '/auth/login',
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
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
    // userType 0 = JOB_SEEKER, 1 = EMPLOYER
    const numericType = type === 'job-seeker' ? 0 : 1;
  
    const payload = {
      name,         // string
      email,        // string
      password,     // string
      userType: numericType  // 0 veya 1
    };
  
    try {
      const res = await api.post<{
        token: string;
        user: User;
      }>('/auth/register', payload);
  
      localStorage.setItem('token', res.data.token);
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
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
};