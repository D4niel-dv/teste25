import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importe suas screens
import CopaScreen from './screens/CopaScreen';
import EstadiosScreen from './screens/EstadiosScreen';
import BrasilScreen from './screens/BrasilScreen';
import EstatisticasScreen from './screens/EstatisticasScreen'; // ⬅️ nova importação

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen
            name='CopaScreen'
            component={CopaScreen}
            options={{
              title: 'COPA DO MUNDO',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: 'black'
              },
              tabBarIcon: ({ color, size }) => <Ionicons name='trophy' color={color} size={size} />
            }}
          />

          <Tab.Screen
            name='EstadiosScreen'
            component={EstadiosScreen}
            options={{
              title: 'Estádios',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1a1a1a'
              },
              tabBarIcon: ({ color, size }) => <Ionicons name='location' color={color} size={size} />
            }}
          />

          <Tab.Screen
            name='BrasilScreen'
            component={BrasilScreen}
            options={{
              title: 'Brasil',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: 'green'
              },
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='football' color={color} size={size} />
              ),
              tabBarActiveTintColor: 'green',
              tabBarInactiveTintColor: 'gray'
            }}
          />

          <Tab.Screen
            name='EstatisticasScreen'
            component={EstatisticasScreen}
            options={{
              title: 'Estatísticas',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#2b7a78'
              },
              tabBarIcon: ({ color, size }) => (
                <Ionicons name='stats-chart' color={color} size={size} />
              )
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
