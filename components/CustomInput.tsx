import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder = 'Type here...',
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  style,
  inputStyle,
}: CustomInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {isPasswordVisible ? (
              <EyeOff size={20} color={colors.white} />
            ) : (
              <Eye size={20} color={colors.white} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    paddingVertical: 8,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});