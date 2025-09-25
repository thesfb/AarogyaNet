import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { Icon } from 'react-native-elements';

import CitizenHomeScreen from '../screens/CitizenHomeScreen';
import AshaHomeScreen from '../screens/AshaHomeScreen';
import CameraScreen from '../screens/CameraScreen';
import ChatScreen from '../screens/ChatScreen'; 
import { COLORS } from '../styles/colors';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, logout } = useContext(AuthContext); 
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  if (isLoading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" /></View>;
  }

  return (
    <Stack.Navigator
      initialRouteName={userRole === 'health_worker' ? 'AshaHome' : 'CitizenHome'}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background, elevation: 0, shadowOpacity: 0 },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Icon name="log-out" type="feather" color={COLORS.danger} size={24} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="CitizenHome" component={CitizenHomeScreen} options={{ title: 'Citizen Dashboard' }} />
      <Stack.Screen name="AshaHome" component={AshaHomeScreen} options={{ title: 'ASHA Dashboard' }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Skin Analysis' }} />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={({ route }) => ({ title: `About ${route.params.diagnosis}` })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        marginRight: 15,
        padding: 5,
    }
});