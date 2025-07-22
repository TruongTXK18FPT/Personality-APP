import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { QuestionCard } from '@/components/QuestionCard';
import { AppButton } from '@/components/AppButton';
import { mbtiQuestions, discQuestions } from '@/data/mockData';
import { QuizQuestion } from '@/types';

export default function QuizScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: 'MBTI' | 'DISC' }>();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const questionSet = type === 'MBTI' ? mbtiQuestions : discQuestions;
    setQuestions(questionSet);
  }, [type]);

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === undefined) {
      Alert.alert('Please select an answer', 'You must select an answer before continuing.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate result based on answers
    let result = '';
    if (type === 'MBTI') {
      // Simple MBTI calculation (in real app, this would be more sophisticated)
      const traits = ['E', 'S', 'T', 'J']; // Default traits
      if (answers[0] === 1) traits[0] = 'I';
      if (answers[1] === 1) traits[1] = 'N';
      if (answers[2] === 1) traits[2] = 'F';
      if (answers[3] === 1) traits[3] = 'P';
      result = traits.join('');
    } else {
      // Simple DISC calculation
      const scores = { D: 0, I: 0, S: 0, C: 0 };
      answers.forEach(answer => {
        if (answer === 0) scores.D++;
        else if (answer === 1) scores.I++;
        else if (answer === 2) scores.S++;
        else if (answer === 3) scores.C++;
      });
      result = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b);
    }

    router.push(`/quiz/result?type=${type}&result=${result}`);
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.testType}>{type} Assessment</Text>
      </View>

      <View style={styles.content}>
        <QuestionCard
          question={currentQuestion}
          onSelectAnswer={handleSelectAnswer}
          selectedAnswer={answers[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.navigationButtons}>
          {currentQuestionIndex > 0 && (
            <AppButton
              title="Previous"
              onPress={handlePrevious}
              variant="outline"
              style={styles.navButton}
            />
          )}
          <AppButton
            title={isLastQuestion ? 'Submit Quiz' : 'Next'}
            onPress={handleNext}
            style={[styles.navButton, { flex: 1 }]}
          />
        </View>
      </View>
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
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  testType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 0.5,
    marginBottom: 0,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});