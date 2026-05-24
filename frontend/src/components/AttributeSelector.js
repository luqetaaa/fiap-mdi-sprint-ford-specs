import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { ATTRIBUTE_GROUPS, FIELD_LABELS } from '../data/specAttributes';

export default function AttributeSelector({ selected, onChange }) {
  const toggle = (key) => {
    if (selected.includes(key)) onChange(selected.filter((item) => item !== key));
    else onChange([...selected, key]);
  };
  return (
    <View>
      {ATTRIBUTE_GROUPS.map((group) => (
        <View key={group.id} style={styles.group}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.chips}>
            {group.items.map((key) => {
              const active = selected.includes(key);
              return (
                <TouchableOpacity key={key} onPress={() => toggle(key)} style={[styles.chip, active && styles.activeChip]}>
                  <Text style={[styles.chipText, active && styles.activeText]}>{FIELD_LABELS[key]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({ group: { marginBottom: 14 }, groupTitle: { fontWeight: '900', color: colors.text, marginBottom: 8 }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, chip: { paddingHorizontal: 12, paddingVertical: 9, backgroundColor: colors.chip, borderRadius: 999, borderWidth: 1, borderColor: '#D6E8FF' }, activeChip: { backgroundColor: colors.fordBlue, borderColor: colors.fordBlue }, chipText: { color: colors.fordBlue, fontWeight: '700', fontSize: 12 }, activeText: { color: colors.white } });
