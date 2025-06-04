import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Importações reais das suas telas
import FilmesFavoritos from '../screens/FilmesFavoritos';
import MinhasAvaliacoes from '../screens/MinhasAvaliacoes'; // CORRIGIDO
import PerfilUsuario from '../screens/PerfilUsuario';     
const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#6200ee',
        drawerInactiveTintColor: '#444',
      }}
    >
      <Drawer.Screen
        name="FilmesFavoritos"
        component={FilmesFavoritos}
        options={{
          title: 'Favoritos',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="PerfilUsuario"
        component={PerfilUsuario}
        options={{
          title: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="MinhasAvaliacoes"
        component={MinhasAvaliacoes}
        options={{
          title: 'Minhas Avaliações',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
