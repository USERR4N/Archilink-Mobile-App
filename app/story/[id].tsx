import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { X } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface StoryData {
  id: string;
  name: string;
  image: string;
  projectImage: string;
  timePosted: string;
}

const storyData: Record<string, StoryData> = {
  '1': {
    id: '1',
    name: 'Olivia',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    projectImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    timePosted: '4 mins ago',
  },
  '2': {
    id: '2',
    name: 'Henry',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    timePosted: '12 mins ago',
  },
  '3': {
    id: '3',
    name: 'Lucas',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    timePosted: '25 mins ago',
  },
  '4': {
    id: '4',
    name: 'Hontiveros',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    timePosted: '1 hour ago',
  },
  '5': {
    id: '5',
    name: 'Amelia',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    timePosted: '2 hours ago',
  },
  '6': {
    id: '6',
    name: 'James',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    projectImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    timePosted: '3 hours ago',
  },
};

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const [progress, setProgress] = useState(0);
  const story = storyData[id as string];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          router.back();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    router.back();
  };

  const handleScreenPress = () => {
    // Skip to next story or close if it's the last one
    router.back();
  };

  if (!story) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="black" />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: story.image }} style={styles.userAvatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{story.name}</Text>
            <Text style={styles.timePosted}>{story.timePosted}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Story Content */}
      <TouchableOpacity 
        style={styles.storyContent} 
        onPress={handleScreenPress}
        activeOpacity={1}
      >
        <Image source={{ uri: story.projectImage }} style={styles.storyImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    left: 15,
    right: 15,
    zIndex: 10,
  },
  progressBar: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  timePosted: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    padding: 5,
  },
  storyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
});