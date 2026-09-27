import AsyncStorage from '@react-native-async-storage/async-storage';
const key = userId => '@ford_specs:history_v3:' + userId;
export async function loadHistory(userId) {
  if (!userId) return [];
  const raw = await AsyncStorage.getItem(key(userId));
  try {
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data.filter(item => item?.id && item?.result?.vehicle && Array.isArray(item.result.rows)) : [];
  } catch { return []; }
}
export async function replaceHistory(userId, items) {
  if (!userId) throw new Error('Entre para salvar seu histórico.');
  await AsyncStorage.setItem(key(userId), JSON.stringify(items.slice(0, 100)));
}
export async function saveHistoryItem(userId, item) {
  const history = await loadHistory(userId);
  await replaceHistory(userId, [item, ...history.filter(existing => existing.id !== item.id)]);
}
export async function clearHistory(userId) { await AsyncStorage.removeItem(key(userId)); }
