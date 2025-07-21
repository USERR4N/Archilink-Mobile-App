import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { CartItem, Material, Order } from '@/constants/services';

const CART_STORAGE_KEY = 'archilink_cart';
const ORDERS_STORAGE_KEY = 'archilink_orders';

export const [CartProvider, useCart] = createContextHook(() => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCartData();
    loadOrdersData();
  }, []);

  const loadCartData = async () => {
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadOrdersData = async () => {
    try {
      const stored = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsedOrders = JSON.parse(stored).map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt)
        }));
        setOrders(parsedOrders);
      }
    } catch (error) {
      console.error('Error loading orders data:', error);
    }
  };

  const saveCartData = async (items: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };

  const saveOrdersData = async (ordersList: Order[]) => {
    try {
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersList));
    } catch (error) {
      console.error('Error saving orders data:', error);
    }
  };

  const addToCart = (material: Material, serviceId: number, quantity: number = 1) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.material.id === material.id && item.serviceId === serviceId
    );

    let updatedItems: CartItem[];
    if (existingItemIndex >= 0) {
      updatedItems = cartItems.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...cartItems, { material, quantity, serviceId }];
    }

    setCartItems(updatedItems);
    saveCartData(updatedItems);
  };

  const removeFromCart = (materialId: number, serviceId: number) => {
    const updatedItems = cartItems.filter(
      item => !(item.material.id === materialId && item.serviceId === serviceId)
    );
    setCartItems(updatedItems);
    saveCartData(updatedItems);
  };

  const updateQuantity = (materialId: number, serviceId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(materialId, serviceId);
      return;
    }

    const updatedItems = cartItems.map(item => 
      item.material.id === materialId && item.serviceId === serviceId
        ? { ...item, quantity }
        : item
    );
    setCartItems(updatedItems);
    saveCartData(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartData([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.material.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const createOrder = (address: string, paymentMethod: string, deliveryFee: number) => {
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const total = getCartTotal();
    
    const newOrder: Order = {
      id: orderId,
      items: [...cartItems],
      total,
      deliveryFee,
      address,
      paymentMethod,
      status: 'pending',
      estimatedDelivery: getEstimatedDelivery(),
      createdAt: new Date()
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveOrdersData(updatedOrders);
    clearCart();
    
    return newOrder;
  };

  const getEstimatedDelivery = () => {
    const now = new Date();
    const deliveryDate = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000)); // 2 days from now
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    saveOrdersData(updatedOrders);
  };

  return {
    cartItems,
    orders,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    createOrder,
    updateOrderStatus
  };
});