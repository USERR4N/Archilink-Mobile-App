import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { services } from '@/constants/services';
import { useCart } from '@/store/cartStore';
import { Minus, Plus, Trash2, MapPin, CreditCard, ShoppingBag } from 'lucide-react-native';

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart, createOrder } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main St, Makati City, Metro Manila');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const groupedItems = cartItems.reduce((groups, item) => {
    const service = services.find(s => s.id === item.serviceId);
    if (!service) return groups;
    
    if (!groups[item.serviceId]) {
      groups[item.serviceId] = {
        service,
        items: []
      };
    }
    groups[item.serviceId].items.push(item);
    return groups;
  }, {} as { [key: number]: { service: any, items: any[] } });

  const getTotalDeliveryFee = () => {
    return Object.values(groupedItems).reduce((total, group) => total + group.service.deliveryFee, 0);
  };

  const getGrandTotal = () => {
    return getCartTotal() + getTotalDeliveryFee();
  };

  const handleUpdateQuantity = (materialId: number, serviceId: number, newQuantity: number) => {
    updateQuantity(materialId, serviceId, newQuantity);
  };

  const handleRemoveItem = (materialId: number, serviceId: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFromCart(materialId, serviceId) }
      ]
    );
  };

  const handleSubmitOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before placing an order.');
      return;
    }

    const order = createOrder(deliveryAddress, paymentMethod, getTotalDeliveryFee());
    
    Alert.alert(
      'Order Placed!',
      `Your order #${order.id.slice(-8)} has been placed successfully. You can track your order in the orders section.`,
      [
        { text: 'OK', onPress: () => router.push('/order-tracking/' + order.id) }
      ]
    );
  };

  const handleChangeAddress = () => {
    Alert.alert(
      'Change Address',
      'Address change functionality will be implemented soon.',
      [{ text: 'OK' }]
    );
  };

  const handleChangePayment = () => {
    Alert.alert(
      'Payment Method',
      'Choose your payment method:',
      [
        { text: 'Credit Card', onPress: () => setPaymentMethod('Credit Card') },
        { text: 'GCash', onPress: () => setPaymentMethod('GCash') },
        { text: 'PayPal', onPress: () => setPaymentMethod('PayPal') },
        { text: 'Bank Transfer', onPress: () => setPaymentMethod('Bank Transfer') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Cart',
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitle: 'Back'
          }} 
        />
        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color={colors.gray} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some materials to get started</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => router.push('/(tabs)/discover')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Cart',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Back'
        }} 
      />

      <ScrollView style={styles.scrollContainer}>
        {/* Delivery Address */}
        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.addressTitle}>Delivery Address</Text>
          </View>
          <Text style={styles.addressText}>{deliveryAddress}</Text>
          <TouchableOpacity style={styles.changeButton} onPress={handleChangeAddress}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items by Service */}
        {Object.values(groupedItems).map((group) => (
          <View key={group.service.id} style={styles.serviceSection}>
            <View style={styles.serviceHeader}>
              <Image source={{ uri: group.service.image }} style={styles.serviceIcon} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{group.service.name}</Text>
                <Text style={styles.serviceDelivery}>
                  Delivery: {group.service.deliveryTime} • ₱{group.service.deliveryFee}
                </Text>
              </View>
            </View>

            {group.items.map((item) => (
              <View key={`${item.material.id}-${item.serviceId}`} style={styles.itemCard}>
                <Image source={{ uri: item.material.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.material.name}</Text>
                  <Text style={styles.itemPrice}>₱{item.material.price.toLocaleString()} per {item.material.unit}</Text>
                  
                  <View style={styles.itemFooter}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.material.id, item.serviceId, item.quantity - 1)}
                      >
                        <Minus size={16} color={colors.primary} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.material.id, item.serviceId, item.quantity + 1)}
                      >
                        <Plus size={16} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => handleRemoveItem(item.material.id, item.serviceId)}
                    >
                      <Trash2 size={16} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.itemTotal}>
                    Total: ₱{(item.material.price * item.quantity).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentHeader}>
            <CreditCard size={20} color={colors.primary} />
            <Text style={styles.paymentTitle}>Payment Method</Text>
          </View>
          <Text style={styles.paymentText}>{paymentMethod}</Text>
          <TouchableOpacity style={styles.changeButton} onPress={handleChangePayment}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₱{getCartTotal().toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₱{getTotalDeliveryFee().toLocaleString()}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₱{getGrandTotal().toLocaleString()}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Submit Order Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOrder}>
          <Text style={styles.submitButtonText}>Submit Order</Text>
        </TouchableOpacity>
      </View>
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
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  shopButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressSection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
    lineHeight: 20,
  },
  changeButton: {
    alignSelf: 'flex-start',
  },
  changeButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  serviceSection: {
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  serviceDelivery: {
    fontSize: 12,
    color: colors.gray,
  },
  itemCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  paymentSection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  paymentText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
  },
  summarySection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 15,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});