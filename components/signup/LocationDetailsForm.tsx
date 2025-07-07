import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import { Dropdown } from '@/components/Dropdown';
import { useAuthStore } from '@/store/authStore';
import { cities } from '@/constants/cities';
import { colors } from '@/constants/colors';

export const LocationDetailsForm = () => {
  const signupForm = useAuthStore(state => state.signupForm);
  const updateSignupForm = useAuthStore(state => state.updateSignupForm);
  const setSignupStep = useAuthStore(state => state.setSignupStep);
  const submitSignup = useAuthStore(state => state.submitSignup);
  
  const [workPreference, setWorkPreference] = useState<('remote' | 'onsite' | 'both')[]>(
    signupForm.workPreference || []
  );
  const [termsAgreed, setTermsAgreed] = useState(signupForm.termsAgreed || false);
  const [infoAccurate, setInfoAccurate] = useState(signupForm.infoAccurate || false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [errors, setErrors] = useState<{
    city?: string;
    workPreference?: string;
    terms?: string;
  }>({});

  const handleBack = () => {
    if (signupForm.userType === 'architect') {
      setSignupStep(3);
    } else {
      setSignupStep(1);
    }
  };

  const handleSubmit = async () => {
    // Validate form
    const newErrors: any = {};
    
    if (!signupForm.city && !signupForm.otherLocation) {
      newErrors.city = 'Please select a city or enter your location';
    }
    
    if (workPreference.length === 0) {
      newErrors.workPreference = 'Please select at least one work preference';
    }
    
    if (!termsAgreed || !infoAccurate) {
      newErrors.terms = 'You must agree to the terms and confirm your information';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Update form with final data
    updateSignupForm({
      workPreference,
      termsAgreed,
      infoAccurate,
    });
    
    setIsLoading(true);
    
    try {
      const success = await submitSignup();
      
      if (success) {
        // Navigate to the appropriate dashboard
        router.replace('/(tabs)');
      } else {
        // Handle signup failure
        console.error('Signup failed');
        setErrors({ terms: 'Signup failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrors({ terms: 'An error occurred during signup. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWorkPreference = (preference: 'remote' | 'onsite' | 'both') => {
    let newPreferences;
    
    if (workPreference.includes(preference)) {
      newPreferences = workPreference.filter(p => p !== preference);
    } else {
      newPreferences = [...workPreference, preference];
    }
    
    setWorkPreference(newPreferences);
    updateSignupForm({ workPreference: newPreferences });
    setErrors({ ...errors, workPreference: undefined });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOCATION DETAILS</Text>
      
      <Dropdown
        label="City / Province"
        options={cities}
        selectedValue={signupForm.city || null}
        onSelect={(value) => {
          updateSignupForm({ city: value });
          setErrors({ ...errors, city: undefined });
        }}
      />
      
      <CustomInput
        label="Others:"
        value={signupForm.otherLocation || ''}
        onChangeText={(text) => {
          updateSignupForm({ otherLocation: text });
          setErrors({ ...errors, city: undefined });
        }}
      />
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      
      <Text style={styles.label}>Willing to Work:</Text>
      <View style={styles.checkboxContainer}>
        <CustomCheckbox
          label="Remotely"
          checked={workPreference.includes('remote')}
          onToggle={() => toggleWorkPreference('remote')}
        />
        
        <CustomCheckbox
          label="On-site"
          checked={workPreference.includes('onsite')}
          onToggle={() => toggleWorkPreference('onsite')}
        />
        
        <CustomCheckbox
          label="Both"
          checked={workPreference.includes('both')}
          onToggle={() => toggleWorkPreference('both')}
        />
      </View>
      {errors.workPreference && (
        <Text style={styles.errorText}>{errors.workPreference}</Text>
      )}
      
      <Text style={styles.label}>Agreement</Text>
      <View style={styles.checkboxContainer}>
        <CustomCheckbox
          label="Terms & Conditions and Privacy Policy"
          checked={termsAgreed}
          onToggle={() => {
            setTermsAgreed(!termsAgreed);
            setErrors({ ...errors, terms: undefined });
          }}
        />
        
        <CustomCheckbox
          label="I confirm that the information provided is accurate"
          checked={infoAccurate}
          onToggle={() => {
            setInfoAccurate(!infoAccurate);
            setErrors({ ...errors, terms: undefined });
          }}
        />
      </View>
      {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Back"
          onPress={handleBack}
          variant="outline"
          style={styles.backButton}
          disabled={isLoading}
        />
        
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          style={styles.submitButton}
          loading={isLoading}
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
  label: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: '500',
  },
  checkboxContainer: {
    marginBottom: 15,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
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
  submitButton: {
    flex: 1,
    marginLeft: 10,
  },
});