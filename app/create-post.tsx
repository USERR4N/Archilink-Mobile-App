import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Camera, Video, Briefcase, MapPin, Users, Globe } from 'lucide-react-native';

export default function CreatePostScreen() {
  const { type } = useLocalSearchParams();
  const [postText, setPostText] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('public');
  const [location, setLocation] = useState('');

  const handlePost = () => {
    if (!postText.trim()) {
      Alert.alert('Error', 'Please write something to post');
      return;
    }
    
    // Here you would typically save the post
    Alert.alert('Success', 'Your post has been published!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const getPostTypeIcon = () => {
    switch (type) {
      case 'video':
        return <Video size={24} color={colors.primary} />;
      case 'photo':
        return <Camera size={24} color={colors.primary} />;
      case 'project':
        return <Briefcase size={24} color={colors.primary} />;
      default:
        return <Globe size={24} color={colors.primary} />;
    }
  };

  const getPostTypeTitle = () => {
    switch (type) {
      case 'video':
        return 'Share a Video';
      case 'photo':
        return 'Share a Photo';
      case 'project':
        return 'Showcase Project';
      default:
        return 'Create Post';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getPostTypeTitle()}</Text>
        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Architect</Text>
            <TouchableOpacity style={styles.audienceSelector}>
              <Users size={16} color={colors.gray} />
              <Text style={styles.audienceText}>
                {selectedAudience === 'public' ? 'Public' : 'Connections'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postTypeIcon}>
            {getPostTypeIcon()}
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <TextInput
            style={styles.postInput}
            placeholder={`What's on your mind? ${type === 'project' ? 'Share your latest project...' : ''}`}
            placeholderTextColor={colors.gray}
            multiline
            value={postText}
            onChangeText={setPostText}
            textAlignVertical="top"
          />
        </View>

        {/* Media Section */}
        {type && (
          <View style={styles.mediaSection}>
            <TouchableOpacity style={styles.mediaButton}>
              <View style={styles.mediaPlaceholder}>
                {getPostTypeIcon()}
                <Text style={styles.mediaText}>
                  {type === 'video' ? 'Add Video' : type === 'photo' ? 'Add Photo' : 'Add Project Images'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Location Section */}
        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.locationLabel}>Add Location</Text>
          </View>
          <TextInput
            style={styles.locationInput}
            placeholder="Where are you?"
            placeholderTextColor={colors.gray}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Project Details (if project type) */}
        {type === 'project' && (
          <View style={styles.projectDetails}>
            <Text style={styles.sectionTitle}>Project Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Project Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter project name"
                placeholderTextColor={colors.gray}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Client</Text>
              <TextInput
                style={styles.input}
                placeholder="Client name (optional)"
                placeholderTextColor={colors.gray}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Project Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Residential, Commercial, etc."
                placeholderTextColor={colors.gray}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Completion Date</Text>
              <TextInput
                style={styles.input}
                placeholder="When was this completed?"
                placeholderTextColor={colors.gray}
              />
            </View>
          </View>
        )}
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
  postButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  audienceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audienceText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 4,
  },
  postTypeIcon: {
    padding: 10,
  },
  postContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  postInput: {
    padding: 20,
    fontSize: 16,
    minHeight: 120,
    color: colors.black,
  },
  mediaSection: {
    marginBottom: 15,
  },
  mediaButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mediaPlaceholder: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },
  mediaText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  locationSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  locationInput: {
    fontSize: 16,
    color: colors.black,
    paddingVertical: 5,
  },
  projectDetails: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.black,
  },
});