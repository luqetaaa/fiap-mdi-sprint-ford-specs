import React, { useMemo, useState } from 'react';

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
  searchVehicle,
  getSpecifications,
  normalizeSpecifications,
  buildTechnicalRows,
  calculateCoverage
} from '../services/apiVehicleService';

import { getApiErrorMessage } from '../services/apiClient';

export default function SearchScreen({ navigation }) {

  const [form, setForm] = useState({
    marca: 'Ford',
    modelo: 'Mustang',
    ano: '2024',
    versao: 'GT'
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = useMemo(() => {
    return (
      form.modelo?.trim() &&
      form.ano?.trim() &&
      form.versao?.trim()
    );
  }, [form]);

  function updateField(field, value) {
    setForm((oldState) => ({
      ...oldState,
      [field]: value
    }));
  }

  async function handleSearchVehicle() {

    try {

      setLoading(true);
      setErrorMessage('');

      if (!isFormValid) {
        setErrorMessage('Preencha todos os campos obrigatórios.');
        return;
      }

      const vehicle = await searchVehicle({
        marca: form.marca,
        modelo: form.modelo,
        ano: form.ano,
        versao: form.versao
      });

      let specifications = null;

      if (vehicle?.id) {
        specifications = await getSpecifications(vehicle.id);
      }

      const normalizedSpecs =
        normalizeSpecifications(specifications);

      const technicalRows =
        buildTechnicalRows(vehicle, normalizedSpecs);

      const coverage =
        calculateCoverage(technicalRows);

      navigation.navigate('Result', {
        vehicle,
        specs: normalizedSpecs,
        technicalRows,
        coverage
      });

    } catch (error) {

      setErrorMessage(
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

      <Text style={styles.title}>
        Inteligência Competitiva
      </Text>

      <Text style={styles.subtitle}>
        Consulte especificações técnicas diretamente da API Ford Competitive.
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>Marca</Text>

        <View style={styles.lockedInput}>
          <Text style={styles.lockedText}>
            {form.marca}
          </Text>
        </View>

        <Text style={styles.label}>Modelo</Text>

        <TextInput
          style={styles.input}
          value={form.modelo}
          onChangeText={(value) =>
            updateField('modelo', value)
          }
          placeholder="Ex: Mustang"
          placeholderTextColor="#9AA5B1"
        />

        <Text style={styles.label}>Ano</Text>

        <TextInput
          style={styles.input}
          value={form.ano}
          onChangeText={(value) =>
            updateField('ano', value)
          }
          keyboardType="numeric"
          placeholder="Ex: 2024"
          placeholderTextColor="#9AA5B1"
        />

        <Text style={styles.label}>Versão</Text>

        <TextInput
          style={styles.input}
          value={form.versao}
          onChangeText={(value) =>
            updateField('versao', value)
          }
          placeholder="Ex: GT"
          placeholderTextColor="#9AA5B1"
        />

        {errorMessage ? (
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.button,
            !isFormValid && styles.buttonDisabled
          ]}
          onPress={handleSearchVehicle}
          disabled={loading || !isFormValid}
        >

          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              Consultar especificações
            </Text>
          )}

        </TouchableOpacity>

      </View>

      <View style={styles.infoCard}>

        <Text style={styles.infoTitle}>
          Como funciona?
        </Text>

        <Text style={styles.infoText}>
          O aplicativo envia os dados do veículo para a API,
          consulta as especificações técnicas e gera uma ficha
          padronizada para análise comparativa.
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#EEF3F8'
  },

  content: {
    padding: 18,
    paddingBottom: 40
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#071E3D'
  },

  subtitle: {
    marginTop: 8,
    color: '#5F6B7A',
    lineHeight: 21,
    marginBottom: 18
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DDE6F2'
  },

  label: {
    fontWeight: '900',
    color: '#172033',
    marginBottom: 7
  },

  input: {
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: '#DDE6F2',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    color: '#172033'
  },

  lockedInput: {
    backgroundColor: '#EAF2FF',
    borderWidth: 1,
    borderColor: '#BDD7FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16
  },

  lockedText: {
    color: '#071E3D',
    fontWeight: '900'
  },

  button: {
    backgroundColor: '#071E3D',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center'
  },

  buttonDisabled: {
    opacity: 0.6
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '900'
  },

  errorText: {
    color: '#D62828',
    fontWeight: '800',
    marginBottom: 12
  },

  infoCard: {
    marginTop: 18,
    backgroundColor: '#071E3D',
    borderRadius: 18,
    padding: 18
  },

  infoTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 10
  },

  infoText: {
    color: '#D7E7FF',
    lineHeight: 22
  }
});