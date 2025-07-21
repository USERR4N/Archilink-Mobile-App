import React, { useEffect, useState } from 'react';
import { Tabs, router } from 'expo-router';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Home, User, Briefcase, Bell, MessageSquare, Camera, Menu, X, Activity, Settings, CreditCard, HelpCircle, Wrench } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { useCart } from '@/store/cartStore';

const { width } = Dimensions.get('window');

export default function TabLayout() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isArchitect = user?.userType === 'architect';
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const { orders } = useCart();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);

  const handleMenuItemPress = (route: string) => {
    setShowHamburgerMenu(false);
    router.push(route);
  };

  const renderHamburgerMenu = () => (
    <Modal
      visible={showHamburgerMenu}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowHamburgerMenu(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.hamburgerMenu}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>ARCHILINK</Text>
            <TouchableOpacity onPress={() => setShowHamburgerMenu(false)}>
              <X size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.menuContent}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('/activity')}
            >
              <Activity size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Activity</Text>
              {orders.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{orders.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('/settings')}
            >
              <Settings size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('/settings/payment')}
            >
              <CreditCard size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Payment Method</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('/settings/help-center')}
            >
              <HelpCircle size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Support Center</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress('/search?type=services')}
            >
              <Wrench size={20} color={colors.primary} />
              <Text style={styles.menuItemText}>Services</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: colors.lightGray,
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 1,
          },
          headerTitle: 'ARCHILINK',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.hamburgerButton}
              onPress={() => setShowHamburgerMenu(true)}
            >
              <Menu size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      
      {isArchitect ? (
        <Tabs.Screen
          name="stories"
          options={{
            title: 'Stories',
            tabBarIcon: ({ color, size }) => <Camera size={size} color={color} />,
          }}
        />
      ) : (
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
          }}
        />
      )}
      
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
        }}
      />
      
      {/* Hide discover tab since we're using search page instead */}
      <Tabs.Screen
        name="discover"
        options={{
          href: null,
        }}
      />
      
      {/* Hide notifications for architects and stories for clients */}
      {isArchitect ? (
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
          }}
        />
      ) : (
        <Tabs.Screen
          name="stories"
          options={{
            href: null,
          }}
        />
      )}
      </Tabs>
      {renderHamburgerMenu()}
    </>
  );
}

const styles = StyleSheet.create({
  hamburgerButton: {
    marginLeft: 15,
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  hamburgerMenu: {
    backgroundColor: colors.white,
    width: width * 0.8,
    height: '100%',
    paddingTop: 50,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 15,
    flex: 1,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});