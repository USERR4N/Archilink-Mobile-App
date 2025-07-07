import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface ProfileInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export const ProfileInput = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  style,
  inputStyle,
}: ProfileInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C7C7CC"
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  label: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 12,
    fontSize: 16,
    color: colors.black,
  },
});