import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { loadHistory, clearHistory } from '../storage/historyRepository';
import { colors } from '../theme/colors';
import { formatDateTime, vehicleName } from '../utils/formatters';

export default function HistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const refresh = async () => setHistory(await loadHistory());
  useFocusEffect(useCallback(() => { refresh(); }, []));
  return (
    <View style={styles.screen}>
      <AppHeader title="Histórico" subtitle="Pesquisas salvas automaticamente no dispositivo." />
      <ScrollView contentContainerStyle={styles.content}>
        {history.length === 0 ? <Card><Text style={styles.empty}>Nenhuma pesquisa ainda. Gere uma ficha técnica para aparecer aqui.</Text></Card> : null}
        {history.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Result', { item })} activeOpacity={0.85}>
            <Card>
              <View style={styles.row}>
                <Ionicons name="document-text" size={24} color={colors.accent} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{vehicleName(item.result.vehicle)}</Text>
                  <Text style={styles.meta}>{formatDateTime(item.result.generatedAt)} • {item.result.rows.length} campos</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        {history.length > 0 ? <PrimaryButton title="Limpar histórico" variant="dark" onPress={async () => { await clearHistory(); refresh(); }} /> : null}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 90 }, row: { flexDirection: 'row', alignItems: 'center', gap: 12 }, title: { color: colors.text, fontWeight: '900', fontSize: 16 }, meta: { color: colors.muted, marginTop: 4 }, empty: { color: colors.muted, lineHeight: 20 } });
