'use client';

import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  auth: {
    isLoggedIn: boolean;
    email: string;
    nickname: string;
    token: string; // 토큰 추가
  };
  login: (email: string, nickname: string, token: string) => void; // 토큰 추가
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    email: '',
    nickname: '',
    token: '', // 초기값 설정
  });

  const login = (email: string, nickname: string, token: string) => {
    setAuth({ isLoggedIn: true, email, nickname, token });
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, email: '', nickname: '', token: '' });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
