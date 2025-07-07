import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

export const CityBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.cityContainer}>
          {/* City silhouette */}
          <View style={styles.building1} />
          <View style={styles.building2} />
          <View style={styles.building3} />
          <View style={styles.building4} />
          <View style={styles.building5} />
          <View style={styles.building6} />
          <View style={styles.building7} />
          <View style={styles.building8} />
          <View style={styles.building9} />
          <View style={styles.building10} />
          
          {/* Water */}
          <View style={styles.water}>
            <View style={styles.wave1} />
            <View style={styles.wave2} />
          </View>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: colors.primary,
  },
  cityContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 0.3,
  },
  building1: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    width: 30,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building2: {
    position: 'absolute',
    bottom: 30,
    left: 45,
    width: 40,
    height: 180,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building3: {
    position: 'absolute',
    bottom: 30,
    left: 90,
    width: 35,
    height: 150,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building4: {
    position: 'absolute',
    bottom: 30,
    left: 130,
    width: 50,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building5: {
    position: 'absolute',
    bottom: 30,
    left: 185,
    width: 45,
    height: 170,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building6: {
    position: 'absolute',
    bottom: 30,
    left: 235,
    width: 30,
    height: 130,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building7: {
    position: 'absolute',
    bottom: 30,
    left: 270,
    width: 40,
    height: 190,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building8: {
    position: 'absolute',
    bottom: 30,
    left: 315,
    width: 35,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building9: {
    position: 'absolute',
    bottom: 30,
    left: 355,
    width: 45,
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  building10: {
    position: 'absolute',
    bottom: 30,
    left: 405,
    width: 30,
    height: 110,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  water: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  wave1: {
    position: 'absolute',
    top: 5,
    width: width,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  wave2: {
    position: 'absolute',
    top: 15,
    width: width,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});