import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MBTIType } from '@/types';

interface PersonalityCardProps {
  type: MBTIType;
  onPress: () => void;
}

export const PersonalityCard: React.FC<PersonalityCardProps> = ({ type, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.code}>{type.code}</Text>
        <Text style={styles.name}>{type.name}</Text>
      </View>
      <Text style={styles.description}>{type.description}</Text>
      <View style={styles.traitsContainer}>
        {type.traits.slice(0, 3).map((trait, index) => (
          <View key={index} style={styles.trait}>
            <Text style={styles.traitText}>{trait}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 8,
  },
  code: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  trait: {
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  traitText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B82F6',
  },
});