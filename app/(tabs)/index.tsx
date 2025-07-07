import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated, Modal, Linking, Platform } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/constants/colors';
import { architects } from '@/constants/architects';
import { architectDashboard, recentProjects, clientInquiries, partnerships } from '@/constants/architect-dashboard';
import { Search, Star, MapPin, ChevronRight, Users, Award, Shield, Clock, ChevronLeft, Video, Camera, Briefcase, CheckCircle, Eye, MessageCircle, ExternalLink, Heart, Phone } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const user = useAuthStore(state => state.user);
  const isArchitect = user?.userType === 'architect';
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Client POV advertisements
  const clientAdvertisements = [
    {
      id: 1,
      title: 'JSLA Architects',
      subtitle: 'Architecture Firm',
      location: 'LHK Square Bldg, 288 N. Domingo, San Juan City',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Modern Design Studio',
      subtitle: 'Interior Design',
      location: 'BGC, Taguig City',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Green Architecture Co.',
      subtitle: 'Sustainable Design',
      location: 'Makati City',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Architect POV advertisements
  const architectAdvertisements = [
    {
      id: 1,
      title: 'Manila Architecture Workshop',
      subtitle: 'By Archello',
      location: 'Makati Convention Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Sustainable Design Summit',
      subtitle: 'Green Building Council',
      location: 'BGC, Taguig City',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'BIM Technology Expo',
      subtitle: 'Digital Architecture',
      location: 'SMX Convention Center',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const advertisements = isArchitect ? architectAdvertisements : clientAdvertisements;

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleStoriesViewMore = () => {
    router.push('/stories');
  };

  const handleAdPress = (ad: any) => {
    console.log('Advertisement pressed:', ad.title);
  };

  const handleNextAd = () => {
    setCurrentAdIndex((prev) => (prev === advertisements.length - 1 ? 0 : prev + 1));
  };

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handleSave = (postId: string) => {
    const newSavedPosts = new Set(savedPosts);
    if (newSavedPosts.has(postId)) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }
    setSavedPosts(newSavedPosts);
  };

  const handleCall = (contact: any) => {
    setSelectedContact(contact);
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

  const handleComment = (postId: string) => {
    router.push(`/comments/${postId}`);
  };

  const handleReadPost = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return colors.success;
      case 'In Progress':
        return colors.primary;
      case 'Planning':
        return colors.warning;
      default:
        return colors.gray;
    }
  };

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
              source={{ uri: selectedContact?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }} 
              style={styles.callModalAvatar} 
            />
            <Text style={styles.callModalName}>{selectedContact?.name || 'Contact'}</Text>
            <Text style={styles.callModalNumber}>{selectedContact?.phone || '+63 912 345 6789'}</Text>
          </View>
          
          <View style={styles.callModalActions}>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => makePhoneCall(selectedContact?.phone || '+63 912 345 6789')}
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

  // Architect POV Homepage
  if (isArchitect) {
    return (
      <ScrollView style={styles.container}>
        {/* ARCHILINK Header */}
        <View style={styles.globalHeader}>
          <Text style={styles.globalHeaderTitle}>ARCHILINK</Text>
        </View>

        {/* Advertisement Carousel */}
        <View style={styles.carouselContainer}>
          <Image
            source={{ uri: advertisements[currentAdIndex].image }}
            style={styles.carouselImage}
          />
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNextAd}>
            <ChevronRight size={24} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.adOverlay}
            onPress={() => handleAdPress(advertisements[currentAdIndex])}
          >
            <Text style={styles.adTitle}>{advertisements[currentAdIndex].title}</Text>
            <Text style={styles.adSubtitle}>{advertisements[currentAdIndex].subtitle}</Text>
            <View style={styles.adLocationContainer}>
              <MapPin size={14} color={colors.white} />
              <Text style={styles.adLocation}>{advertisements[currentAdIndex].location}</Text>
            </View>
            <View style={styles.visitButton}>
              <Text style={styles.visitButtonText}>Visit</Text>
              <ChevronRight size={14} color={colors.primary} />
            </View>
          </TouchableOpacity>

          <View style={styles.paginationContainer}>
            {advertisements.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentAdIndex && styles.paginationDotActive
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          {/* Welcome Back Section */}
          <Text style={styles.welcomeText}>
            Welcome back, {user?.fullName || 'Architect'}!
          </Text>

          {/* Dashboard Cards */}
          <View style={styles.dashboardContainer}>
            <View style={styles.dashboardCard}>
              <Text style={styles.dashboardCount}>{architectDashboard.stats.activeProjects}</Text>
              <Text style={styles.dashboardLabel}>Active Projects</Text>
            </View>
            <View style={styles.dashboardCard}>
              <Text style={styles.dashboardCount}>{architectDashboard.stats.completed}</Text>
              <Text style={styles.dashboardLabel}>Completed</Text>
            </View>
            <View style={styles.dashboardCard}>
              <Text style={styles.dashboardCount}>{architectDashboard.stats.newInquiries}</Text>
              <Text style={styles.dashboardLabel}>New Inquiries</Text>
            </View>
          </View>

          {/* Start a Post Section */}
          <View style={styles.postSection}>
            <View style={styles.postInputContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }}
                style={styles.profilePicture}
              />
              <TouchableOpacity style={styles.postInput} onPress={() => router.push('/create-post')}>
                <Text style={styles.postPlaceholder}>Start a post</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.postButtons}>
              <TouchableOpacity style={styles.postButton} onPress={() => router.push('/create-post?type=video')}>
                <Video size={20} color={colors.primary} />
                <Text style={styles.postButtonText}>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postButton} onPress={() => router.push('/create-post?type=photo')}>
                <Camera size={20} color={colors.primary} />
                <Text style={styles.postButtonText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postButton} onPress={() => router.push('/create-post?type=project')}>
                <Briefcase size={20} color={colors.primary} />
                <Text style={styles.postButtonText}>Showcase Project</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Projects Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectsScroll}>
              {recentProjects.map((project) => (
                <TouchableOpacity key={project.id} style={styles.projectCard}>
                  <Image source={{ uri: project.image }} style={styles.projectImage} />
                  <View style={styles.projectInfo}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <View style={styles.projectLocation}>
                      <MapPin size={12} color={colors.gray} />
                      <Text style={styles.projectLocationText}>{project.location}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                      <Text style={styles.statusText}>{project.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Need a Client Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Need a Client?</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/projects?tab=inquiries')}>
                <Text style={styles.seeAllText}>View More</Text>
              </TouchableOpacity>
            </View>
            
            {clientInquiries.map((inquiry) => (
              <View key={inquiry.id} style={styles.inquiryCard}>
                <View style={styles.inquiryHeader}>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>
                      {inquiry.clientName}
                      {inquiry.isVerified && <CheckCircle size={16} color={colors.success} style={styles.verifiedIcon} />}
                    </Text>
                    <Text style={styles.inquiryDate}>{inquiry.date}</Text>
                  </View>
                </View>
                <Text style={styles.inquiryDescription}>{inquiry.description}</Text>
                <View style={styles.inquiryButtons}>
                  <TouchableOpacity 
                    style={styles.viewDetailsButton}
                    onPress={() => router.push(`/client-post/${inquiry.id}`)}
                  >
                    <Eye size={16} color={colors.primary} />
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.respondButton}
                    onPress={() => router.push(`/chat/${inquiry.clientId}`)}
                  >
                    <Text style={styles.respondText}>Respond</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Need Materials Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Need Materials?</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/discover')}>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {partnerships.map((partner) => (
              <View key={partner.id} style={styles.partnerCard}>
                <Image source={{ uri: partner.logo }} style={styles.partnerLogo} />
                <View style={styles.partnerInfo}>
                  <Text style={styles.partnerName}>{partner.companyName}</Text>
                  <Text style={styles.partnerDescription}>{partner.description}</Text>
                  <View style={styles.partnerButtons}>
                    <TouchableOpacity 
                      style={styles.visitWebsiteButton}
                      onPress={() => console.log('Visit website:', partner.website)}
                    >
                      <ExternalLink size={16} color={colors.white} />
                      <Text style={styles.visitWebsiteText}>Visit Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.messageButton}
                      onPress={() => router.push(`/chat/${partner.id}`)}
                    >
                      <MessageCircle size={16} color={colors.primary} />
                      <Text style={styles.messageText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        {renderCallModal()}
      </ScrollView>
    );
  }

  // Client POV Homepage
  return (
    <ScrollView style={styles.container}>
      {/* ARCHILINK Header */}
      <View style={styles.globalHeader}>
        <Text style={styles.globalHeaderTitle}>ARCHILINK</Text>
      </View>

      {/* Advertisement Slider with Overlay */}
      <View style={styles.carouselContainer}>
        <Image
          source={{ uri: advertisements[currentAdIndex].image }}
          style={styles.carouselImage}
        />
        
        {/* Navigation Arrow - Right Only */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextAd}>
          <ChevronRight size={24} color={colors.white} />
        </TouchableOpacity>

        {/* Advertisement Overlay Card - Smaller */}
        <TouchableOpacity 
          style={styles.adOverlay}
          onPress={() => handleAdPress(advertisements[currentAdIndex])}
        >
          <Text style={styles.adTitle}>{advertisements[currentAdIndex].title}</Text>
          <Text style={styles.adSubtitle}>{advertisements[currentAdIndex].subtitle}</Text>
          <View style={styles.adLocationContainer}>
            <MapPin size={14} color={colors.white} />
            <Text style={styles.adLocation}>{advertisements[currentAdIndex].location}</Text>
          </View>
          <View style={styles.visitButton}>
            <Text style={styles.visitButtonText}>Visit</Text>
            <ChevronRight size={14} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {advertisements.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentAdIndex && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        {/* Welcome Message */}
        <Text style={styles.welcomeText}>
          Welcome, {user?.fullName || 'User'}!
        </Text>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search by name, expertise, city etc..</Text>
        </TouchableOpacity>

        {/* Top 10 Recommended Architects - Carousel Layout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top 10 Recommended Architects</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.architectsCarousel}
            contentContainerStyle={styles.architectsCarouselContent}
          >
            {architects.map((architect) => (
              <TouchableOpacity 
                key={architect.id} 
                style={styles.architectCarouselCard}
                onPress={() => router.push(`/user-profile/${architect.id}`)}
              >
                <Image
                  source={{ uri: architect.image }}
                  style={styles.architectCarouselImage}
                />
                <View style={styles.architectCarouselInfo}>
                  <Text style={styles.architectCarouselName}>{architect.name}</Text>
                  <Text style={styles.architectCarouselSpecialty}>{architect.specialty}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{architect.rating}</Text>
                    <Text style={styles.reviewCount}>({architect.reviews})</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <MapPin size={10} color={colors.gray} />
                    <Text style={styles.locationText}>{architect.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Stories</Text>
            <TouchableOpacity onPress={handleStoriesViewMore}>
              <Text style={styles.seeAllText}>View More</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.storyCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
              style={styles.storyImage}
            />
            <View style={styles.storyContent}>
              <Text style={styles.storyTitle}>Modern Home Design Trends 2024</Text>
              <Text style={styles.storyDescription}>
                Discover the latest trends in modern home architecture and interior design that are shaping the future of residential spaces.
              </Text>
              <View style={styles.storyActions}>
                <TouchableOpacity 
                  style={styles.readPostButton}
                  onPress={() => handleReadPost('story_1')}
                >
                  <Text style={styles.readPostText}>Read Post</Text>
                </TouchableOpacity>
                <View style={styles.storyInteractions}>
                  <TouchableOpacity 
                    style={styles.storyActionButton}
                    onPress={() => handleLike('story_1')}
                  >
                    <Heart 
                      size={20} 
                      color={likedPosts.has('story_1') ? '#FF3040' : colors.gray}
                      fill={likedPosts.has('story_1') ? '#FF3040' : 'none'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.storyActionButton}
                    onPress={() => handleComment('story_1')}
                  >
                    <MessageCircle size={20} color={colors.gray} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.storyCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
              style={styles.storyImage}
            />
            <View style={styles.storyContent}>
              <Text style={styles.storyTitle}>Sustainable Architecture: Building for the Future</Text>
              <Text style={styles.storyDescription}>
                Learn how sustainable architecture practices are revolutionizing the construction industry and creating eco-friendly buildings.
              </Text>
              <View style={styles.storyActions}>
                <TouchableOpacity 
                  style={styles.readPostButton}
                  onPress={() => handleReadPost('story_2')}
                >
                  <Text style={styles.readPostText}>Read Post</Text>
                </TouchableOpacity>
                <View style={styles.storyInteractions}>
                  <TouchableOpacity 
                    style={styles.storyActionButton}
                    onPress={() => handleLike('story_2')}
                  >
                    <Heart 
                      size={20} 
                      color={likedPosts.has('story_2') ? '#FF3040' : colors.gray}
                      fill={likedPosts.has('story_2') ? '#FF3040' : 'none'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.storyActionButton}
                    onPress={() => handleComment('story_2')}
                  >
                    <MessageCircle size={20} color={colors.gray} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Why Find an Architect with Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Find an Architect with Us?</Text>
          
          <View style={styles.infoCardsContainer}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Users size={24} color={colors.primary} />
              </View>
              <Text style={styles.infoCardTitle}>Verified Professionals</Text>
              <Text style={styles.infoCardDescription}>
                All architects are licensed and verified professionals with proven track records.
              </Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Award size={24} color={colors.primary} />
              </View>
              <Text style={styles.infoCardTitle}>Quality Assurance</Text>
              <Text style={styles.infoCardDescription}>
                We ensure high-quality work through our rigorous vetting process and client reviews.
              </Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Shield size={24} color={colors.primary} />
              </View>
              <Text style={styles.infoCardTitle}>Secure Platform</Text>
              <Text style={styles.infoCardDescription}>
                Your projects and payments are protected through our secure platform and escrow system.
              </Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Clock size={24} color={colors.primary} />
              </View>
              <Text style={styles.infoCardTitle}>24/7 Support</Text>
              <Text style={styles.infoCardDescription}>
                Get round-the-clock support for your projects and any questions you may have.
              </Text>
            </View>
          </View>
        </View>
      </View>
      {renderCallModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  carouselContainer: {
    height: 200,
    position: 'relative',
  },
  carouselImage: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  nextButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: '40%',
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
  },
  adTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 2,
  },
  adSubtitle: {
    fontSize: 11,
    color: colors.white,
    marginBottom: 4,
  },
  adLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  adLocation: {
    fontSize: 10,
    color: colors.white,
    marginLeft: 4,
    numberOfLines: 1,
  },
  visitButton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  visitButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: 2,
    fontSize: 10,
  },
  paginationContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.white,
  },
  content: {
    padding: 20,
  },
  globalHeader: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  globalHeaderTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 25,
  },
  // Architect-specific styles
  dashboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  dashboardCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dashboardCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  dashboardLabel: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  postSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 18,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  postInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  postPlaceholder: {
    color: colors.gray,
    fontSize: 16,
  },
  postButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  postButtonText: {
    marginLeft: 8,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  projectsScroll: {
    marginTop: 15,
  },
  projectCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginRight: 15,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  projectInfo: {
    padding: 12,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  projectLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectLocationText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  inquiryCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inquiryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  verifiedIcon: {
    marginLeft: 5,
  },
  inquiryDate: {
    fontSize: 12,
    color: colors.gray,
  },
  inquiryDescription: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 15,
  },
  inquiryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
  },
  viewDetailsText: {
    color: colors.primary,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  respondButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  respondText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  partnerCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  partnerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 18,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  partnerDescription: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
    lineHeight: 18,
  },
  partnerButtons: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 12,
  },
  visitWebsiteButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  visitWebsiteText: {
    color: colors.white,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  messageButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  messageText: {
    color: colors.primary,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  // Client-specific styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: colors.gray,
  },
  section: {
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  // Carousel styles for architects
  architectsCarousel: {
    marginTop: 18,
  },
  architectsCarouselContent: {
    paddingRight: 25,
  },
  architectCarouselCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 160,
    marginRight: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  architectCarouselImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  architectCarouselInfo: {
    padding: 15,
  },
  architectCarouselName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  architectCarouselSpecialty: {
    fontSize: 11,
    color: colors.primary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 11,
    color: colors.gray,
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
    color: colors.gray,
    marginLeft: 4,
  },
  storyCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  storyContent: {
    padding: 18,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storyDescription: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 15,
  },
  storyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readPostButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  readPostText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  storyInteractions: {
    flexDirection: 'row',
    gap: 15,
  },
  storyActionButton: {
    padding: 5,
  },
  infoCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 18,
    width: '47%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIconContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoCardDescription: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 16,
  },
  viewAllButton: {
    alignSelf: 'flex-end',
    marginBottom: 18,
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