import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface DropdownProps {
  label: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
}: DropdownProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          {selectedValue || placeholder}
        </Text>
        <ChevronDown size={20} color={colors.white} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  selectedText: {
    color: colors.white,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.black,
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  optionText: {
    fontSize: 16,
    color: colors.black,
  },
  closeButton: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});