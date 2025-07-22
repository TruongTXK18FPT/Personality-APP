import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PersonalityCard } from '@/components/PersonalityCard';
import { AppButton } from '@/components/AppButton';
import { mbtiTypes } from '@/data/mockData';
import { MBTIType } from '@/types';

export default function MBTIInfoScreen() {
  const [selectedType, setSelectedType] = useState<MBTIType | null>(null);

  const handleTypePress = (type: MBTIType) => {
    setSelectedType(type);
  };

  const closeModal = () => {
    setSelectedType(null);
  };

  const renderTypeCard = ({ item }: { item: MBTIType }) => (
    <PersonalityCard type={item} onPress={() => handleTypePress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MBTI Personality Types</Text>
        <Text style={styles.subtitle}>
          Explore all 16 Myers-Briggs personality types
        </Text>
      </View>

      <FlatList
        data={mbtiTypes}
        renderItem={renderTypeCard}
        keyExtractor={(item) => item.code}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={selectedType !== null}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Personality Details</Text>
            <View style={styles.placeholder} />
          </View>

          {selectedType && (
            <ScrollView style={styles.modalContent} contentContainerStyle={styles.modalScrollContent}>
              <View style={styles.modalTypeHeader}>
                <Text style={styles.modalTypeCode}>{selectedType.code}</Text>
                <Text style={styles.modalTypeName}>{selectedType.name}</Text>
              </View>

              <Text style={styles.modalDescription}>{selectedType.description}</Text>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Key Traits</Text>
                <View style={styles.traitsList}>
                  {selectedType.traits.map((trait, index) => (
                    <View key={index} style={styles.traitBadge}>
                      <Text style={styles.traitBadgeText}>{trait}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Strengths</Text>
                {selectedType.strengths.map((strength, index) => (
                  <View key={index} style={styles.listItemContainer}>
                    <Text style={styles.listItemBullet}>✓</Text>
                    <Text style={styles.listItemText}>{strength}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Areas for Growth</Text>
                {selectedType.weaknesses.map((weakness, index) => (
                  <View key={index} style={styles.listItemContainer}>
                    <Text style={styles.listItemBullet}>•</Text>
                    <Text style={styles.listItemText}>{weakness}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.modalActions}>
                <AppButton
                  title="Take MBTI Test"
                  onPress={() => {
                    closeModal();
                    // Navigate to quiz would go here
                  }}
                  size="large"
                  style={styles.modalActionButton}
                />
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 32,
  },
  modalContent: {
    flex: 1,
  },
  modalScrollContent: {
    padding: 24,
  },
  modalTypeHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTypeCode: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 8,
  },
  modalTypeName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  traitsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  traitBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  traitBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listItemBullet: {
    fontSize: 16,
    color: '#3B82F6',
    marginRight: 8,
    marginTop: 2,
  },
  listItemText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },
  modalActions: {
    marginTop: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  modalActionButton: {
    marginBottom: 0,
  },
});