import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function SubscriptionScreen() {
  const user = useAuthStore(state => state.user);
  const isArchitect = user?.userType === 'architect';

  const handleBack = () => {
    router.back();
  };

  const handleChooseSubscription = (plan: string) => {
    console.log(`Selected ${plan} subscription`);
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
          <View style={styles.bannerContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
              style={styles.bannerImage}
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerText}>
                {isArchitect 
                  ? "Unlock Premium Access — Start Getting Discovered by More Clients Today!"
                  : "Need an Architect Fast? Get Matched Instantly with Pro Access."
                }
              </Text>
            </View>
          </View>

          <View style={styles.plansContainer}>
            <View style={styles.planCard}>
              <Text style={styles.planTitle}>PRO SUBSCRIPTION</Text>
              <Text style={styles.planPrice}>{isArchitect ? '499' : '599'}/Month</Text>
              
              <View style={styles.featuresContainer}>
                {isArchitect ? (
                  <>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Profile visibility (boosted in search)</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Unlimited project applications</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>7-day profile boost (1x per month)</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Verified Pro badge</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Standard email support</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Post up to 5 active projects</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>1 free featured project per month</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Auto-match to available architects</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Verified Client badge</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Standard email support</Text>
                    </View>
                  </>
                )}
              </View>
              
              <TouchableOpacity 
                style={styles.chooseButton} 
                onPress={() => handleChooseSubscription('Pro')}
              >
                <Text style={styles.chooseButtonText}>Choose This Subscription</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.planCard}>
              <Text style={styles.planTitle}>ELITE SUBSCRIPTION</Text>
              <Text style={styles.planPrice}>999/Month</Text>
              
              <View style={styles.featuresContainer}>
                {isArchitect ? (
                  <>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Profile visibility with top placement</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Priority unlimited project applications</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>7-day profile boost (2x per month)</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Verified Pro badge</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Priority support</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Unlimited project listings</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>3 free featured projects per month</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Priority auto-match to architects</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Verified Client badge</Text>
                    </View>
                    <View style={styles.feature}>
                      <Check size={20} color="#4CAF50" />
                      <Text style={styles.featureText}>Priority support</Text>
                    </View>
                  </>
                )}
              </View>
              
              <TouchableOpacity 
                style={styles.chooseButton} 
                onPress={() => handleChooseSubscription('Elite')}
              >
                <Text style={styles.chooseButtonText}>Choose This Subscription</Text>
              </TouchableOpacity>
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
  bannerContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bannerText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  plansContainer: {
    paddingHorizontal: 20,
  },
  planCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 10,
    flex: 1,
  },
  chooseButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  chooseButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});