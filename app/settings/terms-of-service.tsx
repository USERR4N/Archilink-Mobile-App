import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';

export default function TermsOfServiceScreen() {
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
          <Text style={styles.pageTitle}>Terms of Service</Text>
          
          <View style={styles.termsContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. User Eligibility</Text>
              <Text style={styles.bulletPoint}>
                • Architects must be licensed by the Professional Regulation Commission (PRC) of the Philippines.
              </Text>
              <Text style={styles.bulletPoint}>
                • Clients must be at least 18 years old and legally capable of entering into contracts.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Account and Verification</Text>
              <Text style={styles.bulletPoint}>
                • All architects are required to complete PRC license verification before applying for projects.
              </Text>
              <Text style={styles.bulletPoint}>
                • You are responsible for maintaining the confidentiality of your login credentials.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Platform Usage</Text>
              <Text style={styles.bulletPoint}>
                • Clients may post projects, review architect profiles, and hire through the platform.
              </Text>
              <Text style={styles.bulletPoint}>
                • Architects may build portfolios, apply for projects, and communicate with clients via in-app tools.
              </Text>
              <Text style={styles.bulletPoint}>
                • All users must engage respectfully and professionally.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Payments and Escrow</Text>
              <Text style={styles.bulletPoint}>
                • ArchiLink uses an escrow system to protect both parties. Clients fund projects in advance, and funds are released after milestone approval.
              </Text>
              <Text style={styles.bulletPoint}>
                • A small platform fee may apply to transactions to support operations and security.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Cancellations and Disputes</Text>
              <Text style={styles.bulletPoint}>
                • Users may cancel projects or applications under reasonable conditions. Disputes will be handled by ArchiLink's support team.
              </Text>
              <Text style={styles.bulletPoint}>
                • Repeat cancellations or abusive behavior may result in suspension.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Prohibited Activities</Text>
              <Text style={styles.bulletPoint}>
                • Misrepresentation of identity, uploading fake credentials, or circumventing the platform's features is strictly prohibited.
              </Text>
              <Text style={styles.bulletPoint}>
                • Spam, harassment, and unauthorized use of copyrighted materials will not be tolerated.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
              <Text style={styles.bulletPoint}>
                • All content submitted by users (e.g., portfolios, project briefs) remains their property, but ArchiLink may use them for promotional or educational purposes with credit.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Termination</Text>
              <Text style={styles.bulletPoint}>
                • ArchiLink reserves the right to suspend or terminate accounts that violate these Terms of Service without prior notice.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
              <Text style={styles.bulletPoint}>
                • ArchiLink may update these terms from time to time. Continued use of the platform implies agreement to the latest version.
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
  termsContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
});