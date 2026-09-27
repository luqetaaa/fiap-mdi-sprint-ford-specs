import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export default function PrimaryButton({ title, onPress, loading, disabled, variant = 'primary' }) {
  return <TouchableOpacity accessibilityRole="button" accessibilityLabel={title}
    accessibilityState={{ disabled: !!(loading || disabled), busy: !!loading }}
    onPress={onPress} disabled={disabled || loading}
    style={[styles.button, variant === 'dark' && { backgroundColor: colors.fordBlue }, (disabled || loading) && { opacity: 0.6 }]}>
    {loading ? <ActivityIndicator color="white" /> : <Text style={styles.text}>{title}</Text>}
  </TouchableOpacity>;
}
const styles = StyleSheet.create({
  button: { minHeight: 50, padding: 14, backgroundColor: colors.accent, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  text: { color: 'white', fontSize: 15, fontWeight: '700', textAlign: 'center' }
});
