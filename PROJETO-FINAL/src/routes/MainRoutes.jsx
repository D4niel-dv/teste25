import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import DrawerRoutes from './DrawerRoutes';

const Stack = createNativeStackNavigator();

export default function MainRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Principal" component={DrawerRoutes} />
    </Stack.Navigator>
  );
}
