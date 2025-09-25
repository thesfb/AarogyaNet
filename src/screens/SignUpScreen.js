import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen'); // Default role
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email and password.');
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a document in Firestore to store user role and other info
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: new Date(),
      });
      console.log('User account created & signed in!');
      // The main App navigator will handle directing to the correct dashboard
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.content}>
        <Text style={globalStyles.title}>Create Account</Text>
        <Text style={globalStyles.subtitle}>Join AarogyaNet today.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.roleTitle}>Select your role:</Text>
        <View style={styles.roleSelector}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'citizen' && styles.roleButtonSelected]}
            onPress={() => setRole('citizen')}>
            <Text style={[styles.roleText, role === 'citizen' && styles.roleTextSelected]}>Citizen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === 'health_worker' && styles.roleButtonSelected]}
            onPress={() => setRole('health_worker')}>
            <Text style={[styles.roleText, role === 'health_worker' && styles.roleTextSelected]}>Healthcare Worker</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Sign Up"
          onPress={handleSignUp}
          buttonStyle={globalStyles.buttonPrimary}
          titleStyle={globalStyles.buttonPrimaryTitle}
          loading={isLoading}
        />
        <Button
          title="Already have an account? Login"
          type="clear"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleTitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 10,
    alignSelf: 'center',
  },
  roleSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    overflow: 'hidden',
  },
  roleButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  roleButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  roleText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  roleTextSelected: {
    color: '#FFF',
  },
});