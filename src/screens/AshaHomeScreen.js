import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

// Dummy Data for demonstration
const stats = [
  { title: 'High-Risk Patients', value: '12', icon: 'trending-up', color: COLORS.danger },
  { title: 'Visits Today', value: '4 / 10', icon: 'check-circle', color: COLORS.success },
  { title: 'Reported Cases', value: '8', icon: 'alert-triangle', color: COLORS.warning },
];

const assignments = [
  { id: 1, name: 'Anjali Sharma', area: 'Sector 5, HSR Layout', reason: 'Suspicious Rash Report' },
  { id: 2, name: 'Ravi Kumar', area: 'Koramangala 3rd Block', reason: 'Follow-up Required' },
  { id: 3, name: 'Priya Patel', area: 'Bellandur Village', reason: 'Routine Check-up' },
];

const StatCard = ({ title, value, icon, color }) => (
  <View style={[globalStyles.card, styles.statCard]}>
    <Icon name={icon} type="feather" size={24} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

export default function AshaHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={globalStyles.title}>ASHA Worker Dashboard</Text>
          <Text style={globalStyles.subtitle}>Your overview for today.</Text>
        </View>

        {/* Statistical Overview */}
        <View style={styles.statsContainer}>
          {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
        </View>

        {/* Assignment Board */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Assignments</Text>
          {assignments.map(item => (
            <TouchableOpacity key={item.id} style={[globalStyles.card, styles.assignmentCard]}>
              <View>
                <Text style={styles.assignmentName}>{item.name}</Text>
                <Text style={styles.assignmentArea}>{item.area}</Text>
                <Text style={styles.assignmentReason}>{item.reason}</Text>
              </View>
              <Icon name="chevron-right" type="material-community" size={24} color={COLORS.textLight} />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Map View Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disease Outbreak Map</Text>
          <View style={[globalStyles.card, styles.mapPlaceholder]}>
            <Icon name="map" type="feather" size={40} color={COLORS.primary} />
            <Text style={styles.mapText}>Map View Coming Soon</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20 },
  section: { paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 15 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statCard: { flex: 1, alignItems: 'center', marginHorizontal: 5, padding: 15 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginVertical: 5 },
  statTitle: { fontSize: 12, color: COLORS.textSecondary, textAlign: 'center' },
  assignmentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  assignmentName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  assignmentArea: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  assignmentReason: { fontSize: 14, color: COLORS.primary, marginTop: 4, fontWeight: '500' },
  mapPlaceholder: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F5FF', // Light blue background
  },
  mapText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
});