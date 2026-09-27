import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
const icons = { Home: 'home-outline', Search: 'search-outline', History: 'time-outline', Compare: 'git-compare-outline', About: 'person-circle-outline' };
function MainTabs() {
  const insets = useSafeAreaInsets();
  return <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted,
    tabBarStyle: { borderTopColor: colors.border, height: 64 + insets.bottom, paddingTop: 6, paddingBottom: 8 + insets.bottom },
    tabBarLabelStyle: { fontSize: 10, lineHeight: 14 },
    tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />
  })}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Pesquisar' }} />
    <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
    <Tab.Screen name="Compare" component={CompareScreen} options={{ title: 'Comparar' }} />
    <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} />
  </Tab.Navigator>;
}
export default function RootNavigator() {
  const { user, booting } = useApp();
  if (booting) return <View style={{ flex: 1, backgroundColor: colors.fordBlue, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator color="white" /><Text style={{ color: 'white', marginTop: 16 }}>Abrindo sua sessão…</Text>
  </View>;
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!user ? <Stack.Screen name="Login" component={LoginScreen} /> : <>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </>}
  </Stack.Navigator>;
}
