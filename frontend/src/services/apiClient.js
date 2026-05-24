import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'http://localhost:8080';

export const STORAGE_KEYS = {
  TOKEN: '@ford_specs:token',
  USER: '@ford_specs:user'
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);

      if (token) {
        config.headers.Authorization = Bearer ${token};
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error?.response?.status === 401) {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER
      ]);
    }

    return Promise.reject(error);
  }
);

export function getApiErrorMessage(error) {

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.response?.status === 401) {
    return 'Sessão expirada. Faça login novamente.';
  }

  if (error?.response?.status === 403) {
    return 'Você não possui permissão para acessar este recurso.';
  }

  if (error?.response?.status === 404) {
    return 'Recurso não encontrado na API.';
  }

  if (error?.message?.includes('Network Error')) {
    return 'Falha de conexão com o servidor.';
  }

  if (error?.code === 'ECONNABORTED') {
    return 'A API demorou muito para responder.';
  }

  return 'Erro inesperado na comunicação com a API.';
}