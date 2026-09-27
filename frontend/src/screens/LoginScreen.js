import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../hooks/AppContext';
import { loginWithApi, registerWithApi } from '../services/authService';
import { getApiErrorMessage } from '../services/apiClient';
import Card from '../components/Card';
import TextInputField from '../components/TextInputField';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

export default function LoginScreen() {
  const { setUser, sessionMessage, setSessionMessage } = useApp();
  const [register, setRegister] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();
  const submit = async () => {
    setError(''); setSessionMessage('');
    if (register && nome.trim().length < 2) return setError('Informe seu nome.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Informe um e-mail válido.');
    if (!senha || (register && (senha.length < 6 || senha.length > 72)))
      return setError(register ? 'Use uma senha com 6 a 72 caracteres.' : 'Informe sua senha.');
    setLoading(true);
    try {
      if (register) await registerWithApi({ nome, email, senha });
      const user = await loginWithApi({ email, senha });
      setUser(user);
    } catch (e) { setError(getApiErrorMessage(e)); }
    finally { setLoading(false); }
  };
  return <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 36, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.content}>
        <View style={styles.mark}><Ionicons name="car-sport-outline" size={32} color={colors.accent2} /></View>
        <Text style={styles.eyebrow}>FORD / SPECS INTELLIGENCE</Text>
        <Text style={styles.hero}>Dados claros.{'\n'}Melhores comparações.</Text>
        <Text style={styles.subtitle}>Especificações e versões reunidas para facilitar sua análise automotiva.</Text>
        <Card>
          <Text style={layout.title}>{register ? 'Crie sua conta' : 'Bem-vindo de volta'}</Text>
          <Text style={[layout.body, { marginBottom: 22 }]}>{register ? 'Salve suas pesquisas em um só lugar.' : 'Entre para continuar sua pesquisa.'}</Text>
          {register && <TextInputField label="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" autoComplete="name" maxLength={100} />}
          <TextInputField label="E-mail" value={email} onChangeText={setEmail} placeholder="voce@exemplo.com"
            autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" maxLength={254} />
          <TextInputField label="Senha" value={senha} onChangeText={setSenha}
            placeholder={register ? 'Mínimo de 6 caracteres' : 'Sua senha'} secureTextEntry
            autoCapitalize="none" autoComplete={register ? 'new-password' : 'current-password'}
            onSubmitEditing={loading ? undefined : submit} maxLength={72} />
          {!!(error || sessionMessage) && <Text accessibilityRole="alert" style={styles.error}>{error || sessionMessage}</Text>}
          <PrimaryButton title={register ? 'Criar conta e entrar' : 'Entrar'} onPress={submit} loading={loading} />
          <TouchableOpacity accessibilityRole="button" disabled={loading} onPress={() => { setRegister(!register); setError(''); setSessionMessage(''); }}>
            <Text style={layout.link}>{register ? 'Já tenho conta' : 'Criar uma conta'}</Text>
          </TouchableOpacity>
        </Card>
        <Text style={styles.footer}>Projeto acadêmico • FIAP × Ford</Text>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.fordBlue },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  content: { width: '100%', maxWidth: 440 },
  mark: { width: 64, height: 64, backgroundColor: '#16436F', borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: colors.accent2 },
  hero: { fontSize: 32, lineHeight: 39, fontWeight: '700', color: 'white', marginTop: 12, letterSpacing: -0.6 },
  subtitle: { color: '#CDDEEE', fontSize: 14, lineHeight: 22, marginTop: 14, marginBottom: 28 },
  footer: { color: '#BBCDE0', textAlign: 'center', fontSize: 11 },
  error: { color: colors.danger, lineHeight: 20, fontSize: 13, marginBottom: 16 }
});
