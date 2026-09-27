import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';
import PrimaryButton from './PrimaryButton';
export default function Feedback({ message, loading, retry }) {
  return <View accessibilityLiveRegion="polite" style={{ padding: 16, marginBottom: 16, backgroundColor: colors.card, borderRadius: 14 }}>
    {loading && <ActivityIndicator color={colors.accent} style={{ marginBottom: 10 }} />}
    <Text style={layout.body}>{message}</Text>
    {retry && <View style={{ marginTop: 12 }}><PrimaryButton title="Tentar novamente" onPress={retry} /></View>}
  </View>;
}
