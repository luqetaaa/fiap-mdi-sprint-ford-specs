import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../hooks/AppContext';
import TextInputField from '../components/TextInputField';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import { loginWithApi, registerWithApi } from '../services/authService';
import { getApiErrorMessage } from '../services/apiClient';
import { colors } from '../theme/colors';

export default function LoginScreen() {
  const { setUser } = useApp();
  const [email, setEmail] = useState('victor@test.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Analista Ford');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!email.includes('@') || password.length < 4) {
      return setError('Informe um e-mail válido e senha com no mínimo 4 caracteres.');
    }

    try {
      setLoading(true);
      setError('');

      if (isRegistering) {
        await registerWithApi({ nome: name, email, senha: password });
      }

      const user = await loginWithApi(email, password);
      setUser(user);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[colors.fordBlue, '#07172E']} style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.center}>
        <Text style={styles.logo}>Ford</Text>
        <Text style={styles.title}>Specs Intelligence</Text>
        <Text style={styles.subtitle}>Login integrado com API REST Spring Boot usando autenticação JWT.</Text>

        <Card style={styles.card}>
          {isRegistering ? (
            <TextInputField label="Nome" value={name} onChangeText={setName} placeholder="Nome do analista" />
          ) : null}

          <TextInputField label="E-mail" value={email} onChangeText={setEmail} placeholder="victor@test.com" autoCapitalize="none" />
          <TextInputField label="Senha" value={password} onChangeText={setPassword} placeholder="123456" secureTextEntry />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <PrimaryButton title={isRegistering ? 'Cadastrar e entrar' : 'Entrar com JWT'} onPress={submit} loading={loading} />

          <TouchableOpacity onPress={() => setIsRegistering((current) => !current)}>
            <Text style={styles.switchText}>{isRegistering ? 'Já tenho conta. Fazer login.' : 'Criar nova conta na API.'}</Text>
          </TouchableOpacity>

          <Text style={styles.helper}>A API precisa estar rodando em http://192.168.15.3:8080</Text>
        </Card>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', padding: 22 },
  logo: { color: colors.white, fontSize: 48, fontWeight: '900', fontStyle: 'italic', textAlign: 'center' },
  title: { color: colors.white, fontSize: 30, fontWeight: '900', textAlign: 'center', marginTop: 8 },
  subtitle: { color: '#CFE4FF', textAlign: 'center', lineHeight: 21, marginVertical: 18 },
  card: { padding: 20 },
  error: { color: colors.danger, fontWeight: '700', marginBottom: 12, lineHeight: 19 },
  switchText: { color: colors.primary, textAlign: 'center', fontWeight: '900', marginTop: 14 },
  helper: { color: colors.muted, textAlign: 'center', marginTop: 12, fontSize: 12, lineHeight: 17 }
});
