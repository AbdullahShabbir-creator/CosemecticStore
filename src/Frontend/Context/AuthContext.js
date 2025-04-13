import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [role, setRole] = useState(null);

  // Load user data if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setLoading(true);
        try {
          const { data } = await authAPI.getUserProfile();
          console.log('User profile loaded:', data); // Debug log
          setUser(data);
          setRole(data.role);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Failed to load user:', err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authAPI.login(email, password);
      console.log('Login response:', data); // Debug log
      setToken(data.token);
      setUser(data.user);
      setRole(data.user.role);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending signup data:', userData); // Debug log
      const { data } = await authAPI.signup(userData);
      console.log('Signup response:', data); // Debug log
      setToken(data.token);
      setUser(data.user);
      setRole(data.user.role);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authAPI.updateUserProfile(userData);
      setUser(data.user);
      setRole(data.user.role);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Update profile failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        loading,
        error,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
