import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
export default function AppHeader({ title, subtitle, back }) {
  const insets = useSafeAreaInsets();
  return <LinearGradient colors={[colors.fordBlue, colors.fordBlue2]} style={{ paddingTop: insets.top + 20 }}>
    <View style={styles.container}>
      <View style={styles.row}>
        {back && <TouchableOpacity accessibilityRole="button" accessibilityLabel="Voltar" onPress={back} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color="white" /></TouchableOpacity>}
        <Text style={styles.brand}>FORD / SPECS INTELLIGENCE</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </LinearGradient>;
}
const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 20, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  brand: { color: colors.accent2, fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  title: { color: colors.white, fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { color: '#D7E7F7', fontSize: 13, lineHeight: 20, marginTop: 8 },
  back: { padding: 10, marginLeft: -10, marginVertical: -10 }
});
