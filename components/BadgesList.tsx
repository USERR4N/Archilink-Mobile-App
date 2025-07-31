import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Award, Trophy, Medal, Star, Clock, Shield } from 'lucide-react-native';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: 'award' | 'trophy' | 'medal' | 'star' | 'clock' | 'shield';
  color: string;
}

interface BadgesListProps {
  badges: Badge[];
}

const BadgeIcon = ({ icon, color }: { icon: Badge['icon']; color: string }) => {
  const iconProps = { size: 20, color };
  
  switch (icon) {
    case 'award':
      return <Award {...iconProps} />;
    case 'trophy':
      return <Trophy {...iconProps} />;
    case 'medal':
      return <Medal {...iconProps} />;
    case 'star':
      return <Star {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'shield':
      return <Shield {...iconProps} />;
    default:
      return <Award {...iconProps} />;
  }
};

export const BadgesList = ({ badges }: BadgesListProps) => {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Achievements</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.badgesContainer}
        contentContainerStyle={styles.badgesContent}
      >
        {badges.map((badge) => (
          <TouchableOpacity key={badge.id} style={styles.badgeItem}>
            <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
              <BadgeIcon icon={badge.icon} color={colors.white} />
            </View>
            <Text style={styles.badgeTitle} numberOfLines={2}>
              {badge.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  badgesContainer: {
    marginTop: 10,
  },
  badgesContent: {
    paddingRight: 20,
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 16,
  },
});