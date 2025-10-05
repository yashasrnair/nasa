import { Link } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>About NASA Weather Data</ThemedText>
        
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">🌍 Data Sources</ThemedText>
          <ThemedText>• NASA POWER API - Historical weather data</ThemedText>
          <ThemedText>• Satellite observations and climate models</ThemedText>
          <ThemedText>• Global coverage with 30+ years of data</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">📊 Weather Parameters</ThemedText>
          <ThemedText>• Temperature extremes (very hot/very cold)</ThemedText>
          <ThemedText>• Wind speed probabilities (very windy)</ThemedText>
          <ThemedText>• Precipitation analysis (very wet)</ThemedText>
          <ThemedText>• Humidity and comfort levels</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">🎯 Challenge Focus</ThemedText>
          <ThemedText>This app addresses the NASA Space Apps Challenge by:</ThemedText>
          <ThemedText>• Providing historical weather probability analysis</ThemedText>
          <ThemedText>• Helping plan outdoor activities</ThemedText>
          <ThemedText>• Using NASA Earth observation data</ThemedText>
          <ThemedText>• Creating personalized weather dashboards</ThemedText>
        </ThemedView>

        <Link href="/" dismissTo style={styles.link}>
          <ThemedText type="link">← Back to Home</ThemedText>
        </Link>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
});