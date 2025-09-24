import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import { COLORS } from '../styles/colors'; // Import COLORS

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary, // Use color from your styles
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'AarogyaNet Dashboard' }} // Changed title
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{ title: 'Upload for Analysis' }} // Changed title
      />
    </Stack.Navigator>
  );
}