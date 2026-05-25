import React, { useMemo } from 'react';

import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Share
} from 'react-native';

import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import SpecRow from '../components/SpecRow';
import PrimaryButton from '../components/PrimaryButton';
import KpiCard from '../components/KpiCard';

import { colors } from '../theme/colors';
import { formatDateTime } from '../utils/formatters';

export default function ResultScreen({ route, navigation }) {
  const item = route.params?.item || {};
  const result = item?.result || {};
  const params = item?.params || {};
  const vehicle = result?.vehicle || params || {};

  const rows = result?.rows || [];
  const generatedAt = result?.generatedAt || new Date().toISOString();
  const source = result?.source || 'API Ford Competitive';
  const confidence = result?.confidence || 95;

  const title = useMemo(() => {
    const marca = vehicle?.marca || params?.marca || 'Ford';
    const modelo = vehicle?.modelo || params?.modelo || 'Veículo consultado';
    const versao = vehicle?.versao || params?.versao || '';

    return `${marca} ${modelo}${versao ? ' ' + versao : ''}`;
  }, [vehicle, params]);

  const coverage = useMemo(() => {
    if (result?.coverage !== undefined && result?.coverage !== null) {
      return result.coverage;
    }

    if (!rows.length) {
      return 0;
    }

    const available = rows.filter(
      (row) =>
        row.available !== false &&
        row.value &&
        row.value !== 'Não disponível'
    ).length;

    return Math.round((available / rows.length) * 100);
  }, [result, rows]);

  const shareText = useMemo(() => {
    return [
      title,
      ...rows.map((row) => row.label + ': ' + row.value)
    ].join('\n');
  }, [title, rows]);

  async function handleShare() {
    try {
      await Share.share({
        message: shareText
      });
    } catch (error) {}
  }

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Ficha técnica"
        subtitle="Resultado padronizado para comparação competitiva."
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <Text style={styles.vehicleTitle}>
            {title}
          </Text>

          <Text style={styles.meta}>
            Gerado em {formatDateTime(generatedAt)}
          </Text>

          <Text style={styles.source}>
            Fonte: {source}
          </Text>
        </Card>

        <View style={styles.kpiRow}>
          <KpiCard
            value={coverage + '%'}
            label="cobertura"
            hint="campos preenchidos"
          />

          <KpiCard
            value={confidence + '%'}
            label="confiança"
            hint="fonte/base"
          />
        </View>

        <Card>
          <Text style={styles.sectionTitle}>
            Atributos selecionados
          </Text>

          {rows.length > 0 ? (
            rows.map((row) => (
              <SpecRow
                key={row.key || row.label}
                label={row.label}
                value={row.value || 'Não disponível'}
                available={row.available}
              />
            ))
          ) : (
            <Text style={styles.empty}>
              Nenhum atributo foi retornado para esta pesquisa.
            </Text>
          )}
        </Card>

        <PrimaryButton
          title="Compartilhar ficha"
          onPress={handleShare}
        />

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>
            Nova pesquisa
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },

  content: {
    padding: 16,
    paddingBottom: 90
  },

  vehicleTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6
  },

  meta: {
    color: colors.muted,
    fontWeight: '700',
    marginBottom: 6
  },

  source: {
    color: colors.muted,
    lineHeight: 20
  },

  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12
  },

  empty: {
    color: colors.muted,
    lineHeight: 20
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7E0EC',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
    marginTop: 10
  },

  secondaryButtonText: {
    color: colors.text,
    fontWeight: '900'
  }
});
