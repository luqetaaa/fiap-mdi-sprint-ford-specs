import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [selectedFields, setSelectedFields] = useState(['motor', 'potencia', 'torque', 'transmissao', 'tracao', 'multimidia']);

  const value = useMemo(() => ({ user, setUser, lastResult, setLastResult, selectedFields, setSelectedFields }), [user, lastResult, selectedFields]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
}
