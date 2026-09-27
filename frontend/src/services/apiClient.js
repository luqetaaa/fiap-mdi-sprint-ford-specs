import axios from 'axios';
import { Platform } from 'react-native';
import { getToken, clearSession } from '../storage/sessionStore';

export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL ||
  (__DEV__ ? (Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080') : '')
).replace(/\/$/, '');
let onSessionExpired = null;
export function bindSessionExpired(handler) {
  onSessionExpired = handler;
  return () => { if (onSessionExpired === handler) onSessionExpired = null; };
}
export const api = axios.create({
  baseURL: API_BASE_URL, timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});
api.interceptors.request.use(async config => {
  if (!API_BASE_URL) throw new Error('O endereço do serviço não foi configurado nesta versão do app.');
  const token = await getToken();
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});
api.interceptors.response.use(response => response, async error => {
  const publicRoute = ['/auth/login', '/auth/register'].includes(error.config?.url);
  if (error.response?.status === 401 && !publicRoute) {
    try { await clearSession(); } finally { onSessionExpired?.(); }
  }
  return Promise.reject(error);
});
// Servidores gratuitos (ex.: Render) desligam a API quando ficam sem uso e levam
// cerca de 1 minuto para religar. Esta chamada é feita ao abrir o app, para que o
// servidor já esteja acordado quando o usuário terminar de digitar o login.
export function warmUpApi() {
  if (!API_BASE_URL) return Promise.resolve(false);
  return axios.get(API_BASE_URL + '/health', { timeout: 90000 })
    .then(() => true).catch(() => false);
}
export function getApiErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === 'ECONNABORTED') return 'O serviço está iniciando e pode levar até 1 minuto. Aguarde e tente novamente.';
  if (error.response?.status === 401) return 'Sua sessão expirou. Entre novamente.';
  if (error.response?.status === 403) return 'Você não tem acesso a esta ação.';
  if (error.response?.status === 404) return 'Não encontramos esse veículo no catálogo.';
  if (!error.response && (error.request || error.message === 'Network Error'))
    return 'Sem conexão com o serviço. Verifique sua internet e tente novamente.';
  return error.message || 'Não foi possível concluir. Tente novamente.';
}
