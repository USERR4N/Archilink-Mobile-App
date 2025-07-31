import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, AlertTriangle, CheckCircle, Eye, Star, Trophy } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

const topArchitects = [
  { id: 1, rank: '01', name: 'Samantha Fisher', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  { id: 2, rank: '02', name: 'Michael Chen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, rank: '03', name: 'Elena Rodriguez', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 4, rank: '04', name: 'David Kim', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 5, rank: '05', name: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
];

export default function Top10CompetitionScreen() {
  const user = useAuthStore(state => state.user);
  const [showNoticeModal, setShowNoticeModal] = useState(true);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleAcceptNotice = () => {
    setShowNoticeModal(false);
  };

  const handleViewCriteria = () => {
    setShowCriteriaModal(true);
  };

  const handleJoinCompetition = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    console.log('Processing payment for Top 10 Competition');
    setShowPaymentModal(false);
    // Handle actual payment logic here
  };

  const handleVisitProfile = (architectId: number) => {
    router.push(`/user-profile/${architectId}`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ARCHILINK</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.mainContent}>
            <Text style={styles.title}>Compete for a Top 10 Spot and Boost Your Profile!</Text>
            
            {/* Illustration Section */}
            <View style={styles.illustrationContainer}>
              <View style={styles.sparkleContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" style={[styles.sparkle, styles.sparkle1]} />
                <Star size={12} color="#FFD700" fill="#FFD700" style={[styles.sparkle, styles.sparkle2]} />
                <Star size={14} color="#FFD700" fill="#FFD700" style={[styles.sparkle, styles.sparkle3]} />
                <Star size={10} color="#FFD700" fill="#FFD700" style={[styles.sparkle, styles.sparkle4]} />
                <Star size={18} color="#FFD700" fill="#FFD700" style={[styles.sparkle, styles.sparkle5]} />
              </View>
              
              <View style={styles.architectIllustration}>
                <View style={styles.hardhat}>
                  <View style={styles.hardhatTop} />
                  <View style={styles.hardhatBrim} />
                </View>
                <View style={styles.architectFace}>
                  <View style={styles.eye} />
                  <View style={styles.eye} />
                  <View style={styles.smile} />
                </View>
                <View style={styles.architectBody}>
                  <View style={styles.blueprint}>
                    <View style={styles.blueprintLine} />
                    <View style={styles.blueprintLine} />
                    <View style={styles.blueprintLine} />
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Entry Fee</Text>
              <Text style={styles.price}>₱100</Text>
            </View>

            <TouchableOpacity 
              style={styles.criteriaButton}
              onPress={handleViewCriteria}
            >
              <Eye size={20} color={colors.primary} />
              <Text style={styles.criteriaButtonText}>View Competition Criteria</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.joinButton}
              onPress={handleJoinCompetition}
            >
              <Text style={styles.joinButtonText}>Join Competition</Text>
            </TouchableOpacity>
            
            {/* Top 10 Leaderboard Section */}
            <View style={styles.leaderboardSection}>
              <View style={styles.leaderboardHeader}>
                <Trophy size={24} color={colors.primary} />
                <Text style={styles.leaderboardTitle}>Top 10 Best Architects</Text>
              </View>
              
              {topArchitects.map((architect) => (
                <View key={architect.id} style={styles.leaderboardItem}>
                  <Text style={styles.rank}>{architect.rank}</Text>
                  <Image source={{ uri: architect.image }} style={styles.profileImage} />
                  <Text style={styles.architectName}>{architect.name}</Text>
                  <TouchableOpacity 
                    style={styles.visitProfileButton}
                    onPress={() => handleVisitProfile(architect.id)}
                  >
                    <Text style={styles.visitProfileText}>Visit Profile</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Important Notice Modal */}
        <Modal
          visible={showNoticeModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowNoticeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <AlertTriangle size={24} color={colors.warning} />
                <Text style={styles.modalTitle}>Important Notice</Text>
              </View>
              
              <Text style={styles.modalText}>
                By joining, you agree that ₱100 does not guarantee inclusion in the Top 10 list. 
                You will receive a Competitor Badge, signaling clients that you&apos;re actively improving and aiming for the Top 10.
              </Text>
              
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={handleAcceptNotice}
              >
                <CheckCircle size={20} color={colors.white} />
                <Text style={styles.acceptButtonText}>I Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Competition Criteria Modal */}
        <Modal
          visible={showCriteriaModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCriteriaModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.criteriaModalContent}>
              <View style={styles.criteriaHeader}>
                <Text style={styles.criteriaTitle}>🔍 How Does the Top 10 Work?</Text>
                <TouchableOpacity 
                  onPress={() => setShowCriteriaModal(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.criteriaContent}>
                <View style={styles.criteriaSection}>
                  <Text style={styles.criteriaSectionTitle}>1. Recognition for Action, Not Just Credentials</Text>
                  <Text style={styles.criteriaSectionText}>Rewards architects who:</Text>
                  <View style={styles.bulletPoints}>
                    <Text style={styles.bulletPoint}>• Regularly update portfolios</Text>
                    <Text style={styles.bulletPoint}>• Respond to client inquiries quickly</Text>
                    <Text style={styles.bulletPoint}>• Show consistency and active presence</Text>
                    <Text style={styles.bulletPoint}>• A fresh grad can outscore an inactive veteran</Text>
                  </View>
                </View>

                <View style={styles.criteriaSection}>
                  <Text style={styles.criteriaSectionTitle}>2. Fairness Built In</Text>
                  <Text style={styles.criteriaSectionText}>Competitors are grouped by experience level:</Text>
                  <View style={styles.bulletPoints}>
                    <Text style={styles.bulletPoint}>• Fresh grads vs fresh grads</Text>
                    <Text style={styles.bulletPoint}>• Seasoned pros vs seasoned pros</Text>
                  </View>
                  <Text style={styles.criteriaSectionText}>Emphasis on monthly progress, e.g.:</Text>
                  <View style={styles.bulletPoints}>
                    <Text style={styles.bulletPoint}>• &quot;You uploaded 5 new projects&quot;</Text>
                    <Text style={styles.bulletPoint}>• &quot;You replied within 2 hours to 90% of clients&quot;</Text>
                  </View>
                </View>

                <View style={styles.criteriaSection}>
                  <Text style={styles.criteriaSectionTitle}>3. Monthly Evaluation</Text>
                  <View style={styles.bulletPoints}>
                    <Text style={styles.bulletPoint}>• Rankings reset every month to ensure continuous opportunity</Text>
                    <Text style={styles.bulletPoint}>• Winners are featured in the homepage and client search results</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Payment Modal */}
        <Modal
          visible={showPaymentModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Payment Confirmation</Text>
              
              <Text style={styles.modalText}>
                You are about to pay ₱100 to join the Top 10 Architects Competition.
              </Text>
              
              <View style={styles.paymentButtons}>
                <TouchableOpacity 
                  style={styles.cancelPaymentButton}
                  onPress={() => setShowPaymentModal(false)}
                >
                  <Text style={styles.cancelPaymentText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.confirmPaymentButton}
                  onPress={handlePayment}
                >
                  <Text style={styles.confirmPaymentText}>Pay ₱100</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  mainContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  illustrationContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 30,
    height: 200,
    width: '100%',
    justifyContent: 'center',
  },
  sparkleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: 20,
    left: 30,
  },
  sparkle2: {
    top: 40,
    right: 40,
  },
  sparkle3: {
    bottom: 60,
    left: 50,
  },
  sparkle4: {
    top: 80,
    left: '50%',
  },
  sparkle5: {
    bottom: 30,
    right: 30,
  },
  architectIllustration: {
    alignItems: 'center',
    zIndex: 1,
  },
  hardhat: {
    position: 'relative',
    marginBottom: 5,
  },
  hardhatTop: {
    width: 60,
    height: 40,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  hardhatBrim: {
    width: 70,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    position: 'absolute',
    bottom: -4,
    left: -5,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  architectFace: {
    width: 50,
    height: 50,
    backgroundColor: '#FDBCB4',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    paddingTop: 10,
  },
  eye: {
    width: 6,
    height: 6,
    backgroundColor: colors.black,
    borderRadius: 3,
    marginHorizontal: 6,
  },
  smile: {
    position: 'absolute',
    bottom: 12,
    width: 20,
    height: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
    borderRadius: 10,
  },
  architectBody: {
    width: 80,
    height: 60,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  blueprint: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E3F2FD',
    borderRadius: 5,
    padding: 8,
    justifyContent: 'space-around',
  },
  blueprintLine: {
    height: 2,
    backgroundColor: '#2196F3',
    borderRadius: 1,
  },
  priceContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  priceLabel: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 10,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  criteriaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  criteriaButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  leaderboardSection: {
    width: '100%',
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    padding: 20,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: 10,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    width: 30,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  architectName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  visitProfileButton: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  visitProfileText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 350,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: 10,
  },
  modalText: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  acceptButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  criteriaModalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 0,
    width: '100%',
    maxHeight: '80%',
  },
  criteriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  criteriaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.gray,
    fontWeight: 'bold',
  },
  criteriaContent: {
    padding: 25,
  },
  criteriaSection: {
    marginBottom: 25,
  },
  criteriaSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  criteriaSectionText: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
    lineHeight: 22,
  },
  bulletPoints: {
    marginLeft: 10,
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 15,
    color: colors.gray,
    marginBottom: 5,
    lineHeight: 20,
  },
  paymentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  cancelPaymentButton: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelPaymentText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmPaymentButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmPaymentText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});