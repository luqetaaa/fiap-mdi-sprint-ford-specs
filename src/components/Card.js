import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 20, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: colors.border, shadowColor: '#0B1B34', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 2 }
});
