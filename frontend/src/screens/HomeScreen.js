import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import KpiCard from '../components/KpiCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { useApp } from '../hooks/AppContext';

export default function HomeScreen({ navigation }) {
  const { user } = useApp();
  return (
    <View style={styles.screen}>
      <AppHeader title="Inteligência competitiva" subtitle={`Olá, ${user?.name}. Pesquise veículos e gere fichas técnicas padronizadas.`} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.kpiRow}>
          <KpiCard value="1h → 2min" label="ganho estimado" hint="por versão" />
          <KpiCard value="100%" label="formato padrão" hint="campos comparáveis" />
        </View>
        <Card>
          <Text style={styles.cardTitle}>Caso de validação obrigatório</Text>
          <Text style={styles.text}>A base demonstrativa inclui a Ford Ranger Raptor com especificações completas para validar a solução conforme o enunciado.</Text>
          <PrimaryButton title="Pesquisar Ranger Raptor" onPress={() => navigation.navigate('Search')} variant="dark" />
        </Card>
        <Card>
          <Text style={styles.cardTitle}>Fluxo da solução</Text>
          {['Entrada: marca, modelo, versão e atributos desejados', 'Camada de busca: base local, API ou crawler/LLM', 'Normalização: campos vazios viram “Não disponível”', 'Saída: ficha clara, padronizada e comparável'].map((item, index) => (
            <View key={item} style={styles.step}><View style={styles.circle}><Text style={styles.circleText}>{index + 1}</Text></View><Text style={styles.stepText}>{item}</Text></View>
          ))}
        </Card>
        <TouchableOpacity style={styles.aiBox} onPress={() => navigation.navigate('Compare')}>
          <Ionicons name="sparkles" size={26} color={colors.white} />
          <View style={{ flex: 1 }}><Text style={styles.aiTitle}>Diferencial técnico</Text><Text style={styles.aiText}>Comparador inteligente entre concorrentes com leitura padronizada.</Text></View>
          <Ionicons name="chevron-forward" size={22} color={colors.white} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 90 }, kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 14 }, cardTitle: { color: colors.text, fontSize: 18, fontWeight: '900', marginBottom: 8 }, text: { color: colors.muted, lineHeight: 20, marginBottom: 14 }, step: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 }, circle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.chip, marginRight: 10 }, circleText: { color: colors.fordBlue, fontWeight: '900' }, stepText: { color: colors.text, fontWeight: '700', flex: 1 }, aiBox: { backgroundColor: colors.fordBlue, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }, aiTitle: { color: colors.white, fontWeight: '900', fontSize: 16 }, aiText: { color: '#D9ECFF', marginTop: 3 } });
