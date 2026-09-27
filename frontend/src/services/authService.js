import { api } from './apiClient';
import { getToken, getStoredUser, saveSession, clearSession } from '../storage/sessionStore';

export async function registerWithApi({ nome, email, senha }) {
  return (await api.post('/auth/register', { nome: nome.trim(), email: email.trim().toLowerCase(), senha })).data;
}
export async function loginWithApi({ email, senha }) {
  const { data } = await api.post('/auth/login', { email: email.trim().toLowerCase(), senha });
  if (!data.accessToken || !data.user?.id) throw new Error('O serviço retornou uma sessão incompleta.');
  await saveSession(data.accessToken, data.user);
  return data.user;
}
export async function loadStoredSession() {
  const [token, user] = await Promise.all([getToken(), getStoredUser()]);
  if (!token || !user?.id) { await clearSession(); return null; }
  try {
    const { data } = await api.get('/auth/me');
    await saveSession(token, data);
    return data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      await clearSession(); return null;
    }
    // A previously authenticated user can reopen their cached history offline.
    return user;
  }
}
export const logoutFromApi = clearSession;
