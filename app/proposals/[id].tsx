import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Star, MapPin, Calendar, DollarSign, CheckCircle, MessageCircle, Eye } from 'lucide-react-native';

interface Proposal {
  id: string;
  architect: {
    name: string;
    image: string;
    rating: number;
    reviews: number;
    location: string;
    isVerified: boolean;
    specialty: string;
  };
  proposal: {
    title: string;
    description: string;
    timeline: string;
    budget: string;
    deliverables: string[];
  };
  submittedDate: string;
  status: 'pending' | 'accepted' | 'declined';
}

export default function ProposalsScreen() {
  const { id } = useLocalSearchParams();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      architect: {
        name: 'Carlos Mendoza',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviews: 127,
        location: 'Makati City',
        isVerified: true,
        specialty: 'Residential Architecture'
      },
      proposal: {
        title: 'Modern Home Design with Sustainable Features',
        description: 'I would love to help you create a beautiful modern home that incorporates sustainable design elements. My approach focuses on maximizing natural light, using eco-friendly materials, and creating functional spaces that meet your family\'s needs.',
        timeline: '4-5 months',
        budget: '₱180,000 - ₱220,000',
        deliverables: [
          'Initial consultation and site analysis',
          'Conceptual design and 3D renderings',
          'Detailed architectural plans',
          'Material specifications',
          'Construction supervision'
        ]
      },
      submittedDate: '2 days ago',
      status: 'pending'
    },
    {
      id: '2',
      architect: {
        name: 'Maria Santos',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviews: 89,
        location: 'Quezon City',
        isVerified: true,
        specialty: 'Modern Architecture'
      },
      proposal: {
        title: 'Contemporary Design with Smart Home Integration',
        description: 'Your project sounds exciting! I specialize in contemporary designs that blend aesthetics with functionality. I can help you create a smart home that\'s both beautiful and efficient.',
        timeline: '3-4 months',
        budget: '₱200,000 - ₱250,000',
        deliverables: [
          'Site visit and consultation',
          'Design development',
          'Technical drawings',
          'Smart home integration plan',
          'Project management'
        ]
      },
      submittedDate: '1 day ago',
      status: 'pending'
    },
    {
      id: '3',
      architect: {
        name: 'John Rivera',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        reviews: 156,
        location: 'Taguig City',
        isVerified: false,
        specialty: 'Sustainable Architecture'
      },
      proposal: {
        title: 'Eco-Friendly Modern Home Design',
        description: 'I have extensive experience in sustainable architecture and would be thrilled to work on your modern home project. My designs focus on energy efficiency and environmental responsibility.',
        timeline: '5-6 months',
        budget: '₱150,000 - ₱190,000',
        deliverables: [
          'Sustainable design consultation',
          'Energy efficiency analysis',
          'Architectural drawings',
          'Green building certification support',
          'Construction guidance'
        ]
      },
      submittedDate: '3 days ago',
      status: 'pending'
    }
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleViewProfile = (architectId: string) => {
    router.push(`/user-profile/${architectId}`);
  };

  const handleMessage = (architectId: string, architectName: string) => {
    router.push(`/chat/${architectId}?name=${architectName}`);
  };

  const handleAcceptProposal = (proposalId: string) => {
    setProposals(prev =>
      prev.map(proposal =>
        proposal.id === proposalId
          ? { ...proposal, status: 'accepted' }
          : proposal
      )
    );
  };

  const handleDeclineProposal = (proposalId: string) => {
    setProposals(prev =>
      prev.map(proposal =>
        proposal.id === proposalId
          ? { ...proposal, status: 'declined' }
          : proposal
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return colors.success;
      case 'declined':
        return colors.error;
      default:
        return colors.warning;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
      default:
        return 'Pending';
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Proposals ({proposals.length})</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {proposals.map((proposal) => (
            <View key={proposal.id} style={styles.proposalCard}>
              {/* Architect Info */}
              <View style={styles.architectSection}>
                <Image source={{ uri: proposal.architect.image }} style={styles.architectImage} />
                <View style={styles.architectInfo}>
                  <View style={styles.architectNameRow}>
                    <Text style={styles.architectName}>{proposal.architect.name}</Text>
                    {proposal.architect.isVerified && (
                      <CheckCircle size={16} color="#1DA1F2" style={styles.verifiedIcon} />
                    )}
                  </View>
                  <Text style={styles.architectSpecialty}>{proposal.architect.specialty}</Text>
                  <View style={styles.architectStats}>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#FFD700" fill="#FFD700" />
                      <Text style={styles.ratingText}>{proposal.architect.rating}</Text>
                      <Text style={styles.reviewCount}>({proposal.architect.reviews})</Text>
                    </View>
                    <View style={styles.locationContainer}>
                      <MapPin size={14} color={colors.gray} />
                      <Text style={styles.locationText}>{proposal.architect.location}</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(proposal.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(proposal.status)}</Text>
                </View>
              </View>

              {/* Proposal Details */}
              <View style={styles.proposalSection}>
                <Text style={styles.proposalTitle}>{proposal.proposal.title}</Text>
                <Text style={styles.proposalDescription}>{proposal.proposal.description}</Text>
                
                <View style={styles.proposalDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color={colors.primary} />
                    <Text style={styles.detailLabel}>Timeline:</Text>
                    <Text style={styles.detailValue}>{proposal.proposal.timeline}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <DollarSign size={16} color={colors.primary} />
                    <Text style={styles.detailLabel}>Budget:</Text>
                    <Text style={styles.detailValue}>{proposal.proposal.budget}</Text>
                  </View>
                </View>

                <View style={styles.deliverablesSection}>
                  <Text style={styles.deliverablesTitle}>What's Included:</Text>
                  {proposal.proposal.deliverables.map((deliverable, index) => (
                    <View key={index} style={styles.deliverableItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.deliverableText}>{deliverable}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionsSection}>
                <Text style={styles.submittedDate}>Submitted {proposal.submittedDate}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.viewProfileButton}
                    onPress={() => handleViewProfile(proposal.architect.name)}
                  >
                    <Eye size={16} color={colors.primary} />
                    <Text style={styles.viewProfileText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.messageButton}
                    onPress={() => handleMessage(proposal.architect.name, proposal.architect.name)}
                  >
                    <MessageCircle size={16} color={colors.white} />
                    <Text style={styles.messageText}>Message</Text>
                  </TouchableOpacity>
                </View>
                
                {proposal.status === 'pending' && (
                  <View style={styles.decisionButtons}>
                    <TouchableOpacity 
                      style={styles.declineButton}
                      onPress={() => handleDeclineProposal(proposal.id)}
                    >
                      <Text style={styles.declineText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.acceptButton}
                      onPress={() => handleAcceptProposal(proposal.id)}
                    >
                      <Text style={styles.acceptText}>Accept Proposal</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  proposalCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  architectSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  architectImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  architectInfo: {
    flex: 1,
  },
  architectNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  architectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  architectSpecialty: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
  },
  architectStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.gray,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.gray,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  proposalSection: {
    padding: 16,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  proposalDescription: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 16,
  },
  proposalDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  detailValue: {
    fontSize: 14,
    color: colors.gray,
  },
  deliverablesSection: {
    marginBottom: 16,
  },
  deliverablesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: 8,
  },
  deliverableText: {
    fontSize: 14,
    color: colors.black,
    flex: 1,
    lineHeight: 20,
  },
  actionsSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  submittedDate: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  viewProfileText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  messageText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
  decisionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineText: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 2,
    backgroundColor: colors.success,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
});