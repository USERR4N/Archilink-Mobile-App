import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react-native';

export default function HelpCenterScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [problemReport, setProblemReport] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSubmitReport = () => {
    if (problemReport.trim()) {
      // Handle problem report submission
      console.log('Problem report submitted:', problemReport);
      setProblemReport('');
    }
  };

  const faqItems = [
    "How do I verify my PRC license as an architect?",
    "How to create a project listing?",
    "What payment methods are accepted?",
    "How to contact an architect?",
    "How to update my profile information?",
    "What is the escrow system?",
    "How to cancel a project?",
    "How to leave a review?",
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SETTINGS</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.pageTitle}>Help Center</Text>
          
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.gray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for topics, questions..."
              placeholderTextColor={colors.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            
            {faqItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.faqItem}>
                <Text style={styles.faqText}>{item}</Text>
                <ChevronRight size={20} color={colors.primary} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Report a Problem</Text>
            
            <View style={styles.reportContainer}>
              <TextInput
                style={styles.reportInput}
                placeholder="Describe your problem here..."
                placeholderTextColor={colors.gray}
                value={problemReport}
                onChangeText={setProblemReport}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
                <Text style={styles.submitButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  faqText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    marginRight: 10,
  },
  reportContainer: {
    marginTop: 10,
  },
  reportInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: colors.black,
    minHeight: 120,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});