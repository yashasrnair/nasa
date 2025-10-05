import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';


export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.title}>🌤️ Weather Probability</ThemedText>
      <ThemedText style={styles.subtitle}>
        Discover historical weather patterns for any location and time using NASA data
      </ThemedText>

      <Link href="/query-builder" asChild>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>🔍 Start New Query</ThemedText>
        </TouchableOpacity>
      </Link>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          What You Can Discover:
        </ThemedText>
        <ThemedText>• Probability of extreme temperatures</ThemedText>
        <ThemedText>• Historical rainfall patterns</ThemedText>
        <ThemedText>• Wind speed probabilities</ThemedText>
        <ThemedText>• Best times for outdoor activities</ThemedText>
        <ThemedText>• Climate trends over time</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          How It Works:
        </ThemedText>
        <ThemedText>1. Choose your location</ThemedText>
        <ThemedText>2. Select date and weather parameters</ThemedText>
        <ThemedText>3. Get probability analysis</ThemedText>
        <ThemedText>4. View charts and download data</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#3182ce',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
  },
  cardTitle: {
    marginBottom: 10,
  },
});