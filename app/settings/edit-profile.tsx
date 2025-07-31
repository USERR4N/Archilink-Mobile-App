import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { ProfileInput } from '@/components/ProfileInput';
import { useAuthStore } from '@/store/authStore';

export default function EditProfileScreen() {
  const { user, darkMode } = useAuthStore();
  const isArchitect = user?.userType === 'architect';
  
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [jobTitle, setJobTitle] = useState(isArchitect ? (user as any)?.specialization || '' : 'Client');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.mobileNumber || '');
  const [location, setLocation] = useState(user?.city || user?.location || '');

  const handleBack = () => {
    router.back();
  };

  const handleProfileImagePress = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully');
    router.back();
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
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderBottomColor: darkMode ? '#333' : '#E5E5EA',
    },
    headerTitle: {
      color: darkMode ? colors.white : colors.primary,
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    saveButtonText: {
      color: darkMode ? colors.white : colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
    changePhotoText: {
      color: darkMode ? colors.white : colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={dynamicStyles.container}>
        {/* Header */}
        <View style={dynamicStyles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={darkMode ? colors.white : colors.primary} />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>ARCHILINK</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={dynamicStyles.saveButtonText}>Done</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={dynamicStyles.pageTitle}>Edit Profile</Text>
          
          {/* Profile Picture Section */}
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={handleProfileImagePress} style={styles.profileImageContainer}>
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
              <View style={styles.cameraOverlay}>
                <Camera size={20} color={colors.white} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfileImagePress}>
              <Text style={dynamicStyles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <ProfileInput
              label="Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
            />

            <ProfileInput
              label="Job Title"
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholder={isArchitect ? "Enter your specialization" : "Client"}
            />

            <ProfileInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <ProfileInput
              label="Phone"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />

            <ProfileInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your location"
            />
          </View>

          {/* Delete Account */}
          <View style={styles.dangerZone}>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  'Delete Account',
                  'Are you sure you want to delete your account? This action cannot be undone.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete account') }
                  ]
                );
              }}
            >
              <Text style={styles.deleteButtonText}>Delete Account</Text>
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
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
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
  saveButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  saveButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.lightGray,
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  changePhotoText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  dangerZone: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  deleteButton: {
    backgroundColor: colors.error,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});