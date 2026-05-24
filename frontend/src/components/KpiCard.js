import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function KpiCard({ label, value, hint }) {
  return <View style={styles.box}><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label}</Text>{hint ? <Text style={styles.hint}>{hint}</Text> : null}</View>;
}
const styles = StyleSheet.create({ box: { flex: 1, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 14 }, value: { fontSize: 22, fontWeight: '900', color: colors.fordBlue }, label: { color: colors.text, fontWeight: '800', marginTop: 4 }, hint: { color: colors.muted, fontSize: 11, marginTop: 4 } });
