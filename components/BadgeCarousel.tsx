import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Award, Trophy, Medal, Star, Clock, Users, Calendar, Shield } from 'lucide-react-native';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
}

interface BadgeCarouselProps {
  badges: Badge[];
}

const defaultBadges: Badge[] = [
  {
    id: '1',
    title: 'Top 10 Competitor',
    description: 'Actively competing in this month\'s rankings',
    icon: <Trophy size={24} color={colors.white} />,
    color: '#FFD700',
    earned: true,
  },
  {
    id: '2',
    title: 'Loyal Architect',
    description: 'Logged in consistently for the past 6 months',
    icon: <Shield size={24} color={colors.white} />,
    color: '#4CAF50',
    earned: true,
  },
  {
    id: '3',
    title: '3 Years Archi',
    description: 'Part of ArchiLink for 3+ years',
    icon: <Calendar size={24} color={colors.white} />,
    color: '#2196F3',
    earned: true,
  },
  {
    id: '4',
    title: 'Verified Pro',
    description: 'Profile verification complete',
    icon: <Award size={24} color={colors.white} />,
    color: '#9C27B0',
    earned: true,
  },
  {
    id: '5',
    title: 'Fast Responder',
    description: 'Replied to 95% of messages in under 1 hour',
    icon: <Clock size={24} color={colors.white} />,
    color: '#FF9800',
    earned: true,
  },
  {
    id: '6',
    title: 'Community Star',
    description: 'Highly rated by clients and peers',
    icon: <Star size={24} color={colors.white} />,
    color: '#E91E63',
    earned: false,
  },
  {
    id: '7',
    title: 'Team Player',
    description: 'Collaborated on 10+ projects',
    icon: <Users size={24} color={colors.white} />,
    color: '#607D8B',
    earned: false,
  },
  {
    id: '8',
    title: 'Excellence Award',
    description: 'Maintained 5-star rating for 6 months',
    icon: <Medal size={24} color={colors.white} />,
    color: '#795548',
    earned: false,
  },
];

export const BadgeCarousel = ({ badges = defaultBadges }: BadgeCarouselProps) => {
  const handleBadgePress = (badge: Badge) => {
    console.log('Badge pressed:', badge.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Achievements</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge.id}
            style={[
              styles.badgeContainer,
              { backgroundColor: badge.earned ? badge.color : colors.lightGray },
              !badge.earned && styles.unearnedBadge
            ]}
            onPress={() => handleBadgePress(badge)}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              {badge.earned ? badge.icon : (
                React.cloneElement(badge.icon as React.ReactElement, {
                  color: colors.gray,
                } as any)
              )}
            </View>
            
            <Text style={[
              styles.badgeTitle,
              { color: badge.earned ? colors.white : colors.gray }
            ]}>
              {badge.title}
            </Text>
            
            {badge.earned && (
              <View style={styles.earnedIndicator}>
                <Text style={styles.earnedText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingLeft: 20,
  },
  scrollContent: {
    paddingRight: 20,
  },
  badgeContainer: {
    width: 120,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unearnedBadge: {
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderStyle: 'dashed',
  },
  iconContainer: {
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 14,
  },
  earnedIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.success,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  earnedText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});