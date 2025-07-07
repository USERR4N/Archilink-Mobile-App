import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { architects } from '@/constants/architects';
import { ArrowLeft, Star, MapPin, CheckCircle } from 'lucide-react-native';

export default function RecommendedArchitectsScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleArchitectPress = (architectId: number) => {
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

        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>TOP 10 RECOMMENDED ARCHITECTS</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.architectsGrid}>
            {architects.map((architect) => (
              <TouchableOpacity
                key={architect.id}
                style={styles.architectCard}
                onPress={() => handleArchitectPress(architect.id)}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: architect.image }}
                    style={styles.architectImage}
                  />
                  {architect.isVerified && (
                    <View style={styles.verificationBadge}>
                      <CheckCircle size={20} color={colors.blue} fill={colors.blue} />
                    </View>
                  )}
                </View>
                
                <View style={styles.architectInfo}>
                  <Text style={styles.architectName}>{architect.name}</Text>
                  <Text style={styles.architectSpecialty}>{architect.specialty}</Text>
                  
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{architect.rating}</Text>
                    <Text style={styles.reviewCount}>({architect.reviews})</Text>
                  </View>
                  
                  <View style={styles.locationContainer}>
                    <MapPin size={12} color={colors.gray} />
                    <Text style={styles.locationText}>{architect.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  placeholder: {
    width: 34,
  },
  subHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  subHeaderTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  architectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  architectCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  architectImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.lightGray,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  architectInfo: {
    alignItems: 'center',
    width: '100%',
  },
  architectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  architectSpecialty: {
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 11,
    color: colors.gray,
    marginLeft: 4,
    textAlign: 'center',
    flexShrink: 1,
  },
});