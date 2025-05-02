// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',  // artık tüm çağrılar /api prefix’iyle
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

// Her isteğe otomatik Authorization header ekle
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
