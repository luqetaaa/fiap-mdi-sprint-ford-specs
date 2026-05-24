import { api } from './apiClient';
import { FIELD_LABELS } from '../data/specAttributes';

const TECHNICAL_FIELD_ALIASES = {
  motor: ['motor', 'engine'],
  potencia: ['potencia', 'power', 'horsepower'],
  torque: ['torque'],
  transmissao: ['transmissao', 'transmission', 'cambio', 'câmbio'],
  tracao: ['tracao', 'tração', 'traction', 'drivetrain'],
  aceleracao_0_100: ['aceleracao_0_100', 'aceleracao0100', 'zeroACem', 'zero_a_cem'],
  velocidade_maxima: ['velocidade_maxima', 'velocidadeMaxima', 'topSpeed'],
  comprimento: ['comprimento', 'length'],
  largura: ['largura', 'width'],
  altura: ['altura', 'height'],
  entre_eixos: ['entre_eixos', 'entreEixos', 'wheelbase'],
  cacamba: ['cacamba', 'caçamba', 'bucket', 'cargo'],
  tanque: ['tanque', 'fuelTank', 'capacidadeTanque'],
  peso: ['peso', 'weight'],
  airbags: ['airbags'],
  assistencias: ['assistencias', 'assistências', 'driverAssistance', 'adas'],
  freios: ['freios', 'brakes'],
  controle_estabilidade: ['controle_estabilidade', 'controleEstabilidade', 'stabilityControl'],
  camera_360: ['camera_360', 'camera360', 'câmera360'],
  multimidia: ['multimidia', 'multimídia', 'media', 'infotainment'],
  painel: ['painel', 'cluster', 'dashboard'],
  bancos: ['bancos', 'seats'],
  ar_condicionado: ['ar_condicionado', 'arCondicionado', 'climate'],
  som: ['som', 'audio', 'sound'],
  conectividade: ['conectividade', 'connectivity'],
  modos_conducao: ['modos_conducao', 'modosConducao', 'driveModes'],
  suspensao: ['suspensao', 'suspensão', 'suspension'],
  pneus: ['pneus', 'tires'],
  angulo_ataque: ['angulo_ataque', 'anguloAtaque', 'approachAngle'],
  angulo_saida: ['angulo_saida', 'anguloSaida', 'departureAngle'],
  imersao: ['imersao', 'imersão', 'wadingDepth']
};

function asArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function firstAvailable(obj, keys) {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null && obj?.[key] !== '') {
      return obj[key];
    }
  }

  return undefined;
}

function formatValue(value) {
  if (value === undefined || value === null || value === '') return 'Não disponível';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function extractSpecs(vehicle, specification) {
  const source = {
    ...(vehicle || {}),
    ...(vehicle?.specs || {}),
    ...(vehicle?.specifications || {}),
    ...(specification || {}),
    ...(specification?.specs || {}),
    ...(specification?.specifications || {})
  };

  return Object.keys(FIELD_LABELS).reduce((acc, field) => {
    const value = firstAvailable(source, TECHNICAL_FIELD_ALIASES[field] || [field]);
    acc[field] = formatValue(value);
    return acc;
  }, {});
}

export function normalizeApiVehicle(vehicle, specification) {
  const specs = extractSpecs(vehicle, specification);

  return {
    id: String(vehicle?.id || vehicle?.vehicleId || vehicle?.codigo || `${vehicle?.modelo}-${vehicle?.versao}`),
    marca: vehicle?.marca || vehicle?.brand || 'Ford',
    modelo: vehicle?.modelo || vehicle?.model || 'Modelo não informado',
    versao: vehicle?.versao || vehicle?.version || 'Versão não informada',
    ano: vehicle?.ano || vehicle?.year || vehicle?.modelYear || '',
    fonte: 'API REST Ford Competitive',
    confianca: vehicle?.confianca || vehicle?.confidence || 96,
    specs
  };
}

export function buildStandardResultFromApi(vehicle, specification, selectedFields) {
  const normalizedVehicle = normalizeApiVehicle(vehicle, specification);
  const selected = selectedFields?.length ? selectedFields : Object.keys(FIELD_LABELS);

  const rows = selected.map((field) => {
    const value = normalizedVehicle.specs?.[field] || 'Não disponível';

    return {
      key: field,
      label: FIELD_LABELS[field] || field,
      value,
      available: value !== 'Não disponível'
    };
  });

  const availableCount = rows.filter((row) => row.available).length;

  return {
    vehicle: normalizedVehicle,
    rows,
    coverage: rows.length ? Math.round((availableCount / rows.length) * 100) : 0,
    generatedAt: new Date().toISOString(),
    source: 'API REST Ford Competitive',
    confidence: normalizedVehicle.confianca
  };
}

export async function fetchVehiclesFromApi() {
  const { data } = await api.get('/vehicles');
  return asArray(data).map((vehicle) => normalizeApiVehicle(vehicle));
}

export async function fetchVehicleByIdFromApi(id) {
  const { data } = await api.get(`/vehicles/${id}`);
  return data;
}

export async function fetchSpecificationsFromApi(vehicleId) {
  const { data } = await api.get(`/specifications/${vehicleId}`);
  return data;
}

export async function searchVehicleInApi(params, selectedFields) {
  const { data } = await api.post('/vehicles/search', params);
  const found = Array.isArray(data) ? data[0] : data?.vehicle || data?.data || data;

  if (!found) {
    throw new Error('Nenhum veículo encontrado na API.');
  }

  const vehicleId = found?.id || found?.vehicleId;
  let specification = found?.specifications || found?.specs || null;

  if (vehicleId) {
    try {
      specification = await fetchSpecificationsFromApi(vehicleId);
    } catch (error) {
      // Se o endpoint de especificações falhar, usa os dados retornados pela busca.
    }
  }

  return buildStandardResultFromApi(found, specification, selectedFields);
}

export async function fetchSearchHistoryFromApi() {
  const { data } = await api.get('/searches/history');
  return asArray(data);
}
