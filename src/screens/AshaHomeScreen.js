import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

// --- IMPORTANT: Use ngrok or your local IP ---
const API_URL = 'https://unravaged-kristan-unconventionally.ngrok-free.dev'; 

// --- DUMMY DATA ---
// In a real app, this data would come from your backend.
const nextAssignment = { 
  id: 1, 
  name: 'Anjali Sharma', 
  area: '123, Sector 5, HSR Layout', 
  reason: 'High-Risk Follow-up (Rash)',
  time: '11:30 AM',
};

const dailyBriefing = {
  visitsCompleted: 4,
  visitsTotal: 10,
  newReports: 3,
};

const highPriorityAlerts = [
    { id: 1, name: 'Ravi Kumar', reason: 'Reported severe symptoms', area: 'Koramangala' },
    { id: 2, name: 'Geeta Singh', reason: 'Missed scheduled check-in', area: 'Bellandur' },
];

const pincodeLocations = {
    '560001': { latitude: 12.9716, longitude: 77.5946, name: "Bengaluru GPO" },
    '560034': { latitude: 12.9279, longitude: 77.6271, name: "Koramangala" },
    '560076': { latitude: 12.8647, longitude: 77.6633, name: "Electronic City" },
};

export default function AshaHomeScreen({ navigation }) {
    const [mapData, setMapData] = useState(null);
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await fetch(`${API_URL}/maps/outbreaks`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setMapData(data);
            } catch (error) {
                console.error("Failed to fetch map data:", error);
            } finally {
                setIsLoadingMap(false);
            }
        };
        fetchMapData();
    }, []);

    const renderOutbreakMarkers = () => {
      if (!mapData) return null;
      return Object.entries(mapData).map(([pincode, data]) => {
          const location = pincodeLocations[pincode];
          if (!location) return null;
          const radius = Math.min(500 + (data.totalCases * 150), 3000);
          return (
              <React.Fragment key={pincode}>
                  <Circle center={location} radius={radius} fillColor="rgba(255, 59, 48, 0.25)" strokeColor="rgba(255, 59, 48, 0.5)" strokeWidth={1} />
                  <Marker coordinate={location} title={`${location.name} (${pincode})`} description={`Total Cases: ${data.totalCases}`}>
                      <View style={styles.marker}><Text style={styles.markerText}>{data.totalCases}</Text></View>
                  </Marker>
              </React.Fragment>
          );
      });
  };
  
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Good Morning,</Text>
                  <Text style={styles.headerSubtitle}>Here is your summary for today.</Text>
                </View>

                {/* --- Next Visit Card --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Next Home Visit</Text>
                    <TouchableOpacity style={[globalStyles.card, styles.nextVisitCard]}>
                        <View style={styles.nextVisitHeader}>
                            <Icon name="map-pin" type="feather" size={20} color={COLORS.surface} />
                            <Text style={styles.nextVisitTime}>{nextAssignment.time}</Text>
                        </View>
                        <Text style={styles.nextVisitName}>{nextAssignment.name}</Text>
                        <Text style={styles.nextVisitArea}>{nextAssignment.area}</Text>
                        <View style={styles.reasonTag}>
                            <Text style={styles.reasonTagText}>{nextAssignment.reason}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* --- Daily Briefing --- */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Daily Briefing</Text>
                  <View style={styles.briefingContainer}>
                      <View style={[globalStyles.card, styles.briefingCard]}>
                          <Text style={styles.briefingValue}>{`${dailyBriefing.visitsCompleted}/${dailyBriefing.visitsTotal}`}</Text>
                          <Text style={styles.briefingLabel}>Visits Completed</Text>
                      </View>
                       <View style={[globalStyles.card, styles.briefingCard]}>
                          <Text style={styles.briefingValue}>{dailyBriefing.newReports}</Text>
                          <Text style={styles.briefingLabel}>New Reports</Text>
                      </View>
                  </View>
                </View>

                {/* High-Priority Alerts */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>High-Priority Alerts</Text>
                    {highPriorityAlerts.map(item => (
                        <TouchableOpacity key={item.id} style={[globalStyles.card, styles.alertCard]}>
                            <Icon name="alert-triangle" type="feather" color={COLORS.danger} size={24}/>
                            <View style={styles.alertTextContainer}>
                                <Text style={styles.alertName}>{item.name} - {item.area}</Text>
                                <Text style={styles.alertReason}>{item.reason}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                
                {/* Map View */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Disease Outbreak Map</Text>
                    <View style={[globalStyles.card, styles.mapContainer]}>
                        {isLoadingMap 
                            ? <ActivityIndicator size="large" color={COLORS.primary}/> 
                            : <MapView style={styles.map} initialRegion={{ latitude: 12.9716, longitude: 77.5946, latitudeDelta: 0.4, longitudeDelta: 0.4 }}>
                                {renderOutbreakMarkers()}
                              </MapView>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { padding: 20, paddingBottom: 10 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.text },
    headerSubtitle: { fontSize: 16, color: COLORS.textSecondary, marginTop: 4 },
    section: { paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 15 },
    
    // Next Visit Card
    nextVisitCard: { backgroundColor: COLORS.primary, elevation: 5 },
    nextVisitHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    nextVisitTime: { color: COLORS.surface, fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
    nextVisitName: { color: COLORS.surface, fontSize: 22, fontWeight: 'bold' },
    nextVisitArea: { color: COLORS.surface, fontSize: 16, opacity: 0.9, marginTop: 4 },
    reasonTag: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginTop: 15 },
    reasonTagText: { color: COLORS.surface, fontWeight: 'bold' },

    // Briefing
    briefingContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    briefingCard: { flex: 1, marginHorizontal: 5, alignItems: 'center' },
    briefingValue: { fontSize: 26, fontWeight: 'bold', color: COLORS.primary },
    briefingLabel: { fontSize: 14, color: COLORS.textSecondary, marginTop: 5 },

    // Alerts
    alertCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB' },
    alertTextContainer: { flex: 1, marginLeft: 15 },
    alertName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    alertReason: { fontSize: 14, color: COLORS.warning, marginTop: 2 },

    // Map
    mapContainer: { height: 350, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
    map: { ...StyleSheet.absoluteFillObject },
    marker: { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.danger, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 2 },
    markerText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
});