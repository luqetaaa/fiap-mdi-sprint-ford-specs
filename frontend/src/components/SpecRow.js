import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme/colors';
export default function SpecRow({ label, value, available }) {
  return <View style={{ borderTopWidth: 1, borderColor: colors.border, paddingVertical: 14 }}>
    <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 6 }}>{label}</Text>
    <Text style={{ color: available ? colors.text : colors.muted, fontSize: 15, lineHeight: 22, fontWeight: available ? '600' : '400' }}>{value}</Text>
  </View>;
}
