import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, AlertTriangle, CheckCircle, Eye } from 'lucide-react-native';

export default function Top10CompetitionScreen() {
  const [showNoticeModal, setShowNoticeModal] = useState(true);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);

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
    console.log('Joining Top 10 Competition');
    // Handle payment logic here
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
  priceContainer: {
    backgroundColor: colors.white,
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
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
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
});