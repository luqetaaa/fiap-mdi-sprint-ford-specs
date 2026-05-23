import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import { VEHICLE_DATABASE } from '../data/vehicleSpecs';
import { compareVehicles } from '../services/specsService';
import { colors } from '../theme/colors';

export default function CompareScreen() {
  const [primary, setPrimary] = useState('ford-ranger-raptor-2025');
  const [secondary, setSecondary] = useState('ford-ranger-limited-2025');
  const fields = ['motor', 'potencia', 'torque', 'transmissao', 'tracao', 'multimidia', 'suspensao', 'pneus'];
  const rows = useMemo(() => compareVehicles(primary, secondary, fields), [primary, secondary]);
  const p = VEHICLE_DATABASE.find(v => v.id === primary);
  const s = VEHICLE_DATABASE.find(v => v.id === secondary);
  return (
    <View style={styles.screen}>
      <AppHeader title="Comparador" subtitle="Compare veículos em uma matriz técnica padronizada." />
      <ScrollView contentContainerStyle={styles.content} horizontal={false}>
        <Card>
          <Text style={styles.section}>Veículo principal</Text>
          <View style={styles.options}>{VEHICLE_DATABASE.map(v => <TouchableOpacity key={v.id} onPress={() => setPrimary(v.id)} style={[styles.chip, primary === v.id && styles.active]}><Text style={[styles.chipText, primary === v.id && styles.activeText]}>{v.marca} {v.modelo}</Text></TouchableOpacity>)}</View>
          <Text style={styles.section}>Concorrente</Text>
          <View style={styles.options}>{VEHICLE_DATABASE.filter(v => v.id !== primary).map(v => <TouchableOpacity key={v.id} onPress={() => setSecondary(v.id)} style={[styles.chip, secondary === v.id && styles.active]}><Text style={[styles.chipText, secondary === v.id && styles.activeText]}>{v.marca} {v.modelo}</Text></TouchableOpacity>)}</View>
        </Card>
        <Card>
          <View style={styles.headerRow}><Text style={styles.colTitle}>{p?.marca} {p?.modelo}</Text><Text style={styles.colTitle}>{s?.marca} {s?.modelo}</Text></View>
          {rows.map(row => <View key={row.key} style={styles.compareRow}><Text style={styles.label}>{row.label}</Text><View style={styles.values}><Text style={styles.value}>{row.primary}</Text><Text style={styles.value}>{row.secondary}</Text></View></View>)}
        </Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 90 }, section: { fontWeight: '900', color: colors.text, marginBottom: 8, marginTop: 4 }, options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }, chip: { backgroundColor: colors.chip, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 999 }, active: { backgroundColor: colors.fordBlue }, chipText: { color: colors.fordBlue, fontWeight: '800', fontSize: 12 }, activeText: { color: colors.white }, headerRow: { flexDirection: 'row', gap: 10, marginBottom: 12 }, colTitle: { flex: 1, color: colors.fordBlue, fontWeight: '900', textAlign: 'center' }, compareRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 12 }, label: { color: colors.muted, fontWeight: '800', marginBottom: 8 }, values: { flexDirection: 'row', gap: 10 }, value: { flex: 1, color: colors.text, fontWeight: '700', lineHeight: 19, backgroundColor: '#F8FAFD', borderRadius: 12, padding: 10 } });
