import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for a focused view
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = () => {
    if (image) {
      console.log('🖼️ Analyzing image:', image);
      Alert.alert('Analysis Started', 'Your image is being analyzed. This may take a moment.');
      navigation.goBack();
    } else {
      Alert.alert('No Image Selected', 'Please select an image to analyze.');
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.content}>
        <Text style={globalStyles.title}>Upload for Analysis</Text>
        <Text style={globalStyles.subtitle}>Select a clear, well-lit image of the skin area.</Text>

        <TouchableOpacity onPress={pickImage} style={[globalStyles.card, styles.imagePicker]}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Icon name="upload-cloud" type="feather" size={50} color={COLORS.primary} />
              <Text style={styles.placeholderText}>Tap to select an image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Button
          title="Analyze Skin"
          onPress={analyzeImage}
          buttonStyle={globalStyles.buttonPrimary}
          titleStyle={globalStyles.buttonPrimaryTitle}
          disabled={!image}
          disabledStyle={{ backgroundColor: COLORS.border }}
        />
        
        {image && (
         <Button
            title="Choose a different image"
            type="clear"
            onPress={pickImage}
            titleStyle={styles.changeImageText}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePicker: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0, // Remove padding to let image fill the card
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16, // Match card's border radius
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 15,
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600'
  },
  changeImageText: {
    color: COLORS.primary,
    fontSize: 16,
    marginTop: 10,
  },
});