import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { Search, Plus, Calendar, MapPin, DollarSign, Clock, CheckCircle, Heart, MessageCircle, Star, Phone, Eye, UserCheck } from 'lucide-react-native';

type ClientProjectTab = 'active' | 'completed' | 'cancelled';

export default function ProjectsScreen() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<ClientProjectTab>('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Show different UI based on user type
  if (user?.userType === 'architect') {
    return <ArchitectProjectsView />;
  }

  return <ClientProjectsView activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
}

// Architect Projects View (existing functionality)
function ArchitectProjectsView() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'inquiries'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const architectProjectData = {
    active: [
      {
        id: '1',
        title: 'Modern Residences 4',
        clientName: 'John Doe',
        location: 'Makati City',
        startDate: 'June 11, 2025',
        deadline: 'Dec 21, 2025',
        progress: 20,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop'
      },
      {
        id: '2',
        title: 'Luxury Condo Interior',
        clientName: 'Maria Santos',
        location: 'Taguig City',
        startDate: 'July 1, 2025',
        deadline: 'Nov 15, 2025',
        progress: 45,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop'
      }
    ],
    completed: [
      {
        id: '3',
        title: 'Apartment Complex',
        clientName: 'Snorlax',
        location: 'Mandaluyong City',
        startDate: 'May 5, 2025',
        duration: '3 months',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop'
      },
      {
        id: '4',
        title: 'Modern Villa',
        clientName: 'Carlos Rivera',
        location: 'Quezon City',
        startDate: 'March 10, 2025',
        duration: '4 months',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop'
      }
    ],
    inquiries: [
      {
        id: '5',
        clientName: 'Samantha',
        clientId: 'client_004',
        clientImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        isVerified: true,
        description: 'Looking for someone to help renovate my condo',
        hashtags: ['#needanarchitect', '#hiring'],
        budget: '₱170k - ₱200k',
        location: 'Taguig',
        timeAgo: '5 hours ago',
        likes: 'John Doe and others',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=250&fit=crop'
      },
      {
        id: '6',
        clientName: 'Michael Chen',
        clientId: 'client_005',
        clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        isVerified: true,
        description: 'Need architectural design for new office space in BGC',
        hashtags: ['#officedesign', '#commercial'],
        budget: '₱500k - ₱800k',
        location: 'BGC',
        timeAgo: '1 day ago',
        likes: 'Anna Garcia and others',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop'
      }
    ]
  };

  const currentData = architectProjectData[activeTab];

  const getArchitectSearchPlaceholder = () => {
    switch (activeTab) {
      case 'active':
      case 'completed':
        return 'Search your project...';
      case 'inquiries':
        return 'Search a client?...';
      default:
        return 'Search...';
    }
  };

  const renderArchitectActiveProject = (project: any) => (
    <TouchableOpacity key={project.id} style={styles.projectCard}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <View style={styles.projectOverlay}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectClient}>Client: {project.clientName}</Text>
        <Text style={styles.projectLocation}>{project.location}</Text>
        <View style={styles.projectDates}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.dateValue}>{project.startDate}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Deadline</Text>
            <Text style={styles.dateValue}>{project.deadline}</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{project.progress}% Complete</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderArchitectCompletedProject = (project: any) => (
    <TouchableOpacity key={project.id} style={styles.projectCard}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <View style={styles.projectOverlay}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectClient}>Client: {project.clientName}</Text>
        <Text style={styles.projectLocation}>{project.location}</Text>
        <View style={styles.projectDates}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.dateValue}>{project.startDate}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Duration</Text>
            <Text style={styles.dateValue}>{project.duration}</Text>
          </View>
        </View>
        <View style={styles.projectActions}>
          <View style={styles.completedBadge}>
            <CheckCircle size={16} color={colors.white} />
            <Text style={styles.completedText}>Completed</Text>
          </View>
          <TouchableOpacity 
            style={styles.rateClientButton}
            onPress={() => {
              const userType = 'client';
              router.push(`/rate-user/${project.id}?name=${project.clientName}&userType=${userType}`);
            }}
          >
            <UserCheck size={14} color={colors.white} />
            <Text style={styles.rateClientText}>Rate Client</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderArchitectInquiry = (inquiry: any) => (
    <View key={inquiry.id} style={styles.inquiryCard}>
      <View style={styles.inquiryHeader}>
        <Image source={{ uri: inquiry.clientImage }} style={styles.clientImage} />
        <View style={styles.clientInfo}>
          <View style={styles.clientNameRow}>
            <Text style={styles.clientName}>{inquiry.clientName}</Text>
            {inquiry.isVerified && (
              <View style={styles.verifiedBadge}>
                <CheckCircle size={16} color="#1DA1F2" />
              </View>
            )}
          </View>
        </View>
      </View>
      
      <Image source={{ uri: inquiry.image }} style={styles.inquiryImage} />
      
      <View style={styles.inquiryActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => console.log('Liked inquiry:', inquiry.id)}
        >
          <Heart size={20} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push(`/comments/${inquiry.id}`)}
        >
          <MessageCircle size={20} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => console.log('Favorited inquiry:', inquiry.id)}
        >
          <Star size={20} color={colors.gray} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.likesText}>Liked by <Text style={styles.boldText}>{inquiry.likes}</Text></Text>
      
      <Text style={styles.inquiryDescription}>
        <Text style={styles.boldText}>{inquiry.clientName}</Text> {inquiry.description} {inquiry.hashtags.join(' ')}
      </Text>
      
      <View style={styles.budgetLocationRow}>
        <View style={styles.budgetBadge}>
          <Text style={styles.budgetLabel}>Budget</Text>
          <Text style={styles.budgetValue}>{inquiry.budget}</Text>
        </View>
        <View style={styles.locationBadge}>
          <Text style={styles.locationLabel}>Location</Text>
          <Text style={styles.locationValue}>{inquiry.location}</Text>
        </View>
      </View>
      
      <View style={styles.inquiryFooter}>
        <Text style={styles.timeAgo}>{inquiry.timeAgo}</Text>
        <TouchableOpacity 
          style={styles.respondButton}
          onPress={() => router.push(`/chat/${inquiry.clientId}`)}
        >
          <Text style={styles.respondButtonText}>Respond</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ARCHILINK</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'inquiries' && styles.activeTab]}
          onPress={() => setActiveTab('inquiries')}
        >
          <Text style={[styles.tabText, activeTab === 'inquiries' && styles.activeTabText]}>Inquiries</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={getArchitectSearchPlaceholder()}
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'active' && currentData.map(renderArchitectActiveProject)}
        {activeTab === 'completed' && currentData.map(renderArchitectCompletedProject)}
        {activeTab === 'inquiries' && currentData.map(renderArchitectInquiry)}
        
        {currentData.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {activeTab} {activeTab === 'inquiries' ? 'inquiries' : 'projects'} found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Client Projects View (simplified)
function ClientProjectsView({ activeTab, setActiveTab, searchQuery, setSearchQuery }: {
  activeTab: ClientProjectTab;
  setActiveTab: (tab: ClientProjectTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const router = useRouter();

  const clientProjectData = {
    active: [
      {
        id: '1',
        title: 'Home Renovation',
        architect: 'John Smith',
        status: 'In Progress',
        budget: '₱250,000',
        location: 'Makati City',
        startDate: 'June 15, 2025',
        progress: 35,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=200&fit=crop',
        proposals: 3
      },
      {
        id: '2',
        title: 'Office Interior Design',
        architect: 'Maria Garcia',
        status: 'Planning',
        budget: '₱180,000',
        location: 'BGC, Taguig',
        startDate: 'July 1, 2025',
        progress: 15,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop',
        proposals: 5
      }
    ],
    completed: [
      {
        id: '3',
        title: 'Kitchen Remodel',
        architect: 'Carlos Rivera',
        status: 'Completed',
        budget: '₱120,000',
        location: 'Quezon City',
        completedDate: 'May 20, 2025',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop'
      }
    ],
    cancelled: [
      {
        id: '4',
        title: 'Bathroom Renovation',
        architect: 'Anna Reyes',
        status: 'Cancelled',
        budget: '₱80,000',
        location: 'Pasig City',
        cancelledDate: 'April 10, 2025',
        reason: 'Budget constraints',
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=200&fit=crop'
      }
    ]
  };

  const currentData = clientProjectData[activeTab];

  const handleCreateProject = () => {
    router.push('/create-project');
  };

  const handleViewProposals = (projectId: string) => {
    router.push(`/proposals/${projectId}`);
  };

  const handleRateUser = (project: any) => {
    const userType = user?.userType === 'architect' ? 'client' : 'architect';
    router.push(`/rate-user/${project.id}?name=${project.architect || project.clientName}&userType=${userType}`);
  };

  const renderClientProject = (project: any) => (
    <TouchableOpacity key={project.id} style={clientStyles.projectCard}>
      <Image source={{ uri: project.image }} style={clientStyles.projectImage} />
      <View style={clientStyles.projectContent}>
        <Text style={clientStyles.projectTitle}>{project.title}</Text>
        <View style={clientStyles.projectInfo}>
          <View style={clientStyles.infoRow}>
            <MapPin size={16} color={colors.gray} />
            <Text style={clientStyles.infoText}>{project.location}</Text>
          </View>
          <View style={clientStyles.infoRow}>
            <DollarSign size={16} color={colors.gray} />
            <Text style={clientStyles.infoText}>{project.budget}</Text>
          </View>
          {activeTab === 'active' ? (
            <View style={clientStyles.infoRow}>
              <Calendar size={16} color={colors.gray} />
              <Text style={clientStyles.infoText}>Started: {project.startDate}</Text>
            </View>
          ) : activeTab === 'completed' ? (
            <View style={clientStyles.infoRow}>
              <Calendar size={16} color={colors.gray} />
              <Text style={clientStyles.infoText}>Completed: {project.completedDate}</Text>
            </View>
          ) : (
            <View style={clientStyles.infoRow}>
              <Calendar size={16} color={colors.gray} />
              <Text style={clientStyles.infoText}>Cancelled: {project.cancelledDate}</Text>
            </View>
          )}
        </View>
        {project.architect && (
          <Text style={clientStyles.architectName}>Architect: {project.architect}</Text>
        )}
        {activeTab === 'active' && (
          <>
            <View style={clientStyles.progressContainer}>
              <View style={clientStyles.progressBar}>
                <View style={[clientStyles.progressFill, { width: `${project.progress}%` }]} />
              </View>
              <Text style={clientStyles.progressText}>{project.progress}% Complete</Text>
            </View>
            {project.proposals && (
              <TouchableOpacity 
                style={clientStyles.proposalsButton}
                onPress={() => handleViewProposals(project.id)}
              >
                <Eye size={16} color={colors.primary} />
                <Text style={clientStyles.proposalsText}>View {project.proposals} Proposals</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        {activeTab === 'completed' && (
          <>
            {project.rating ? (
              <View style={clientStyles.ratingContainer}>
                <Text style={clientStyles.ratingText}>Your Rating: {project.rating}/5 ⭐</Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={clientStyles.rateButton}
                onPress={() => handleRateUser(project)}
              >
                <UserCheck size={16} color={colors.white} />
                <Text style={clientStyles.rateButtonText}>Rate Architect</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        {activeTab === 'cancelled' && (
          <View style={clientStyles.cancelledContainer}>
            <Text style={clientStyles.cancelledText}>Cancelled: {project.cancelledDate}</Text>
            <Text style={clientStyles.cancelledReason}>Reason: {project.reason}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={clientStyles.container}>
      <View style={clientStyles.header}>
        <Text style={clientStyles.headerTitle}>ARCHILINK</Text>
        <TouchableOpacity style={clientStyles.createButton} onPress={handleCreateProject}>
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={clientStyles.tabsContainer}>
        <TouchableOpacity 
          style={[clientStyles.tab, activeTab === 'active' && clientStyles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[clientStyles.tabText, activeTab === 'active' && clientStyles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[clientStyles.tab, activeTab === 'completed' && clientStyles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[clientStyles.tabText, activeTab === 'completed' && clientStyles.activeTabText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[clientStyles.tab, activeTab === 'cancelled' && clientStyles.activeTab]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[clientStyles.tabText, activeTab === 'cancelled' && clientStyles.activeTabText]}>Cancelled</Text>
        </TouchableOpacity>
      </View>
      
      <View style={clientStyles.searchContainer}>
        <View style={clientStyles.searchInputContainer}>
          <Search size={20} color={colors.primary} style={clientStyles.searchIcon} />
          <TextInput
            style={clientStyles.searchInput}
            placeholder="Search projects..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <ScrollView style={clientStyles.contentContainer}>
        {currentData.map(renderClientProject)}
        
        {currentData.length === 0 && (
          <View style={clientStyles.emptyState}>
            <Text style={clientStyles.emptyStateText}>
              No {activeTab} projects found
            </Text>
            <Text style={clientStyles.emptyStateSubtext}>
              {activeTab === 'active' ? 'Start a new project to see it here' : 'Complete a project to see it here'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const clientStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  createButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  tab: {
    paddingBottom: 15,
    marginRight: 30,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  projectCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectImage: {
    width: '100%',
    height: 150,
  },
  projectContent: {
    padding: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
  },
  projectInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 8,
  },
  architectName: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginBottom: 6,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'right',
  },
  proposalsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  proposalsText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 6,
  },
  ratingContainer: {
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
  },
  cancelledContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
  cancelledText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
    marginBottom: 4,
  },
  cancelledReason: {
    fontSize: 12,
    color: colors.gray,
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  rateButtonText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    opacity: 0.7,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 15,
    justifyContent: 'space-around',
  },
  tab: {
    paddingBottom: 15,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  projectCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  projectImage: {
    width: '100%',
    height: 200,
  },
  projectOverlay: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  projectClient: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  projectLocation: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 15,
  },
  projectDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.white,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'right',
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  completedText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rateClientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  rateClientText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  inquiryCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inquiryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginRight: 6,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  inquiryImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  inquiryActions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  actionButton: {
    marginRight: 15,
  },
  likesText: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  inquiryDescription: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 12,
  },
  budgetLocationRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  budgetBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
  },
  budgetLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  budgetValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  locationBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  inquiryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeAgo: {
    fontSize: 12,
    color: colors.gray,
  },
  respondButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  respondButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
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