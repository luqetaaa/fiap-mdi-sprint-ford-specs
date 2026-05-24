import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadStoredSession, logoutFromApi } from '../services/authService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const [lastResult, setLastResult] = useState(null);
  const [selectedFields, setSelectedFields] = useState(['motor', 'potencia', 'torque', 'transmissao', 'tracao', 'multimidia']);

  useEffect(() => {
    async function restoreSession() {
      const storedUser = await loadStoredSession();
      if (storedUser) setUser(storedUser);
      setBooting(false);
    }

    restoreSession();
  }, []);

  const logout = async () => {
    await logoutFromApi();
    setUser(null);
    setLastResult(null);
  };

  const value = useMemo(
    () => ({ user, setUser, booting, logout, lastResult, setLastResult, selectedFields, setSelectedFields }),
    [user, booting, lastResult, selectedFields]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
}
