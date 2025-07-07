import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { UserType } from '@/types/user';

interface UserTypeSelectorProps {
  selectedType: UserType | null;
  onSelect: (type: UserType) => void;
}

export const UserTypeSelector = ({ selectedType, onSelect }: UserTypeSelectorProps) => {
  const [hoveredType, setHoveredType] = useState<UserType | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What Are You?</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'architect' && styles.selectedOption,
          ]}
          onPress={() => onSelect('architect')}
          onPressIn={() => setHoveredType('architect')}
          onPressOut={() => setHoveredType(null)}
        >
          <Text style={[
            styles.optionText,
            selectedType === 'architect' && styles.selectedOptionText,
            hoveredType === 'architect' && styles.hoveredOptionText,
          ]}>Architect User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === 'client' && styles.selectedOption,
          ]}
          onPress={() => onSelect('client')}
          onPressIn={() => setHoveredType('client')}
          onPressOut={() => setHoveredType(null)}
        >
          <Text style={[
            styles.optionText,
            selectedType === 'client' && styles.selectedOptionText,
            hoveredType === 'client' && styles.hoveredOptionText,
          ]}>Client User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '500',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  option: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  selectedOption: {
    backgroundColor: colors.white,
  },
  optionText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedOptionText: {
    color: colors.primary,
  },
  hoveredOptionText: {
    color: colors.primary,
  },
});