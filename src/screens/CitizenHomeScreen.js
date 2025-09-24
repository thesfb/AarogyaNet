import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

const FeatureCard = ({ iconName, iconType, title, subtitle, onPress }) => (
  <TouchableOpacity style={[globalStyles.card, styles.featureCard]} onPress={onPress}>
    <Icon name={iconName} type={iconType} size={30} color={COLORS.primary} containerStyle={styles.icon}/>
    <View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Welcome back!</Text>
        <Text style={styles.welcomeSubtitle}>How can we help you today?</Text>
      </View>

      <FeatureCard
        iconName="camera"
        iconType="feather"
        title="Start Skin Analysis"
        subtitle="Upload an image for AI-powered analysis"
        onPress={() => navigation.navigate('Camera')}
      />

      <FeatureCard
        iconName="wallet-outline"
        iconType="material-community"
        title="Health Wallet"
        subtitle="View balance and transaction history"
        onPress={() => alert('Health Wallet feature coming soon!')}
      />

      <FeatureCard
        iconName="file-text-outline"
        iconType="material-community"
        title="View Past Reports"
        subtitle="Access your previous analysis results"
        onPress={() => alert('Past Reports feature coming soon!')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 20,
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
});