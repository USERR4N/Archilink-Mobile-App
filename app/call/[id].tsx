import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Users, Grid3X3, Plus } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function CallScreen() {
  const { id, name } = useLocalSearchParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    router.back();
  };

  const getProfileImage = () => {
    switch (id) {
      case 'lancelot':
        return 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      case 'carlos':
        return 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      case 'anna':
        return 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
      default:
        return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: getProfileImage() }}
            style={styles.profileImage}
          />
          <Text style={styles.callerName}>{name}</Text>
          <Text style={styles.callStatus}>CALLING</Text>
          <Text style={styles.callDuration}>{formatDuration(callDuration)}</Text>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          {/* First Row */}
          <View style={styles.controlRow}>
            <TouchableOpacity 
              style={[styles.controlButton, styles.secondaryButton]}
              onPress={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff size={24} color={colors.gray} /> : <Mic size={24} color={colors.gray} />}
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.controlButton, styles.secondaryButton]}>
              <Users size={24} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.controlButton, styles.secondaryButton]}>
              <Grid3X3 size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={styles.controlRow}>
            <TouchableOpacity style={[styles.controlButton, styles.secondaryButton]}>
              <Video size={24} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.controlButton, styles.secondaryButton]}>
              <Grid3X3 size={24} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.controlButton, styles.secondaryButton]}>
              <Plus size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          {/* End Call Button */}
          <TouchableOpacity 
            style={[styles.controlButton, styles.endCallButton]}
            onPress={handleEndCall}
          >
            <PhoneOff size={28} color={colors.white} />
          </TouchableOpacity>
          
          <Text style={styles.endCallText}>Decline</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 80,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: colors.lightGray,
  },
  callerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  callStatus: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 4,
  },
  callDuration: {
    fontSize: 14,
    color: colors.gray,
  },
  controlsContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: colors.white,
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 20,
  },
  endCallText: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 8,
    fontWeight: '500',
  },
});