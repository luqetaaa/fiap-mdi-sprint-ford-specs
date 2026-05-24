import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import AttributeSelector from '../components/AttributeSelector';
import { FORD_VEHICLE_OPTIONS } from '../data/vehicleSpecs';
import { generateSearchResult } from '../services/specsService';
import { fetchVehiclesFromApi, searchVehicleInApi } from '../services/apiVehicleService';
import { getApiErrorMessage } from '../services/apiClient';
import { saveHistoryItem } from '../storage/historyRepository';
import { useApp } from '../hooks/AppContext';
import { colors } from '../theme/colors';

function buildOptionsFromApi(vehicles) {
  return vehicles.reduce((acc, vehicle) => {
    const modelo = vehicle.modelo;
    const versao = vehicle.versao;

    if (!modelo || !versao) return acc;
    if (!acc[modelo]) acc[modelo] = [];
    if (!acc[modelo].includes(versao)) acc[modelo].push(versao);

    return acc;
  }, {});
}

export default function SearchScreen({ navigation }) {
  const { selectedFields, setSelectedFields, setLastResult } = useApp();
  const marca = 'Ford';
  const [modelo, setModelo] = useState('');
  const [versao, setVersao] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [apiVehicles, setApiVehicles] = useState([]);
  const [apiStatus, setApiStatus] = useState('Carregando catálogo da API...');

  useEffect(() => {
    async function loadVehicles() {
      try {
        setLoadingVehicles(true);
        const vehicles = await fetchVehiclesFromApi();
        setApiVehicles(vehicles);
        setApiStatus('Catálogo carregado pela API REST.');
      } catch (error) {
        setApiStatus('API indisponível. Usando catálogo local de segurança.');
      } finally {
        setLoadingVehicles(false);
      }
    }

    loadVehicles();
  }, []);

  const vehicleOptions = useMemo(() => {
    const apiOptions = buildOptionsFromApi(apiVehicles);
    return Object.keys(apiOptions).length > 0 ? apiOptions : FORD_VEHICLE_OPTIONS;
  }, [apiVehicles]);

  const modelos = Object.keys(vehicleOptions).sort();
  const versoes = modelo ? vehicleOptions[modelo] : [];

  const selecionarModelo = (item) => {
    setModelo(item);
    setVersao('');
  };

  const runSearch = async () => {
    if (!modelo) return Alert.alert('Modelo obrigatório', 'Selecione um veículo Ford.');
    if (!versao) return Alert.alert('Versão obrigatória', 'Selecione a versão do veículo.');
    if (selectedFields.length === 0) return Alert.alert('Atributos', 'Selecione pelo menos um atributo técnico.');

    try {
      setLoading(true);

      const params = { marca, modelo, versao, ano: 2024 };
      let result;

      try {
        result = await searchVehicleInApi(params, selectedFields);
      } catch (apiError) {
        result = generateSearchResult({ marca, modelo, versao }, selectedFields);
        result.source = `Base local de contingência. API: ${getApiErrorMessage(apiError)}`;
      }

      const item = {
        id: String(Date.now()),
        params: { marca, modelo, versao },
        selectedFields,
        result
      };

      await saveHistoryItem(item);
      setLastResult(item);
      navigation.navigate('Result', { item });
    } catch (error) {
      Alert.alert('Erro na pesquisa', getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Nova pesquisa" subtitle="Selecione um veículo Ford e gere uma ficha técnica padronizada." />
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>Integração com API</Text>
          <Text style={styles.apiStatus}>{loadingVehicles ? 'Buscando veículos...' : apiStatus}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Entrada obrigatória</Text>
          <Text style={styles.label}>Marca</Text>
          <View style={styles.lockedInput}><Text style={styles.lockedText}>Ford</Text></View>

          <Text style={styles.label}>Modelo</Text>
          <View style={styles.optionsGrid}>
            {modelos.map((item) => (
              <TouchableOpacity key={item} style={[styles.optionButton, modelo === item && styles.optionButtonSelected]} onPress={() => selecionarModelo(item)}>
                <Text style={[styles.optionText, modelo === item && styles.optionTextSelected]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Versão</Text>
          {!modelo ? <Text style={styles.helper}>Selecione primeiro um modelo Ford.</Text> : (
            <View style={styles.optionsColumn}>
              {versoes.map((item) => (
                <TouchableOpacity key={item} style={[styles.versionButton, versao === item && styles.optionButtonSelected]} onPress={() => setVersao(item)}>
                  <Text style={[styles.optionText, versao === item && styles.optionTextSelected]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Atributos técnicos</Text>
          <Text style={styles.helper}>Selecione livremente os campos que deseja pesquisar. A saída sempre mantém o mesmo formato.</Text>
          <AttributeSelector selected={selectedFields} onChange={setSelectedFields} />
        </Card>

        <PrimaryButton title="Gerar ficha técnica padronizada" onPress={runSearch} loading={loading} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 90 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: colors.text, marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '800', color: colors.text, marginTop: 12, marginBottom: 8 },
  lockedInput: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D7E0EC', borderRadius: 14, padding: 14 },
  lockedText: { fontSize: 16, fontWeight: '700', color: colors.text },
  apiStatus: { color: colors.muted, lineHeight: 20, fontWeight: '700' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionsColumn: { gap: 8 },
  optionButton: { borderWidth: 1, borderColor: '#D7E0EC', backgroundColor: '#FFFFFF', borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14 },
  versionButton: { borderWidth: 1, borderColor: '#D7E0EC', backgroundColor: '#FFFFFF', borderRadius: 14, paddingVertical: 13, paddingHorizontal: 14 },
  optionButtonSelected: { backgroundColor: '#0D47A1', borderColor: '#0D47A1' },
  optionText: { color: colors.text, fontWeight: '800' },
  optionTextSelected: { color: '#FFFFFF', fontWeight: '900' },
  helper: { color: colors.muted, lineHeight: 20, marginBottom: 12 }
});
