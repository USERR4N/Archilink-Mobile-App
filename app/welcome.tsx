import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { Logo } from '@/components/Logo';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleSignIn = () => {
    router.push('/');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      {/* Top accent shapes */}
      <View style={styles.topLeftAccent} />
      <View style={styles.topRightAccent} />
      
      {/* Main content */}
      <View style={styles.content}>
        <Logo color="default" />
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.taglineText}>
            Connect. Collaborate. Create with trusted architects.
          </Text>
        </View>
      </View>
      
      {/* Bottom curved container */}
      <View style={styles.bottomContainer}>
        <View style={styles.curvedTop} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topLeftAccent: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primary,
    opacity: 0.1,
  },
  topRightAccent: {
    position: 'absolute',
    top: 100,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    opacity: 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  taglineText: {
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 26,
  },
  bottomContainer: {
    position: 'relative',
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingBottom: 50,
    paddingTop: 40,
  },
  curvedTop: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: {
    gap: 15,
  },
  signInButton: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  signInButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});