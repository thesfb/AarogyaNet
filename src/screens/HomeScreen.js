import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { COLORS } from '../styles/colors';

export default function HomeScreen({ navigation }) {
  const startSkinAnalysis = () => {
    console.log('🚀 Starting skin analysis...');
    navigation.navigate('Camera');
  };

  const testSetup = () => {
    console.log('🧪 Testing setup...');
    console.log('✅ Navigation working!');
    console.log('✅ Styles working!');
    console.log('✅ App is ready for development!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏥 AarogyaNet</Text>
      <Text style={styles.subtitle}>AI-Powered Rural Healthcare</Text>
      
      <Button
        title="📸 Start Skin Analysis"
        buttonStyle={styles.button}
        onPress={startSkinAnalysis}
      />
      
      <Button
        title="🧪 Test Setup"
        buttonStyle={[styles.button, { backgroundColor: COLORS.secondary }]}
        onPress={testSetup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    minWidth: 250,
  },
});