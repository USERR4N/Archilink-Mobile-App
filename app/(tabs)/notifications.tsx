import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Bell, User, Briefcase, MessageSquare, Award, Clock } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

export default function NotificationsScreen() {
  const { user, darkMode } = useAuthStore();
  const isArchitect = user?.userType === 'architect';
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const allNotifications = isArchitect ? getArchitectNotifications() : getClientNotifications();
  const unreadNotifications = allNotifications.filter(notification => notification.isUnread);
  
  const displayedNotifications = activeTab === 'all' ? allNotifications : unreadNotifications;

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.lightGray,
    },
    header: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#333' : colors.lightGray,
    },
    headerTitle: {
      color: darkMode ? colors.white : colors.primary,
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#333' : colors.lightGray,
    },
    tabText: {
      fontSize: 18,
      color: colors.gray,
      fontWeight: '500',
    },
    activeTabText: {
      color: darkMode ? colors.white : colors.primary,
      fontWeight: 'bold',
    },
    notificationItem: {
      flexDirection: 'row',
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      position: 'relative',
    },
    notificationTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
      marginBottom: 8,
    },
    notificationMessage: {
      fontSize: 15,
      color: darkMode ? colors.white : colors.black,
      lineHeight: 22,
      marginBottom: 12,
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.gray,
      textAlign: 'center',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.headerTitle}>ARCHILINK</Text>
      </View>
      
      <View style={dynamicStyles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[dynamicStyles.tabText, activeTab === 'all' && dynamicStyles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
          onPress={() => setActiveTab('unread')}
        >
          <Text style={[dynamicStyles.tabText, activeTab === 'unread' && dynamicStyles.activeTabText]}>Unread</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.notificationsContainer}>
        {displayedNotifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={dynamicStyles.notificationItem}>
            <View style={[styles.notificationIcon, notification.iconStyle]}>
              {notification.icon}
            </View>
            <View style={styles.notificationContent}>
              <Text style={dynamicStyles.notificationTitle}>{notification.title}</Text>
              <Text style={dynamicStyles.notificationMessage}>{notification.message}</Text>
              <View style={styles.notificationFooter}>
                <Clock size={12} color={colors.gray} />
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </View>
            {notification.isUnread && <View style={styles.unreadIndicator} />}
          </TouchableOpacity>
        ))}
        
        {displayedNotifications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={dynamicStyles.emptyStateText}>
              {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const getArchitectNotifications = () => [
  {
    id: '1',
    title: 'New Job Invitation',
    message: 'Maria Santos has invited you to work on a Modern Residential Project in Makati City.',
    time: '2 hours ago',
    isUnread: true,
    icon: <Briefcase size={24} color={colors.white} />,
    iconStyle: { backgroundColor: colors.primary }
  },
  {
    id: '2',
    title: 'New Message',
    message: 'ABC Corporation: "Can we schedule a meeting to discuss the project details?"',
    time: '5 hours ago',
    isUnread: true,
    icon: <MessageSquare size={24} color={colors.white} />,
    iconStyle: { backgroundColor: '#4CAF50' }
  },
  {
    id: '3',
    title: 'Profile View',
    message: 'Your profile has been viewed by 5 potential clients in the last 24 hours.',
    time: '1 day ago',
    isUnread: false,
    icon: <User size={24} color={colors.white} />,
    iconStyle: { backgroundColor: '#2196F3' }
  },
  {
    id: '4',
    title: 'License Verified',
    message: 'Congratulations! Your PRC license has been verified. Your profile now shows verified status.',
    time: '2 days ago',
    isUnread: false,
    icon: <Award size={24} color={colors.white} />,
    iconStyle: { backgroundColor: '#FFC107' }
  }
];

const getClientNotifications = () => [
  {
    id: '1',
    title: 'New Proposal',
    message: 'Carlos Mendoza has submitted a proposal for your Home Renovation Project.',
    time: '3 hours ago',
    isUnread: true,
    icon: <Briefcase size={24} color={colors.white} />,
    iconStyle: { backgroundColor: colors.primary }
  },
  {
    id: '2',
    title: 'New Message',
    message: 'Anna Reyes: "Thank you for considering my services. I have reviewed your project requirements."',
    time: '1 day ago',
    isUnread: true,
    icon: <MessageSquare size={24} color={colors.white} />,
    iconStyle: { backgroundColor: '#4CAF50' }
  },
  {
    id: '3',
    title: 'Project Update',
    message: 'Your Home Renovation project has moved to the "In Progress" stage.',
    time: '2 days ago',
    isUnread: false,
    icon: <Bell size={24} color={colors.white} />,
    iconStyle: { backgroundColor: '#9C27B0' }
  },
  {
    id: '4',
    title: 'Architect Recommendations',
    message: 'We have found 3 new architects that match your project requirements.',
    time: '3 days ago',
    isUnread: false,
    icon: <User size={24} color={colors.white} />,
    iconStyle: { backgroundColor: '#FF9800' }
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  subHeaderTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subHeaderSubtitle: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.9,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tab: {
    marginRight: 30,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 18,
    color: colors.gray,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  notificationsContainer: {
    flex: 1,
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  notificationMessage: {
    fontSize: 15,
    color: colors.black,
    lineHeight: 22,
    marginBottom: 12,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 13,
    color: colors.gray,
    marginLeft: 6,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
});