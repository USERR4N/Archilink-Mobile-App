import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { CustomInput } from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { validateEmail } from '@/utils/validation';
import { Logo } from '@/components/Logo';

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top red section */}
        <View style={styles.topSection}>
          <Logo color="white" />
        </View>
        
        {/* White rounded form container */}
        <View style={styles.formSection}>
          <View style={styles.formContainer}>
            {!isSubmitted ? (
              <>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.description}>
                  Enter your email address and we'll send you instructions to reset your password.
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
                  variant="login"
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
                  We've sent password reset instructions to {email}. Please check your inbox.
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  formSection: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 30,
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