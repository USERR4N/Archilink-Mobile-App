import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/colors';
import { ArrowLeft, ChevronRight, CreditCard } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const logout = useAuthStore(state => state.logout);
  
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [projectUpdates, setProjectUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('Medium');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      const savedTextSize = await AsyncStorage.getItem('textSize');
      const savedPushNotifications = await AsyncStorage.getItem('pushNotifications');
      const savedEmailNotifications = await AsyncStorage.getItem('emailNotifications');
      const savedProjectUpdates = await AsyncStorage.getItem('projectUpdates');
      
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
      if (savedTextSize !== null) {
        setTextSize(savedTextSize);
      }
      if (savedPushNotifications !== null) {
        setPushNotifications(JSON.parse(savedPushNotifications));
      }
      if (savedEmailNotifications !== null) {
        setEmailNotifications(JSON.parse(savedEmailNotifications));
      }
      if (savedProjectUpdates !== null) {
        setProjectUpdates(JSON.parse(savedProjectUpdates));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveSettings = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleEditProfile = () => {
    router.push('/settings/edit-profile');
  };

  const handleChangePassword = () => {
    router.push('/settings/change-password');
  };

  const handlePrivacySettings = () => {
    router.push('/settings/privacy');
  };

  const handleSubscription = () => {
    router.push('/settings/subscription');
  };

  const handlePayment = () => {
    router.push('/settings/payment');
  };

  const handleHelpCenter = () => {
    router.push('/settings/help-center');
  };

  const handleContactSupport = () => {
    router.push('/settings/contact-support');
  };

  const handleTermsOfService = () => {
    router.push('/settings/terms-of-service');
  };

  const handlePrivacyPolicy = () => {
    router.push('/settings/privacy-policy');
  };

  const handleTextSizeChange = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const currentIndex = sizes.indexOf(textSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    const newSize = sizes[nextIndex];
    setTextSize(newSize);
    saveSettings('textSize', newSize);
    Alert.alert('Text Size Changed', `Text size set to ${newSize}`);
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    saveSettings('darkMode', value);
    Alert.alert('Dark Mode', value ? 'Dark mode enabled' : 'Dark mode disabled');
  };

  const handlePushNotificationsToggle = (value: boolean) => {
    setPushNotifications(value);
    saveSettings('pushNotifications', value);
  };

  const handleEmailNotificationsToggle = (value: boolean) => {
    setEmailNotifications(value);
    saveSettings('emailNotifications', value);
  };

  const handleProjectUpdatesToggle = (value: boolean) => {
    setProjectUpdates(value);
    saveSettings('projectUpdates', value);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SETTINGS</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
              <Text style={styles.settingText}>Edit Profile</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
              <Text style={styles.settingText}>Change Password</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handlePrivacySettings}>
              <Text style={styles.settingText}>Privacy Settings</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handlePayment}>
              <View style={styles.settingItemLeft}>
                <CreditCard size={20} color={colors.primary} />
                <Text style={styles.settingTextWithIcon}>Payment</Text>
              </View>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleSubscription}>
              <Text style={styles.settingText}>Subscription</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Push Notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={handlePushNotificationsToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Email Notifications</Text>
              <Switch
                value={emailNotifications}
                onValueChange={handleEmailNotificationsToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Project Updates</Text>
              <Switch
                value={projectUpdates}
                onValueChange={handleProjectUpdatesToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>

          {/* Display Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Display</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleTextSizeChange}>
              <Text style={styles.settingText}>Text Size</Text>
              <Text style={styles.settingValue}>{textSize}</Text>
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleHelpCenter}>
              <Text style={styles.settingText}>Help Center</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleContactSupport}>
              <Text style={styles.settingText}>Contact Support</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleTermsOfService}>
              <Text style={styles.settingText}>Terms of Service</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handlePrivacyPolicy}>
              <Text style={styles.settingText}>Privacy Policy</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* App Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Version</Text>
              <Text style={styles.settingValue}>1.0.0</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
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
  section: {
    backgroundColor: colors.white,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: colors.black,
  },
  settingTextWithIcon: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 16,
    color: colors.gray,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});