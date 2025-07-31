import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Search, ArrowLeft, Users, Wrench, Filter, Star, MapPin, CheckCircle, X, UserPlus } from 'lucide-react-native';
import { architects } from '@/constants/architects';
import { services } from '@/constants/services';
import { useAuthStore } from '@/store/authStore';

type SearchType = 'architects' | 'services';

type FilterOptions = {
  location: string;
  rating: number;
  verified: boolean;
  specialty?: string;
  category?: string;
};

export default function SearchScreen() {
  const { darkMode } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<SearchType>('architects');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    rating: 0,
    verified: false,
    specialty: '',
    category: ''
  });

  const handleBack = () => {
    router.back();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search-results',
        params: { type: activeType, query: searchQuery }
      });
    }
  };

  const getFilteredData = () => {
    const data = activeType === 'architects' ? architects : services;
    return data.filter(item => {
      const matchesQuery = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (activeType === 'architects' && (item as any).specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (activeType === 'services' && (item as any).category.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLocation = filters.location === '' || item.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRating = filters.rating === 0 || item.rating >= filters.rating;
      const matchesVerified = !filters.verified || item.isVerified;
      
      return matchesQuery && matchesLocation && matchesRating && matchesVerified;
    });
  };

  const handleFollow = (id: number) => {
    // Handle follow functionality
    console.log('Follow user:', id);
  };

  const renderUserCard = (item: any) => {
    const isArchitect = activeType === 'architects';
    
    return (
      <TouchableOpacity 
        key={item.id} 
        style={dynamicStyles.userCard}
        onPress={() => router.push(`/user-profile/${item.id}`)}
      >
        <View style={styles.userCardHeader}>
          <Image source={{ uri: item.image }} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={dynamicStyles.userName}>{item.name}</Text>
              {item.isVerified && (
                <CheckCircle size={16} color={colors.primary} style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={dynamicStyles.userSpecialty}>
              {isArchitect ? item.specialty : item.category}
            </Text>
            <View style={styles.userMeta}>
              <MapPin size={12} color={colors.gray} />
              <Text style={styles.userLocation}>{item.location}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.followButton}
            onPress={() => handleFollow(item.id)}
          >
            <UserPlus size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.userStats}>
          <View style={styles.statItem}>
            <Star size={14} color={colors.warning} />
            <Text style={dynamicStyles.statText}>{item.rating}</Text>
            <Text style={styles.statLabel}>({item.reviews} reviews)</Text>
          </View>
          {isArchitect && (
            <View style={styles.statItem}>
              <Text style={dynamicStyles.statText}>{item.projects}</Text>
              <Text style={styles.statLabel}>projects</Text>
            </View>
          )}
          <View style={styles.statItem}>
            <Text style={dynamicStyles.statText}>{isArchitect ? item.followers : item.followers}</Text>
            <Text style={styles.statLabel}>followers</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={dynamicStyles.filterModal}>
          <View style={styles.filterHeader}>
            <Text style={dynamicStyles.filterTitle}>Filter Results</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <X size={24} color={darkMode ? colors.white : colors.black} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filterContent}>
            <View style={styles.filterSection}>
              <Text style={dynamicStyles.filterSectionTitle}>Location</Text>
              <TextInput
                style={dynamicStyles.filterInput}
                placeholder="Enter city or area"
                placeholderTextColor={colors.gray}
                value={filters.location}
                onChangeText={(text) => setFilters({...filters, location: text})}
              />
            </View>
            
            <View style={styles.filterSection}>
              <Text style={dynamicStyles.filterSectionTitle}>Minimum Rating</Text>
              <View style={styles.ratingOptions}>
                {[0, 4.0, 4.5, 4.8].map(rating => (
                  <TouchableOpacity
                    key={rating}
                    style={[styles.ratingOption, filters.rating === rating && styles.activeRatingOption]}
                    onPress={() => setFilters({...filters, rating})}
                  >
                    <Text style={[styles.ratingOptionText, filters.rating === rating && styles.activeRatingOptionText]}>
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.filterSection}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setFilters({...filters, verified: !filters.verified})}
              >
                <View style={[styles.checkbox, filters.verified && styles.checkedCheckbox]}>
                  {filters.verified && <CheckCircle size={16} color={colors.white} />}
                </View>
                <Text style={dynamicStyles.checkboxLabel}>Verified only</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setFilters({ location: '', rating: 0, verified: false, specialty: '', category: '' })}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderToggleButton = (type: SearchType, label: string, icon: React.ReactNode) => (
    <TouchableOpacity
      style={[styles.toggleButton, activeType === type && styles.activeToggleButton]}
      onPress={() => setActiveType(type)}
    >
      <View style={[styles.toggleIcon, activeType === type && styles.activeToggleIcon]}>
        {icon}
      </View>
      <Text style={[styles.toggleText, activeType === type && styles.activeToggleText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.lightGray,
    },
    header: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.primary,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      color: colors.white,
      fontSize: 20,
      fontWeight: 'bold',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
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
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 20,
    },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      borderRadius: 12,
      padding: 4,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    resultsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 15,
    },
    userCard: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginRight: 6,
    },
    userSpecialty: {
      fontSize: 14,
      color: colors.gray,
      marginBottom: 4,
    },
    statText: {
      fontSize: 14,
      fontWeight: '600',
      color: darkMode ? colors.white : colors.black,
    },
    filterModal: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
    },
    filterTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
    },
    filterSectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 12,
    },
    filterInput: {
      borderWidth: 1,
      borderColor: darkMode ? '#333' : colors.lightGray,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
    },
    checkboxLabel: {
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
    },
  });

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>Search</Text>
        </View>

        <View style={dynamicStyles.searchContainer}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={dynamicStyles.searchInput}
            placeholder={`Search ${activeType === 'architects' ? 'architects by name, expertise, city' : 'partnered materials shops, services'}...`}
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Filter size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        <ScrollView style={dynamicStyles.content}>
          <Text style={dynamicStyles.sectionTitle}>What are you looking for?</Text>
          
          <View style={dynamicStyles.toggleContainer}>
            {renderToggleButton('architects', 'Architects', <Users size={24} color={activeType === 'architects' ? colors.white : colors.primary} />)}
            {renderToggleButton('services', 'Services', <Wrench size={24} color={activeType === 'services' ? colors.white : colors.primary} />)}
          </View>

          <View style={styles.resultsSection}>
            <Text style={dynamicStyles.resultsTitle}>
              {getFilteredData().length} {activeType} found
            </Text>
            
            <View style={styles.usersList}>
              {getFilteredData().map(item => renderUserCard(item))}
            </View>
          </View>
        </ScrollView>
        
        {renderFilterModal()}
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
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
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
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  filterButton: {
    padding: 5,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeToggleButton: {
    backgroundColor: colors.primary,
  },
  toggleIcon: {
    marginRight: 8,
  },
  activeToggleIcon: {
    // Icon color handled in component
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray,
  },
  activeToggleText: {
    color: colors.white,
  },
  resultsSection: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 15,
  },
  usersList: {
    gap: 15,
  },
  userCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginRight: 6,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  userSpecialty: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLocation: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
  followButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  filterContent: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.black,
  },
  ratingOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  activeRatingOption: {
    backgroundColor: colors.primary,
  },
  ratingOptionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  activeRatingOptionText: {
    color: colors.white,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.black,
  },
  filterActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
});