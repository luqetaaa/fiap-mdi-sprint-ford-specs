import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import VehiclePicker from '../components/VehiclePicker';
import AttributeSelector from '../components/AttributeSelector';
import PrimaryButton from '../components/PrimaryButton';
import Feedback from '../components/Feedback';
import { useApp } from '../hooks/AppContext';
import { searchVehicle } from '../services/apiVehicleService';
import { saveHistoryItem } from '../storage/historyRepository';
import { getApiErrorMessage } from '../services/apiClient';
import { layout } from '../theme/layout';
import { colors } from '../theme/colors';

export default function SearchScreen({ navigation, route }) {
  const { user, vehicles, catalogLoading, catalogError, refreshCatalog, selectedFields, setSelectedFields, setLastResult } = useApp();
  const [vehicleId, setVehicleId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (route.params?.vehicleId && vehicles.some(v => v.id === route.params.vehicleId)) setVehicleId(route.params.vehicleId);
    else if (!vehicles.some(v => v.id === vehicleId) && vehicles.length) setVehicleId(vehicles[0].id);
  }, [vehicles, route.params?.vehicleId]);
  const vehicle = vehicles.find(v => v.id === vehicleId);
  const search = async () => {
    if (!vehicle || !selectedFields.length || loading) return;
    setError(''); setLoading(true);
    try {
      const item = await searchVehicle(vehicle, selectedFields);
      try { await saveHistoryItem(user.id, item); }
      catch { item.cacheWarning = 'Ficha salva na sua conta. A cópia offline não pôde ser salva neste dispositivo.'; }
      setLastResult(item);
      navigation.navigate('Result', { item });
    } catch (e) { setError(getApiErrorMessage(e)); }
    finally { setLoading(false); }
  };
  return <Screen title="Nova pesquisa" subtitle="Escolha a versão. Selecione os atributos. Gere sua ficha.">
    {catalogLoading && <Feedback loading message="Carregando o catálogo…" />}
    {!!catalogError && <Feedback message={catalogError} retry={refreshCatalog} />}
    {!catalogLoading && !catalogError && !vehicles.length && <Feedback message="O catálogo está vazio. Nenhum veículo foi cadastrado." retry={refreshCatalog} />}
    <Card><Text style={layout.title}>01 / Veículo</Text>
      <VehiclePicker label="Modelo e versão" vehicles={vehicles} value={vehicleId} onChange={setVehicleId} />
      {!!vehicle && <Text style={layout.small}>{vehicle.marca} · Ano {vehicle.ano}</Text>}
    </Card>
    <Card><Text style={layout.title}>02 / Atributos técnicos</Text>
      <Text style={layout.body}>{selectedFields.length} atributos selecionados para sua análise.</Text>
      <TouchableOpacity accessibilityRole="button" onPress={() => setExpanded(!expanded)}>
        <Text style={[layout.link, { textAlign: 'left' }]}>{expanded ? 'Recolher atributos' : 'Personalizar atributos'}</Text>
      </TouchableOpacity>
      {expanded && <AttributeSelector selected={selectedFields} onChange={setSelectedFields} />}
      {!selectedFields.length && <Text style={{ color: colors.danger }}>Selecione pelo menos um atributo.</Text>}
    </Card>
    {!!error && <Feedback message={error} />}
    <PrimaryButton title="Gerar ficha técnica" loading={loading} disabled={!vehicle || !selectedFields.length} onPress={search} />
    <View style={layout.gap} /><Text style={layout.small}>A pesquisa será salva no histórico da sua conta. Campos sem informação aparecem como “Não disponível”.</Text>
  </Screen>;
}
