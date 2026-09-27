import React, { useState } from 'react';
import { Text, View, Share, Platform, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import SpecRow from '../components/SpecRow';
import PrimaryButton from '../components/PrimaryButton';
import Feedback from '../components/Feedback';
import { shareResult } from '../services/specsService';
import { formatDateTime } from '../utils/formatters';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

export default function ResultScreen({ route, navigation }) {
  const item = route.params?.item;
  const result = item?.result;
  const [message, setMessage] = useState('');
  const [sharing, setSharing] = useState(false);
  if (!result?.vehicle) return <Screen title="Ficha técnica" back={() => navigation.goBack()}>
    <Feedback message="Essa ficha não está disponível. Faça uma nova pesquisa." />
  </Screen>;
  const { vehicle, rows, coverage } = result;
  const share = async () => {
    setMessage(''); setSharing(true);
    try {
      const text = shareResult(result);
      if (Platform.OS !== 'web') await Share.share({ message: text });
      else if (globalThis.navigator?.share) await globalThis.navigator.share({ title: 'Ficha técnica', text });
      else if (globalThis.navigator?.clipboard) {
        await globalThis.navigator.clipboard.writeText(text); setMessage('Ficha copiada. Você já pode colar em uma mensagem.');
      } else setMessage('O compartilhamento não está disponível neste navegador. Abra o app no Android.');
    } catch (error) { if (error.name !== 'AbortError') setMessage('Não foi possível compartilhar a ficha. Tente novamente.'); }
    finally { setSharing(false); }
  };
  return <Screen title="Ficha técnica" subtitle="Informações organizadas para sua análise." back={() => navigation.goBack()}>
    <Card>
      <Text style={{ color: colors.accent, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>{vehicle.marca.toUpperCase()} · {vehicle.ano}</Text>
      <Text style={{ color: colors.text, fontSize: 30, fontWeight: '700', marginTop: 10 }}>{vehicle.modelo}</Text>
      <Text style={[layout.body, { marginTop: 4 }]}>{vehicle.versao}</Text>
      <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 16 }} />
      <Text style={layout.small}>Consultado em {formatDateTime(result.generatedAt)}</Text>
    </Card>
    {!!result.demonstrativo && <View style={layout.notice}><Text style={layout.noticeText}>DADOS DEMONSTRATIVOS · Informações do projeto acadêmico, sem verificação externa.</Text></View>}
    {!!item.cacheWarning && <Feedback message={item.cacheWarning} />}
    <Card>
      <View style={[layout.row, { justifyContent: 'space-between', marginBottom: 8 }]}>
        <Text style={[layout.title, { flex: 1, marginBottom: 0 }]}>Atributos selecionados</Text>
        <Text style={{ fontSize: 19, color: colors.accent, fontWeight: '700' }}>{coverage}%</Text>
      </View>
      <Text style={[layout.small, { marginBottom: 16 }]}>{rows.filter(row => row.available).length} de {rows.length} campos preenchidos</Text>
      {rows.map(row => <SpecRow key={row.key} {...row} />)}
    </Card>
    <Card><Text style={[layout.title, { fontSize: 15 }]}>Origem dos dados</Text><Text style={layout.small}>{result.source}</Text></Card>
    {!!message && <Feedback message={message} />}
    <PrimaryButton title={Platform.OS === 'web' && !globalThis.navigator?.share ? 'Copiar ficha' : 'Compartilhar ficha'} onPress={share} loading={sharing} />
    <TouchableOpacity accessibilityRole="button" onPress={() => navigation.popTo('Main', { screen: 'Search' })}>
      <Text style={layout.link}>Nova pesquisa</Text></TouchableOpacity>
  </Screen>;
}
