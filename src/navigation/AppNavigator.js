import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

import CitizenHomeScreen from '../screens/CitizenHomeScreen';
import AshaHomeScreen from '../screens/AshaHomeScreen';
import CameraScreen from '../screens/CameraScreen';
import { COLORS } from '../styles/colors';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;
  }

  return (
    <Stack.Navigator
      initialRouteName={userRole === 'health_worker' ? 'AshaHome' : 'CitizenHome'}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background, elevation: 0, shadowOpacity: 0 },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="CitizenHome" component={CitizenHomeScreen} options={{ title: 'Citizen Dashboard' }} />
      <Stack.Screen name="AshaHome" component={AshaHomeScreen} options={{ title: 'ASHA Dashboard' }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Skin Analysis' }} />
    </Stack.Navigator>
  );
}