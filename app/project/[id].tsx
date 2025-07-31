import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft, MapPin, Calendar, DollarSign, User, MessageCircle, Star, Phone } from 'lucide-react-native';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { darkMode } = useAuthStore();

  // Mock project data - in a real app, this would come from an API
  const projectData = {
    '1': {
      id: '1',
      title: 'Home Renovation',
      architect: {
        name: 'John Smith',
        id: 'arch_001',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        completedProjects: 45,
        specialization: 'Residential Design'
      },
      status: 'In Progress',
      budget: '₱250,000',
      location: 'Makati City',
      startDate: 'June 15, 2025',
      expectedCompletion: 'December 15, 2025',
      progress: 35,
      description: 'Complete home renovation including kitchen remodel, bathroom updates, and living room redesign. Focus on modern aesthetics with sustainable materials.',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'
      ],
      features: [
        'Kitchen Remodel',
        'Bathroom Updates',
        'Living Room Redesign',
        'Sustainable Materials',
        'Modern Lighting'
      ],
      timeline: [
        { phase: 'Planning & Design', status: 'completed', date: 'June 15 - July 1' },
        { phase: 'Permits & Approvals', status: 'completed', date: 'July 1 - July 15' },
        { phase: 'Demolition', status: 'in-progress', date: 'July 15 - August 1' },
        { phase: 'Construction', status: 'pending', date: 'August 1 - November 15' },
        { phase: 'Finishing', status: 'pending', date: 'November 15 - December 15' }
      ]
    },
    '2': {
      id: '2',
      title: 'Office Interior Design',
      architect: {
        name: 'Maria Garcia',
        id: 'arch_002',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        completedProjects: 62,
        specialization: 'Commercial Design'
      },
      status: 'Planning',
      budget: '₱180,000',
      location: 'BGC, Taguig',
      startDate: 'July 1, 2025',
      expectedCompletion: 'October 1, 2025',
      progress: 15,
      description: 'Modern office interior design for a tech startup. Open floor plan with collaborative spaces, private meeting rooms, and recreational areas.',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
      ],
      features: [
        'Open Floor Plan',
        'Collaborative Spaces',
        'Private Meeting Rooms',
        'Recreational Areas',
        'Modern Lighting',
        'Ergonomic Furniture'
      ],
      timeline: [
        { phase: 'Initial Consultation', status: 'completed', date: 'July 1 - July 5' },
        { phase: 'Space Planning', status: 'in-progress', date: 'July 5 - July 20' },
        { phase: 'Design Development', status: 'pending', date: 'July 20 - August 10' },
        { phase: 'Construction', status: 'pending', date: 'August 10 - September 20' },
        { phase: 'Installation', status: 'pending', date: 'September 20 - October 1' }
      ]
    }
  };

  const project = projectData[id as keyof typeof projectData];

  if (!project) {
    return (
      <View style={[styles.container, { backgroundColor: darkMode ? '#000000' : colors.lightGray }]}>
        <View style={[styles.header, { backgroundColor: darkMode ? '#1a1a1a' : colors.primary }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Project Not Found</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: darkMode ? colors.white : colors.black }]}>Project not found</Text>
        </View>
      </View>
    );
  }

  const handleChatArchitect = () => {
    router.push(`/chat/${project.architect.id}`);
  };

  const handleViewArchitectProfile = () => {
    router.push(`/user-profile/${project.architect.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'pending': return '#9E9E9E';
      default: return colors.primary;
    }
  };

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'pending': return '#9E9E9E';
      default: return colors.gray;
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.lightGray,
    },
    header: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.primary,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    projectImageContainer: {
      height: 250,
      position: 'relative',
    },
    projectImage: {
      width: '100%',
      height: '100%',
    },
    statusBadge: {
      position: 'absolute',
      top: 15,
      right: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
    },
    statusText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    projectInfo: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      padding: 20,
      marginTop: -20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    projectTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 15,
    },
    infoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      marginBottom: 12,
    },
    infoText: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.gray,
      marginLeft: 8,
      flex: 1,
    },
    progressSection: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 12,
    },
    progressContainer: {
      marginBottom: 8,
    },
    progressBar: {
      height: 8,
      backgroundColor: darkMode ? '#333' : colors.lightGray,
      borderRadius: 4,
      marginBottom: 8,
    },
    progressFill: {
      height: 8,
      backgroundColor: colors.primary,
      borderRadius: 4,
    },
    progressText: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.gray,
      textAlign: 'right',
      fontWeight: '600',
    },
    description: {
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      lineHeight: 24,
      marginBottom: 25,
    },
    architectSection: {
      backgroundColor: darkMode ? '#2a2a2a' : '#F8F9FA',
      padding: 20,
      borderRadius: 12,
      marginBottom: 25,
    },
    architectHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    architectImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    architectInfo: {
      flex: 1,
    },
    architectName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 4,
    },
    architectSpecialization: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.gray,
      marginBottom: 4,
    },
    architectStats: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    ratingText: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.black,
      marginLeft: 4,
      fontWeight: '600',
    },
    projectsCount: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.gray,
    },
    architectActions: {
      flexDirection: 'row',
      marginTop: 15,
    },
    chatButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
      marginRight: 12,
      flex: 1,
      justifyContent: 'center',
    },
    chatButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    profileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#333' : colors.lightGray,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
      justifyContent: 'center',
    },
    profileButtonText: {
      color: darkMode ? colors.white : colors.black,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    featuresSection: {
      marginBottom: 25,
    },
    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    featureItem: {
      backgroundColor: darkMode ? '#333' : colors.primary + '20',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
    },
    featureText: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.primary,
      fontWeight: '600',
    },
    timelineSection: {
      marginBottom: 25,
    },
    timelineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    timelineIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 15,
    },
    timelineContent: {
      flex: 1,
    },
    timelinePhase: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 2,
    },
    timelineDate: {
      fontSize: 14,
      color: darkMode ? colors.white : colors.gray,
    },
    imagesSection: {
      marginBottom: 25,
    },
    imagesScroll: {
      paddingLeft: 20,
    },
    projectImageItem: {
      width: 200,
      height: 150,
      borderRadius: 12,
      marginRight: 12,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Details</Text>
      </View>

      <ScrollView style={dynamicStyles.content} showsVerticalScrollIndicator={false}>
        <View style={dynamicStyles.projectImageContainer}>
          <Image source={{ uri: project.images[0] }} style={dynamicStyles.projectImage} />
          <View style={[dynamicStyles.statusBadge, { backgroundColor: getStatusColor(project.status) + '90' }]}>
            <Text style={dynamicStyles.statusText}>{project.status}</Text>
          </View>
        </View>

        <View style={dynamicStyles.projectInfo}>
          <Text style={dynamicStyles.projectTitle}>{project.title}</Text>

          <View style={dynamicStyles.infoGrid}>
            <View style={dynamicStyles.infoItem}>
              <MapPin size={16} color={colors.primary} />
              <Text style={dynamicStyles.infoText}>{project.location}</Text>
            </View>
            <View style={dynamicStyles.infoItem}>
              <DollarSign size={16} color={colors.primary} />
              <Text style={dynamicStyles.infoText}>{project.budget}</Text>
            </View>
            <View style={dynamicStyles.infoItem}>
              <Calendar size={16} color={colors.primary} />
              <Text style={dynamicStyles.infoText}>Started: {project.startDate}</Text>
            </View>
            <View style={dynamicStyles.infoItem}>
              <Calendar size={16} color={colors.primary} />
              <Text style={dynamicStyles.infoText}>Expected: {project.expectedCompletion}</Text>
            </View>
          </View>

          <View style={dynamicStyles.progressSection}>
            <Text style={dynamicStyles.sectionTitle}>Progress</Text>
            <View style={dynamicStyles.progressContainer}>
              <View style={dynamicStyles.progressBar}>
                <View style={[dynamicStyles.progressFill, { width: `${project.progress}%` }]} />
              </View>
              <Text style={dynamicStyles.progressText}>{project.progress}% Complete</Text>
            </View>
          </View>

          <Text style={dynamicStyles.sectionTitle}>Description</Text>
          <Text style={dynamicStyles.description}>{project.description}</Text>

          <View style={dynamicStyles.architectSection}>
            <Text style={dynamicStyles.sectionTitle}>Architect</Text>
            <View style={dynamicStyles.architectHeader}>
              <Image source={{ uri: project.architect.image }} style={dynamicStyles.architectImage} />
              <View style={dynamicStyles.architectInfo}>
                <Text style={dynamicStyles.architectName}>{project.architect.name}</Text>
                <Text style={dynamicStyles.architectSpecialization}>{project.architect.specialization}</Text>
                <View style={dynamicStyles.architectStats}>
                  <View style={dynamicStyles.ratingContainer}>
                    <Star size={16} color="#FFD700" fill="#FFD700" />
                    <Text style={dynamicStyles.ratingText}>{project.architect.rating}</Text>
                  </View>
                  <Text style={dynamicStyles.projectsCount}>{project.architect.completedProjects} projects</Text>
                </View>
              </View>
            </View>
            <View style={dynamicStyles.architectActions}>
              <TouchableOpacity style={dynamicStyles.chatButton} onPress={handleChatArchitect}>
                <MessageCircle size={20} color={colors.white} />
                <Text style={dynamicStyles.chatButtonText}>Chat Architect</Text>
              </TouchableOpacity>
              <TouchableOpacity style={dynamicStyles.profileButton} onPress={handleViewArchitectProfile}>
                <User size={20} color={darkMode ? colors.white : colors.black} />
                <Text style={dynamicStyles.profileButtonText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={dynamicStyles.featuresSection}>
            <Text style={dynamicStyles.sectionTitle}>Project Features</Text>
            <View style={dynamicStyles.featuresGrid}>
              {project.features.map((feature, index) => (
                <View key={index} style={dynamicStyles.featureItem}>
                  <Text style={dynamicStyles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={dynamicStyles.timelineSection}>
            <Text style={dynamicStyles.sectionTitle}>Project Timeline</Text>
            {project.timeline.map((item, index) => (
              <View key={index} style={dynamicStyles.timelineItem}>
                <View style={[dynamicStyles.timelineIndicator, { backgroundColor: getTimelineStatusColor(item.status) }]} />
                <View style={dynamicStyles.timelineContent}>
                  <Text style={dynamicStyles.timelinePhase}>{item.phase}</Text>
                  <Text style={dynamicStyles.timelineDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {project.images.length > 1 && (
            <View style={dynamicStyles.imagesSection}>
              <Text style={dynamicStyles.sectionTitle}>Project Images</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={dynamicStyles.imagesScroll}>
                {project.images.map((image, index) => (
                  <Image key={index} source={{ uri: image }} style={dynamicStyles.projectImageItem} />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.black,
  },
});