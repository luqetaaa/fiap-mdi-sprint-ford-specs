import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import {
  loginWithApi,
  registerWithApi
} from '../services/authService';

import { getApiErrorMessage } from '../services/apiClient';

export default function LoginScreen({ navigation }) {

  const [isRegisterMode, setIsRegisterMode] =
    useState(false);

  const [nome, setNome] =
    useState('Analista Ford');

  const [email, setEmail] =
    useState('victor@test.com');

  const [senha, setSenha] =
    useState('123456');

  const [loading, setLoading] =
    useState(false);

  const [erro, setErro] =
    useState('');

  async function handleSubmit() {

    try {

      setErro('');
      setLoading(true);

      if (!email || email.trim().length === 0) {
        setErro('O e-mail é obrigatório');
        return;
      }

      if (!senha || senha.trim().length === 0) {
        setErro('A senha é obrigatória');
        return;
      }

      if (isRegisterMode) {

        if (!nome || nome.trim().length === 0) {
          setErro('O nome é obrigatório');
          return;
        }

        await registerWithApi(
          nome,
          email,
          senha
        );
      }

      await loginWithApi(
        email,
        senha
      );

      navigation.replace('Search');

    } catch (error) {

      setErro(
        getApiErrorMessage(error)
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>

        <Text style={styles.logo}>
          Ford
        </Text>

        <Text style={styles.title}>
          Specs Intelligence
        </Text>

        <Text style={styles.subtitle}>
          Login integrado com API REST Spring Boot usando autenticação JWT.
        </Text>

      </View>

      <View style={styles.card}>

        {isRegisterMode && (
          <>
            <Text style={styles.label}>
              Nome
            </Text>

            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome do analista"
              placeholderTextColor="#9AA5B1"
            />
          </>
        )}

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#9AA5B1"
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          placeholderTextColor="#9AA5B1"
          secureTextEntry
        />

        {erro ? (
          <Text style={styles.errorText}>
            {erro}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >

          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegisterMode
                ? 'Cadastrar e entrar'
                : 'Entrar com JWT'}
            </Text>
          )}

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() =>
            setIsRegisterMode(!isRegisterMode)
          }
        >

          <Text style={styles.switchText}>
            {isRegisterMode
              ? 'Já tenho conta. Fazer login.'
              : 'Criar nova conta na API.'}
          </Text>

        </TouchableOpacity>

        <Text style={styles.footer}>
          A API precisa estar rodando em http://localhost:8080
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#071E3D'
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },

  header: {
    alignItems: 'center',
    marginBottom: 24
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '900',
    fontStyle: 'italic'
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 4
  },

  subtitle: {
    color: '#D7E7FF',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22
  },

  label: {
    color: '#172033',
    fontWeight: '900',
    marginBottom: 8
  },

  input: {
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: '#DDE6F2',
    borderRadius: 14,
    padding: 15,
    marginBottom: 16,
    color: '#172033'
  },

  button: {
    backgroundColor: '#2D9CDB',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 6
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16
  },

  switchButton: {
    marginTop: 18,
    alignItems: 'center'
  },

  switchText: {
    color: '#071E3D',
    fontWeight: '900'
  },

  footer: {
    marginTop: 16,
    textAlign: 'center',
    color: '#7B8794',
    fontSize: 12
  },

  errorText: {
    color: '#D62828',
    fontWeight: '800',
    marginBottom: 10
  }
});
