import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../styles/colors';

// A reusable component for the role selection cards
const RoleCard = ({ iconName, iconType, title, subtitle, onPress, color }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Icon name={iconName} type={iconType} size={32} color="white" />
    </View>
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
    <Icon name="chevron-right" type="material-community" size={24} color={COLORS.textLight} />
  </TouchableOpacity>
);

export default function LoginScreen({ navigation }) {
  
  const handleLogin = (userType) => {
    console.log(`Navigating as: ${userType}`);
    if (userType === 'citizen') {
      navigation.replace('MainApp', { screen: 'CitizenHome' });
    } else {
      navigation.replace('MainApp', { screen: 'AshaHome' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Text style={styles.title}>AarogyaNet</Text>
        <Text style={styles.subtitle}>AI-Powered Preventive Healthcare for Rural India</Text>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.selectionTitle}>Choose your role to begin</Text>
        <RoleCard
          iconName="account-heart-outline"
          iconType="material-community"
          title="Citizen / Patient"
          subtitle="Analyze a health concern"
          onPress={() => handleLogin('citizen')}
          color={COLORS.primary}
        />
        <RoleCard
          iconName="stethoscope"
          iconType="font-awesome"
          title="Healthcare Worker"
          subtitle="Access your dashboard"
          onPress={() => handleLogin('health_worker')}
          color={COLORS.secondary}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          A project for accessible healthcare.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  cardContainer: {
    paddingHorizontal: 20,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});