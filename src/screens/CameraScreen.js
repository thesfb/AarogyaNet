import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';

// --- IMPORTANT ---
// Replace this with your ngrok URL or your computer's local IP address.
const API_BASE_URL = 'https://unravaged-kristan-unconventionally.ngrok-free.dev'; 
const API_URL = `${API_BASE_URL}/analyze/skin`;

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [pincode, setPincode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const pickImage = async () => {
    setAnalysisResult(null); // Clear previous results
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    if (!image || !pincode || pincode.length !== 6) {
      Alert.alert('Missing Information', 'Please select an image and enter a valid 6-digit pincode.');
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'skin_image.jpg',
      type: 'image/jpeg',
    });
    formData.append('pincode', pincode);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || 'Something went wrong during analysis');
      }
      
      console.log('Analysis Result:', result);
      setAnalysisResult(result);

    } catch (error) {
      console.error("Analysis Error:", error);
      Alert.alert('Analysis Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (isLoading) {
      return (
        <View style={styles.resultContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.resultText}>Analyzing... Please wait.</Text>
        </View>
      );
    }

    if (analysisResult) {
      const topPrediction = analysisResult.reduce((prev, current) => 
        (prev.score > current.score) ? prev : current
      );

      return (
        <View style={[globalStyles.card, styles.resultContainer]}>
          <Text style={styles.resultTitle}>Analysis Complete</Text>
          <Text style={styles.resultLabel}>Preliminary Result:</Text>
          <Text style={styles.resultPrediction}>{topPrediction.label}</Text>
          <Text style={styles.resultScore}>
            Confidence: {Math.round(topPrediction.score * 100)}%
          </Text>
          <Button
            title="Ask More About This"
            icon={<Icon name="message-circle" type="feather" color={COLORS.primary} size={18} />}
            type="outline"
            buttonStyle={{ marginTop: 20, borderColor: COLORS.primary, borderRadius: 10 }}
            titleStyle={{ color: COLORS.primary, marginLeft: 5 }}
            onPress={() => navigation.navigate('Chat', { diagnosis: topPrediction.label })}
          />
        </View>
      );
    }

    return null;
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

        <TextInput
          style={styles.input}
          placeholder="Enter your 6-digit Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          maxLength={6}
        />
        
        {!analysisResult && (
          <Button
            title={isLoading ? 'Analyzing...' : 'Analyze Skin'}
            onPress={analyzeImage}
            buttonStyle={globalStyles.buttonPrimary}
            titleStyle={globalStyles.buttonPrimaryTitle}
            disabled={!image || isLoading}
            disabledStyle={{ backgroundColor: COLORS.border }}
          />
        )}
        
        {renderResult()}

        {(image && !isLoading) && (
         <Button
            title="Pick a new image"
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
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagePicker: { width: 280, height: 280, justifyContent: 'center', alignItems: 'center', padding: 0, marginBottom: 20 },
  image: { width: '100%', height: '100%', borderRadius: 16 },
  placeholder: { justifyContent: 'center', alignItems: 'center' },
  placeholderText: { marginTop: 15, color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  input: { backgroundColor: COLORS.surface, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: COLORS.border, width: '90%', textAlign: 'center', marginBottom: 10 },
  changeImageText: { color: COLORS.primary, fontSize: 16, marginTop: 10 },
  resultContainer: { width: '90%', padding: 20, alignItems: 'center', marginTop: 20 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 15 },
  resultText: { fontSize: 16, color: COLORS.textSecondary, marginTop: 10 },
  resultLabel: { fontSize: 16, color: COLORS.textSecondary },
  resultPrediction: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginVertical: 5 },
  resultScore: { fontSize: 16, color: COLORS.textSecondary, marginTop: 5 },
});