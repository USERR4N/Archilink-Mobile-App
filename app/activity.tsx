import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useCart } from '@/store/cartStore';
import { Package, Clock, CheckCircle, Truck, MapPin } from 'lucide-react-native';

export default function ActivityScreen() {
  const { orders } = useCart();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color={colors.warning} />;
      case 'confirmed':
      case 'preparing':
        return <Package size={20} color={colors.primary} />;
      case 'out_for_delivery':
        return <Truck size={20} color={colors.primary} />;
      case 'delivered':
        return <CheckCircle size={20} color={colors.success} />;
      default:
        return <Clock size={20} color={colors.gray} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Placed';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const handleTrackOrder = (orderId: string) => {
    router.push(`/order-tracking/${orderId}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Activity',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />

      <ScrollView style={styles.scrollContainer}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Package size={80} color={colors.gray} />
            <Text style={styles.emptyTitle}>No Activity Yet</Text>
            <Text style={styles.emptySubtitle}>Your order history will appear here</Text>
            <TouchableOpacity 
              style={styles.shopButton}
              onPress={() => router.push('/search?type=services')}
            >
              <Text style={styles.shopButtonText}>Browse Services</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Recent Orders ({orders.length})</Text>
            
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderId}>Order #{order.id.slice(-8)}</Text>
                    <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(order.status)}
                    <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.orderDetails}>
                  <View style={styles.addressContainer}>
                    <MapPin size={16} color={colors.gray} />
                    <Text style={styles.addressText}>{order.address}</Text>
                  </View>
                  
                  <View style={styles.itemsPreview}>
                    <Text style={styles.itemsCount}>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </Text>
                    <Text style={styles.orderTotal}>
                      ₱{(order.total + order.deliveryFee).toLocaleString()}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.orderActions}>
                  <TouchableOpacity 
                    style={styles.trackButton}
                    onPress={() => handleTrackOrder(order.id)}
                  >
                    <Text style={styles.trackButtonText}>Track Order</Text>
                  </TouchableOpacity>
                  
                  {order.status === 'delivered' && (
                    <TouchableOpacity style={styles.reorderButton}>
                      <Text style={styles.reorderButtonText}>Reorder</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </>
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
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: colors.gray,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
    color: colors.black,
  },
  orderDetails: {
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 8,
    flex: 1,
  },
  itemsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsCount: {
    fontSize: 14,
    color: colors.gray,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  trackButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  reorderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});