import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '@/constants/colors';
import { Logo } from './Logo';

interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
}

export const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Logo color="white" />
          <View style={styles.formContainer}>
            {children}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
});