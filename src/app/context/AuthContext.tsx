'use client';

import React, { createContext, useContext, useState } from 'react';

// UserRole 타입 정의
type UserRole = 'TRAVELER' | 'GUIDE';

interface AuthContextType {
  auth: {
    isLoggedIn: boolean;
    email: string;
    nickname: string;
    token: string; // 토큰 추가
    role: UserRole; // 역할 추가
  };
  login: (
    email: string,
    nickname: string,
    token: string,
    role: UserRole // 역할 추가
  ) => void;
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
    role: 'TRAVELER' as UserRole, // 기본 역할 설정
  });

  const login = (
    email: string,
    nickname: string,
    token: string,
    role: UserRole
  ) => {
    setAuth({ isLoggedIn: true, email, nickname, token, role });
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      email: '',
      nickname: '',
      token: '',
      role: 'TRAVELER', // 로그아웃 시 기본 역할로 초기화
    });
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
