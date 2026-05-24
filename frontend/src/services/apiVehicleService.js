import { api } from './apiClient';

function extractArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;

  return [];
}

function safeValue(value, fallback = 'Não disponível') {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  return String(value);
}

export async function getVehicles() {
  const response = await api.get('/vehicles');
  return extractArray(response.data).map(normalizeVehicle);
}

export async function getVehicleById(id) {
  const response = await api.get(/vehicles/${id});
  return normalizeVehicle(response.data);
}

export async function searchVehicle({
  marca,
  modelo,
  ano,
  versao
}) {
  const payload = {
    marca: marca || 'Ford',
    modelo,
    ano: Number(ano),
    versao
  };

  const response = await api.post('/vehicles/search', payload);

  const vehicle =
    response.data?.vehicle ||
    response.data?.data ||
    response.data;

  return normalizeVehicle(vehicle);
}

export async function getSpecifications(vehicleId) {
  const response = await api.get(/specifications/${vehicleId});
  return normalizeSpecifications(response.data);
}

export async function getSearchHistory() {
  const response = await api.get('/searches/history');
  return extractArray(response.data);
}

export function normalizeVehicle(vehicle) {
  return {
    id: vehicle?.id,
    marca: safeValue(vehicle?.marca, 'Ford'),
    modelo: safeValue(vehicle?.modelo, 'Não informado'),
    ano: safeValue(vehicle?.ano, 'Não informado'),
    versao: safeValue(vehicle?.versao, 'Não informado'),
    createdAt: vehicle?.createdAt || vehicle?.created_at || null
  };
}

export function normalizeSpecifications(specs) {
  return {
    potencia: safeValue(specs?.potencia),
    torque: safeValue(specs?.torque),
    combustivel: safeValue(specs?.combustivel),
    cambio: safeValue(specs?.cambio),
    consumo: safeValue(specs?.consumo),
    fonteUrl:
      specs?.fonteUrl ||
      specs?.fonte_url ||
      specs?.fonte ||
      'API Ford Competitive'
  };
}

export function buildTechnicalRows(vehicle, specs) {
  return [
    {
      label: 'Marca',
      value: safeValue(vehicle?.marca, 'Ford')
    },
    {
      label: 'Modelo',
      value: safeValue(vehicle?.modelo)
    },
    {
      label: 'Ano',
      value: safeValue(vehicle?.ano)
    },
    {
      label: 'Versão',
      value: safeValue(vehicle?.versao)
    },
    {
      label: 'Potência',
      value: safeValue(specs?.potencia)
    },
    {
      label: 'Torque',
      value: safeValue(specs?.torque)
    },
    {
      label: 'Combustível',
      value: safeValue(specs?.combustivel)
    },
    {
      label: 'Câmbio',
      value: safeValue(specs?.cambio)
    },
    {
      label: 'Consumo',
      value: safeValue(specs?.consumo)
    },
    {
      label: 'Fonte',
      value: safeValue(specs?.fonteUrl, 'API Ford Competitive')
    }
  ];
}

export function calculateCoverage(rows) {
  if (!rows?.length) return 0;

  const available = rows.filter(
    (row) => row.value && row.value !== 'Não disponível'
  ).length;

  return Math.round((available / rows.length) * 100);
}