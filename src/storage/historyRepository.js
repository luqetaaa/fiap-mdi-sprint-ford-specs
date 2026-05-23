import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storageKeys';

export async function loadHistory() {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveHistoryItem(item) {
  const history = await loadHistory();
  const updated = [item, ...history].slice(0, 20);
  await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  return updated;
}

export async function clearHistory() {
  await AsyncStorage.removeItem(STORAGE_KEYS.HISTORY);
}
