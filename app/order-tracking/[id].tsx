import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { services } from '@/constants/services';
import { useCart } from '@/store/cartStore';
import { CheckCircle, Clock, Truck, Package, MapPin, Phone, MessageCircle } from 'lucide-react-native';

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: CheckCircle },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'preparing', label: 'Preparing', icon: Package },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle }
];

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams();
  const orderId = id as string;
  const { orders, updateOrderStatus } = useCart();
  const [currentTime, setCurrentTime] = useState(new Date());

  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!order) return;

    // Simulate order status progression
    const progressOrder = () => {
      const statusOrder = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
      const currentIndex = statusOrder.indexOf(order.status);
      
      if (currentIndex < statusOrder.length - 1) {
        const nextStatus = statusOrder[currentIndex + 1];
        const delay = currentIndex === 0 ? 3000 : 10000; // 3s for first, 10s for others
        
        setTimeout(() => {
          updateOrderStatus(orderId, nextStatus as any);
        }, delay);
      }
    };

    progressOrder();
  }, [order?.status, orderId, updateOrderStatus]);

  if (!order) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Order Tracking',
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: 'bold' }
          }} 
        />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Order not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const groupedItems = order.items.reduce((groups, item) => {
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

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === order.status);
  };

  const getStatusColor = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    if (stepIndex <= currentIndex) {
      return colors.success;
    }
    return colors.gray;
  };

  const getStatusIcon = (step: any, stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    const IconComponent = step.icon;
    
    if (stepIndex <= currentIndex) {
      return <IconComponent size={24} color={colors.white} />;
    }
    return <IconComponent size={24} color={colors.gray} />;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEstimatedTime = () => {
    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const elapsed = now.getTime() - orderTime.getTime();
    const totalEstimated = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const remaining = Math.max(0, totalEstimated - elapsed);
    
    if (remaining === 0) return 'Delivered';
    
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: `Order #${orderId.slice(-8)}`,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />

      <ScrollView style={styles.scrollContainer}>
        {/* Order Status Header */}
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>
              {order.status === 'delivered' ? 'Delivered!' : 'On the way'}
            </Text>
            <Text style={styles.statusSubtitle}>
              {order.status === 'delivered' 
                ? `Delivered at ${formatTime(currentTime)}`
                : `Estimated delivery: ${getEstimatedTime()}`
              }
            </Text>
          </View>
          <View style={styles.statusIcon}>
            {order.status === 'delivered' ? (
              <CheckCircle size={40} color={colors.success} />
            ) : (
              <Clock size={40} color={colors.warning} />
            )}
          </View>
        </View>

        {/* Progress Tracker */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Order Progress</Text>
          
          <View style={styles.progressContainer}>
            {statusSteps.map((step, index) => (
              <View key={step.key} style={styles.progressStep}>
                <View style={styles.stepIndicator}>
                  <View style={[
                    styles.stepCircle,
                    { backgroundColor: getStatusColor(index) }
                  ]}>
                    {getStatusIcon(step, index)}
                  </View>
                  {index < statusSteps.length - 1 && (
                    <View style={[
                      styles.stepLine,
                      { backgroundColor: getStatusColor(index + 1) }
                    ]} />
                  )}
                </View>
                
                <View style={styles.stepContent}>
                  <Text style={[
                    styles.stepLabel,
                    { color: getStatusColor(index) }
                  ]}>
                    {step.label}
                  </Text>
                  {index <= getCurrentStepIndex() && (
                    <Text style={styles.stepTime}>
                      {formatTime(new Date(order.createdAt.getTime() + (index * 15 * 60 * 1000)))}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliverySection}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          
          <View style={styles.deliveryInfo}>
            <MapPin size={20} color={colors.primary} />
            <View style={styles.deliveryText}>
              <Text style={styles.deliveryLabel}>Delivery Address</Text>
              <Text style={styles.deliveryValue}>{order.address}</Text>
            </View>
          </View>
          
          <View style={styles.deliveryActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color={colors.primary} />
              <Text style={styles.actionButtonText}>Call Driver</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color={colors.primary} />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {Object.values(groupedItems).map((group) => (
            <View key={group.service.id} style={styles.serviceGroup}>
              <View style={styles.serviceHeader}>
                <Image source={{ uri: group.service.image }} style={styles.serviceIcon} />
                <Text style={styles.serviceName}>{group.service.name}</Text>
              </View>
              
              {group.items.map((item) => (
                <View key={`${item.material.id}-${item.serviceId}`} style={styles.orderItem}>
                  <Image source={{ uri: item.material.image }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.material.name}</Text>
                    <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    <Text style={styles.itemPrice}>
                      ₱{(item.material.price * item.quantity).toLocaleString()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₱{order.total.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₱{order.deliveryFee.toLocaleString()}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>₱{(order.total + order.deliveryFee).toLocaleString()}</Text>
          </View>
          
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentValue}>{order.paymentMethod}</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
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
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  notFoundText: {
    fontSize: 18,
    color: colors.gray,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  statusHeader: {
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 16,
    color: colors.gray,
  },
  statusIcon: {
    marginLeft: 15,
  },
  progressSection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressContainer: {
    paddingLeft: 10,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLine: {
    width: 2,
    height: 30,
    marginTop: 5,
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stepTime: {
    fontSize: 12,
    color: colors.gray,
  },
  deliverySection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  deliveryText: {
    flex: 1,
    marginLeft: 10,
  },
  deliveryLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  deliveryValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  deliveryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.45,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  itemsSection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
  },
  serviceGroup: {
    marginBottom: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  serviceIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  summarySection: {
    backgroundColor: colors.white,
    padding: 20,
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
    marginBottom: 15,
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
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: 15,
    borderRadius: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});