import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, STORAGE_CONFIG } from './storageKeys';

export async function loadHistory() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Erro ao carregar o histórico do AsyncStorage:', error);
    // Retorna um array vazio como fallback para evitar quebra de UI
    return [];
  }
}

export async function saveHistoryItem(item) {
  try {
    const history = await loadHistory();
    
    // Evita duplicidade: remove o veículo se ele já estiver salvo no histórico
    const filteredHistory = history.filter(h => h.vehicleId !== item.vehicleId);
    
    // Insere o novo item no topo e corta o array no limite estabelecido na configuração
    const updated = [item, ...filteredHistory].slice(0, STORAGE_CONFIG.MAX_HISTORY_ITEMS);
    
    await AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Erro ao salvar item no histórico:', error);
    throw error; 
  }
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (error) {
    console.error('Erro ao limpar o histórico:', error);
    throw error;
  }
}