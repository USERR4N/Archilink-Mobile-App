import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/colors';
import { ArrowLeft, ChevronRight, CreditCard } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { logout, darkMode: globalDarkMode, textSize: globalTextSize } = useAuthStore();
  
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [projectUpdates, setProjectUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(globalDarkMode);
  const [textSize, setTextSize] = useState<'Small' | 'Medium' | 'Large'>(globalTextSize);

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
      if (savedTextSize !== null && (savedTextSize === 'Small' || savedTextSize === 'Medium' || savedTextSize === 'Large')) {
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
    const sizes: ('Small' | 'Medium' | 'Large')[] = ['Small', 'Medium', 'Large'];
    const currentIndex = sizes.indexOf(textSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    const newSize = sizes[nextIndex];
    setTextSize(newSize);
    saveSettings('textSize', newSize);
    useAuthStore.getState().setTextSize(newSize);
    Alert.alert('Text Size Changed', `Text size set to ${newSize}`);
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    saveSettings('darkMode', value);
    useAuthStore.getState().setDarkMode(value);
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
    section: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.primary,
      marginBottom: 15,
    },
    settingText: {
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
    },
    settingTextWithIcon: {
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      marginLeft: 12,
    },
    settingValue: {
      fontSize: 16,
      color: darkMode ? '#ccc' : colors.gray,
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
          {/* Account Section */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
              <Text style={dynamicStyles.settingText}>Edit Profile</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
              <Text style={dynamicStyles.settingText}>Change Password</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handlePrivacySettings}>
              <Text style={dynamicStyles.settingText}>Privacy Settings</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handlePayment}>
              <View style={styles.settingItemLeft}>
                <CreditCard size={20} color={colors.primary} />
                <Text style={dynamicStyles.settingTextWithIcon}>Payment</Text>
              </View>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleSubscription}>
              <Text style={dynamicStyles.settingText}>Subscription</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Notifications Section */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Notifications</Text>
            
            <View style={styles.settingItem}>
              <Text style={dynamicStyles.settingText}>Push Notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={handlePushNotificationsToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={dynamicStyles.settingText}>Email Notifications</Text>
              <Switch
                value={emailNotifications}
                onValueChange={handleEmailNotificationsToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={dynamicStyles.settingText}>Project Updates</Text>
              <Switch
                value={projectUpdates}
                onValueChange={handleProjectUpdatesToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          </View>

          {/* Display Section */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Display</Text>
            
            <View style={styles.settingItem}>
              <Text style={dynamicStyles.settingText}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: colors.lightGray, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleTextSizeChange}>
              <Text style={dynamicStyles.settingText}>Text Size</Text>
              <Text style={dynamicStyles.settingValue}>{textSize}</Text>
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Support</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleHelpCenter}>
              <Text style={dynamicStyles.settingText}>Help Center</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleContactSupport}>
              <Text style={dynamicStyles.settingText}>Contact Support</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleTermsOfService}>
              <Text style={dynamicStyles.settingText}>Terms of Service</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handlePrivacyPolicy}>
              <Text style={dynamicStyles.settingText}>Privacy Policy</Text>
              <ChevronRight size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* App Section */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>App</Text>
            
            <View style={styles.settingItem}>
              <Text style={dynamicStyles.settingText}>Version</Text>
              <Text style={dynamicStyles.settingValue}>1.0.0</Text>
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