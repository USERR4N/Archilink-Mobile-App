import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.compassContainer}>
        {/* Top handle */}
        <View style={styles.topHandle} />
        
        {/* Main circle */}
        <View style={styles.mainCircle}>
          <View style={styles.innerCircle} />
        </View>
        
        {/* Left leg */}
        <View style={[styles.leg, styles.leftLeg]} />
        
        {/* Right leg */}
        <View style={[styles.leg, styles.rightLeg]} />
        
        {/* Center triangle */}
        <View style={styles.centerTriangle} />
      </View>
      <Text style={styles.logoText}>ARCHILINK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  compassContainer: {
    width: 60,
    height: 80,
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  topHandle: {
    width: 16,
    height: 20,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: -2,
    zIndex: 2,
  },
  mainCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  leg: {
    width: 4,
    height: 35,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
  },
  leftLeg: {
    left: 12,
    transform: [{ rotate: '15deg' }],
    transformOrigin: 'top center',
  },
  rightLeg: {
    right: 12,
    transform: [{ rotate: '-15deg' }],
    transformOrigin: 'top center',
  },
  centerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.white,
    position: 'absolute',
    top: 28,
    zIndex: 3,
  },
  logoText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});