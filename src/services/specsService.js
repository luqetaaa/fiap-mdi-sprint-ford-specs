import { VEHICLE_DATABASE } from '../data/vehicleSpecs';
import { FIELD_LABELS } from '../data/specAttributes';

const normalize = (text = '') => text.toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function findVehicle({ marca, modelo, versao }) {
  const brand = normalize(marca);
  const model = normalize(modelo);
  const version = normalize(versao);
  return VEHICLE_DATABASE.find((vehicle) => {
    const matchBrand = normalize(vehicle.marca).includes(brand) || brand.includes(normalize(vehicle.marca));
    const matchModel = normalize(vehicle.modelo).includes(model) || model.includes(normalize(vehicle.modelo));
    const matchVersion = version.length === 0 || normalize(vehicle.versao).includes(version) || version.includes(normalize(vehicle.versao).slice(0, 12));
    return matchBrand && matchModel && matchVersion;
  });
}

export function buildStandardSpecs(vehicle, selectedFields) {
  const selected = selectedFields?.length ? selectedFields : Object.keys(FIELD_LABELS);
  const rows = selected.map((field) => ({
    key: field,
    label: FIELD_LABELS[field] || field,
    value: vehicle?.specs?.[field] || 'Não disponível',
    available: Boolean(vehicle?.specs?.[field] && vehicle.specs[field] !== 'Não disponível')
  }));
  const availableCount = rows.filter((row) => row.available).length;
  return {
    vehicle: vehicle || null,
    rows,
    coverage: Math.round((availableCount / rows.length) * 100),
    generatedAt: new Date().toISOString(),
    source: vehicle?.fonte || 'Nenhuma fonte encontrada',
    confidence: vehicle?.confianca || 0
  };
}

export function generateSearchResult(params, selectedFields) {
  const vehicle = findVehicle(params);
  return buildStandardSpecs(vehicle, selectedFields);
}

export function compareVehicles(primaryId, secondaryId, selectedFields) {
  const primary = VEHICLE_DATABASE.find((item) => item.id === primaryId);
  const secondary = VEHICLE_DATABASE.find((item) => item.id === secondaryId);
  const selected = selectedFields?.length ? selectedFields : ['motor', 'potencia', 'torque', 'transmissao', 'tracao'];
  return selected.map((field) => ({
    key: field,
    label: FIELD_LABELS[field],
    primary: primary?.specs?.[field] || 'Não disponível',
    secondary: secondary?.specs?.[field] || 'Não disponível'
  }));
}
