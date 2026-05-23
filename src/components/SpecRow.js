import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function SpecRow({ label, value, available }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, !available && styles.missing]}>{value}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: available ? '#EAF9F0' : '#FFF4E5' }]}>
        <Text style={[styles.badgeText, { color: available ? colors.success : colors.warning }]}>{available ? 'OK' : 'N/D'}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border }, label: { color: colors.muted, fontSize: 12, fontWeight: '700', marginBottom: 4 }, value: { color: colors.text, fontWeight: '800', lineHeight: 20 }, missing: { color: colors.warning }, badge: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 999, marginLeft: 10 }, badgeText: { fontWeight: '900', fontSize: 11 } });
