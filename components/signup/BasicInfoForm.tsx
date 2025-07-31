import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { CustomInput } from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import { UserTypeSelector } from '@/components/UserTypeSelector';
import { useAuthStore } from '@/store/authStore';
import { 
  validateEmail, 
  validatePassword, 
  validateMobileNumber, 
  validatePasswordMatch,
  validateRequired
} from '@/utils/validation';
import { colors } from '@/constants/colors';

export const BasicInfoForm = () => {
  const signupForm = useAuthStore(state => state.signupForm);
  const updateSignupForm = useAuthStore(state => state.updateSignupForm);
  const setSignupStep = useAuthStore(state => state.setSignupStep);
  const submitSignup = useAuthStore(state => state.submitSignup);
  
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
    userType?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    // Validate form
    const newErrors: any = {};
    
    if (!validateRequired(signupForm.fullName)) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!validateEmail(signupForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!validateMobileNumber(signupForm.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }
    
    if (!validatePassword(signupForm.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    }
    
    if (!validatePasswordMatch(signupForm.password, signupForm.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!signupForm.userType) {
      newErrors.userType = 'Please select a user type';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If client user, submit directly and go to dashboard
    if (signupForm.userType === 'client') {
      setIsLoading(true);
      try {
        const success = await submitSignup();
        if (success) {
          router.replace('/(tabs)');
        } else {
          setErrors({ email: 'Failed to create account. Please try again.' });
        }
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ email: 'An error occurred during signup. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      // If architect user, go to next step (Professional Details)
      setSignupStep(2);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleUserTypeSelect = (type: 'client' | 'architect') => {
    updateSignupForm({ userType: type });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BASIC INFORMATION</Text>
      
      <CustomInput
        label="Full Name"
        value={signupForm.fullName || ''}
        onChangeText={(text) => {
          updateSignupForm({ fullName: text });
          setErrors({ ...errors, fullName: undefined });
        }}
        error={errors.fullName}
        variant="login"
      />
      
      <CustomInput
        label="Email Address"
        value={signupForm.email || ''}
        onChangeText={(text) => {
          updateSignupForm({ email: text });
          setErrors({ ...errors, email: undefined });
        }}
        error={errors.email}
        keyboardType="email-address"
        variant="login"
      />
      
      <CustomInput
        label="Mobile Number"
        value={signupForm.mobileNumber || ''}
        onChangeText={(text) => {
          updateSignupForm({ mobileNumber: text });
          setErrors({ ...errors, mobileNumber: undefined });
        }}
        error={errors.mobileNumber}
        keyboardType="phone-pad"
        variant="login"
      />
      
      <CustomInput
        label="Password"
        value={signupForm.password || ''}
        onChangeText={(text) => {
          updateSignupForm({ password: text });
          setErrors({ ...errors, password: undefined });
        }}
        secureTextEntry
        error={errors.password}
        variant="login"
      />
      
      <CustomInput
        label="Confirm Password"
        value={signupForm.confirmPassword || ''}
        onChangeText={(text) => {
          updateSignupForm({ confirmPassword: text });
          setErrors({ ...errors, confirmPassword: undefined });
        }}
        secureTextEntry
        error={errors.confirmPassword}
        variant="login"
      />
      
      <UserTypeSelector
        selectedType={signupForm.userType || null}
        onSelect={handleUserTypeSelect}
        variant="signup"
      />
      {errors.userType && <Text style={styles.errorText}>{errors.userType}</Text>}
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Back"
          onPress={handleBack}
          variant="outline"
          style={styles.backButton}
        />
        
        <CustomButton
          title={signupForm.userType === 'client' ? 'Submit' : 'Next'}
          onPress={handleNext}
          loading={isLoading}
          style={styles.nextButton}
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
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -10,
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
  nextButton: {
    flex: 1,
    marginLeft: 10,
  },
});