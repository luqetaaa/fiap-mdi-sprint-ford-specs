import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export default function TextInputField({ label, ...props }) {
  return <View style={{ marginBottom: 16 }}><Text style={styles.label}>{label}</Text>
    <TextInput accessibilityLabel={label} placeholderTextColor={colors.muted} style={styles.input} {...props} />
  </View>;
}
const styles = StyleSheet.create({
  label: { color: colors.text, fontWeight: '700', fontSize: 13, marginBottom: 8 },
  input: { color: colors.text, backgroundColor: '#F7F9FC', borderColor: colors.border,
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 14, minHeight: 50, fontSize: 15 }
});
