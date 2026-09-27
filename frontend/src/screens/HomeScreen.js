import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import Feedback from '../components/Feedback';
import { useApp } from '../hooks/AppContext';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

export default function HomeScreen({ navigation }) {
  const { user, vehicles, catalogLoading, catalogError, refreshCatalog, lastResult } = useApp();
  const raptor = vehicles.find(v => v.modelo === 'Ranger' && v.versao.includes('Raptor'));
  return <Screen title={'Olá, ' + (user?.nome?.split(' ')[0] || 'analista') + '.'} subtitle="Sua próxima análise começa por uma boa pesquisa.">
    {catalogError && <Feedback message={catalogError} retry={refreshCatalog} />}
    <View style={[layout.row, { alignItems: 'stretch' }]}>
      {[[vehicles.length, 'versões no catálogo'], [new Set(vehicles.map(v => v.modelo)).size, 'modelos disponíveis']].map(([count, label]) =>
        <Card key={label} style={{ flex: 1 }}><Text style={{ fontSize: 30, fontWeight: '700', color: colors.fordBlue }}>{catalogLoading ? '—' : count}</Text>
          <Text style={layout.small}>{label}</Text></Card>)}
    </View>
    <Card><Ionicons name="search-outline" color={colors.accent} size={27} style={{ marginBottom: 14 }} />
      <Text style={layout.title}>Encontre o que importa.</Text>
      <Text style={[layout.body, { marginBottom: 20 }]}>Escolha uma versão e os atributos que deseja analisar. Receba uma ficha com as informações lado a lado.</Text>
      <PrimaryButton title="Nova pesquisa" onPress={() => navigation.navigate('Search')} />
    </Card>
    <Card><Text style={layout.title}>Explore a Ranger Raptor</Text>
      <Text style={[layout.body, { marginBottom: 16 }]}>Motor, tração, tecnologia e capacidades em uma ficha organizada.</Text>
      <PrimaryButton title="Consultar Ranger Raptor" variant="dark" disabled={!raptor}
        onPress={() => navigation.navigate('Search', { vehicleId: raptor.id })} />
    </Card>
    <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate('Compare')}>
      <Card><View style={layout.row}><Ionicons name="git-compare-outline" color={colors.accent} size={26} />
        <View style={{ flex: 1 }}><Text style={[layout.title, { fontSize: 17, marginBottom: 4 }]}>Compare duas versões</Text>
          <Text style={layout.small}>Os mesmos atributos, em uma única visão.</Text></View>
        <Ionicons name="arrow-forward" color={colors.accent} size={20} /></View></Card>
    </TouchableOpacity>
    {lastResult && <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate('Result', { item: lastResult })}>
      <Text style={layout.link}>Reabrir última ficha</Text></TouchableOpacity>}
    <Text style={layout.small}>O catálogo inicial utiliza os dados demonstrativos do projeto. A origem acompanha cada ficha.</Text>
  </Screen>;
}
