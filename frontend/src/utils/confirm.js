import { Alert, Platform } from 'react-native';
export function confirmAction(title, message, onConfirm) {
  if (Platform.OS === 'web') { if (window.confirm(title + '\n\n' + message)) onConfirm(); }
  else Alert.alert(title, message, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Confirmar', style: 'destructive', onPress: onConfirm }]);
}
