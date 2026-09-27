export function formatDateTime(iso) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return 'Data não informada';
  return date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
export const vehicleName = vehicle => vehicle
  ? [vehicle.marca, vehicle.modelo, vehicle.versao, vehicle.ano].filter(Boolean).join(' ')
  : 'Veículo não encontrado';
