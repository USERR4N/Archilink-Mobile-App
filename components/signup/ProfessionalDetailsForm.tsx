import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import { UploadButton } from '@/components/UploadButton';
import { Dropdown } from '@/components/Dropdown';
import { useAuthStore } from '@/store/authStore';
import { specializations } from '@/constants/specializations';
import { colors } from '@/constants/colors';
import { validateRequired } from '@/utils/validation';

export const ProfessionalDetailsForm = () => {
  const signupForm = useAuthStore(state => state.signupForm);
  const updateSignupForm = useAuthStore(state => state.updateSignupForm);
  const setSignupStep = useAuthStore(state => state.setSignupStep);
  
  const [errors, setErrors] = useState<{
    licenseNumber?: string;
    licenseImage?: string;
    specialization?: string;
    yearsOfExperience?: string;
  }>({});

  const handleNext = () => {
    // Validate form
    const newErrors: any = {};
    
    if (!validateRequired(signupForm.licenseNumber || '')) {
      newErrors.licenseNumber = 'License number is required';
    }
    
    if (!signupForm.licenseImage) {
      newErrors.licenseImage = 'License image is required';
    }
    
    if (!signupForm.specialization) {
      newErrors.specialization = 'Specialization is required';
    }
    
    if (!validateRequired(signupForm.yearsOfExperience || '')) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Move to next step
    setSignupStep(3);
  };

  const handleBack = () => {
    setSignupStep(1);
  };

  const handleAccountTypeChange = (type: 'freelance' | 'firm') => {
    updateSignupForm({ accountType: type });
  };

  const handleUploadLicense = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        updateSignupForm({ licenseImage: result.assets[0].uri });
        setErrors({ ...errors, licenseImage: undefined });
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROFESSIONAL DETAILS</Text>
      
      <Text style={styles.label}>Account Type</Text>
      <View style={styles.checkboxContainer}>
        <CustomCheckbox
          label="Freelance Architect"
          checked={signupForm.accountType === 'freelance'}
          onToggle={() => handleAccountTypeChange('freelance')}
        />
        
        <CustomCheckbox
          label="Small Architecture Firm"
          checked={signupForm.accountType === 'firm'}
          onToggle={() => handleAccountTypeChange('firm')}
        />
      </View>
      
      <CustomInput
        label="PRC License Number"
        value={signupForm.licenseNumber || ''}
        onChangeText={(text) => {
          updateSignupForm({ licenseNumber: text });
          setErrors({ ...errors, licenseNumber: undefined });
        }}
        error={errors.licenseNumber}
        variant="login"
      />
      
      <View style={styles.uploadContainer}>
        <UploadButton
          title="Upload Image"
          onPress={handleUploadLicense}
        />
        {signupForm.licenseImage && (
          <Text style={styles.uploadedText}>License image uploaded</Text>
        )}
        {errors.licenseImage && (
          <Text style={styles.errorText}>{errors.licenseImage}</Text>
        )}
      </View>
      
      <Dropdown
        label="Specialization"
        options={specializations}
        selectedValue={signupForm.specialization || null}
        onSelect={(value) => {
          updateSignupForm({ specialization: value });
          setErrors({ ...errors, specialization: undefined });
        }}
      />
      {errors.specialization && (
        <Text style={styles.errorText}>{errors.specialization}</Text>
      )}
      
      <CustomInput
        label="Years of Experience"
        value={signupForm.yearsOfExperience || ''}
        onChangeText={(text) => {
          updateSignupForm({ yearsOfExperience: text });
          setErrors({ ...errors, yearsOfExperience: undefined });
        }}
        keyboardType="numeric"
        error={errors.yearsOfExperience}
        variant="login"
      />
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Back"
          onPress={handleBack}
          variant="outline"
          style={[styles.backButton, styles.customBackButton]}
        />
        
        <CustomButton
          title="Next"
          onPress={handleNext}
          style={[styles.nextButton, styles.customNextButton]}
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
    color: colors.black,
    marginBottom: 20,
  },
  label: {
    color: colors.black,
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadedText: {
    color: colors.black,
    fontSize: 14,
    marginTop: 5,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
  },
  customBackButton: {
    backgroundColor: 'transparent',
    borderColor: '#a42726',
    borderWidth: 3,
  },
  customNextButton: {
    backgroundColor: '#a42726',
  },
});