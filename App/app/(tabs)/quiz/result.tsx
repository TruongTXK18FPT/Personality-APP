import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AppButton } from '@/components/AppButton';
import { mbtiTypes } from '@/data/mockData';

export default function ResultScreen() {
  const router = useRouter();
  const { type, result } = useLocalSearchParams<{ type: 'MBTI' | 'DISC'; result: string }>();

  const getResultInfo = () => {
    if (type === 'MBTI') {
      const mbtiType = mbtiTypes.find(t => t.code === result);
      return mbtiType || {
        code: result || 'ENFP',
        name: 'The Campaigner',
        description: 'Enthusiastic, creative and sociable free spirits.',
        traits: ['Enthusiastic', 'Creative', 'Sociable'],
        strengths: ['Excellent people skills', 'Strong communication abilities'],
        weaknesses: ['Can procrastinate', 'May have trouble focusing']
      };
    } else {
      const discResults = {
        'D': { name: 'Dominance', description: 'Direct, decisive, and results-oriented' },
        'I': { name: 'Influence', description: 'Enthusiastic, optimistic, and people-oriented' },
        'S': { name: 'Steadiness', description: 'Patient, reliable, and team-oriented' },
        'C': { name: 'Conscientiousness', description: 'Analytical, precise, and quality-oriented' }
      };
      const discResult = discResults[result as keyof typeof discResults] || discResults.D;
      return {
        code: result || 'D',
        name: discResult.name,
        description: discResult.description,
        traits: ['Professional', 'Focused', 'Reliable'],
        strengths: ['Strong work ethic', 'Goal-oriented'],
        weaknesses: ['May be overly critical', 'Can be impatient']
      };
    }
  };

  const resultInfo = getResultInfo();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#6366F1']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.congratulations}>Congratulations!</Text>
            <Text style={styles.subtitle}>Your personality assessment is complete</Text>
          </View>

          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultCode}>{resultInfo.code}</Text>
              <Text style={styles.resultName}>{resultInfo.name}</Text>
            </View>
            
            <Text style={styles.resultDescription}>{resultInfo.description}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Traits</Text>
              <View style={styles.traitsList}>
                {resultInfo.traits.map((trait, index) => (
                  <View key={index} style={styles.traitItem}>
                    <Text style={styles.traitText}>{trait}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Strengths</Text>
              {resultInfo.strengths.map((strength, index) => (
                <Text key={index} style={styles.listItem}>• {strength}</Text>
              ))}
            </View>

            {resultInfo.weaknesses && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Areas for Growth</Text>
                {resultInfo.weaknesses.map((weakness, index) => (
                  <Text key={index} style={styles.listItem}>• {weakness}</Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.actions}>
            <AppButton
              title="Back to Home"
              onPress={() => router.push('/')}
              variant="secondary"
              size="large"
              style={styles.actionButton}
            />
            <AppButton
              title="Retake Quiz"
              onPress={() => router.push('/quiz')}
              variant="outline"
              size="large"
              style={styles.actionButton}
            />
            <AppButton
              title="Chat with AI Advisor"
              onPress={() => router.push('/chat')}
              size="large"
              style={styles.actionButton}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  congratulations: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultCode: {
    fontSize: 36,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 8,
  },
  resultName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
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
  traitItem: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  traitText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  listItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 4,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 0,
  },
});