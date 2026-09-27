import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = 'ford_specs_token_v3';
const USER = '@ford_specs:user_v3';
export const getToken = () => Platform.OS === 'web'
  ? AsyncStorage.getItem(TOKEN) : SecureStore.getItemAsync(TOKEN);
export async function saveSession(token, user) {
  if (Platform.OS === 'web') await AsyncStorage.setItem(TOKEN, token);
  else await SecureStore.setItemAsync(TOKEN, token);
  await AsyncStorage.setItem(USER, JSON.stringify(user));
}
export async function getStoredUser() {
  const raw = await AsyncStorage.getItem(USER);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export async function clearSession() {
  if (Platform.OS === 'web') await AsyncStorage.removeItem(TOKEN);
  else await SecureStore.deleteItemAsync(TOKEN);
  await AsyncStorage.multiRemove([USER, '@ford_specs:token', '@ford_specs:user']);
}
