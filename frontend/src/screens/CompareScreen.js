import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import VehiclePicker from '../components/VehiclePicker';
import Feedback from '../components/Feedback';
import { useApp } from '../hooks/AppContext';
import { compareVehicles } from '../services/specsService';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

export default function CompareScreen() {
  const { vehicles, catalogLoading, catalogError, refreshCatalog, selectedFields } = useApp();
  const [primaryId, setPrimaryId] = useState(null);
  const [secondaryId, setSecondaryId] = useState(null);
  useEffect(() => {
    if (!vehicles.some(v => v.id === primaryId)) setPrimaryId(vehicles[0]?.id ?? null);
  }, [vehicles, primaryId]);
  useEffect(() => {
    if (!vehicles.some(v => v.id === secondaryId) || secondaryId === primaryId)
      setSecondaryId(vehicles.find(v => v.id !== primaryId)?.id ?? null);
  }, [vehicles, primaryId, secondaryId]);
  const primary = vehicles.find(v => v.id === primaryId);
  const secondary = vehicles.find(v => v.id === secondaryId);
  const rows = useMemo(() => compareVehicles(primary, secondary, selectedFields), [primary, secondary, selectedFields]);
  return <Screen title="Compare versões" subtitle="Mesmos atributos. Uma visão mais clara das diferenças.">
    {catalogLoading && <Feedback loading message="Carregando o catálogo…" />}
    {!!catalogError && <Feedback message={catalogError} retry={refreshCatalog} />}
    {!catalogLoading && vehicles.length < 2 && <Feedback message="Cadastre pelo menos duas versões para comparar." />}
    <Card><VehiclePicker label="Veículo A" vehicles={vehicles} value={primaryId} onChange={setPrimaryId} />
      <VehiclePicker label="Veículo B" vehicles={vehicles.filter(v => v.id !== primaryId)} value={secondaryId} onChange={setSecondaryId} />
    </Card>
    {primary && secondary && <>
      {(primary.demonstrativo || secondary.demonstrativo) && <View style={layout.notice}><Text style={layout.noticeText}>Comparação com dados demonstrativos do catálogo acadêmico.</Text></View>}
      <Card>
        <View style={[layout.row, { alignItems: 'flex-start', marginBottom: 20 }]}>
          {[['A', primary], ['B', secondary]].map(([letter, vehicle]) => <View key={letter} style={{ flex: 1 }}>
            <Text style={{ color: colors.accent, fontSize: 11, fontWeight: '700', marginBottom: 6 }}>VEÍCULO {letter}</Text>
            <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>{vehicle.modelo}</Text>
            <Text style={layout.small}>{vehicle.versao} · {vehicle.ano}</Text>
          </View>)}
        </View>
        {!rows.length && <Text style={layout.body}>Selecione atributos na tela de pesquisa para comparar.</Text>}
        {rows.map(row => <View key={row.key} style={{ borderTopWidth: 1, borderColor: colors.border, paddingVertical: 16 }}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: colors.muted, marginBottom: 10 }}>{row.label}</Text>
          <View style={[layout.row, { alignItems: 'flex-start' }]}>
            <Text style={{ flex: 1, color: colors.text, fontSize: 14, lineHeight: 21 }}>{row.primary}</Text>
            <Text style={{ flex: 1, color: colors.text, fontSize: 14, lineHeight: 21 }}>{row.secondary}</Text>
          </View>
        </View>)}
      </Card>
      <Text style={layout.small}>Os atributos seguem sua seleção na tela de pesquisa. A comparação usa o mesmo catálogo das fichas.</Text>
    </>}
  </Screen>;
}
