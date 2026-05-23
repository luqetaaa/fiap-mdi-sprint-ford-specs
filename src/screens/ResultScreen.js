import React from 'react';
import { View, Text, StyleSheet, ScrollView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import SpecRow from '../components/SpecRow';
import PrimaryButton from '../components/PrimaryButton';
import KpiCard from '../components/KpiCard';
import { colors } from '../theme/colors';
import { formatDateTime, vehicleName } from '../utils/formatters';

export default function ResultScreen({ route, navigation }) {
  const item = route.params?.item;
  const result = item?.result;
  const vehicle = result?.vehicle;
  const title = vehicleName(vehicle);
  const shareText = `${title}\n${result?.rows?.map((r) => `${r.label}: ${r.value}`).join('\n')}`;
  return (
    <View style={styles.screen}>
      <AppHeader title="Ficha padronizada" subtitle="Campos claros, organizados e comparáveis para análise competitiva." />
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.titleRow}><Ionicons name="car-sport" size={28} color={colors.accent} /><View style={{ flex: 1 }}><Text style={styles.vehicle}>{title}</Text><Text style={styles.meta}>{formatDateTime(result?.generatedAt)}</Text></View></View>
          {!vehicle ? <Text style={styles.warning}>Veículo não encontrado na base. Os campos foram exibidos como “Não disponível”, conforme regra de padronização.</Text> : null}
        </Card>
        <View style={styles.kpiRow}>
          <KpiCard value={`${result?.coverage || 0}%`} label="cobertura" hint="campos preenchidos" />
          <KpiCard value={`${result?.confidence || 0}%`} label="confiança" hint="fonte/base" />
        </View>
        <Card>
          <Text style={styles.sectionTitle}>Especificações técnicas</Text>
          {result?.rows?.map((row) => <SpecRow key={row.key} {...row} />)}
          <Text style={styles.source}>Fonte: {result?.source}</Text>
        </Card>
        <View style={styles.buttons}>
          <PrimaryButton title="Compartilhar resultado" onPress={() => Share.share({ message: shareText })} />
          <PrimaryButton title="Nova pesquisa" onPress={() => navigation.navigate('Main', { screen: 'Search' })} variant="dark" />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 90 }, titleRow: { flexDirection: 'row', gap: 12, alignItems: 'center' }, vehicle: { fontSize: 19, fontWeight: '900', color: colors.text }, meta: { color: colors.muted, marginTop: 4 }, warning: { color: colors.warning, fontWeight: '700', marginTop: 12, lineHeight: 20 }, kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 14 }, sectionTitle: { fontWeight: '900', color: colors.text, fontSize: 18, marginBottom: 6 }, source: { color: colors.muted, marginTop: 12, fontSize: 12 }, buttons: { gap: 10 } });
