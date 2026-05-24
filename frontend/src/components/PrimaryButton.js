import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function PrimaryButton({ title, onPress, loading, disabled, variant = 'primary' }) {
  const gradient = variant === 'dark' ? [colors.fordBlue, colors.fordBlue2] : [colors.accent, colors.accent2];
  return (
    <TouchableOpacity activeOpacity={0.86} onPress={onPress} disabled={disabled || loading} style={{ opacity: disabled ? 0.55 : 1 }}>
      <LinearGradient colors={gradient} style={styles.button}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({ button: { borderRadius: 16, paddingVertical: 15, alignItems: 'center' }, text: { color: '#fff', fontWeight: '900', fontSize: 15 } });
