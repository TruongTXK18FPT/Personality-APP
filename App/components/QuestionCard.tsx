import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QuizQuestion } from '@/types';
import { AppButton } from './AppButton';

interface QuestionCardProps {
  question: QuizQuestion;
  onSelectAnswer: (answerIndex: number) => void;
  selectedAnswer?: number;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onSelectAnswer,
  selectedAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Question {questionNumber} of {totalQuestions}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(questionNumber / totalQuestions) * 100}%` }]} />
        </View>
      </View>
      
      <Text style={styles.question}>{question.question}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <AppButton
            key={index}
            title={option}
            onPress={() => onSelectAnswer(index)}
            variant={selectedAnswer === index ? 'primary' : 'outline'}
            style={styles.optionButton}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    marginBottom: 24,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 26,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    marginBottom: 0,
  },
});