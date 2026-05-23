import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CompareScreen from '../screens/CompareScreen';
import AboutScreen from '../screens/AboutScreen';
import { useApp } from '../hooks/AppContext';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { height: 64, paddingBottom: 9, paddingTop: 8 },
      tabBarIcon: ({ color, size }) => {
        const icons = { Home: 'speedometer', Search: 'search', History: 'time', Compare: 'git-compare', About: 'information-circle' };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      }
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Pesquisa' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
      <Tab.Screen name="Compare" component={CompareScreen} options={{ title: 'Comparar' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { user } = useApp();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? <Stack.Screen name="Login" component={LoginScreen} /> : <>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </>}
    </Stack.Navigator>
  );
}
