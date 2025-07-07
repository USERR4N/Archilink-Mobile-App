import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Upload } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface UploadButtonProps {
  title: string;
  onPress: () => void;
}

export const UploadButton = ({ title, onPress }: UploadButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Upload size={18} color={colors.primary} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});