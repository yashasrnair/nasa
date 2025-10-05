import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors, Shadows } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { currentTheme } = useTheme();

  const features = [
    { icon: '🌡️', title: 'Temperature', desc: 'Heat & cold analysis' },
    { icon: '💨', title: 'Wind Speed', desc: 'Wind condition probability' },
    { icon: '💧', title: 'Precipitation', desc: 'Rain & snow chances' },
    { icon: '😊', title: 'Comfort Level', desc: 'Humidity & comfort' },
  ];

  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: Colors[currentTheme].background }
    ]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText type="title" style={styles.title}>NASA Weather</ThemedText>
          <ThemedText type="title" style={styles.subtitle}>Probability Analysis</ThemedText>
        </View>
        <View style={styles.nasaBadge}>
          <ThemedText style={styles.nasaText}>🚀 NASA</ThemedText>
        </View>
      </View>

      <ThemedText style={styles.description}>
        Analyze historical weather patterns using NASA data to plan outdoor activities with confidence
      </ThemedText>

      {/* Main CTA */}
      <Link href="/query-builder" asChild>
        <TouchableOpacity style={[
          styles.primaryButton,
          { backgroundColor: Colors[currentTheme].buttonPrimary }
        ]}>
          <ThemedText style={styles.primaryButtonText}>Start Analysis</ThemedText>
          <ThemedText style={styles.primaryButtonSubtext}>Select location & weather conditions</ThemedText>
        </TouchableOpacity>
      </Link>

      {/* Features Grid */}
      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <ThemedView 
            key={index}
            style={[
              styles.featureCard,
              { backgroundColor: Colors[currentTheme].card }
            ]}
          >
            <ThemedText style={styles.featureIcon}>{feature.icon}</ThemedText>
            <ThemedText style={styles.featureTitle}>{feature.title}</ThemedText>
            <ThemedText style={styles.featureDesc}>{feature.desc}</ThemedText>
          </ThemedView>
        ))}
      </View>

      {/* How It Works */}
      <ThemedView style={[
        styles.section,
        { backgroundColor: Colors[currentTheme].card }
      ]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>How It Works</ThemedText>
        <View style={styles.steps}>
          <View style={styles.step}>
            <ThemedView style={[
              styles.stepNumber,
              { backgroundColor: Colors[currentTheme].primary }
            ]}>
              <ThemedText style={styles.stepNumberText}>1</ThemedText>
            </ThemedView>
            <ThemedText style={styles.stepText}>Choose location on map</ThemedText>
          </View>
          <View style={styles.step}>
            <ThemedView style={[
              styles.stepNumber,
              { backgroundColor: Colors[currentTheme].primary }
            ]}>
              <ThemedText style={styles.stepNumberText}>2</ThemedText>
            </ThemedView>
            <ThemedText style={styles.stepText}>Select date & conditions</ThemedText>
          </View>
          <View style={styles.step}>
            <ThemedView style={[
              styles.stepNumber,
              { backgroundColor: Colors[currentTheme].primary }
            ]}>
              <ThemedText style={styles.stepNumberText}>3</ThemedText>
            </ThemedView>
            <ThemedText style={styles.stepText}>Get probability analysis</ThemedText>
          </View>
          <View style={styles.step}>
            <ThemedView style={[
              styles.stepNumber,
              { backgroundColor: Colors[currentTheme].primary }
            ]}>
              <ThemedText style={styles.stepNumberText}>4</ThemedText>
            </ThemedView>
            <ThemedText style={styles.stepText}>Export & share results</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Info Button */}
      <Link href="/modal" asChild>
        <TouchableOpacity style={[
          styles.infoButton,
          { backgroundColor: Colors[currentTheme].buttonSecondary }
        ]}>
          <ThemedText style={styles.infoButtonText}>About NASA Data Sources</ThemedText>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: -4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '300',
    opacity: 0.8,
  },
  nasaBadge: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  nasaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
    opacity: 0.8,
    textAlign: 'center',
  },
  primaryButton: {
    Color: '#2563eb',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    ...Shadows.medium,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  primaryButtonSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...Shadows.small,
  },
  featureIcon: {
    fontSize: 22,
    marginBottom: 8,
    minWidth: 50,
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    ...Shadows.medium,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
  },
  steps: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    fontSize: 16,
    flex: 1,
  },
  infoButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});