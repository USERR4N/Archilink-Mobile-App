import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft, CreditCard, Shield, DollarSign, Lock, CheckCircle } from 'lucide-react-native';

export default function PaymentScreen() {
  const { type, id } = useLocalSearchParams();
  const { darkMode } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isEscrow = type === 'escrow';

  const handleBack = () => {
    router.back();
  };

  const handlePayment = async () => {
    if (!amount || !selectedCard) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
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
    content: {
      flex: 1,
      padding: 20,
    },
    card: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.primary,
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: darkMode ? '#ccc' : colors.gray,
      textAlign: 'center',
      marginBottom: 30,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 8,
    },
    input: {
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      borderRadius: 10,
      padding: 15,
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      marginBottom: 20,
    },
    cardSelector: {
      marginBottom: 20,
    },
    cardOption: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedCard: {
      borderColor: colors.primary,
    },
    cardIcon: {
      marginRight: 15,
    },
    cardText: {
      flex: 1,
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
    },
    securityInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#2a2a2a' : '#f0f8ff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
    },
    securityText: {
      flex: 1,
      fontSize: 14,
      color: darkMode ? '#ccc' : colors.gray,
      marginLeft: 10,
    },
    payButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
      opacity: isProcessing ? 0.7 : 1,
    },
    payButtonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  const renderSuccessModal = () => (
    <Modal
      visible={showSuccessModal}
      transparent={true}
      animationType="fade"
      onRequestClose={handleSuccessClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.successModal, { backgroundColor: darkMode ? '#1a1a1a' : colors.white }]}>
          <CheckCircle size={64} color={colors.success} />
          <Text style={[styles.successTitle, { color: darkMode ? colors.white : colors.black }]}>
            Payment Successful!
          </Text>
          <Text style={[styles.successMessage, { color: darkMode ? '#ccc' : colors.gray }]}>
            {isEscrow 
              ? 'Your payment has been securely held in escrow until project completion.'
              : 'Your payment has been processed successfully.'
            }
          </Text>
          <TouchableOpacity style={styles.successButton} onPress={handleSuccessClose}>
            <Text style={styles.successButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={darkMode ? colors.white : colors.primary} />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>
            {isEscrow ? 'ESCROW PAYMENT' : 'DIRECT PAYMENT'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={dynamicStyles.content}>
          <View style={dynamicStyles.card}>
            <View style={styles.headerIcon}>
              {isEscrow ? (
                <Shield size={48} color={colors.success} />
              ) : (
                <CreditCard size={48} color={colors.primary} />
              )}
            </View>
            
            <Text style={dynamicStyles.title}>
              {isEscrow ? 'Secure Escrow Payment' : 'Direct Payment'}
            </Text>
            <Text style={dynamicStyles.subtitle}>
              {isEscrow 
                ? 'Funds will be held securely until project completion'
                : 'Pay directly to the service provider'
              }
            </Text>

            <Text style={dynamicStyles.inputLabel}>Amount (₱)</Text>
            <TextInput
              style={dynamicStyles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              placeholderTextColor={darkMode ? '#888' : colors.gray}
              keyboardType="numeric"
            />

            <Text style={dynamicStyles.inputLabel}>Description</Text>
            <TextInput
              style={dynamicStyles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Payment description"
              placeholderTextColor={darkMode ? '#888' : colors.gray}
              multiline
            />

            <Text style={dynamicStyles.inputLabel}>Payment Method</Text>
            <View style={dynamicStyles.cardSelector}>
              <TouchableOpacity
                style={[
                  dynamicStyles.cardOption,
                  selectedCard === 'visa' && dynamicStyles.selectedCard
                ]}
                onPress={() => setSelectedCard('visa')}
              >
                <CreditCard size={24} color={colors.primary} style={dynamicStyles.cardIcon} />
                <Text style={dynamicStyles.cardText}>Visa •••• 1234</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  dynamicStyles.cardOption,
                  selectedCard === 'mastercard' && dynamicStyles.selectedCard
                ]}
                onPress={() => setSelectedCard('mastercard')}
              >
                <CreditCard size={24} color={colors.primary} style={dynamicStyles.cardIcon} />
                <Text style={dynamicStyles.cardText}>Mastercard •••• 5678</Text>
              </TouchableOpacity>
            </View>

            <View style={dynamicStyles.securityInfo}>
              <Lock size={20} color={colors.success} />
              <Text style={dynamicStyles.securityText}>
                Your payment information is encrypted and secure. 
                {isEscrow && ' Funds will be released only after project completion and your approval.'}
              </Text>
            </View>

            <TouchableOpacity
              style={dynamicStyles.payButton}
              onPress={handlePayment}
              disabled={isProcessing}
            >
              <Text style={dynamicStyles.payButtonText}>
                {isProcessing ? 'Processing...' : `Pay ₱${amount || '0'}`}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {renderSuccessModal()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 5,
  },
  placeholder: {
    width: 34,
  },
  headerIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  successButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  successButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});