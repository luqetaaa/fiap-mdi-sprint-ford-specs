import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function TextInputField({ label, value, onChangeText, placeholder, secureTextEntry }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} secureTextEntry={secureTextEntry} style={styles.input} placeholderTextColor="#9AA4B2" />
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { marginBottom: 14 }, label: { color: colors.text, fontWeight: '800', marginBottom: 7 }, input: { backgroundColor: '#F8FAFD', borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, color: colors.text } });
