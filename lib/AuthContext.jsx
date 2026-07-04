"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from "@/services/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const data = await getCurrentUser();
    console.log(data);

    setUser(data ?? null);

    return data;
  };

  const login = async (username, password) => {
    const result = await loginService(username, password);

    if (!result) {
      throw new Error("Login failed");
    }

    await refreshUser();

    return result;
  };

  const logout = async () => {
    try {
      await logoutService();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data ?? null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
