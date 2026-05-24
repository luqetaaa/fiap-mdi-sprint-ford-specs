import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  api,
  STORAGE_KEYS
} from './apiClient';

export async function registerWithApi({
  nome,
  email,
  senha
}) {

  const payload = {
    nome,
    email,
    senha
  };

  const response = await api.post('/auth/register', payload);

  return response.data;
}

export async function loginWithApi({
  email,
  senha
}) {

  const response = await api.post('/auth/login', {
    email,
    senha
  });

  const data = response.data;

  if (!data?.accessToken) {
    throw new Error('Token JWT não retornado pela API.');
  }

  await AsyncStorage.setItem(
    STORAGE_KEYS.TOKEN,
    data.accessToken
  );

  const userData = {
    email,
    nome: data?.nome || 'Analista Ford',
    tokenType: data?.tokenType || 'Bearer'
  };

  await AsyncStorage.setItem(
    STORAGE_KEYS.USER,
    JSON.stringify(userData)
  );

  return userData;
}

export async function getLoggedUser() {

  const rawUser = await AsyncStorage.getItem(
    STORAGE_KEYS.USER
  );

  if (!rawUser) {
    return null;
  }

  return JSON.parse(rawUser);
}

export async function isAuthenticated() {

  const token = await AsyncStorage.getItem(
    STORAGE_KEYS.TOKEN
  );

  return !!token;
}

export async function logout() {

  await AsyncStorage.multiRemove([
    STORAGE_KEYS.TOKEN,
    STORAGE_KEYS.USER
  ]);
}