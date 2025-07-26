import React, { useEffect } from 'react';
import { Tabs, router } from 'expo-router';
import { Home, User, Briefcase, Bell, MessageSquare, Camera } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

export default function TabLayout() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isArchitect = user?.userType === 'architect';
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
        },
        headerShown: false, // Hide all tab headers to use consistent ARCHILINK header
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
  );
}