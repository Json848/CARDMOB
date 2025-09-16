import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from './types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// Tela pública.
import CatalogScreen from '../screens/catalog/CatalogScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/cart/CartScreen';
// importar depois que implementar: DetailsScreen, SettingsScreen
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Catalog') {
            iconName = focused ? 'inbox' : 'inbox';
          }
          else if (route.name === 'Settings') {
            iconName = focused ? 'gear' : 'gear';
          }
          else if (route.name === 'Register') {
            iconName = focused ? 'user-plus' : 'user-plus';
          }
          else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } 
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'grey',
        headerShown: false,
      })}
    >
      <Tab.Screen 
      name="Catalog" 
      component={CatalogScreen} 
      options={{ title: 'Menu' }}
      />
      <Tab.Screen name="Settings" component={HomeScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Cart" component={CartScreen} options={{title: 'Seu Carrinho'}}/>
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Details"
        component={HomeScreen}
        options={{ title: 'Detalhes' }}
      />
      <AppStack.Screen
        name="Logins"
        component={LoginScreen}
        options={{ title: 'Acessar' }}
      />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <StackNavigator/>
  );
}
