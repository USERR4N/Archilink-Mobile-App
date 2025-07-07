import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Search, ArrowLeft, MessageCircle } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function FollowingListScreen() {
  const { followedUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock following list - in real app this would come from API
  const followingList = [
    {
      id: '1',
      name: 'Maria Santos',
      specialty: 'Interior Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      isOnline: true
    },
    {
      id: '2',
      name: 'John Dela Cruz',
      specialty: 'Property Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      isVerified: false,
      isOnline: false
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      specialty: 'Real Estate Agent',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      isOnline: true
    },
    {
      id: '4',
      name: 'Michael Chen',
      specialty: 'Construction Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      isOnline: false
    }
  ];

  const filteredFollowing = followingList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageUser = (userId: string, userName: string) => {
    router.push(`/chat/${userId}?name=${userName}`);
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
        <Text style={styles.headerTitle}>Following</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={18} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search following..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      {/* Following List */}
      <ScrollView style={styles.followingList}>
        {filteredFollowing.length > 0 ? (
          filteredFollowing.map((user) => (
            <TouchableOpacity 
              key={user.id} 
              style={styles.userItem}
              onPress={() => handleMessageUser(user.id, user.name)}
            >
              <View style={styles.userImageContainer}>
                <Image source={{ uri: user.image }} style={styles.userImage} />
                {user.isOnline && <View style={styles.onlineIndicator} />}
                {user.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userSpecialty}>{user.specialty}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.messageButton}
                onPress={() => handleMessageUser(user.id, user.name)}
              >
                <MessageCircle size={20} color={colors.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No users found' : 'You are not following anyone yet'}
            </Text>
          </View>
        )}
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
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },
  followingList: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  userImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: colors.white,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.blue,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2,
  },
  userSpecialty: {
    fontSize: 14,
    color: colors.gray,
  },
  messageButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
});