import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const { exp } = jwtDecode(token);
      const isExpired = Date.now() >= exp * 21600000 ;

      if (isExpired) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Token inválido:", err);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};