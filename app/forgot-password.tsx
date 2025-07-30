import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { CityBackground } from '@/components/CityBackground';
import { FormContainer } from '@/components/FormContainer';
import { CustomInput } from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { validateEmail } from '@/utils/validation';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <CityBackground>
      <FormContainer>
        {!isSubmitted ? (
          <>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.description}>
              Enter your email address and we&apos;ll send you instructions to reset your password.
            </Text>

            <CustomInput
              label="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(undefined);
              }}
              error={error}
              keyboardType="email-address"
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Send Reset Link"
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.submitButton}
              />
              
              <CustomButton
                title="Back to Login"
                onPress={handleBackToLogin}
                variant="outline"
                style={styles.backButton}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Check Your Email</Text>
            <Text style={styles.description}>
              We&apos;ve sent password reset instructions to {email}. Please check your inbox.
            </Text>

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Back to Login"
                onPress={handleBackToLogin}
                style={styles.submitButton}
              />
            </View>
          </>
        )}
      </FormContainer>
    </CityBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    width: '100%',
    marginBottom: 10,
  },
  backButton: {
    width: '100%',
  },
});