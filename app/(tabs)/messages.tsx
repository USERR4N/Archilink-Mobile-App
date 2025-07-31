import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Search, Edit3 } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';

type TabType = 'all' | 'clients' | 'services';

export default function MessagesScreen() {
  const { user, darkMode } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchText, setSearchText] = useState('');
  
  const handleChatPress = (contactId: string, contactName: string) => {
    router.push(`/chat/${contactId}?name=${contactName}`);
  };

  const handleComposeMessage = () => {
    if (user?.userType === 'architect') {
      // For architects, show list of followed users to message
      router.push('/following-list');
    } else {
      router.push('/search');
    }
  };

  const getSearchPlaceholder = () => {
    if (user?.userType === 'architect') {
      switch (activeTab) {
        case 'clients':
          return 'Search clients?...';
        case 'services':
          return 'Search services?...';
        default:
          return 'Search messages?...';
      }
    } else {
      switch (activeTab) {
        case 'clients':
          return 'Search a provider?...';
        case 'services':
          return 'Search services?...';
        default:
          return 'Search messages?...';
      }
    }
  };

  // Architect POV messages - different from client POV
  const allMessages = user?.userType === 'architect' ? [
    {
      id: 'archilink',
      name: 'ArchiLink',
      lastMessage: 'Welcome to ArchiLink! Start connecting with clients and grow your business.',
      time: '4/16/25',
      unread: true,
      isOfficial: true,
      verified: true,
      image: null
    },
    {
      id: 'maria',
      name: 'Maria Santos',
      lastMessage: 'Thank you for your proposal. I would like to discuss the project timeline.',
      time: 'Yesterday',
      unread: true,
      isOfficial: false,
      verified: false,
      isClient: true,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'john',
      name: 'John Dela Cruz',
      lastMessage: 'I am interested in your architectural services for my new home.',
      time: '2 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isClient: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'wilcon',
      name: 'Wilcon Depot',
      lastMessage: 'Your bulk order discount has been approved. Check our latest catalog for new materials.',
      time: '3 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isService: true,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ] : [
    {
      id: 'archilink',
      name: 'ArchiLink',
      lastMessage: 'Welcome to ArchiLink! Find the perfect architect for your dream project.',
      time: '4/16/25',
      unread: true,
      isOfficial: true,
      verified: true,
      image: null
    },
    {
      id: 'carlos',
      name: 'Carlos Mendoza',
      lastMessage: 'I would be happy to help with your residential project. Let me know when we can discuss.',
      time: 'Yesterday',
      unread: true,
      isOfficial: false,
      verified: true,
      isArchitect: true,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'anna',
      name: 'Anna Reyes',
      lastMessage: 'Thank you for your interest in my services. I have sent you my portfolio for review.',
      time: '2 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isArchitect: true,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'wilcon',
      name: 'Wilcon Depot',
      lastMessage: 'Your inquiry about construction materials has been received. Our team will contact you soon.',
      time: '3 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isProvider: true,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  // For architect POV - clients as providers
  const clientMessages = user?.userType === 'architect' ? [
    {
      id: 'maria',
      name: 'Maria Santos',
      lastMessage: 'Thank you for your proposal. I would like to discuss the project timeline.',
      time: 'Yesterday',
      unread: true,
      isOfficial: false,
      verified: false,
      isClient: true,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'john',
      name: 'John Dela Cruz',
      lastMessage: 'I am interested in your architectural services for my new home.',
      time: '2 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isClient: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      lastMessage: 'Can we schedule a meeting to discuss my office renovation project?',
      time: '5 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isClient: true,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'michael',
      name: 'Michael Chen',
      lastMessage: 'Your design proposal looks great. When can we start the project?',
      time: '1 week ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isClient: true,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ] : [
    {
      id: 'carlos',
      name: 'Carlos Mendoza',
      lastMessage: 'I would be happy to help with your residential project. Let me know when we can discuss.',
      time: 'Yesterday',
      unread: true,
      isOfficial: false,
      verified: true,
      isArchitect: true,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'anna',
      name: 'Anna Reyes',
      lastMessage: 'Thank you for your interest in my services. I have sent you my portfolio for review.',
      time: '2 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isArchitect: true,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'miguel',
      name: 'Miguel Santos',
      lastMessage: 'I have experience with similar projects. Would love to discuss your requirements.',
      time: '5 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isArchitect: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'sofia',
      name: 'Sofia Garcia',
      lastMessage: 'Your project sounds interesting. I specialize in sustainable architecture.',
      time: '1 week ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isArchitect: true,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const serviceMessages = [
    {
      id: 'wilcon',
      name: 'Wilcon Depot',
      lastMessage: 'Your inquiry about construction materials has been received. Our team will contact you soon.',
      time: '3 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isProvider: true,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'construction-plus',
      name: 'Construction Plus',
      lastMessage: 'We can handle your electrical and plumbing needs. Let us know your requirements.',
      time: '2 days ago',
      unread: true,
      isOfficial: false,
      verified: true,
      isService: true,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'metro-contractors',
      name: 'Metro Contractors',
      lastMessage: 'Your project estimate is ready. We offer competitive rates for residential construction.',
      time: '4 days ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isService: true,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'lpm',
      name: 'LPM Construction Supply',
      lastMessage: 'We have the tiles you\'re looking for. Visit our showroom for better pricing.',
      time: '5 days ago',
      unread: true,
      isOfficial: false,
      verified: true,
      isProvider: true,
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ace-hardware',
      name: 'ACE Hardware',
      lastMessage: 'Thank you for your interest. Our home improvement consultant will call you.',
      time: '1 week ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isProvider: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'green-landscaping',
      name: 'Green Landscaping Co.',
      lastMessage: 'We specialize in sustainable landscaping solutions. Check out our portfolio.',
      time: '1 week ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isService: true,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'philippine-steel',
      name: 'Philippine Steel Corporation',
      lastMessage: 'We can provide steel materials for your construction project. Request a quote.',
      time: '2 weeks ago',
      unread: false,
      isOfficial: false,
      verified: true,
      isProvider: true,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const getCurrentMessages = () => {
    if (user?.userType === 'architect') {
      switch (activeTab) {
        case 'clients':
          return clientMessages;
        case 'services':
          return serviceMessages;
        default:
          return allMessages;
      }
    } else {
      switch (activeTab) {
        case 'clients':
          return clientMessages;
        case 'services':
          return serviceMessages;
        default:
          return allMessages;
      }
    }
  };

  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[dynamicStyles.tabText, activeTab === tab && dynamicStyles.activeTabText]}>
        {label}
      </Text>
      {activeTab === tab && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={dynamicStyles.messageItem}
      onPress={() => handleChatPress(item.id, item.name)}
    >
      <View style={styles.profileContainer}>
        {item.isOfficial ? (
          <View style={styles.profileImageContainer}>
            <View style={styles.archilinkLogo}>
              <View style={styles.compassIcon}>
                <View style={styles.compassCenter} />
                <View style={styles.compassNeedle} />
              </View>
            </View>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            {item.verified && (
              <View style={[styles.verifiedBadge, (item.isService || item.isProvider) && styles.serviceVerifiedBadge, (item.isArchitect || item.isClient) && styles.architectVerifiedBadge]}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </View>
        )}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={dynamicStyles.senderName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text style={dynamicStyles.lastMessage} numberOfLines={2}>
          {item.lastMessage}
        </Text>
      </View>
      
      {item.unread && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.white,
    },
    header: {
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 15,
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: darkMode ? '#333' : '#E5E5EA',
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
      paddingHorizontal: 16,
      paddingTop: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: darkMode ? '#333' : '#E5E5EA',
    },
    tabText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.gray,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: '600',
    },
    searchSection: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#333' : colors.white,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
      minHeight: 36,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: darkMode ? colors.white : colors.black,
      marginLeft: 8,
    },
    messagesSection: {
      flex: 1,
      backgroundColor: darkMode ? '#000000' : colors.white,
    },
    messageItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: darkMode ? '#1a1a1a' : colors.white,
      borderBottomWidth: 0.5,
      borderBottomColor: darkMode ? '#333' : '#F0F0F0',
    },
    senderName: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? colors.white : colors.black,
    },
    lastMessage: {
      fontSize: 15,
      color: '#8E8E93',
      lineHeight: 20,
      fontWeight: '400',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.headerTitle}>ARCHILINK</Text>
      </View>
      
      {/* Tabs */}
      <View style={dynamicStyles.tabsContainer}>
        {renderTabButton('all', 'All Messages')}
        {renderTabButton('clients', user?.userType === 'architect' ? 'Clients' : 'Providers')}
        {renderTabButton('services', 'Services')}
      </View>
      
      {/* Search */}
      <View style={dynamicStyles.searchSection}>
        <View style={dynamicStyles.searchContainer}>
          <Search size={18} color={colors.gray} />
          <TextInput
            style={dynamicStyles.searchInput}
            placeholder={getSearchPlaceholder()}
            placeholderTextColor={colors.gray}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      
      {/* Messages List */}
      <View style={dynamicStyles.messagesSection}>
        <FlatList
          data={getCurrentMessages()}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.messagesList}
        />
      </View>

      {/* Floating Compose Button */}
      <TouchableOpacity style={styles.floatingComposeButton} onPress={handleComposeMessage}>
        <Edit3 size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  activeTabButton: {
    // Active tab styling handled by indicator
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.primary,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },
  messagesSection: {
    flex: 1,
    backgroundColor: colors.white,
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  profileContainer: {
    marginRight: 12,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  archilinkLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  compassCenter: {
    width: 4,
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 2,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  compassNeedle: {
    width: 2,
    height: 12,
    backgroundColor: colors.white,
    position: 'absolute',
    top: 6,
    left: 11,
    borderRadius: 1,
  },
  messageContent: {
    flex: 1,
    paddingTop: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  messageTime: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
  lastMessage: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 20,
    fontWeight: '400',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
    marginTop: 8,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.blue,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  serviceVerifiedBadge: {
    backgroundColor: colors.primary,
  },
  architectVerifiedBadge: {
    backgroundColor: colors.blue,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  floatingComposeButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});