import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Phone, Plus, DollarSign, Shield, CreditCard, Camera, Video, Mic, Image as ImageIcon } from 'lucide-react-native';

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handleMedia = () => {
    setShowMediaModal(true);
  };

  const handleCall = () => {
    router.push(`/call/${id}?name=${name}`);
  };

  const handleMediaOption = (type: string) => {
    setShowMediaModal(false);
    console.log(`Selected media type: ${type}`);
    // Handle media selection based on type
  };

  const handleSecurePayment = () => {
    setShowPaymentModal(false);
    router.push(`/payment/direct?id=${id}`);
  };

  const handleEscrowPayment = () => {
    setShowPaymentModal(false);
    router.push(`/payment/escrow?id=${id}`);
  };

  const getProfileImage = () => {
    switch (id) {
      case 'lancelot':
        return 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      case 'carlos':
        return 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      case 'anna':
        return 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      default:
        return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    }
  };

  const renderMessages = () => {
    if (id === 'lancelot') {
      return (
        <>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Sat, July 5 at 2:39 PM</Text>
          </View>
          
          <View style={styles.messageContainer}>
            <Image
              source={{ uri: getProfileImage() }}
              style={styles.messageAvatar}
            />
            <View style={[styles.messageBubble, styles.receivedMessage]}>
              <Text style={styles.messageText}>
                Let's have a meeting, here is the link:{'\n\n'}https://meet.google.com/rca-pptu-nun?authuser=0
              </Text>
            </View>
          </View>
          
          <View style={[styles.messageContainer, styles.sentMessageContainer]}>
            <View style={[styles.messageBubble, styles.sentMessage]}>
              <Text style={[styles.messageText, styles.sentMessageText]}>
                Okay, I'll join the link in a few minutes. Just checking a few papers at the moment...
              </Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
              style={styles.messageAvatar}
            />
          </View>
        </>
      );
    }
    
    return (
      <View style={styles.emptyChat}>
        <Text style={styles.emptyChatText}>Start a conversation with {name}</Text>
      </View>
    );
  };

  const renderMediaModal = () => (
    <Modal
      visible={showMediaModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowMediaModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.mediaModal}>
          <View style={styles.mediaModalHeader}>
            <Text style={styles.mediaModalTitle}>Send Media</Text>
          </View>
          
          <View style={styles.mediaOptions}>
            <TouchableOpacity style={styles.mediaOption} onPress={() => handleMediaOption('camera')}>
              <View style={styles.mediaOptionIcon}>
                <Camera size={24} color={colors.primary} />
              </View>
              <Text style={styles.mediaOptionText}>Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaOption} onPress={() => handleMediaOption('gallery')}>
              <View style={styles.mediaOptionIcon}>
                <ImageIcon size={24} color={colors.primary} />
              </View>
              <Text style={styles.mediaOptionText}>Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaOption} onPress={() => handleMediaOption('video')}>
              <View style={styles.mediaOptionIcon}>
                <Video size={24} color={colors.primary} />
              </View>
              <Text style={styles.mediaOptionText}>Video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaOption} onPress={() => handleMediaOption('voice')}>
              <View style={styles.mediaOptionIcon}>
                <Mic size={24} color={colors.primary} />
              </View>
              <Text style={styles.mediaOptionText}>Voice</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.cancelMediaButton}
            onPress={() => setShowMediaModal(false)}
          >
            <Text style={styles.cancelMediaText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderPaymentModal = () => (
    <Modal
      visible={showPaymentModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowPaymentModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.paymentModal}>
          <View style={styles.paymentModalHeader}>
            <Shield size={32} color={colors.primary} />
            <Text style={styles.paymentModalTitle}>Secure Payment</Text>
            <Text style={styles.paymentModalSubtitle}>
              Choose a secure payment method to protect your transaction
            </Text>
          </View>
          
          <View style={styles.paymentOptions}>
            <TouchableOpacity style={styles.paymentOption} onPress={handleSecurePayment}>
              <View style={styles.paymentOptionIcon}>
                <CreditCard size={24} color={colors.primary} />
              </View>
              <View style={styles.paymentOptionContent}>
                <Text style={styles.paymentOptionTitle}>Direct Payment</Text>
                <Text style={styles.paymentOptionDescription}>
                  Pay directly with your saved payment method
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentOption} onPress={handleEscrowPayment}>
              <View style={styles.paymentOptionIcon}>
                <Shield size={24} color={colors.success} />
              </View>
              <View style={styles.paymentOptionContent}>
                <Text style={styles.paymentOptionTitle}>Escrow Payment</Text>
                <Text style={styles.paymentOptionDescription}>
                  Funds held securely until project completion
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.cancelPaymentButton}
            onPress={() => setShowPaymentModal(false)}
          >
            <Text style={styles.cancelPaymentText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Image
              source={{ uri: getProfileImage() }}
              style={styles.headerAvatar}
            />
            <Text style={styles.headerName}>{name}</Text>
          </View>
          
          <TouchableOpacity style={styles.phoneButton} onPress={handleCall}>
            <Phone size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
          {renderMessages()}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleMedia}>
            <Plus size={20} color={colors.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <DollarSign size={20} color={colors.white} />
          </TouchableOpacity>
          
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor={colors.gray}
              multiline
            />
          </View>
        </View>
        
        {renderPaymentModal()}
        {renderMediaModal()}
      </KeyboardAvoidingView>
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
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: 5,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  headerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  phoneButton: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  messagesContent: {
    padding: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateText: {
    fontSize: 14,
    color: colors.gray,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  sentMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  receivedMessage: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 5,
  },
  sentMessage: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  messageText: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 22,
  },
  sentMessageText: {
    color: colors.black,
  },
  emptyChat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyChatText: {
    fontSize: 16,
    color: colors.gray,
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  paymentButton: {
    backgroundColor: colors.success,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  messageInputContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
  },
  messageInput: {
    fontSize: 16,
    color: colors.black,
    minHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  paymentModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  paymentModalHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  paymentModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 10,
    marginBottom: 8,
  },
  paymentModalSubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  paymentOptions: {
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  paymentOptionContent: {
    flex: 1,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  paymentOptionDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 18,
  },
  cancelPaymentButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  cancelPaymentText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
  mediaModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  mediaModalHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  mediaModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  mediaOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  mediaOption: {
    alignItems: 'center',
    padding: 16,
  },
  mediaOptionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  mediaOptionText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
  },
  cancelMediaButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  cancelMediaText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
});