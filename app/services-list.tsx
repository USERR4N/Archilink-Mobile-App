import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { services } from '@/constants/services';
import { Star, MapPin, CheckCircle, Clock, Truck } from 'lucide-react-native';

export default function ServicesListScreen() {
  const handleServicePress = (service: any) => {
    router.push(`/service/${service.id}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'All Services',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Partnered Services ({services.length})</Text>
        
        {services.map((service) => (
          <TouchableOpacity 
            key={service.id} 
            style={styles.serviceCard}
            onPress={() => handleServicePress(service)}
          >
            <Image source={{ uri: service.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceName}>{service.name}</Text>
                {service.isVerified && (
                  <CheckCircle size={16} color={colors.success} style={styles.verifiedIcon} />
                )}
              </View>
              
              <Text style={styles.serviceCategory}>{service.category}</Text>
              <Text style={styles.serviceDescription} numberOfLines={2}>
                {service.description}
              </Text>
              
              <View style={styles.serviceDetails}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={colors.warning} fill={colors.warning} />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                  <Text style={styles.reviewCount}>({service.reviews} reviews)</Text>
                </View>
                
                <View style={styles.locationContainer}>
                  <MapPin size={12} color={colors.gray} />
                  <Text style={styles.locationText}>{service.location}</Text>
                </View>
              </View>
              
              <View style={styles.deliveryInfo}>
                <View style={styles.deliveryItem}>
                  <Clock size={12} color={colors.primary} />
                  <Text style={styles.deliveryText}>{service.deliveryTime}</Text>
                </View>
                <View style={styles.deliveryItem}>
                  <Truck size={12} color={colors.primary} />
                  <Text style={styles.deliveryText}>₱{service.deliveryFee}</Text>
                </View>
              </View>
              
              <View style={styles.serviceFooter}>
                <Text style={styles.followersText}>{service.followers} followers</Text>
                <View style={styles.viewMenuButton}>
                  <Text style={styles.viewMenuText}>View Menu</Text>
                </View>
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
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 150,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  serviceCategory: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: '500',
  },
  serviceDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    color: colors.black,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
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
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  deliveryText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followersText: {
    fontSize: 12,
    color: colors.gray,
  },
  viewMenuButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewMenuText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});