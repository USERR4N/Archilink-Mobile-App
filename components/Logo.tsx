import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants/colors';

interface LogoProps {
  color?: 'default' | 'white';
}

export const Logo = ({ color = 'default' }: LogoProps) => {
  const isWhite = color === 'white';
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoSymbol}>
          <View style={[styles.compassTop, isWhite && styles.whiteColor]} />
          <View style={[styles.compassCircle, isWhite && styles.whiteColor]}>
            <View style={[styles.compassInner, isWhite && styles.redInner]} />
          </View>
          <View style={[styles.compassLeftLeg, isWhite && styles.whiteColor]} />
          <View style={[styles.compassRightLeg, isWhite && styles.whiteColor]} />
        </View>
        <Text style={[styles.logoText, isWhite && styles.whiteText]}>archilink</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logoSymbol: {
    width: 40,
    height: 50,
    marginRight: 12,
    position: 'relative',
  },
  compassTop: {
    width: 12,
    height: 8,
    backgroundColor: '#A53333',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    top: 0,
    left: 14,
  },
  compassCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A53333',
    position: 'absolute',
    top: 6,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  compassLeftLeg: {
    width: 3,
    height: 25,
    backgroundColor: '#A53333',
    position: 'absolute',
    bottom: 0,
    left: 8,
    transform: [{ rotate: '15deg' }],
    transformOrigin: 'top center',
  },
  compassRightLeg: {
    width: 3,
    height: 25,
    backgroundColor: '#A53333',
    position: 'absolute',
    bottom: 0,
    right: 8,
    transform: [{ rotate: '-15deg' }],
    transformOrigin: 'top center',
  },
  logoText: {
    color: '#A53333',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  whiteColor: {
    backgroundColor: colors.white,
  },
  whiteText: {
    color: colors.white,
  },
  redInner: {
    backgroundColor: '#A53333',
  },
});