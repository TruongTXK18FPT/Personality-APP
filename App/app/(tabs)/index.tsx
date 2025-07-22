import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AppButton } from '@/components/AppButton';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#6366F1']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Personality Insights</Text>
            <Text style={styles.subtitle}>
              Discover your personality type and unlock your potential
            </Text>
          </View>

          <View style={styles.heroImage}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Start Your Journey</Text>
              <Text style={styles.cardDescription}>
                Take our comprehensive personality tests to understand yourself better
              </Text>
              
              <View style={styles.buttonContainer}>
                <AppButton
                  title="Take Personality Test"
                  onPress={() => router.push('/quiz')}
                  size="large"
                  style={styles.primaryButton}
                />
                
                <AppButton
                  title="Chat with AI Advisor"
                  onPress={() => router.push('/chat')}
                  variant="outline"
                  size="large"
                  style={styles.secondaryButton}
                />
                
                <AppButton
                  title={isLoggedIn ? `Welcome, ${user?.name}` : 'Login / Register'}
                  onPress={() => router.push(isLoggedIn ? '/profile' : '/auth/login')}
                  variant="secondary"
                  size="large"
                  style={styles.authButton}
                />
              </View>
            </View>

            <View style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>What You'll Discover</Text>
              <View style={styles.featuresList}>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🧠</Text>
                  <Text style={styles.featureText}>Your cognitive preferences</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>💼</Text>
                  <Text style={styles.featureText}>Career insights</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🤝</Text>
                  <Text style={styles.featureText}>Relationship dynamics</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🎯</Text>
                  <Text style={styles.featureText}>Personal growth areas</Text>
                </View>
              </View>
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
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
  },
  heroImage: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
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
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    marginBottom: 0,
  },
  secondaryButton: {
    marginBottom: 0,
  },
  authButton: {
    marginBottom: 0,
  },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
});