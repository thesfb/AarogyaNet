import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera, CameraType } from 'expo-camera';

console.log('Camera:', Camera);
console.log('CameraType:', CameraType);


import { COLORS } from '../styles/colors';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState('back');


 // Updated import

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        console.log('📸 Photo taken:', photo.uri);
        Alert.alert('Success!', 'Photo captured! AI analysis coming soon...');
        
        // For now, just go back
        navigation.goBack();
        
      } catch (error) {
        console.error('Camera error:', error);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type} // Use the state variable instead of Constants
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.cameraOverlay}>
          <View style={styles.topOverlay}>
            <Text style={styles.instructionText}>
              📱 Position skin area in center and tap capture
            </Text>
          </View>
          
          <View style={styles.bottomOverlay}>
            <Button
              title="📸 Capture"
              onPress={takePicture}
              buttonStyle={styles.captureButton}
              titleStyle={styles.captureButtonText}
            />
            <Button
              title="🔄 Flip"
              onPress={() => {
                setType(type === 'back' ? 'front' : 'back');

              }}
              buttonStyle={[styles.captureButton, { backgroundColor: COLORS.secondary }]}
              titleStyle={styles.captureButtonText}
            />
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              buttonStyle={[styles.captureButton, { backgroundColor: COLORS.danger }]}
              titleStyle={styles.captureButtonText}
            />
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topOverlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    alignItems: 'center',
  },
  bottomOverlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  captureButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 5,
  },
  captureButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 30,
  },
});