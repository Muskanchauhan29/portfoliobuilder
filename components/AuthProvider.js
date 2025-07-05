"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  // Fetch user on mount and on route change
  const refreshUser = async () => {
    const res = await fetch("/api/auth/me", { credentials: 'include' });
    const data = await res.json();
    setUser(data.user);
  };

  useEffect(() => {
    refreshUser();
  }, [pathname]);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
    await refreshUser();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    await refreshUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
