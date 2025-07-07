import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: CustomButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.button, styles.primaryButton, disabled && styles.disabledButton, style];
      case 'secondary':
        return [styles.button, styles.secondaryButton, disabled && styles.disabledButton, style];
      case 'outline':
        return [styles.button, styles.outlineButton, disabled && styles.disabledOutlineButton, style];
      default:
        return [styles.button, styles.primaryButton, disabled && styles.disabledButton, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  primaryButton: {
    backgroundColor: colors.white,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: colors.gray,
    opacity: 0.7,
  },
  disabledOutlineButton: {
    borderColor: colors.gray,
    opacity: 0.7,
  },
  primaryText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});