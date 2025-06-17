import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef();

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        title: route?.name ? route.name.replace('-', ' ') : 'Sem título',  // ✅ Proteção aqui
      })}
    >
      <Drawer.Screen name="HOME" component={TabRoutes} />
    </Drawer.Navigator>
  );
}
