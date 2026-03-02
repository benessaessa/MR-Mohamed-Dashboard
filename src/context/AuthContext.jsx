import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
  };

  const authValue = {
    darkMode,
    setDarkMode,
    wallet,
    setWallet,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
