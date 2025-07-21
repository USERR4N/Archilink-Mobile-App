import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { services } from '@/constants/services';
import { Search, Filter, MapPin, Star, Clock, Truck } from 'lucide-react-native';
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

  const handleServicePress = (serviceId: number) => {
    router.push(`/service/${serviceId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARCHILINK</Text>
        
        <Text style={styles.headerSubtitle}>
          Order construction materials & supplies
        </Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search materials, stores..."
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
          <Text style={styles.filtersTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.specializationsContainer}
          >
            {['All', 'Construction Materials', 'Hardware & Tools', 'Electrical Supplies', 'Plumbing Supplies'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.specializationChip,
                  selectedSpecialization === category && styles.selectedSpecialization,
                ]}
                onPress={() => selectSpecialization(category)}
              >
                <Text
                  style={[
                    styles.specializationText,
                    selectedSpecialization === category && styles.selectedSpecializationText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.resetButton} onPress={() => setSelectedSpecialization(null)}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={toggleFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <ScrollView style={styles.contentContainer}>
        {services.map((service) => (
          <TouchableOpacity 
            key={service.id} 
            style={styles.serviceCard}
            onPress={() => handleServicePress(service.id)}
          >
            <Image source={{ uri: service.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>{service.name}</Text>
                {service.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.serviceCategory}>{service.category}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              
              <View style={styles.serviceDetails}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={colors.warning} fill={colors.warning} />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                  <Text style={styles.reviewCount}>({service.reviews})</Text>
                </View>
                
                <View style={styles.deliveryInfo}>
                  <Clock size={14} color={colors.gray} />
                  <Text style={styles.deliveryText}>{service.deliveryTime}</Text>
                  <Truck size={14} color={colors.gray} style={{ marginLeft: 10 }} />
                  <Text style={styles.deliveryText}>₱{service.deliveryFee}</Text>
                </View>
              </View>
              
              <View style={styles.locationContainer}>
                <MapPin size={14} color={colors.gray} />
                <Text style={styles.locationText}>{service.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  },
  locationText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
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
  serviceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceInfo: {
    padding: 15,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: colors.success,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  serviceCategory: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 6,
    fontWeight: '500',
  },
  serviceDescription: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 12,
    lineHeight: 20,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },

});