import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function AppHeader({ title, subtitle }) {
  return (
    <LinearGradient colors={[colors.fordBlue, colors.fordBlue2]} style={styles.container}>
      <Text style={styles.brand}>FORD SPECS INTELLIGENCE</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  brand: { color: colors.accent2, fontSize: 12, fontWeight: '800', letterSpacing: 1.2, marginBottom: 10 },
  title: { color: colors.white, fontSize: 28, fontWeight: '900' },
  subtitle: { color: '#D9ECFF', marginTop: 8, lineHeight: 20 }
});
