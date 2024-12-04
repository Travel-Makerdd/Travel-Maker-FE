'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// UserRole 타입 정의
type UserRole = 'TRAVELER' | 'GUIDE'

interface AuthContextType {
  auth: {
    isLoggedIn: boolean
    email: string
    nickname: string
    token: string // 토큰 추가
    role: UserRole // 역할 추가
  }
  login: (
    email: string,
    nickname: string,
    token: string,
    role: UserRole, // 역할 추가
  ) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    email: '',
    nickname: '',
    token: '',
    role: 'TRAVELER' as UserRole,
  })

  useEffect(() => {
    // Load auth state from localStorage only in the browser
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('auth')
      if (savedAuth) {
        setAuth(JSON.parse(savedAuth))
      }
    }
  }, [])

  const login = (
    email: string,
    nickname: string,
    token: string,
    role: UserRole,
  ) => {
    const newAuth = { isLoggedIn: true, email, nickname, token, role }
    setAuth(newAuth)
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(newAuth)) // Save to localStorage
    }
  }

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      email: '',
      nickname: '',
      token: '',
      role: 'TRAVELER' as UserRole,
    })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth') // Clear from localStorage
    }
  }

  useEffect(() => {
    // Update localStorage whenever auth state changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(auth))
    }
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
