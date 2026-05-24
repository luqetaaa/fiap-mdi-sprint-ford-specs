export function formatDateTime(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso));
}
export function vehicleName(vehicle) {
  if (!vehicle) return 'Veículo não encontrado';
  return `${vehicle.marca} ${vehicle.modelo} ${vehicle.versao}`;
}
