import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppHeader from './AppHeader';
import { colors } from '../theme/colors';
export default function Screen({ title, subtitle, back, children, refreshControl }) {
  return <View style={styles.screen}>
    <AppHeader title={title} subtitle={subtitle} back={back} />
    <ScrollView keyboardShouldPersistTaps="handled" refreshControl={refreshControl} contentContainerStyle={styles.scroll}>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, alignItems: 'center' },
  content: { width: '100%', maxWidth: 720, padding: 20, paddingBottom: 36 }
});
