import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'http://localhost:8080';
export const AUTH_TOKEN_KEY = '@ford_specs:access_token';
export const USER_KEY = '@ford_specs:user';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getApiErrorMessage(error) {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.status === 401) return 'Sessão expirada. Faça login novamente.';
  if (error?.code === 'ECONNABORTED') return 'Tempo de conexão excedido. Verifique se a API está rodando.';
  if (error?.message?.includes('Network Error')) {
    return 'Não foi possível conectar na API. Confirme se PC e celular estão na mesma rede Wi-Fi e se o firewall liberou o Java.';
  }
  return 'Erro inesperado ao comunicar com a API.';
}
