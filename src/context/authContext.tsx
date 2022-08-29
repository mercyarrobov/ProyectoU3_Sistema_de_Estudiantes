import React from "react";

export interface AuthContextInterface {
  checkingSession: boolean;
  token: string | null;
  idToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  handleAuthentication: () => void;
  login: () => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  checkingSession: false,
  expiresAt: null,
  token: null,
  idToken: null,
  isAuthenticated: false,
  handleAuthentication: () => null,
  login: () => null,
  logout: () => null,
};

export const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);

// Provider

export const AuthProvider = ({ children}: {children:JSX.Element}) => {
  return (
    <AuthContext.Provider value={authContextDefaults}>
      {children} 
    </AuthContext.Provider>
  );
};
