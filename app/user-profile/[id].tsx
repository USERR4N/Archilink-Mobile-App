import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Platform, Linking } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { architects } from '@/constants/architects';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft, Star, MapPin, Award, Briefcase, Phone, Mail, MessageSquare, UserPlus, UserMinus } from 'lucide-react-native';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const architectId = parseInt(id as string);
  const { followUser, unfollowUser, isFollowing } = useAuthStore();
  const [showCallModal, setShowCallModal] = React.useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleMessage = () => {
    const architect = architects.find(a => a.id === architectId);
    router.push(`/chat/${id}?name=${architect?.name || 'Architect'}`);
  };

  const handleCall = () => {
    setShowCallModal(true);
  };

  const makePhoneCall = (phoneNumber: string) => {
    const phoneUrl = Platform.select({
      ios: `tel:${phoneNumber}`,
      android: `tel:${phoneNumber}`,
      web: `tel:${phoneNumber}`
    });
    
    if (phoneUrl) {
      Linking.openURL(phoneUrl);
    }
    setShowCallModal(false);
  };

  const handleEmail = () => {
    const architect = architects.find(a => a.id === architectId);
    const emailUrl = `mailto:${architect?.email || 'architect@example.com'}`;
    Linking.openURL(emailUrl);
  };

  const handleFollow = () => {
    const userId = architectId.toString();
    if (isFollowing(userId)) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  // Find the architect by ID, fallback to first architect if not found
  const architect = architects.find(a => a.id === architectId) || architects[0];

  const renderCallModal = () => (
    <Modal
      visible={showCallModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowCallModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.callModal}>
          <View style={styles.callModalHeader}>
            <Image 
              source={{ uri: architect.image }} 
              style={styles.callModalAvatar} 
            />
            <Text style={styles.callModalName}>{architect.name}</Text>
            <Text style={styles.callModalNumber}>{architect.phone}</Text>
          </View>
          
          <View style={styles.callModalActions}>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => makePhoneCall(architect.phone)}
            >
              <Phone size={24} color={colors.white} />
              <Text style={styles.callButtonText}>Call Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowCallModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Text style={styles.specialty}>{architect.specialty}</Text>
            
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: architect.image }}
                style={styles.profileImage}
              />
              {architect.isVerified && (
                <View style={styles.verificationBadge}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.profileName}>{architect.name}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{architect.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{architect.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{architect.projects}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
            </View>
          </View>

          {/* Professional Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Information</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>License Number</Text>
              <Text style={styles.infoValue}>{architect.licenseNumber}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Specialization</Text>
              <Text style={styles.infoValue}>{architect.specialty}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{architect.experience} years</Text>
            </View>
          </View>

          {/* Portfolio Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Portfolio Highlights</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.portfolioContainer}
            >
              {architect.portfolio.map((project) => (
                <View key={project.id} style={styles.portfolioItem}>
                  <Image
                    source={{ uri: project.image }}
                    style={styles.portfolioImage}
                  />
                  <Text style={styles.portfolioTitle}>{project.title}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            
            <View style={styles.ratingOverview}>
              <Text style={styles.ratingNumber}>{architect.rating}</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={24} color="#FFD700" fill="#FFD700" />
                ))}
              </View>
              <Text style={styles.reviewCount}>Based on {architect.reviews} reviews</Text>
            </View>
            
            {architect.clientReviews && architect.clientReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.clientName}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      color={star <= review.rating ? "#FFD700" : "#E0E0E0"} 
                      fill={star <= review.rating ? "#FFD700" : "#E0E0E0"} 
                    />
                  ))}
                </View>
                <Text style={styles.reviewText}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{architect.email}</Text>
            </View>
            
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{architect.phone}</Text>
            </View>
            
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>{architect.location}</Text>
            </View>
          </View>

          {/* Contact Actions */}
          <View style={styles.contactActions}>
            <TouchableOpacity 
              style={[styles.actionButton, isFollowing(architectId.toString()) && styles.followingButton]} 
              onPress={handleFollow}
            >
              {isFollowing(architectId.toString()) ? (
                <UserMinus size={20} color={colors.white} />
              ) : (
                <UserPlus size={20} color={colors.white} />
              )}
              <Text style={styles.actionButtonText}>
                {isFollowing(architectId.toString()) ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={handleMessage}>
              <MessageSquare size={20} color={colors.primary} />
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={handleCall}>
              <Phone size={20} color={colors.primary} />
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={handleEmail}>
              <Mail size={20} color={colors.primary} />
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Email</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© ArchiLink. All Rights Reserved. 2025</Text>
          </View>
        </ScrollView>
        
        {renderCallModal()}
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
  profileSection: {
    backgroundColor: colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  specialty: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.lightGray,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.black,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  portfolioContainer: {
    marginTop: 10,
  },
  portfolioItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  portfolioImage: {
    width: 120,
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  portfolioTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  ratingOverview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewCount: {
    fontSize: 16,
    color: colors.gray,
  },
  reviewCard: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  reviewDate: {
    fontSize: 14,
    color: colors.white,
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  contactLabel: {
    fontSize: 16,
    color: colors.black,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  contactActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  followingButton: {
    backgroundColor: colors.gray,
  },
  footer: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  footerText: {
    fontSize: 12,
    color: colors.gray,
  },
  // Call Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callModal: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  callModalHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  callModalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  callModalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  callModalNumber: {
    fontSize: 16,
    color: colors.gray,
  },
  callModalActions: {
    width: '100%',
    gap: 15,
  },
  callButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    gap: 10,
  },
  callButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '500',
  },
});