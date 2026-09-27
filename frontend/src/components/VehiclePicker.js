import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TextInputField from './TextInputField';
import { colors } from '../theme/colors';
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export default function VehiclePicker({ label, vehicles, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selected = vehicles.find(vehicle => vehicle.id === value);
  const filtered = useMemo(() => vehicles.filter(v => normalize([v.marca, v.modelo, v.versao, v.ano].join(' ')).includes(normalize(query))), [vehicles, query]);
  return <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={label} onPress={() => { setQuery(''); setOpen(true); }}
      disabled={!vehicles.length} style={styles.select}>
      <View style={{ flex: 1 }}><Text style={styles.name}>{selected ? selected.marca + ' ' + selected.modelo : 'Selecionar veículo'}</Text>
        <Text style={styles.detail}>{selected ? selected.versao + ' · ' + selected.ano : 'Modelo, versão e ano'}</Text></View>
      <Ionicons name="chevron-down" size={20} color={colors.accent} />
    </TouchableOpacity>
    {open && <Modal visible animationType="slide" onRequestClose={() => setOpen(false)}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.modal}>
          <View style={styles.top}><Text style={styles.heading}>{label}</Text>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Fechar seleção" onPress={() => setOpen(false)} style={{ padding: 12 }}>
              <Ionicons name="close" size={26} color={colors.text} /></TouchableOpacity></View>
          <TextInputField label="Buscar veículo" placeholder="Modelo, versão ou ano" value={query} onChangeText={setQuery} />
          <FlatList data={filtered} keyExtractor={item => String(item.id)} keyboardShouldPersistTaps="handled"
            ListEmptyComponent={<Text style={styles.detail}>Nenhum veículo corresponde à busca.</Text>}
            renderItem={({ item }) => <TouchableOpacity accessibilityRole="button"
              accessibilityLabel={item.modelo + ' ' + item.versao + ' ' + item.ano}
              onPress={() => { onChange(item.id); setOpen(false); }} style={[styles.option, item.id === value && { borderColor: colors.accent }]}>
              <Text style={styles.name}>{item.marca} {item.modelo}</Text>
              <Text style={styles.detail}>{item.versao} · {item.ano}</Text>
            </TouchableOpacity>} />
        </View>
      </SafeAreaView>
    </Modal>}
  </View>;
}
const styles = StyleSheet.create({
  label: { color: colors.text, fontWeight: '700', fontSize: 13, marginBottom: 8 },
  select: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '700', color: colors.text },
  detail: { fontSize: 12, color: colors.muted, lineHeight: 19, marginTop: 4 },
  modal: { padding: 20, flex: 1, width: '100%', maxWidth: 720, alignSelf: 'center' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  heading: { color: colors.text, fontSize: 23, fontWeight: '700' },
  option: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, padding: 16, borderRadius: 14, marginBottom: 10 }
});
