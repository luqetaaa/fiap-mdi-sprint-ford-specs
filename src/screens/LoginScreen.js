import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../hooks/AppContext';
import TextInputField from '../components/TextInputField';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import { colors } from '../theme/colors';

export default function LoginScreen() {
  const { setUser } = useApp();
  const [email, setEmail] = useState('analista@ford.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const submit = () => {
    if (!email.includes('@') || password.length < 4) return setError('Informe um e-mail válido e senha com no mínimo 4 caracteres.');
    setUser({ name: 'Analista Ford', email });
  };
  return (
    <LinearGradient colors={[colors.fordBlue, '#07172E']} style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.center}>
        <Text style={styles.logo}>Ford</Text>
        <Text style={styles.title}>Specs Intelligence</Text>
        <Text style={styles.subtitle}>Padronização inteligente de especificações técnicas para inteligência competitiva automotiva.</Text>
        <Card style={styles.card}>
          <TextInputField label="E-mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" />
          <TextInputField label="Senha" value={password} onChangeText={setPassword} placeholder="123456" secureTextEntry />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <PrimaryButton title="Entrar no app" onPress={submit} />
          <Text style={styles.helper}>Login demonstrativo liberado para avaliação da sprint.</Text>
        </Card>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({ screen: { flex: 1 }, center: { flex: 1, justifyContent: 'center', padding: 22 }, logo: { color: colors.white, fontSize: 48, fontWeight: '900', fontStyle: 'italic', textAlign: 'center' }, title: { color: colors.white, fontSize: 30, fontWeight: '900', textAlign: 'center', marginTop: 8 }, subtitle: { color: '#CFE4FF', textAlign: 'center', lineHeight: 21, marginVertical: 18 }, card: { padding: 20 }, error: { color: colors.danger, fontWeight: '700', marginBottom: 12 }, helper: { color: colors.muted, textAlign: 'center', marginTop: 12, fontSize: 12 } });
