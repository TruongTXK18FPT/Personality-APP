import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AppButton } from '@/components/AppButton';

export default function QuizTypeSelectionScreen() {
  const router = useRouter();

  const handleSelectQuiz = (type: 'MBTI' | 'DISC') => {
    router.push(`/quiz/test?type=${type}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#EFF6FF']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Your Test</Text>
            <Text style={styles.subtitle}>
              Select a personality assessment to get started
            </Text>
          </View>

          <View style={styles.content}>
            <View style={styles.testCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.testTitle}>MBTI Assessment</Text>
                <Text style={styles.testBadge}>Most Popular</Text>
              </View>
              <Text style={styles.testDescription}>
                Discover your personality type based on Carl Jung's psychological types. 
                Learn about your preferences for Extraversion/Introversion, Sensing/Intuition, 
                Thinking/Feeling, and Judging/Perceiving.
              </Text>
              <View style={styles.features}>
                <Text style={styles.feature}>• 16 personality types</Text>
                <Text style={styles.feature}>• Career insights</Text>
                <Text style={styles.feature}>• Relationship compatibility</Text>
                <Text style={styles.feature}>• Personal growth areas</Text>
              </View>
              <AppButton
                title="Take MBTI Test"
                onPress={() => handleSelectQuiz('MBTI')}
                size="large"
                style={styles.testButton}
              />
            </View>

            <View style={styles.testCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.testTitle}>DISC Assessment</Text>
                <Text style={styles.testBadge}>Professional</Text>
              </View>
              <Text style={styles.testDescription}>
                Understand your behavioral style and communication preferences. 
                Learn about Dominance, Influence, Steadiness, and Conscientiousness 
                to improve workplace relationships.
              </Text>
              <View style={styles.features}>
                <Text style={styles.feature}>• 4 behavioral styles</Text>
                <Text style={styles.feature}>• Communication tips</Text>
                <Text style={styles.feature}>• Leadership insights</Text>
                <Text style={styles.feature}>• Team dynamics</Text>
              </View>
              <AppButton
                title="Take DISC Test"
                onPress={() => handleSelectQuiz('DISC')}
                variant="outline"
                size="large"
                style={styles.testButton}
              />
            </View>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    gap: 24,
  },
  testCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  testBadge: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  testDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  features: {
    marginBottom: 24,
  },
  feature: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 20,
  },
  testButton: {
    marginBottom: 0,
  },
});