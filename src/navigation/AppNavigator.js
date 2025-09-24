import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CitizenHomeScreen from '../screens/CitizenHomeScreen'; // Renamed import
import AshaHomeScreen from '../screens/AshaHomeScreen'; // New import
import CameraScreen from '../screens/CameraScreen';
import { COLORS } from '../styles/colors';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      // The initial route is determined by the LoginScreen logic
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="CitizenHome" 
        component={CitizenHomeScreen}
        options={{ title: 'Citizen Dashboard' }}
      />
      <Stack.Screen 
        name="AshaHome" 
        component={AshaHomeScreen}
        options={{ title: 'ASHA Dashboard' }}
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{ title: 'Skin Analysis' }}
      />
    </Stack.Navigator>
  );
}