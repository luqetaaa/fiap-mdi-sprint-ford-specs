import { api } from './apiClient';
import { historyToItem } from './specsService';
export async function getVehicles() { return (await api.get('/vehicles')).data; }
export async function searchVehicle(vehicle, selectedFields) {
  const { marca, modelo, ano, versao } = vehicle;
  const { data } = await api.post('/vehicles/search', { marca, modelo, ano: Number(ano), versao, selectedFields });
  return historyToItem(data);
}
export async function getSearchHistory() {
  return (await api.get('/searches/history')).data.map(historyToItem);
}
export async function deleteSearchHistory() { await api.delete('/searches/history'); }
