import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Phone, MessageSquare } from 'lucide-react-native';

export default function ContactSupportScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleCallUs = () => {
    console.log('Calling support...');
  };

  const handleChatWithUs = () => {
    console.log('Starting chat...');
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
          <Text style={styles.pageTitle}>Contact Support</Text>
          
          <View style={styles.contactSection}>
            <View style={styles.contactOption}>
              <View style={styles.iconContainer}>
                <Phone size={32} color={colors.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Call Us</Text>
                <Text style={styles.phoneNumber}>+63 912 345 6789</Text>
                <Text style={styles.availability}>Available daily from 8:00 AM to 8:00 PM</Text>
              </View>
            </View>

            <View style={styles.contactOption}>
              <View style={styles.iconContainer}>
                <MessageSquare size={32} color={colors.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Chat with Us</Text>
                <Text style={styles.phoneNumber}>+63 912 345 6789</Text>
                <Text style={styles.availability}>
                  Connect with a real Customer Care Specialist available daily from 8:00 AM to 8:00 PM
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.illustrationContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
              style={styles.illustration}
            />
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>24/7</Text>
              </View>
              <View style={[styles.badge, styles.emailBadge]}>
                <Text style={styles.badgeText}>📧</Text>
              </View>
              <View style={[styles.badge, styles.phoneBadge]}>
                <Text style={styles.badgeText}>📞</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCallUs}>
              <Phone size={20} color={colors.white} />
              <Text style={styles.actionButtonText}>Call Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.chatButton]} onPress={handleChatWithUs}>
              <MessageSquare size={20} color={colors.primary} />
              <Text style={[styles.actionButtonText, styles.chatButtonText]}>Start Chat</Text>
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
    marginBottom: 30,
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  contactOption: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  availability: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  illustration: {
    width: 250,
    height: 200,
    borderRadius: 15,
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    right: 50,
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  emailBadge: {
    backgroundColor: '#4CAF50',
  },
  phoneBadge: {
    backgroundColor: '#2196F3',
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  chatButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatButtonText: {
    color: colors.primary,
  },
});