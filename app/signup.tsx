import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { CityBackground } from '@/components/CityBackground';
import { FormContainer } from '@/components/FormContainer';
import { Logo } from '@/components/Logo';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { BasicInfoForm } from '@/components/signup/BasicInfoForm';
import { ProfessionalDetailsForm } from '@/components/signup/ProfessionalDetailsForm';
import { PortfolioForm } from '@/components/signup/PortfolioForm';
import { LocationDetailsForm } from '@/components/signup/LocationDetailsForm';

const { height: screenHeight } = Dimensions.get('window');

export default function SignupScreen() {
  const currentStep = useAuthStore(state => state.currentSignupStep);
  const resetSignupForm = useAuthStore(state => state.resetSignupForm);
  const [showSplash, setShowSplash] = useState(true);
  
  // Animation values
  const logoScale = new Animated.Value(0.5);
  const logoOpacity = new Animated.Value(0);
  const slideUpValue = new Animated.Value(screenHeight);
  
  // Reset form when component unmounts
  useEffect(() => {
    return () => {
      resetSignupForm();
    };
  }, [resetSignupForm]);
  
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
    
    // After 2 seconds, slide up the form
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm />;
      case 2:
        return <ProfessionalDetailsForm />;
      case 3:
        return <PortfolioForm />;
      case 4:
        return <LocationDetailsForm />;
      default:
        return <BasicInfoForm />;
    }
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
            {renderStep()}
          </View>
        </Animated.View>
      </View>
    );
  }
  
  return (
    <View style={styles.splashContainer}>
      <View style={styles.formBox}>
        {renderStep()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
  },
  slideUpContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  formBox: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});