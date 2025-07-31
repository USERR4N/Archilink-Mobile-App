import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Heart, MessageCircle, Bookmark, Share, CheckCircle } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

const { width } = Dimensions.get('window');

export default function PostDetailScreen() {
  const { darkMode } = useAuthStore();
  const { id } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(156);
  const [heartAnimation] = useState(new Animated.Value(1));
  const [bookmarkAnimation] = useState(new Animated.Value(1));

  // Mock post data based on ID
  const getPostData = () => {
    switch (id) {
      case 'story_1':
        return {
          id: 'story_1',
          author: {
            name: 'Modern Architecture Studio',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            isVerified: true,
            specialty: 'Modern Architecture'
          },
          title: 'Modern Home Design Trends 2024',
          content: `Discover the latest trends in modern home architecture and interior design that are shaping the future of residential spaces.

In 2024, we're seeing a significant shift towards sustainable and smart home technologies. Homeowners are increasingly prioritizing energy efficiency, natural materials, and flexible living spaces that can adapt to changing needs.

Key trends include:

• Biophilic Design: Incorporating natural elements like living walls, natural light, and organic materials to create a connection with nature.

• Flexible Spaces: Multi-functional rooms that can serve as home offices, gyms, or entertainment areas depending on the time of day.

• Smart Integration: Seamless integration of technology that enhances daily life without being intrusive.

• Sustainable Materials: Use of recycled, renewable, and locally-sourced materials to reduce environmental impact.

• Minimalist Aesthetics: Clean lines, neutral colors, and clutter-free spaces that promote mental well-being.

The future of residential design is about creating homes that are not just beautiful, but also functional, sustainable, and adaptable to our evolving lifestyles.`,
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          timePosted: '2 hours ago',
          likes: 156,
          comments: 23,
          hashtags: ['#modernarchitecture', '#design2024', '#sustainability', '#smartliving']
        };
      case 'story_2':
        return {
          id: 'story_2',
          author: {
            name: 'Green Building Council',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            isVerified: true,
            specialty: 'Sustainable Architecture'
          },
          title: 'Sustainable Architecture: Building for the Future',
          content: `Learn how sustainable architecture practices are revolutionizing the construction industry and creating eco-friendly buildings.

Sustainable architecture is no longer just a trend—it's becoming the standard for responsible building design. As climate change concerns grow, architects and builders are embracing innovative approaches to create structures that minimize environmental impact while maximizing efficiency and comfort.

Core Principles of Sustainable Architecture:

• Energy Efficiency: Designing buildings that require minimal energy for heating, cooling, and lighting through proper orientation, insulation, and natural ventilation.

• Water Conservation: Implementing rainwater harvesting, greywater recycling, and drought-resistant landscaping to reduce water consumption.

• Material Selection: Choosing renewable, recycled, and locally-sourced materials to reduce carbon footprint and support local economies.

• Waste Reduction: Designing for disassembly and implementing construction waste management strategies.

• Indoor Environmental Quality: Creating healthy indoor environments with natural light, proper ventilation, and non-toxic materials.

The benefits extend beyond environmental impact—sustainable buildings often have lower operating costs, higher property values, and provide healthier living and working environments for occupants.`,
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          timePosted: '4 hours ago',
          likes: 203,
          comments: 31,
          hashtags: ['#sustainablearchitecture', '#greenbuilding', '#ecofriendly', '#climateaction']
        };
      default:
        return null;
    }
  };

  const postData = getPostData();

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.white,
    },
    header: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#333' : colors.lightGray,
    },
    headerTitle: {
      color: darkMode ? colors.white : colors.primary,
      fontSize: 18,
      fontWeight: 'bold',
    },
    authorName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
    },
    postTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      paddingHorizontal: 20,
      marginBottom: 15,
      lineHeight: 28,
    },
    likesText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 5,
    },
    commentsText: {
      fontSize: 14,
      color: colors.gray,
    },
    postContent: {
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      lineHeight: 24,
      marginBottom: 20,
    },
  });

  if (!postData) {
    return (
      <View style={dynamicStyles.container}>
        <Text style={{ color: darkMode ? colors.white : colors.black }}>Post not found</Text>
      </View>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (newLikedState) {
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

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    
    if (newSavedState) {
      Animated.sequence([
        Animated.timing(bookmarkAnimation, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bookmarkAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleComment = () => {
    router.push(`/comments/${postData.id}`);
  };

  const handleShare = () => {
    // Handle share functionality
    console.log('Share post:', postData.id);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={darkMode ? colors.white : colors.primary} />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>Post</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* Author Info */}
          <View style={styles.authorSection}>
            <Image source={{ uri: postData.author.image }} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <View style={styles.authorNameRow}>
                <Text style={dynamicStyles.authorName}>{postData.author.name}</Text>
                {postData.author.isVerified && (
                  <CheckCircle size={16} color="#1DA1F2" style={styles.verifiedIcon} />
                )}
              </View>
              <Text style={styles.authorSpecialty}>{postData.author.specialty}</Text>
              <Text style={styles.timePosted}>{postData.timePosted}</Text>
            </View>
          </View>

          {/* Post Title */}
          <Text style={dynamicStyles.postTitle}>{postData.title}</Text>

          {/* Post Image */}
          <Image source={{ uri: postData.image }} style={styles.postImage} />

          {/* Post Actions */}
          <View style={styles.actionsSection}>
            <View style={styles.leftActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                <Animated.View style={{ transform: [{ scale: heartAnimation }] }}>
                  <Heart 
                    size={24} 
                    color={isLiked ? '#FF3040' : (darkMode ? colors.white : colors.black)}
                    fill={isLiked ? '#FF3040' : 'none'}
                  />
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
                <MessageCircle size={24} color={darkMode ? colors.white : colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Share size={24} color={darkMode ? colors.white : colors.black} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <Animated.View style={{ transform: [{ scale: bookmarkAnimation }] }}>
                <Bookmark 
                  size={24} 
                  color={darkMode ? colors.white : colors.black}
                  fill={isSaved ? (darkMode ? colors.white : colors.black) : 'none'}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Likes and Comments Count */}
          <View style={styles.statsSection}>
            <Text style={dynamicStyles.likesText}>
              {likeCount} likes
            </Text>
            <TouchableOpacity onPress={handleComment}>
              <Text style={dynamicStyles.commentsText}>
                View all {postData.comments} comments
              </Text>
            </TouchableOpacity>
          </View>

          {/* Post Content */}
          <View style={styles.contentSection}>
            <Text style={dynamicStyles.postContent}>{postData.content}</Text>
            
            <View style={styles.hashtagsContainer}>
              {postData.hashtags.map((hashtag, index) => (
                <Text key={index} style={styles.hashtag}>{hashtag}</Text>
              ))}
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
    backgroundColor: colors.white,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  authorSpecialty: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  timePosted: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    paddingHorizontal: 20,
    marginBottom: 15,
    lineHeight: 28,
  },
  postImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    padding: 5,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  likesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  commentsText: {
    fontSize: 14,
    color: colors.gray,
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  postContent: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 20,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hashtag: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});