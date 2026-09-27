import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Feedback from '../components/Feedback';
import PrimaryButton from '../components/PrimaryButton';
import { useApp } from '../hooks/AppContext';
import { getSearchHistory, deleteSearchHistory } from '../services/apiVehicleService';
import { loadHistory, replaceHistory, clearHistory } from '../storage/historyRepository';
import { getApiErrorMessage } from '../services/apiClient';
import { formatDateTime } from '../utils/formatters';
import { confirmAction } from '../utils/confirm';
import { layout } from '../theme/layout';
import { colors } from '../theme/colors';

export default function HistoryScreen({ navigation }) {
  const { user } = useApp();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const refresh = useCallback(async () => {
    setLoading(true); setMessage('');
    try {
      const remote = await getSearchHistory();
      setItems(remote);
      try { await replaceHistory(user.id, remote); }
      catch { setMessage('Histórico atualizado. Não foi possível manter uma cópia offline.'); }
    } catch (error) {
      try {
        const cached = await loadHistory(user.id);
        setItems(cached);
        setMessage(cached.length ? 'Sem conexão. Exibindo as fichas salvas neste dispositivo.' : getApiErrorMessage(error));
      } catch { setMessage('Não foi possível carregar o histórico. Tente novamente.'); }
    } finally { setLoading(false); }
  }, [user.id]);
  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));
  const clear = () => confirmAction('Limpar histórico?', 'Todas as pesquisas da sua conta serão removidas.', async () => {
    setLoading(true); setMessage('');
    try {
      await deleteSearchHistory();
      setItems([]);
      await clearHistory(user.id);
    } catch (e) { setMessage(getApiErrorMessage(e)); }
    finally { setLoading(false); }
  });
  return <Screen title="Seu histórico" subtitle="Reabra suas pesquisas e continue de onde parou."
    refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}>
    {!!message && <Feedback message={message} retry={refresh} />}
    {loading && !items.length && <Feedback loading message="Buscando suas pesquisas…" />}
    {!loading && !items.length && <Card>
      <Ionicons name="documents-outline" color={colors.accent} size={34} style={{ marginBottom: 16 }} />
      <Text style={layout.title}>Sua primeira ficha vem aí.</Text>
      <Text style={[layout.body, { marginBottom: 20 }]}>As pesquisas que você fizer aparecem aqui para consultar depois.</Text>
      <PrimaryButton title="Fazer uma pesquisa" onPress={() => navigation.navigate('Search')} />
    </Card>}
    {items.map(item => <TouchableOpacity accessibilityRole="button" accessibilityLabel={'Abrir ficha ' + item.result.vehicle.modelo + ' ' + item.result.vehicle.versao}
      key={item.id} onPress={() => navigation.navigate('Result', { item })}>
      <Card><View style={layout.row}>
        <Ionicons name="document-text-outline" size={25} color={colors.accent} />
        <View style={{ flex: 1 }}>
          <Text style={[layout.title, { fontSize: 17, marginBottom: 4 }]}>{item.result.vehicle.marca} {item.result.vehicle.modelo}</Text>
          <Text style={layout.small}>{item.result.vehicle.versao} · {item.result.vehicle.ano}</Text>
          <Text style={[layout.small, { marginTop: 8 }]}>{formatDateTime(item.result.generatedAt)} · {item.result.rows.length} atributos</Text>
        </View><Ionicons name="chevron-forward" color={colors.muted} size={19} />
      </View></Card>
    </TouchableOpacity>)}
    {!!items.length && <PrimaryButton title="Limpar histórico" variant="dark" onPress={clear} disabled={loading} />}
  </Screen>;
}
