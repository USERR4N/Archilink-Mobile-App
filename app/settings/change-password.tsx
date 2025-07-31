import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function ChangePasswordScreen() {
  const { darkMode } = useAuthStore();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ oldPassword?: string; newPassword?: string; confirmPassword?: string }>({});

  const handleBack = () => {
    router.back();
  };

  const handleSaveChanges = () => {
    const newErrors: any = {};
    
    if (!oldPassword) {
      newErrors.oldPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Handle password change
    console.log('Password change requested');
    Alert.alert('Success', 'Your password has been changed successfully');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };



  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.white,
    },
    header: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#333' : colors.lightGray,
    },
    headerTitle: {
      color: darkMode ? colors.white : colors.primary,
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 8,
    },
    pageSubtitle: {
      fontSize: 14,
      color: colors.gray,
      lineHeight: 20,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: darkMode ? '#333' : colors.lightGray,
      borderRadius: 8,
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      paddingHorizontal: 12,
      height: 48,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      paddingVertical: 0,
    },
    forgotPasswordText: {
      color: darkMode ? colors.white : colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={darkMode ? colors.white : colors.primary} />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>ARCHILINK</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={dynamicStyles.pageTitle}>Change Password</Text>
            <Text style={dynamicStyles.pageSubtitle}>Your password must be at least 8 characters and should include a combination of numbers, letters and special characters (!$@%).</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Current Password */}
            <View style={styles.inputGroup}>
              <Text style={dynamicStyles.inputLabel}>Current Password</Text>
              <View style={[dynamicStyles.inputContainer, errors.oldPassword && styles.inputError]}>
                <TextInput
                  style={dynamicStyles.textInput}
                  value={oldPassword}
                  onChangeText={(text) => {
                    setOldPassword(text);
                    setErrors({ ...errors, oldPassword: undefined });
                  }}
                  placeholder="Enter your current password"
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showOldPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowOldPassword(!showOldPassword)}
                  style={styles.eyeButton}
                >
                  {showOldPassword ? (
                    <EyeOff size={20} color={colors.gray} />
                  ) : (
                    <Eye size={20} color={colors.gray} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword}</Text>}
              
              <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordLink}>
                <Text style={dynamicStyles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* New Password */}
            <View style={styles.inputGroup}>
              <Text style={dynamicStyles.inputLabel}>New Password</Text>
              <View style={[dynamicStyles.inputContainer, errors.newPassword && styles.inputError]}>
                <TextInput
                  style={dynamicStyles.textInput}
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    setErrors({ ...errors, newPassword: undefined });
                  }}
                  placeholder="Enter your new password"
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeButton}
                >
                  {showNewPassword ? (
                    <EyeOff size={20} color={colors.gray} />
                  ) : (
                    <Eye size={20} color={colors.gray} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
            </View>

            {/* Confirm New Password */}
            <View style={styles.inputGroup}>
              <Text style={dynamicStyles.inputLabel}>Confirm New Password</Text>
              <View style={[dynamicStyles.inputContainer, errors.confirmPassword && styles.inputError]}>
                <TextInput
                  style={dynamicStyles.textInput}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  placeholder="Confirm your new password"
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color={colors.gray} />
                  ) : (
                    <Eye size={20} color={colors.gray} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    height: 48,
  },
  inputError: {
    borderColor: colors.primary,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    color: colors.primary,
    fontSize: 12,
    marginTop: 4,
  },
  forgotPasswordLink: {
    marginTop: 8,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});