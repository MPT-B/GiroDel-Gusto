import React, { createContext, useContext, useState } from "react";
import { getAuthToken } from "./authToken";

interface AuthContextType {
  authToken: string | null;
  isAuthenticated: () => boolean;
  login: (token: string, exp: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);


  const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    if (!token) {
      return false;
    }

    try {
      const payloadBase64Url = token.split(".")[1];
      const decodedPayload = JSON.parse(
        atob(payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/"))
      );

      if (!decodedPayload.exp || Date.now() >= decodedPayload.exp * 1000) {
        logout();
        return false;
      }
    } catch (error) {
      console.error("Error decoding auth_token:", error);
      return false;
    }

    return true;
  };

  const login = (token: string, exp: number): void => {
    const tokenData = JSON.stringify({ token, exp });
    localStorage.setItem("auth_token", tokenData);
    setAuthToken(token);
  };

  const logout = (): void => {
    localStorage.removeItem("auth_token");
    setAuthToken(null);
  };

  const contextValue: AuthContextType = {
    authToken,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider };
