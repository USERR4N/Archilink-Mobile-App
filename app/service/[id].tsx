import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { services, Material } from '@/constants/services';
import { useCart } from '@/store/cartStore';
import { Search, Star, Clock, Truck, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react-native';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const serviceId = parseInt(id as string);
  const service = services.find(s => s.id === serviceId);
  const { addToCart, getCartItemCount } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const categories = useMemo(() => {
    if (!service) return ['All'];
    const cats = Array.from(new Set(service.materials.map(m => m.category)));
    return ['All', ...cats];
  }, [service]);

  const filteredMaterials = useMemo(() => {
    if (!service) return [];
    let filtered = service.materials;
    
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [service, selectedCategory, searchQuery]);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Service not found</Text>
      </View>
    );
  }

  const handleAddToCart = (material: Material) => {
    const quantity = quantities[material.id] || 1;
    addToCart(material, serviceId, quantity);
    setQuantities(prev => ({ ...prev, [material.id]: 1 }));
  };

  const updateQuantity = (materialId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [materialId]: Math.max(1, (prev[materialId] || 1) + change)
    }));
  };

  const getItemQuantity = (materialId: number) => {
    return quantities[materialId] || 1;
  };

  const handleViewCart = () => {
    router.push('/cart');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: service.name,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      
      {/* Service Header */}
      <View style={styles.serviceHeader}>
        <Image source={{ uri: service.image }} style={styles.serviceHeaderImage} />
        <View style={styles.serviceHeaderOverlay}>
          <View style={styles.serviceHeaderInfo}>
            <View style={styles.serviceNameContainer}>
              <Text style={styles.serviceHeaderName}>{service.name}</Text>
              {service.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.serviceHeaderCategory}>{service.category}</Text>
            
            <View style={styles.serviceHeaderDetails}>
              <View style={styles.ratingContainer}>
                <Star size={16} color={colors.warning} fill={colors.warning} />
                <Text style={styles.ratingText}>{service.rating}</Text>
                <Text style={styles.reviewCount}>({service.reviews} reviews)</Text>
              </View>
              
              <View style={styles.deliveryContainer}>
                <Clock size={14} color={colors.white} />
                <Text style={styles.deliveryText}>{service.deliveryTime}</Text>
                <Truck size={14} color={colors.white} style={{ marginLeft: 10 }} />
                <Text style={styles.deliveryText}>₱{service.deliveryFee}</Text>
              </View>
            </View>
            
            <View style={styles.locationContainer}>
              <MapPin size={14} color={colors.white} />
              <Text style={styles.locationText}>{service.location}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search materials..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategoryChip,
              ]}
              onPress={() => setSelectedCategory(category === 'All' ? null : category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Materials List */}
      <ScrollView style={styles.materialsContainer}>
        {filteredMaterials.map((material) => (
          <View key={material.id} style={styles.materialCard}>
            <Image source={{ uri: material.image }} style={styles.materialImage} />
            <View style={styles.materialInfo}>
              <Text style={styles.materialName}>{material.name}</Text>
              <Text style={styles.materialDescription}>{material.description}</Text>
              <Text style={styles.materialCategory}>{material.category}</Text>
              
              <View style={styles.materialFooter}>
                <View style={styles.priceContainer}>
                  <Text style={styles.materialPrice}>₱{material.price.toLocaleString()}</Text>
                  <Text style={styles.materialUnit}>per {material.unit}</Text>
                </View>
                
                {material.inStock ? (
                  <View style={styles.addToCartContainer}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(material.id, -1)}
                      >
                        <Minus size={16} color={colors.primary} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{getItemQuantity(material.id)}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(material.id, 1)}
                      >
                        <Plus size={16} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.addToCartButton}
                      onPress={() => handleAddToCart(material)}
                    >
                      <Plus size={16} color={colors.white} />
                      <Text style={styles.addToCartText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.outOfStockContainer}>
                    <Text style={styles.outOfStockText}>Out of Stock</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Cart Button */}
      {getCartItemCount() > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={handleViewCart}>
          <ShoppingCart size={20} color={colors.white} />
          <Text style={styles.cartButtonText}>View Cart ({getCartItemCount()})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  serviceHeader: {
    height: 200,
    position: 'relative',
  },
  serviceHeaderImage: {
    width: '100%',
    height: '100%',
  },
  serviceHeaderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  serviceHeaderInfo: {
    flex: 1,
  },
  serviceNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceHeaderName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  serviceHeaderCategory: {
    fontSize: 16,
    color: colors.warning,
    marginBottom: 8,
    fontWeight: '500',
  },
  serviceHeaderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
    opacity: 0.8,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
  searchSection: {
    backgroundColor: colors.white,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryChip: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.black,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: colors.white,
  },
  materialsContainer: {
    flex: 1,
    padding: 15,
  },
  materialCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  materialImage: {
    width: 100,
    height: 100,
  },
  materialInfo: {
    flex: 1,
    padding: 15,
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  materialDescription: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
    lineHeight: 16,
  },
  materialCategory: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: '500',
  },
  materialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  materialPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  materialUnit: {
    fontSize: 12,
    color: colors.gray,
  },
  addToCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addToCartText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  outOfStockContainer: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  outOfStockText: {
    color: colors.gray,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cartButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});