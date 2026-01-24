"use client";
import React, { useState, useCallback, ReactNode } from "react";
import { MemberActions, MemberContext, MemberState } from "..";

const MEMBER_STORAGE_KEY = "member-store";

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  const [state, setState] = useState<MemberState>({
    member: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const updateState = useCallback((updates: Partial<MemberState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const actions: MemberActions = {
    loadCurrentMember: useCallback(async () => {
      updateState({ isLoading: false });
    }, [updateState]),

    login: useCallback(() => {
      // Redirect to admin login when admin panel is ready
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }, []),

    logout: useCallback(() => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(MEMBER_STORAGE_KEY);
      }
      updateState({ member: null, isAuthenticated: false });
    }, [updateState]),

    clearMember: useCallback(() => {
      updateState({ member: null, isAuthenticated: false, error: null });
    }, [updateState]),
  };

  const contextValue = { ...state, actions };

  return (
    <MemberContext.Provider value={contextValue}>{children}</MemberContext.Provider>
  );
};
