import axios from 'axios';
import { Problem } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized) - redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/cpp';
      }
    }
    return Promise.reject(error);
  }
);

export const getProblems = async (): Promise<Problem[]> => {
  const response = await api.get('/cpp-problems');
  return response.data;
};

export const getProblem = async (id: string): Promise<Problem> => {
  const response = await api.get(`/cpp-problems/${id}`);
  return response.data;
};

export const createProblem = async (
  data: Omit<Problem, 'id'>,
): Promise<Problem> => {
  const problem: Problem = {
    ...data,
    id: Date.now().toString(),
  };
  const response = await api.post('/cpp-problems', problem);
  return response.data;
};

export const updateProblem = async (
  id: string,
  data: Partial<Problem>,
): Promise<Problem> => {
  const response = await api.put(`/cpp-problems/${id}`, data);
  return response.data;
};

export const deleteProblem = async (id: string): Promise<void> => {
  await api.delete(`/cpp-problems/${id}`);
};

