import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { architects } from '@/constants/architects';
import { Heart, MessageCircle, Bookmark, ArrowLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Highlight {
  id: string;
  name: string;
  image: string;
  isVerified?: boolean;
  hasNewStory?: boolean;
}

interface Story {
  id: string;
  architect: {
    name: string;
    specialty: string;
    image: string;
    isVerified?: boolean;
  };
  image: string;
  caption: string;
  hashtags: string[];
  likes: number;
  timePosted: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

const highlights: Highlight[] = [
  {
    id: '1',
    name: 'Olivia',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    hasNewStory: true,
  },
  {
    id: '2',
    name: 'Henry',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    name: 'Lucas',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    hasNewStory: true,
  },
  {
    id: '4',
    name: 'Hontiveros',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    isVerified: true,
  },
  {
    id: '5',
    name: 'Amelia',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '6',
    name: 'James',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

const stories: Story[] = [
  {
    id: '1',
    architect: {
      name: 'Jose P. Dela Cruz',
      specialty: 'Sustainable Architecture',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Currently working on a modern residence at Makati City!',
    hashtags: ['#workinghard', '#architect', '#openforclients'],
    likes: 24,
    timePosted: '5 hours ago',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    architect: {
      name: 'Cynthia Lopez',
      specialty: 'Residential Architect',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      isVerified: true,
    },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Excited to share this beautiful family home we just completed in Quezon City. The clients wanted a modern yet cozy space for their growing family.',
    hashtags: ['#residential', '#modern', '#familyhome', '#architecture'],
    likes: 156,
    timePosted: '8 hours ago',
    isLiked: true,
    isSaved: true,
  },
  {
    id: '3',
    architect: {
      name: 'Miguel Santos',
      specialty: 'Commercial Architecture',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'New office building project in BGC is taking shape! Love how the glass facade reflects the city skyline.',
    hashtags: ['#commercial', '#office', '#BGC', '#glassarchitecture'],
    likes: 89,
    timePosted: '1 day ago',
    isLiked: false,
    isSaved: false,
  },
];

export default function StoriesScreen() {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set(['2']));
  const [savedStories, setSavedStories] = useState<Set<string>>(new Set(['2']));

  const handleHighlightPress = (highlight: Highlight) => {
    router.push(`/story/${highlight.id}`);
  };

  const handleLike = (storyId: string) => {
    const newLikedStories = new Set(likedStories);
    if (newLikedStories.has(storyId)) {
      newLikedStories.delete(storyId);
    } else {
      newLikedStories.add(storyId);
    }
    setLikedStories(newLikedStories);
  };

  const handleSave = (storyId: string) => {
    const newSavedStories = new Set(savedStories);
    if (newSavedStories.has(storyId)) {
      newSavedStories.delete(storyId);
    } else {
      newSavedStories.add(storyId);
    }
    setSavedStories(newSavedStories);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ARCHILINK</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Highlights Section */}
        <View style={styles.highlightsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.highlightsContent}
          >
            {highlights.map((highlight) => (
              <TouchableOpacity
                key={highlight.id}
                style={styles.highlightItem}
                onPress={() => handleHighlightPress(highlight)}
              >
                <View style={[
                  styles.highlightImageContainer,
                  highlight.hasNewStory && styles.highlightWithStory
                ]}>
                  <Image source={{ uri: highlight.image }} style={styles.highlightImage} />
                  {highlight.isVerified && (
                    <View style={styles.verificationBadge}>
                      <View style={styles.verificationIcon} />
                    </View>
                  )}
                </View>
                <Text style={styles.highlightName}>{highlight.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Start a Post Button */}
        <View style={styles.startPostContainer}>
          <TouchableOpacity 
            style={styles.startPostButton}
            onPress={() => router.push('/create-post')}
          >
            <Text style={styles.startPostText}>Start a Post</Text>
          </TouchableOpacity>
        </View>

        {/* Stories Feed */}
        <View style={styles.storiesContainer}>
          {stories.map((story) => (
            <View key={story.id} style={styles.storyCard}>
              {/* Story Header */}
              <View style={styles.storyHeader}>
                <Image source={{ uri: story.architect.image }} style={styles.architectAvatar} />
                <View style={styles.architectInfo}>
                  <View style={styles.architectNameContainer}>
                    <Text style={styles.architectName}>{story.architect.name}</Text>
                    {story.architect.isVerified && (
                      <View style={styles.verificationBadgeSmall}>
                        <View style={styles.verificationIconSmall} />
                      </View>
                    )}
                  </View>
                  <Text style={styles.architectSpecialty}>{story.architect.specialty}</Text>
                </View>
              </View>

              {/* Story Image */}
              <Image source={{ uri: story.image }} style={styles.storyImage} />

              {/* Story Actions */}
              <View style={styles.storyActions}>
                <View style={styles.leftActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleLike(story.id)}
                  >
                    <Heart 
                      size={24} 
                      color={likedStories.has(story.id) ? '#FF3040' : colors.black}
                      fill={likedStories.has(story.id) ? '#FF3040' : 'none'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MessageCircle size={24} color={colors.black} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSave(story.id)}
                >
                  <Bookmark 
                    size={24} 
                    color={colors.black}
                    fill={savedStories.has(story.id) ? colors.black : 'none'}
                  />
                </TouchableOpacity>
              </View>

              {/* Story Content */}
              <View style={styles.storyContent}>
                <Text style={styles.likesText}>
                  Liked by <Text style={styles.boldText}>John Doe</Text> and{' '}
                  <Text style={styles.boldText}>others</Text>
                </Text>
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>
                    <Text style={styles.boldText}>{story.architect.name}</Text> {story.caption}
                  </Text>
                  <Text style={styles.hashtagsText}>
                    {story.hashtags.join(' ')}
                  </Text>
                </View>
                <Text style={styles.timePosted}>{story.timePosted}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  placeholder: {
    width: 34,
  },
  highlightsContainer: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  highlightsContent: {
    paddingHorizontal: 15,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  highlightImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 2,
    marginBottom: 5,
  },
  highlightWithStory: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
  highlightImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1DA1F2',
  },
  highlightName: {
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
  },
  storiesContainer: {
    flex: 1,
  },
  storyCard: {
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  architectAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  architectInfo: {
    flex: 1,
  },
  architectNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  architectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginRight: 5,
  },
  verificationBadgeSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1DA1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationIconSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  architectSpecialty: {
    fontSize: 14,
    color: colors.gray,
  },
  storyImage: {
    width: width,
    height: 400,
    resizeMode: 'cover',
  },
  storyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  storyContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  likesText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  captionContainer: {
    marginBottom: 5,
  },
  captionText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 5,
  },
  hashtagsText: {
    fontSize: 14,
    color: colors.primary,
    lineHeight: 20,
  },
  timePosted: {
    fontSize: 12,
    color: colors.gray,
  },
  startPostContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  startPostButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  startPostText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});