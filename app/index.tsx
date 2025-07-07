import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { CityBackground } from '@/components/CityBackground';
import { FormContainer } from '@/components/FormContainer';
import { CustomInput } from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore(state => state.login);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    // Validate inputs
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        // Navigate to the appropriate dashboard based on user type
        router.replace('/(tabs)');
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ email: 'An error occurred during login' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <CityBackground>
      <FormContainer>
        <CustomInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: undefined });
          }}
          error={errors.email}
          keyboardType="email-address"
        />
        
        <CustomInput
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: undefined });
          }}
          secureTextEntry
          error={errors.password}
        />
        
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Log in"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          />
          
          <CustomButton
            title="Create Account"
            onPress={handleCreateAccount}
            variant="outline"
            style={styles.createAccountButton}
          />
        </View>
        
        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>
        
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.appleButton}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </CityBackground>
  );
}

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: colors.white,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    marginBottom: 10,
  },
  createAccountButton: {
    width: '100%',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.white,
  },
  orText: {
    color: colors.white,
    marginHorizontal: 10,
    fontSize: 16,
  },
  socialButtonsContainer: {
    width: '100%',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});