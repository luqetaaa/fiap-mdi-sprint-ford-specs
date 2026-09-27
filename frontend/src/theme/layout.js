import { StyleSheet } from 'react-native';
import { colors } from './colors';
export const layout = StyleSheet.create({
  title: { color: colors.text, fontSize: 19, fontWeight: '700', marginBottom: 10 },
  body: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  small: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  gap: { height: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  link: { color: colors.accent, fontSize: 14, fontWeight: '700', paddingVertical: 14, textAlign: 'center' },
  notice: { backgroundColor: '#FFF4DF', borderRadius: 12, padding: 12, marginBottom: 16 },
  noticeText: { color: colors.warning, lineHeight: 19, fontSize: 12 }
});
