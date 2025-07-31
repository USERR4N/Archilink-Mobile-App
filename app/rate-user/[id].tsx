import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft, Star } from 'lucide-react-native';

export default function RateUserScreen() {
  const { id, name, userType } = useLocalSearchParams();
  const { user, darkMode } = useAuthStore();
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Rating Submitted',
        `Thank you for rating ${name}! Your feedback helps improve our community.`,
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = () => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Select a rating';
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
    ratingContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    starsContainer: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    ratingText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.primary,
    },
    feedbackLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 10,
    },
    feedbackInput: {
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      borderRadius: 10,
      padding: 15,
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      minHeight: 100,
      textAlignVertical: 'top',
      marginBottom: 30,
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: 'center',
      opacity: isSubmitting ? 0.7 : 1,
    },
    submitButtonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: 'bold',
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
          <Text style={dynamicStyles.headerTitle}>RATE {userType?.toString().toUpperCase()}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={dynamicStyles.content}>
          <View style={dynamicStyles.card}>
            <Text style={dynamicStyles.title}>Rate {name}</Text>
            <Text style={dynamicStyles.subtitle}>
              How was your experience working with {name}?
            </Text>

            <View style={dynamicStyles.ratingContainer}>
              <View style={dynamicStyles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleRatingPress(star)}
                    style={styles.starButton}
                  >
                    <Star
                      size={40}
                      color={star <= rating ? '#FFD700' : '#E0E0E0'}
                      fill={star <= rating ? '#FFD700' : 'transparent'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={dynamicStyles.ratingText}>{getRatingText()}</Text>
            </View>

            <Text style={dynamicStyles.feedbackLabel}>Feedback (Optional)</Text>
            <TextInput
              style={dynamicStyles.feedbackInput}
              value={feedback}
              onChangeText={setFeedback}
              placeholder={`Share your experience with ${name}...`}
              placeholderTextColor={darkMode ? '#888' : colors.gray}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={dynamicStyles.submitButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={dynamicStyles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  starButton: {
    padding: 5,
    marginHorizontal: 2,
  },
});