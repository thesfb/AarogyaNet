import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../styles/colors';

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = () => {
    if (image) {
      console.log('🖼️ Analyzing image:', image);
      Alert.alert('Analysis Started', 'Your image is being analyzed by our AI. This may take a moment.');
      // Here you would typically send the image to your analysis service
      // For now, we'll just navigate back
      navigation.goBack();
    } else {
      Alert.alert('No Image Selected', 'Please select an image to analyze.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Skin Image</Text>
      <Text style={styles.subHeader}>Select a clear image from your gallery for the most accurate analysis.</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="photo" size={50} color={COLORS.primary} />
            <Text style={styles.placeholderText}>Tap to select an image</Text>
          </View>
        )}
      </TouchableOpacity>

      {image && (
         <Button
            title="🔄 Choose a different image"
            type="clear"
            onPress={pickImage}
            titleStyle={styles.changeImageText}
          />
      )}

      <Button
        title="🔍 Analyze Skin"
        onPress={analyzeImage}
        buttonStyle={styles.analyzeButton}
        titleStyle={styles.analyzeButtonText}
        disabled={!image}
      />
       <Button
        title="Cancel"
        type="outline"
        onPress={() => navigation.goBack()}
        buttonStyle={styles.cancelButton}
        titleStyle={styles.cancelButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: '90%',
  },
  imagePicker: {
    width: 300,
    height: 300,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: COLORS.primary,
    fontSize: 16,
  },
  analyzeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: 300,
  },
  analyzeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeImageText: {
      color: COLORS.primary,
      fontSize: 16,
      textDecorationLine: 'underline'
  },
  cancelButton: {
      width: 300,
      borderRadius: 12,
      paddingVertical: 15,
      borderColor: COLORS.danger,
  },
  cancelButtonText: {
      color: COLORS.danger
  }
});