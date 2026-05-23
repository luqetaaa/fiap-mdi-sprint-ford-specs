export const ATTRIBUTE_GROUPS = [
  {
    id: 'motor', title: 'Motor e performance',
    items: ['motor', 'potencia', 'torque', 'transmissao', 'tracao', 'aceleracao_0_100', 'velocidade_maxima']
  },
  {
    id: 'dimensoes', title: 'Dimensões e capacidades',
    items: ['comprimento', 'largura', 'altura', 'entre_eixos', 'cacamba', 'tanque', 'peso']
  },
  {
    id: 'seguranca', title: 'Segurança',
    items: ['airbags', 'assistencias', 'freios', 'controle_estabilidade', 'camera_360']
  },
  {
    id: 'conforto', title: 'Tecnologia e conforto',
    items: ['multimidia', 'painel', 'bancos', 'ar_condicionado', 'som', 'conectividade']
  },
  {
    id: 'offroad', title: 'Off-road',
    items: ['modos_conducao', 'suspensao', 'pneus', 'angulo_ataque', 'angulo_saida', 'imersao']
  }
];

export const FIELD_LABELS = {
  motor: 'Motor', potencia: 'Potência', torque: 'Torque', transmissao: 'Transmissão', tracao: 'Tração',
  aceleracao_0_100: '0 a 100 km/h', velocidade_maxima: 'Velocidade máxima', comprimento: 'Comprimento', largura: 'Largura',
  altura: 'Altura', entre_eixos: 'Entre-eixos', cacamba: 'Caçamba', tanque: 'Tanque', peso: 'Peso em ordem de marcha',
  airbags: 'Airbags', assistencias: 'Assistências', freios: 'Freios', controle_estabilidade: 'Controle de estabilidade', camera_360: 'Câmera 360°',
  multimidia: 'Central multimídia', painel: 'Painel', bancos: 'Bancos', ar_condicionado: 'Ar-condicionado', som: 'Sistema de som', conectividade: 'Conectividade',
  modos_conducao: 'Modos de condução', suspensao: 'Suspensão', pneus: 'Pneus', angulo_ataque: 'Ângulo de ataque', angulo_saida: 'Ângulo de saída', imersao: 'Capacidade de imersão'
};
