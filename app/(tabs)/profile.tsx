import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/colors';
import { Settings, LogOut, Star, ChevronRight, Edit3, Award, Trophy, Medal, Clock, Shield, Zap } from 'lucide-react-native';

export default function ProfileScreen() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const isArchitect = user?.userType === 'architect';

  const handleLogout = () => {
    logout();
    router.replace('/index');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleViewMore = () => {
    router.push('/(tabs)/projects');
  };

  const handleViewProposal = () => {
    console.log('View proposal');
  };

  const handleMessageArchitect = () => {
    router.push('/chat/patrick?name=Patrick Uy');
  };

  const handleEditProfile = () => {
    router.push('/settings/edit-profile');
  };

  if (isArchitect) {
    return <ArchitectProfile user={user} onLogout={handleLogout} onSettings={handleSettings} onEditProfile={handleEditProfile} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARCHILINK</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileType}>Client</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleEditProfile} style={styles.headerButton}>
              <Edit3 size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSettings} style={styles.headerButton}>
              <Settings size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
              <LogOut size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
            style={styles.profileImage}
          />
          <View style={styles.verificationBadge}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>
        
        <Text style={styles.profileName}>Mrs. Terra Agonzilo</Text>
        <Text style={styles.profileRole}>Owner of DreamDraft Company</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>103</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <TouchableOpacity onPress={handleViewMore} style={styles.viewMoreContainer}>
            <Text style={styles.viewMoreText}>View More</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.projectCard}>
          <View style={styles.projectHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
              style={styles.architectAvatar}
            />
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>Detached House Design</Text>
              <Text style={styles.architectName}>Patrick Uy</Text>
              <Text style={styles.projectDate}>July 5, 2025</Text>
              <Text style={styles.projectType}>Detached House</Text>
            </View>
          </View>
          
          <View style={styles.projectActions}>
            <TouchableOpacity style={styles.proposalButton} onPress={handleViewProposal}>
              <Text style={styles.proposalButtonText}>View Proposal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton} onPress={handleMessageArchitect}>
              <Text style={styles.messageButtonText}>Message Architect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        
        <View style={styles.ratingOverview}>
          <Text style={styles.ratingNumber}>4.8</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
          <Text style={styles.reviewCount}>Based on 56 reviews</Text>
        </View>
        
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>Ar. Elijah Ramos</Text>
            <Text style={styles.reviewDate}>July 1, 2025</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
            ))}
            <Star size={16} color="#E0E0E0" fill="#E0E0E0" />
          </View>
          <Text style={styles.reviewText}>
            Terra was one of the most organized clients I have worked with—she knew exactly what she wanted, yet welcomed creative collaboration.
          </Text>
        </View>
        
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>Ar. Bianca Santiago</Text>
            <Text style={styles.reviewDate}>July 1, 2025</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
          <Text style={styles.reviewText}>
            From mood board to move-in, working with Terra felt more like a partnership than a transaction.
          </Text>
        </View>
        
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>Ar. Leo Tan</Text>
            <Text style={styles.reviewDate}>July 1, 2025</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
          <Text style={styles.reviewText}>
            She trusted our process, communicated clearly, and never missed a site visit—an architect's dream client.
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>CLIENT@example.com</Text>
        </View>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>+63 912 345 6789</Text>
        </View>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Location</Text>
          <Text style={styles.contactValue}>Makati City, Philippines</Text>
        </View>
      </View>

      {/* Saved Architects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Architects</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.savedArchitectsContainer}
        >
          <View style={styles.savedArchitectItem}>
            <View style={styles.savedArchitectImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
                style={styles.savedArchitectImage}
              />
              <View style={styles.verificationBadgeSmall}>
                <Text style={styles.checkmarkSmall}>✓</Text>
              </View>
            </View>
            <Text style={styles.savedArchitectName}>Carlos Mendoza</Text>
          </View>
          
          <View style={styles.savedArchitectItem}>
            <View style={styles.savedArchitectImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
                style={styles.savedArchitectImage}
              />
              <View style={styles.verificationBadgeSmall}>
                <Text style={styles.checkmarkSmall}>✓</Text>
              </View>
            </View>
            <Text style={styles.savedArchitectName}>Anna Reyes</Text>
          </View>
          
          <View style={styles.savedArchitectItem}>
            <View style={styles.savedArchitectImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
                style={styles.savedArchitectImage}
              />
            </View>
            <Text style={styles.savedArchitectName}>Sherlock Holmes</Text>
          </View>
          
          <View style={styles.savedArchitectItem}>
            <View style={styles.savedArchitectImageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
                style={styles.savedArchitectImage}
              />
            </View>
            <Text style={styles.savedArchitectName}>Fionna Gallagher</Text>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© ArchiLink. All Rights Reserved. 2025</Text>
      </View>
    </ScrollView>
  );
}

const ArchitectProfile = ({ user, onLogout, onSettings, onEditProfile }: { user: any; onLogout: () => void; onSettings: () => void; onEditProfile: () => void }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARCHILINK</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileType}>Residential Architect</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={onEditProfile} style={styles.headerButton}>
              <Edit3 size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSettings} style={styles.headerButton}>
              <Settings size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={styles.headerButton}>
              <LogOut size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }}
            style={styles.profileImage}
          />
          <View style={styles.architectVerificationBadge}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>
        
        <Text style={styles.profileName}>{user?.fullName || '<User Name>'}</Text>
        
        {/* Badges Section */}
        <View style={styles.badgesSection}>
          <Text style={styles.badgesSectionTitle}>My Achievements</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.badgesContainer}
          >
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: '#FFD700' }]}>
                <Trophy size={20} color={colors.white} />
              </View>
              <Text style={styles.badgeTitle}>Top 10 Competitor</Text>
              <Text style={styles.badgeDescription}>Actively competing</Text>
            </View>
            
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: '#4CAF50' }]}>
                <Shield size={20} color={colors.white} />
              </View>
              <Text style={styles.badgeTitle}>Loyal Architect</Text>
              <Text style={styles.badgeDescription}>6 months consistent</Text>
            </View>
            
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: '#2196F3' }]}>
                <Award size={20} color={colors.white} />
              </View>
              <Text style={styles.badgeTitle}>3 Years Archi</Text>
              <Text style={styles.badgeDescription}>Long-time member</Text>
            </View>
            
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: '#FF9800' }]}>
                <Medal size={20} color={colors.white} />
              </View>
              <Text style={styles.badgeTitle}>Verified Pro</Text>
              <Text style={styles.badgeDescription}>Profile verified</Text>
            </View>
            
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: '#9C27B0' }]}>
                <Zap size={20} color={colors.white} />
              </View>
              <Text style={styles.badgeTitle}>Fast Responder</Text>
              <Text style={styles.badgeDescription}>95% under 1 hour</Text>
            </View>
            
            <View style={styles.badgeItem}>
              <View style={[styles.badgeIcon, { backgroundColor: '#607D8B' }]}>
                <Clock size={20} color={colors.white} />
              </View>
              <Text style={styles.badgeTitle}>Early Adopter</Text>
              <Text style={styles.badgeDescription}>Beta user</Text>
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>103</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
        </View>
      </View>

      {/* Professional Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Information</Text>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>License Number</Text>
          <Text style={styles.contactValue}>AR-12345</Text>
        </View>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Specialization</Text>
          <Text style={styles.contactValue}>Residential Architecture</Text>
        </View>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Experience</Text>
          <Text style={styles.contactValue}>8 years</Text>
        </View>
      </View>

      {/* Portfolio Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio Highlights</Text>
        
        <View style={styles.portfolioGrid}>
          <TouchableOpacity style={styles.portfolioItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }}
              style={styles.portfolioImage}
            />
            <Text style={styles.portfolioTitle}>Project 1</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.portfolioItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }}
              style={styles.portfolioImage}
            />
            <Text style={styles.portfolioTitle}>Project 2</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.portfolioItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }}
              style={styles.portfolioImage}
            />
            <Text style={styles.portfolioTitle}>Project 3</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        
        <View style={styles.ratingOverview}>
          <Text style={styles.ratingNumber}>4.8</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
          <Text style={styles.reviewCount}>Based on 56 reviews</Text>
        </View>
        
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>Client 1</Text>
            <Text style={styles.reviewDate}>July 1, 2025</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
            ))}
            <Star size={16} color="#E0E0E0" fill="#E0E0E0" />
          </View>
          <Text style={styles.reviewText}>
            Great architect to work with. Very professional and attentive to details. The project was completed on time and within budget.
          </Text>
        </View>
        
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>Client 2</Text>
            <Text style={styles.reviewDate}>July 1, 2025</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
          <Text style={styles.reviewText}>
            Great architect to work with. Very professional and attentive to details. The project was completed on time and within budget.
          </Text>
        </View>
        
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>Client 3</Text>
            <Text style={styles.reviewDate}>July 1, 2025</Text>
          </View>
          <View style={styles.reviewStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} color="#FFD700" fill="#FFD700" />
            ))}
          </View>
          <Text style={styles.reviewText}>
            Great architect to work with. Very professional and attentive to details. The project was completed on time and within budget.
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>architect@example.com</Text>
        </View>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>+63 912 345 6789</Text>
        </View>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Location</Text>
          <Text style={styles.contactValue}>Makati City, Philippines</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© ArchiLink. All Rights Reserved. 2025</Text>
      </View>
    </ScrollView>
  );
};

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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  profileSection: {
    backgroundColor: colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileType: {
    fontSize: 16,
    color: colors.gray,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
  },
  profileImageContainer: {
    position: 'relative',
    alignSelf: 'center',
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
    backgroundColor: '#1DA1F2',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  architectVerificationBadge: {
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
  portfolioGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  portfolioItem: {
    width: '30%',
    marginBottom: 15,
  },
  portfolioImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  portfolioTitle: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginBottom: 5,
    textAlign: 'center',
  },
  profileRole: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 5,
  },
  projectCard: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 20,
  },
  projectHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  architectAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  architectName: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 3,
  },
  projectDate: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 3,
  },
  projectType: {
    fontSize: 14,
    color: colors.white,
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proposalButton: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  proposalButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  messageButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
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
    paddingVertical: 10,
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
  savedArchitectsContainer: {
    marginTop: 10,
  },
  savedArchitectItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  savedArchitectImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  savedArchitectImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  verificationBadgeSmall: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  checkmarkSmall: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  savedArchitectName: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
  badgesSection: {
    marginBottom: 20,
  },
  badgesSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  badgesContainer: {
    paddingHorizontal: 5,
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 90,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  badgeDescription: {
    fontSize: 10,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 12,
  },
  footer: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: colors.gray,
  },
});