import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/hooks/AppContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={colors.fordBlue} />
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
