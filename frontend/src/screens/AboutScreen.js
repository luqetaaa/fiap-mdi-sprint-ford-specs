import React, { useState } from 'react';
import { Text } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import Feedback from '../components/Feedback';
import { useApp } from '../hooks/AppContext';
import { layout } from '../theme/layout';
const members = [
  'Lucas Rodrigues de Queiroz · RM556323',
  'Victor Hugo de Paula · RM554787',
  'Felipe Paes de Barros Muller Carioba · RM558447',
  'Djalma Moreira de Andrade Filho · RM555530',
  'Matheus Gushi Morioka · RM556935'
];
export default function AboutScreen() {
  const { user, logout } = useApp();
  const [error, setError] = useState('');
  return <Screen title="Sobre o projeto" subtitle="Inteligência competitiva automotiva. FIAP × Ford.">
    <Card><Text style={layout.title}>{user.nome}</Text><Text style={layout.body}>{user.email}</Text></Card>
    <Card><Text style={layout.title}>Ford Specs Intelligence</Text>
      <Text style={layout.body}>Uma ferramenta para consultar, organizar e comparar especificações técnicas de diferentes versões de veículos.</Text>
      <Text style={[layout.small, { marginTop: 16 }]}>Versão 1.3.0 · Sprint 3</Text>
    </Card>
    <Card><Text style={layout.title}>Origem das informações</Text>
      <Text style={layout.body}>O catálogo inicial contém dados demonstrativos do trabalho acadêmico. Eles não substituem a documentação oficial do fabricante. A origem é exibida em cada ficha.</Text>
    </Card>
    <Card><Text style={layout.title}>Equipe</Text>
      {members.map(member => <Text key={member} style={[layout.body, { marginBottom: 12 }]}>{member}</Text>)}
    </Card>
    {!!error && <Feedback message={error} />}
    <PrimaryButton title="Sair da conta" variant="dark" onPress={async () => {
      try { await logout(); } catch { setError('Não foi possível encerrar a sessão. Tente novamente.'); }
    }} />
  </Screen>;
}
