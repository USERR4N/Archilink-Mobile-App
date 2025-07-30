import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { CityBackground } from '@/components/CityBackground';
import { FormContainer } from '@/components/FormContainer';
import { CustomInput } from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import { Logo } from '@/components/Logo';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

const { height: screenHeight } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  const login = useAuthStore(state => state.login);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  // Animation values
  const logoScale = new Animated.Value(0.5);
  const logoOpacity = new Animated.Value(0);
  const slideUpValue = new Animated.Value(screenHeight * 0.5);
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);
  
  // Splash animation
  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
    
    // After 2 seconds, slide up the form halfway
    const timer = setTimeout(() => {
      Animated.timing(slideUpValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

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
      // Simulate login validation
      if (email === 'test@example.com' && password === 'password') {
        // Create a mock user for successful login
        const mockUser = {
          id: '1',
          email: email,
          fullName: 'Test User',
          userType: 'client' as const,
          isVerified: true,
        };
        
        login(mockUser);
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

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }]
            }
          ]}
        >
          <Logo color="white" />
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.slideUpContainer,
            {
              transform: [{ translateY: slideUpValue }]
            }
          ]}
        >
          <View style={styles.formBox}>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>Enter your details below</Text>
            
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
          </View>
        </Animated.View>
      </View>
    );
  }
  
  return (
    <View style={styles.splashContainer}>
      <View style={styles.formBox}>
        <Text style={styles.welcomeTitle}>Welcome Back</Text>
        <Text style={styles.welcomeSubtitle}>Enter your details below</Text>
        
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  slideUpContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  formBox: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    flex: 1,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: colors.primary,
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
    backgroundColor: colors.lightGray,
  },
  orText: {
    color: colors.gray,
    marginHorizontal: 10,
    fontSize: 16,
  },
  socialButtonsContainer: {
    width: '100%',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
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