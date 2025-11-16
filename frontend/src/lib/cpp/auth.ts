import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const login = async (
  username: string,
  password: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    const { access_token, username: userUsername } = response.data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', access_token);
      localStorage.setItem('username', userUsername);
    }
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed',
    };
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

