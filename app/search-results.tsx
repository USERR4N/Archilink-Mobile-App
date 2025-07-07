import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { architects } from '@/constants/architects';
import { services } from '@/constants/services';
import { Search, ArrowLeft, CheckCircle, UserPlus, UserMinus } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

const topRecommendedArchitects = architects.slice(0, 4);
const discoverMoreArchitects = architects.slice(4);

export default function SearchResultsScreen() {
  const { type, query } = useLocalSearchParams<{ type: string; query: string }>();
  const { user, followUser, unfollowUser, isFollowing } = useAuthStore();

  const handleBack = () => {
    router.back();
  };

  const handleLinkUp = (id: number, name: string) => {
    if (type === 'architects') {
      router.push(`/user-profile/${id}`);
    } else {
      // Handle service provider link up
      console.log('Link up with service:', name);
    }
  };

  const handleFollow = (id: number, name: string) => {
    const userId = id.toString();
    if (isFollowing(userId)) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  const renderCard = (item: any, isTopRecommended = false) => (
    <TouchableOpacity 
      key={item.id} 
      style={[styles.card, isTopRecommended && styles.topRecommendedCard]}
      onPress={() => type === 'architects' ? router.push(`/user-profile/${item.id}`) : null}
    >
      <Text style={styles.cardName}>{item.name}</Text>
      <View style={styles.profileIconContainer}>
        <Image 
          source={{ uri: item.image }}
          style={styles.profileImage}
          defaultSource={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
        />
        {item.isVerified && (
          <View style={styles.verificationBadge}>
            <CheckCircle size={20} color={colors.blue} fill={colors.blue} />
          </View>
        )}
      </View>
      {type === 'services' && (
        <Text style={styles.categoryText}>{item.category}</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.followButton, isFollowing(item.id.toString()) && styles.followingButton]}
          onPress={() => handleFollow(item.id, item.name)}
        >
          {isFollowing(item.id.toString()) ? (
            <UserMinus size={16} color={colors.white} />
          ) : (
            <UserPlus size={16} color={colors.primary} />
          )}
          <Text style={[styles.followButtonText, isFollowing(item.id.toString()) && styles.followingButtonText]}>
            {isFollowing(item.id.toString()) ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.linkUpButton}
          onPress={() => handleLinkUp(item.id, item.name)}
        >
          <Text style={styles.linkUpButtonText}>{type === 'architects' ? 'Link Up' : 'Contact'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={query || ''}
            placeholder={`Search ${type === 'architects' ? 'architects' : 'services'}...`}
            placeholderTextColor={colors.gray}
            editable={false}
          />
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.resultsTitle}>
            Showing results for <Text style={styles.queryHighlight}>{query}</Text>
          </Text>

          {/* Top Recommended Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Recommended</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              <View style={styles.horizontalContainer}>
                {(type === 'architects' ? topRecommendedArchitects : services.slice(0, 4)).map(item => renderCard(item, true))}
              </View>
            </ScrollView>
          </View>

          {/* Discover More Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Discover More</Text>
            <View style={styles.gridContainer}>
              {(type === 'architects' ? discoverMoreArchitects : services.slice(4)).map(item => renderCard(item, false))}
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
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 20,
  },
  queryHighlight: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  horizontalScroll: {
    marginHorizontal: -20,
  },
  horizontalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    maxWidth: '48%',
    minWidth: 150,
  },
  topRecommendedCard: {
    width: 160,
    minWidth: 160,
    flex: 0,
    maxWidth: undefined,
  },
  cardName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  followButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  followingButton: {
    backgroundColor: colors.primary,
  },
  followingButtonText: {
    color: colors.white,
  },
  profileIconContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.white,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 2,
  },
  linkUpButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
  },
  linkUpButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});