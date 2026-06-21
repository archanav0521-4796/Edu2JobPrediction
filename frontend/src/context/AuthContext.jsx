import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token and user exist in localStorage
    const savedToken = localStorage.getItem('edu2job_token');
    const savedUser = localStorage.getItem('edu2job_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token, email: userEmail, fullName, userId } = response.data;
      
      const userData = { id: userId, email: userEmail, fullName };
      
      localStorage.setItem('edu2job_token', token);
      localStorage.setItem('edu2job_user', JSON.stringify(userData));
      
      setToken(token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password';
      return { success: false, error: message };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      await API.post('/auth/register', { fullName, email, password });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Email might already be in use.';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('edu2job_token');
    localStorage.removeItem('edu2job_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
