import { FIELD_LABELS } from '../data/specAttributes';
export const DEFAULT_FIELDS = ['motor', 'potencia', 'torque', 'transmissao', 'tracao', 'multimidia'];
export const isAvailable = value => value !== null && value !== undefined &&
  String(value).trim() !== '' && String(value) !== 'Não disponível';

export function buildStandardSpecs(vehicle, fields = DEFAULT_FIELDS, generatedAt = new Date().toISOString()) {
  const selected = fields?.length ? fields : Object.keys(FIELD_LABELS);
  const rows = [...new Set(selected)].filter(key => FIELD_LABELS[key]).map(key => ({
    key, label: FIELD_LABELS[key],
    value: isAvailable(vehicle?.specs?.[key]) ? String(vehicle.specs[key]) : 'Não disponível',
    available: isAvailable(vehicle?.specs?.[key])
  }));
  return {
    vehicle, rows, generatedAt,
    coverage: rows.length ? Math.round(rows.filter(row => row.available).length / rows.length * 100) : 0,
    source: vehicle?.fonte || 'Fonte não informada',
    demonstrativo: vehicle?.demonstrativo !== false
  };
}
export function historyToItem(record) {
  return {
    id: String(record.id),
    params: { marca: record.vehicle?.marca, modelo: record.vehicle?.modelo,
      ano: record.vehicle?.ano, versao: record.vehicle?.versao },
    result: buildStandardSpecs(record.vehicle, record.selectedFields, record.createdAt)
  };
}
export function compareVehicles(primary, secondary, fields = DEFAULT_FIELDS) {
  return [...new Set(fields)].filter(key => FIELD_LABELS[key]).map(key => ({
    key, label: FIELD_LABELS[key],
    primary: isAvailable(primary?.specs?.[key]) ? String(primary.specs[key]) : 'Não disponível',
    secondary: isAvailable(secondary?.specs?.[key]) ? String(secondary.specs[key]) : 'Não disponível'
  }));
}
export function shareResult(result) {
  const v = result.vehicle;
  return [v.marca + ' ' + v.modelo + ' ' + v.versao + ' · ' + v.ano,
    ...result.rows.map(row => row.label + ': ' + row.value),
    '', 'Fonte: ' + result.source,
    result.demonstrativo ? 'Dados demonstrativos — não verificados externamente.' : '',
    'Ford Specs Intelligence'].filter(Boolean).join('\n');
}
