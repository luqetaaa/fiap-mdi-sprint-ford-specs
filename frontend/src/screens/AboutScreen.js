import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import { colors } from '../theme/colors';

const members = [
  'Lucas Rodrigues de Queiroz - RM556323',
  'Victor Hugo de Paula - RM554787',
  'Felipe Paes de Barros Muller Carioba - RM558447',
  'Djalma Moreira de Andrade Filho - RM555530',
  'Matheus Gushi Morioka - RM556935'
];

export default function AboutScreen() {
  return (
    <View style={styles.screen}>
      <AppHeader title="Sobre o projeto" subtitle="Sprint Mobile Development e IoT — Ford x FIAP." />
      <ScrollView contentContainerStyle={styles.content}>
        <Card><Text style={styles.title}>Desafio escolhido</Text><Text style={styles.text}>Desafio 01 — Inteligência Competitiva Automotiva. A solução transforma entradas simples em uma ficha técnica padronizada, clara e comparável.</Text></Card>
        <Card><Text style={styles.title}>Arquitetura da solução</Text>{['React Native + Expo', 'React Navigation', 'AsyncStorage para histórico', 'Base JSON simulando fonte externa/API', 'Camada de serviço para busca, normalização e comparação'].map(item => <Text key={item} style={styles.bullet}>• {item}</Text>)}</Card>
        <Card><Text style={styles.title}>Integrantes</Text>{members.map(item => <Text key={item} style={styles.bullet}>• {item}</Text>)}</Card>
        <Card><Text style={styles.title}>Próximos passos</Text><Text style={styles.text}>Integrar APIs automotivas reais, crawling controlado em fontes aprovadas, geração de relatórios PDF e camada de IA generativa para preenchimento de JSON técnico.</Text></Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 16, paddingBottom: 90 }, title: { fontSize: 18, fontWeight: '900', color: colors.text, marginBottom: 8 }, text: { color: colors.muted, lineHeight: 21 }, bullet: { color: colors.text, marginVertical: 5, lineHeight: 20, fontWeight: '700' } });
