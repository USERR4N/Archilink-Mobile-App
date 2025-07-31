import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Plus, CreditCard, Building, Smartphone } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function PaymentScreen() {
  const { darkMode } = useAuthStore();
  const [savedCards, setSavedCards] = useState([
    {
      id: '1',
      type: 'visa',
      lastFour: '4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'mastercard',
      lastFour: '8888',
      expiryDate: '08/26',
      isDefault: false
    }
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleAddCard = () => {
    router.push('/settings/add-card');
  };

  const handleAddBank = () => {
    router.push('/settings/add-bank');
  };

  const handleAddGCash = () => {
    router.push('/settings/add-gcash');
  };

  const handleAddPayPal = () => {
    router.push('/settings/add-paypal');
  };

  const handleAddMaya = () => {
    router.push('/settings/add-maya');
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png';
      case 'mastercard':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png';
      default:
        return null;
    }
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
    cardNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 4,
    },
    paymentOptionText: {
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      fontWeight: '500',
    },
    securityTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 8,
    },
    securityNotice: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      marginTop: 10,
      marginBottom: 20,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 10,
      marginHorizontal: 10,
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
          <Text style={dynamicStyles.headerTitle}>Payment Methods</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* Saved Cards Section */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Saved Cards</Text>
            
            {savedCards.map((card) => (
              <View key={card.id} style={styles.cardItem}>
                <View style={styles.cardInfo}>
                  <Image 
                    source={{ uri: getCardIcon(card.type) }} 
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.cardDetails}>
                    <Text style={dynamicStyles.cardNumber}>•••• •••• •••• {card.lastFour}</Text>
                    <Text style={styles.cardExpiry}>Expires {card.expiryDate}</Text>
                  </View>
                </View>
                {card.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Add Payment Methods */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Add Payment Method</Text>
            
            <TouchableOpacity style={styles.paymentOption} onPress={handleAddCard}>
              <View style={styles.paymentOptionLeft}>
                <View style={styles.paymentIconContainer}>
                  <CreditCard size={24} color={colors.primary} />
                </View>
                <Text style={dynamicStyles.paymentOptionText}>Add Credit/Debit Card</Text>
              </View>
              <Plus size={20} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentOption} onPress={handleAddBank}>
              <View style={styles.paymentOptionLeft}>
                <View style={styles.paymentIconContainer}>
                  <Building size={24} color={colors.primary} />
                </View>
                <Text style={dynamicStyles.paymentOptionText}>Add Bank Account</Text>
              </View>
              <Plus size={20} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentOption} onPress={handleAddGCash}>
              <View style={styles.paymentOptionLeft}>
                <View style={styles.gcashIcon}>
                  <Text style={styles.gcashText}>G</Text>
                </View>
                <Text style={dynamicStyles.paymentOptionText}>GCash</Text>
              </View>
              <Plus size={20} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentOption} onPress={handleAddPayPal}>
              <View style={styles.paymentOptionLeft}>
                <View style={styles.paypalIcon}>
                  <Text style={styles.paypalText}>P</Text>
                </View>
                <Text style={dynamicStyles.paymentOptionText}>PayPal</Text>
              </View>
              <Plus size={20} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentOption} onPress={handleAddMaya}>
              <View style={styles.paymentOptionLeft}>
                <View style={styles.mayaIcon}>
                  <Text style={styles.mayaText}>M</Text>
                </View>
                <Text style={dynamicStyles.paymentOptionText}>Maya</Text>
              </View>
              <Plus size={20} color={colors.gray} />
            </TouchableOpacity>
          </View>

          {/* Security Notice */}
          <View style={dynamicStyles.securityNotice}>
            <Text style={dynamicStyles.securityTitle}>🔒 Your payment information is secure</Text>
            <Text style={styles.securityText}>
              We use industry-standard encryption to protect your payment details. Your information is never stored on our servers.
            </Text>
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
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 40,
    height: 25,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: colors.gray,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  gcashIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007DFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  gcashText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  paypalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0070BA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  paypalText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mayaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00D4AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  mayaText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentOptionText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
  securityNotice: {
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
});