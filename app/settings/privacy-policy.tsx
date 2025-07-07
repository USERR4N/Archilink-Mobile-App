import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';

export default function PrivacyPolicyScreen() {
  const handleBack = () => {
    router.back();
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
          <Text style={styles.pageTitle}>Privacy Policy</Text>
          
          <View style={styles.policyContainer}>
            <Text style={styles.introText}>
              ArchiLink values your privacy. This policy outlines how we collect, use, and protect your data.
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Information We Collect</Text>
              <Text style={styles.bulletPoint}>
                • For Architects: Name, email, PRC license number, portfolio uploads, payment info.
              </Text>
              <Text style={styles.bulletPoint}>
                • For Clients: Name, email, project information, communication history.
              </Text>
              <Text style={styles.bulletPoint}>
                • Automatically collected data includes device info, IP address, and usage behavior.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
              <Text style={styles.bulletPoint}>
                • To match architects with relevant projects
              </Text>
              <Text style={styles.bulletPoint}>
                • To verify professional credentials
              </Text>
              <Text style={styles.bulletPoint}>
                • To process secure payments via escrow
              </Text>
              <Text style={styles.bulletPoint}>
                • To improve user experience through analytics and feedback
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Data Sharing</Text>
              <Text style={styles.bulletPoint}>
                • Your data is not sold or shared with third parties, except for:
              </Text>
              <Text style={styles.subBulletPoint}>
                ○ PRC verification with trusted sources
              </Text>
              <Text style={styles.subBulletPoint}>
                ○ Payment processing with secure third-party gateways
              </Text>
              <Text style={styles.subBulletPoint}>
                ○ Legal compliance if required by law
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Security</Text>
              <Text style={styles.bulletPoint}>
                • We use encryption, secure cloud hosting, and role-based access to protect your information.
              </Text>
              <Text style={styles.bulletPoint}>
                • Users are encouraged to use strong passwords and never share login credentials.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Your Rights</Text>
              <Text style={styles.bulletPoint}>
                • You may request access to, correction of, or deletion of your data at any time.
              </Text>
              <Text style={styles.bulletPoint}>
                • You may opt out of promotional messages via your account settings.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Cookies</Text>
              <Text style={styles.bulletPoint}>
                • ArchiLink may use cookies to personalize your experience and remember your preferences.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Retention</Text>
              <Text style={styles.bulletPoint}>
                • We retain your data as long as your account is active or as required by law or regulatory compliance.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Policy Updates</Text>
              <Text style={styles.bulletPoint}>
                • We may revise this policy as the platform evolves. Material changes will be communicated via email or in-app notifications.
              </Text>
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
  policyContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  introText: {
    fontSize: 16,
    color: colors.primary,
    fontStyle: 'italic',
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 8,
  },
  subBulletPoint: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 5,
    marginLeft: 15,
  },
});