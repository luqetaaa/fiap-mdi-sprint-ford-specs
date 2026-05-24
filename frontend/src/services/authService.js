import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, AUTH_TOKEN_KEY, USER_KEY } from './apiClient';

export async function loginWithApi(email, senha) {
  const { data } = await api.post('/auth/login', {
    email,
    senha
  });

  const token = data?.accessToken || data?.token || data?.jwt;
  const tokenType = data?.tokenType || 'Bearer';

  if (!token) {
    throw new Error('A API não retornou accessToken no login.');
  }

  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

  const user = {
    name: data?.nome || data?.name || 'Analista Ford',
    email,
    tokenType
  };

  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

  return user;
}

export async function registerWithApi({ nome, email, senha }) {
  const { data } = await api.post('/auth/register', {
    nome,
    email,
    senha
  });

  return data;
}

export async function logoutFromApi() {
  await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_KEY]);
}

export async function loadStoredSession() {
  const [token, userRaw] = await Promise.all([
    AsyncStorage.getItem(AUTH_TOKEN_KEY),
    AsyncStorage.getItem(USER_KEY)
  ]);

  if (!token || !userRaw) return null;

  return JSON.parse(userRaw);
}
