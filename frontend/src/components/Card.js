import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export default function Card({ children, style }) { return <View style={[styles.card, style]}>{children}</View>; }
const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border,
    padding: 18, borderRadius: 18, marginBottom: 16 }
});
