import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { architects } from '@/constants/architects';
import { Search, Filter, MapPin, Star, ChevronDown } from 'lucide-react-native';
import { specializations } from '@/constants/specializations';
import { useAuthStore } from '@/store/authStore';

export default function DiscoverScreen() {
  const { user } = useAuthStore();
  const isArchitect = user?.userType === 'architect';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const selectSpecialization = (specialization: string) => {
    if (selectedSpecialization === specialization) {
      setSelectedSpecialization(null);
    } else {
      setSelectedSpecialization(specialization);
    }
  };

  const handleViewProfile = (architectId: number) => {
    router.push(`/user-profile/${architectId}`);
  };

  const partnersData = [
    {
      id: 1,
      companyName: 'Wilcon Depot',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      description: 'Leading home improvement and construction supplies',
      category: 'Building Materials'
    },
    {
      id: 2,
      companyName: 'LPM Construction',
      logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=100&h=100&fit=crop',
      description: 'Premium construction materials and services',
      category: 'Construction'
    },
    {
      id: 3,
      companyName: 'Steel Asia',
      logo: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=100&h=100&fit=crop',
      description: 'Quality steel products for construction',
      category: 'Steel & Metal'
    },
    {
      id: 4,
      companyName: 'Cemex Philippines',
      logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
      description: 'Cement and concrete solutions',
      category: 'Cement & Concrete'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARCHILINK</Text>
        
        <Text style={styles.headerSubtitle}>
          Discover our trusted partners
        </Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, specialization..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
            <Filter size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filtersTitle}>Specializations</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.specializationsContainer}
          >
            {specializations.slice(0, 8).map((specialization) => (
              <TouchableOpacity
                key={specialization}
                style={[
                  styles.specializationChip,
                  selectedSpecialization === specialization && styles.selectedSpecialization,
                ]}
                onPress={() => selectSpecialization(specialization)}
              >
                <Text
                  style={[
                    styles.specializationText,
                    selectedSpecialization === specialization && styles.selectedSpecializationText,
                  ]}
                >
                  {specialization}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <ScrollView style={styles.contentContainer}>
        {/* Services/Partners Content */}
        {partnersData.map((partner) => (
          <View key={partner.id} style={styles.partnerCard}>
            <Image source={{ uri: partner.logo }} style={styles.partnerLogo} />
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerName}>{partner.companyName}</Text>
              <Text style={styles.partnerCategory}>{partner.category}</Text>
              <Text style={styles.partnerDescription}>{partner.description}</Text>
              <View style={styles.partnerButtons}>
                <TouchableOpacity style={styles.visitWebsiteButton}>
                  <Text style={styles.visitWebsiteText}>Visit Website</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton}>
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
    paddingBottom: 30,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 15,
  },

  headerSubtitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  },
  filtersContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specializationsContainer: {
    marginBottom: 15,
  },
  specializationChip: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedSpecialization: {
    backgroundColor: colors.primary,
  },
  specializationText: {
    color: colors.black,
  },
  selectedSpecializationText: {
    color: colors.white,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  resetButton: {
    marginRight: 15,
    paddingVertical: 8,
  },
  resetButtonText: {
    color: colors.gray,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
  },
  architectCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  architectImage: {
    width: 120,
    height: 180,
  },
  architectInfo: {
    flex: 1,
    padding: 15,
  },
  architectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  architectSpecialty: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 5,
  },
  experienceText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 10,
  },
  viewProfileButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewProfileText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  partnerCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
    marginRight: 15,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  partnerCategory: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 6,
  },
  partnerDescription: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
    lineHeight: 18,
  },
  partnerButtons: {
    flexDirection: 'row',
  },
  visitWebsiteButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  visitWebsiteText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  messageButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  messageText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },

});