import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function PrivacySettingsScreen() {
  const { darkMode } = useAuthStore();
  const [dataSharing, setDataSharing] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [adPersonalization, setAdPersonalization] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.lightGray,
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
      color: darkMode ? colors.white : colors.primary,
      marginTop: 20,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    settingCard: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      borderRadius: 10,
      padding: 20,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: darkMode ? '#333' : colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    settingTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 5,
    },
    settingDescription: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.black,
      lineHeight: 20,
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
          <Text style={dynamicStyles.headerTitle}>SETTINGS</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <Text style={dynamicStyles.pageTitle}>Privacy Settings</Text>
          
          <View style={styles.illustrationContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
              style={styles.illustration}
            />
          </View>

          <View style={styles.settingsContainer}>
            <View style={dynamicStyles.settingCard}>
              <View style={styles.settingInfo}>
                <Text style={dynamicStyles.settingTitle}>Data Sharing</Text>
                <Text style={dynamicStyles.settingDescription}>Allow app usage data to improve features.</Text>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={dynamicStyles.settingCard}>
              <View style={styles.settingInfo}>
                <Text style={dynamicStyles.settingTitle}>Profile Visibility</Text>
                <Text style={dynamicStyles.settingDescription}>Show my profile in search result.</Text>
              </View>
              <Switch
                value={profileVisibility}
                onValueChange={setProfileVisibility}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={dynamicStyles.settingCard}>
              <View style={styles.settingInfo}>
                <Text style={dynamicStyles.settingTitle}>Location Tracking</Text>
                <Text style={dynamicStyles.settingDescription}>Allow location tracking for personal recommendation.</Text>
              </View>
              <Switch
                value={locationTracking}
                onValueChange={setLocationTracking}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={dynamicStyles.settingCard}>
              <View style={styles.settingInfo}>
                <Text style={dynamicStyles.settingTitle}>Ad Personalization</Text>
                <Text style={dynamicStyles.settingDescription}>Use my data to personalize ads.</Text>
              </View>
              <Switch
                value={adPersonalization}
                onValueChange={setAdPersonalization}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  illustration: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  settingsContainer: {
    paddingHorizontal: 20,
  },
  settingCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
});