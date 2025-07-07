import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, MapPin, Calendar, DollarSign, CheckCircle, MessageCircle, Heart, Share } from 'lucide-react-native';

export default function ClientPostScreen() {
  const { id } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [heartAnimation] = useState(new Animated.Value(1));

  // Mock data - in real app, fetch based on id
  const postData = {
    id: '1',
    clientName: 'John Smith',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isVerified: true,
    postedDate: '2 hours ago',
    title: 'Modern Residential Home Design Needed',
    description: 'Looking for an architect to design a modern residential home in Makati. The project involves creating a 3-bedroom, 2-bathroom house with an open floor plan. We want to incorporate sustainable design elements and maximize natural light. Budget is flexible for the right design that meets our vision.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    ],
    budget: '₱500,000 - ₱800,000',
    location: 'Makati City, Metro Manila',
    timeline: '6 months',
    projectType: 'Residential',
    requirements: [
      '3 bedrooms, 2 bathrooms',
      'Open floor plan',
      'Sustainable design elements',
      'Maximize natural light',
      'Modern aesthetic',
      'Parking for 2 cars'
    ],
    likes: 24,
    comments: 8,
    hashtags: ['#needanarchitect', '#moderndesign', '#residential', '#makati']
  };

  const handleRespond = () => {
    router.push(`/chat/client_001`);
  };

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (newLikedState) {
      // Animate heart when liked
      Animated.sequence([
        Animated.timing(heartAnimation, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleComment = () => {
    // Handle comment functionality - could navigate to comments screen
    console.log('Comment on post:', id);
  };

  const handleShare = () => {
    // Handle share functionality
    console.log('Share post:', id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Client Info */}
        <View style={styles.clientSection}>
          <Image source={{ uri: postData.clientImage }} style={styles.clientImage} />
          <View style={styles.clientInfo}>
            <View style={styles.clientNameRow}>
              <Text style={styles.clientName}>{postData.clientName}</Text>
              {postData.isVerified && (
                <CheckCircle size={16} color="#1DA1F2" style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.postedDate}>{postData.postedDate}</Text>
          </View>
        </View>

        {/* Project Title */}
        <Text style={styles.projectTitle}>{postData.title}</Text>

        {/* Project Images */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesContainer}>
          {postData.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.projectImage} />
          ))}
        </ScrollView>

        {/* Project Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Project Description</Text>
          <Text style={styles.description}>{postData.description}</Text>
          
          <View style={styles.hashtagsContainer}>
            {postData.hashtags.map((hashtag, index) => (
              <Text key={index} style={styles.hashtag}>{hashtag}</Text>
            ))}
          </View>
        </View>

        {/* Project Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Project Details</Text>
          
          <View style={styles.detailRow}>
            <DollarSign size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Budget</Text>
              <Text style={styles.detailValue}>{postData.budget}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <MapPin size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{postData.location}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Calendar size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Timeline</Text>
              <Text style={styles.detailValue}>{postData.timeline}</Text>
            </View>
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.requirementsSection}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          {postData.requirements.map((requirement, index) => (
            <View key={index} style={styles.requirementItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.requirementText}>{requirement}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Animated.View style={{ transform: [{ scale: heartAnimation }] }}>
              <Heart 
                size={24} 
                color={isLiked ? '#FF3040' : colors.gray}
                fill={isLiked ? '#FF3040' : 'none'}
              />
            </Animated.View>
            <Text style={styles.actionText}>{likeCount}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
            <MessageCircle size={24} color={colors.gray} />
            <Text style={styles.actionText}>{postData.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share size={24} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.respondButton} onPress={handleRespond}>
          <MessageCircle size={20} color={colors.white} />
          <Text style={styles.respondButtonText}>Respond to Project</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  clientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  clientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  postedDate: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  imagesContainer: {
    marginBottom: 25,
  },
  projectImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginRight: 15,
  },
  descriptionSection: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 15,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hashtag: {
    color: colors.primary,
    fontSize: 14,
  },
  detailsSection: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  requirementsSection: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  requirementText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
  actionsSection: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    gap: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 16,
    color: colors.gray,
  },
  bottomAction: {
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  respondButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    gap: 8,
  },
  respondButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});