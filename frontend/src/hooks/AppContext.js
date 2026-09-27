import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadStoredSession, logoutFromApi } from '../services/authService';
import { bindSessionExpired, getApiErrorMessage, warmUpApi } from '../services/apiClient';
import { getVehicles } from '../services/apiVehicleService';
import { DEFAULT_FIELDS } from '../services/specsService';

const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const [lastResult, setLastResult] = useState(null);
  const [selectedFields, setSelectedFields] = useState(DEFAULT_FIELDS);
  const [vehicles, setVehicles] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState('');
  const [sessionMessage, setSessionMessage] = useState('');
  useEffect(() => {
    warmUpApi();
    const unbind = bindSessionExpired(() => {
      setUser(null); setLastResult(null); setVehicles([]);
      setSessionMessage('Sua sessão expirou. Entre novamente.');
    });
    loadStoredSession().then(setUser).catch(() => setSessionMessage('Não foi possível recuperar a sessão. Entre novamente.'))
      .finally(() => setBooting(false));
    return unbind;
  }, []);
  const refreshCatalog = useCallback(async () => {
    setCatalogLoading(true); setCatalogError('');
    try { setVehicles(await getVehicles()); }
    catch (error) { setCatalogError(getApiErrorMessage(error)); }
    finally { setCatalogLoading(false); }
  }, []);
  useEffect(() => {
    if (user?.id) refreshCatalog();
    else { setVehicles([]); setLastResult(null); }
  }, [user?.id, refreshCatalog]);
  const logout = async () => {
    await logoutFromApi();
    setUser(null); setLastResult(null); setSelectedFields(DEFAULT_FIELDS); setSessionMessage('');
  };
  const value = { user, setUser, booting, logout, lastResult, setLastResult, selectedFields, setSelectedFields,
    vehicles, catalogLoading, catalogError, refreshCatalog, sessionMessage, setSessionMessage };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
