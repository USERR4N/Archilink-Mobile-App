import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, MapPin, DollarSign, Calendar, Home, Building, Wrench } from 'lucide-react-native';

export default function CreateProjectScreen() {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [timeline, setTimeline] = useState('');
  const [requirements, setRequirements] = useState('');

  const projectTypes = [
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building },
    { id: 'renovation', label: 'Renovation', icon: Wrench },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleCreateProject = () => {
    if (!projectTitle.trim() || !projectDescription.trim() || !projectType || !budget.trim() || !location.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would typically save the project
    Alert.alert('Success', 'Your project has been posted! Architects will start sending proposals soon.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Project</Text>
          <TouchableOpacity onPress={handleCreateProject} style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Project Title */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Project Title *</Text>
            <TextInput
              style={styles.input}
              value={projectTitle}
              onChangeText={setProjectTitle}
              placeholder="e.g., Modern Home Design"
              placeholderTextColor={colors.gray}
            />
          </View>

          {/* Project Type */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Project Type *</Text>
            <View style={styles.projectTypeContainer}>
              {projectTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.projectTypeButton,
                      projectType === type.id && styles.projectTypeButtonActive
                    ]}
                    onPress={() => setProjectType(type.id)}
                  >
                    <IconComponent 
                      size={24} 
                      color={projectType === type.id ? colors.white : colors.primary} 
                    />
                    <Text style={[
                      styles.projectTypeText,
                      projectType === type.id && styles.projectTypeTextActive
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Project Description */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Project Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={projectDescription}
              onChangeText={setProjectDescription}
              placeholder="Describe your project in detail..."
              placeholderTextColor={colors.gray}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Budget */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Budget Range *</Text>
            <View style={styles.inputWithIcon}>
              <DollarSign size={20} color={colors.gray} />
              <TextInput
                style={styles.inputWithIconText}
                value={budget}
                onChangeText={setBudget}
                placeholder="e.g., ₱100,000 - ₱200,000"
                placeholderTextColor={colors.gray}
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Location *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color={colors.gray} />
              <TextInput
                style={styles.inputWithIconText}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g., Makati City, Metro Manila"
                placeholderTextColor={colors.gray}
              />
            </View>
          </View>

          {/* Timeline */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Expected Timeline</Text>
            <View style={styles.inputWithIcon}>
              <Calendar size={20} color={colors.gray} />
              <TextInput
                style={styles.inputWithIconText}
                value={timeline}
                onChangeText={setTimeline}
                placeholder="e.g., 3-6 months"
                placeholderTextColor={colors.gray}
              />
            </View>
          </View>

          {/* Requirements */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Specific Requirements</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={requirements}
              onChangeText={setRequirements}
              placeholder="List any specific requirements, materials, or features you want..."
              placeholderTextColor={colors.gray}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Tips for a Great Project Post</Text>
            <Text style={styles.tipsText}>
              • Be specific about your requirements{'\n'}
              • Include your budget range to get accurate proposals{'\n'}
              • Mention your preferred timeline{'\n'}
              • Add any style preferences or inspiration{'\n'}
              • Include location for local architects
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.black,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputWithIconText: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 10,
  },
  projectTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  projectTypeButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    gap: 8,
  },
  projectTypeButtonActive: {
    backgroundColor: colors.primary,
  },
  projectTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  projectTypeTextActive: {
    color: colors.white,
  },
  tipsSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
});