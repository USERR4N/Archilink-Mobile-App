import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { UploadButton } from '@/components/UploadButton';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/colors';

export const PortfolioForm = () => {
  const signupForm = useAuthStore(state => state.signupForm);
  const updateSignupForm = useAuthStore(state => state.updateSignupForm);
  const setSignupStep = useAuthStore(state => state.setSignupStep);
  
  const [portfolioImages, setPortfolioImages] = useState<string[]>(
    signupForm.portfolioImages || []
  );

  const handleNext = () => {
    // Update form with portfolio images
    updateSignupForm({ portfolioImages });
    
    // Move to next step
    setSignupStep(4);
  };

  const handleSkip = () => {
    // Skip to next step without requiring portfolio
    setSignupStep(4);
  };

  const handleBack = () => {
    setSignupStep(2);
  };

  const handleUploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        const newImages = [...portfolioImages, result.assets[0].uri];
        setPortfolioImages(newImages);
        updateSignupForm({ portfolioImages: newImages });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PORTFOLIO STARTER</Text>
      
      <Text style={styles.subtitle}>
        Upload Sample Work / Portfolio (PDF or Images)
      </Text>
      
      <UploadButton
        title="Upload Image"
        onPress={handleUploadImage}
      />
      
      {portfolioImages.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}
        >
          {portfolioImages.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={styles.portfolioImage}
            />
          ))}
        </ScrollView>
      )}
      
      <CustomInput
        label="Link to Online Portfolio (if any)"
        value={signupForm.portfolioLink || ''}
        onChangeText={(text) => updateSignupForm({ portfolioLink: text })}
      />
      
      <View style={styles.buttonContainer}>
        <View style={styles.mainButtonsRow}>
          <CustomButton
            title="Back"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
          />
          
          <CustomButton
            title="Next"
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
        
        <CustomButton
          title="Skip"
          onPress={handleSkip}
          variant="secondary"
          style={styles.skipButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
  },
  imagesContainer: {
    marginVertical: 20,
  },
  portfolioImage: {
    width: 120,
    height: 120,
    marginRight: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
  },
  buttonContainer: {
    marginTop: 30,
  },
  mainButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  backButton: {
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
  },
  skipButton: {
    width: '100%',
  },
});