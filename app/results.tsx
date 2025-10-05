import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator,StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import WeatherChart from '@/components/weather-chart';
import { nasaApiService, WeatherData } from '@/services/nasa-api';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);
  const location = params.location as string;
  const parameters = JSON.parse(params.parameters as string);
  const date = new Date(params.date as string);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Calculate date range (10 years of historical data)
      const startDate = new Date(date);
      startDate.setFullYear(startDate.getFullYear() - 5);
      
      const endDate = new Date(date);
      endDate.setFullYear(endDate.getFullYear() + 5);

      const selectedParams = Object.entries(parameters)
        .filter(([_, enabled]) => enabled)
        .map(([key]) => key);

      const data = await nasaApiService.getWeatherProbability(
        latitude,
        longitude,
        selectedParams,
        startDate,
        endDate
      );

      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProbabilityDescription = (probability: number, type: string) => {
    if (probability < 30) return `Very low chance of ${type}`;
    if (probability < 50) return `Low chance of ${type}`;
    if (probability < 70) return `Moderate chance of ${type}`;
    if (probability < 85) return `High chance of ${type}`;
    return `Very high chance of ${type}`;
  };

  const getProbabilityColor = (probability: number) => {
    if (probability < 30) return '#48bb78'; // Green
    if (probability < 50) return '#68d391'; // Light green
    if (probability < 70) return '#ed8936'; // Orange
    if (probability < 85) return '#ed64a6'; // Pink
    return '#e53e3e'; // Red
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <Stack.Screen options={{ title: 'Loading...' }} />
        <ActivityIndicator size="large" color="#3182ce" />
        <ThemedText style={styles.loadingText}>Analyzing NASA weather data...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <Stack.Screen options={{ title: 'Error' }} />
        <ThemedText type="title" style={styles.errorTitle}>⚠️ Error</ThemedText>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <ThemedText style={styles.buttonText}>🔄 Try Again</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Analysis Results' }} />
      <ScrollView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Weather Analysis</ThemedText>
        
        <ThemedView style={styles.card}>
          <ThemedText style={styles.infoText}>📍 {location}</ThemedText>
          <ThemedText style={styles.infoText}>📅 {date.toDateString()}</ThemedText>
          <ThemedText style={styles.note}>
            Based on 10 years of NASA historical data
          </ThemedText>
        </ThemedView>

        {/* Results Cards */}
        {weatherData && Object.entries(weatherData).map(([key, data]) => (
          <ThemedView key={key} style={styles.card}>
            <ThemedText type="subtitle" style={styles.resultTitle}>
              {key === 'temperature' && '🌡️ Temperature Analysis'}
              {key === 'precipitation' && '💧 Precipitation Analysis'}
              {key === 'wind' && '💨 Wind Analysis'}
              {key === 'humidity' && '💦 Humidity Analysis'}
            </ThemedText>
            
            <View style={[
              styles.probabilityBox, 
              { backgroundColor: getProbabilityColor(data.probability) + '20' }
            ]}>
              <ThemedText style={[
                styles.probabilityValue,
                { color: getProbabilityColor(data.probability) }
              ]}>
                {data.probability}% Probability
              </ThemedText>
              <ThemedText style={styles.probabilityDescription}>
                {getProbabilityDescription(data.probability, key)}
              </ThemedText>
            </View>

            <View style={styles.stats}>
              <ThemedText>📊 Average: {data.average} {data.unit}</ThemedText>
              {'min' in data && 'max' in data && (
                <ThemedText>📈 Range: {data.min} - {data.max} {data.unit}</ThemedText>
              )}
            </View>

            {/* Sample Chart */}
            <WeatherChart
              data={[data.average - 5, data.average, data.average + 3, data.average - 2, data.average + 4]}
              labels={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
              title={`Historical ${key}`}
              color={getProbabilityColor(data.probability)}
              unit={data.unit}
            />
          </ThemedView>
        ))}

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#38a169' }]}
          onPress={() => {/* Save to dashboard */}}
        >
          <ThemedText style={styles.buttonText}>💾 Save Analysis</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4c51bf' }]}
          onPress={() => {/* Export data */}}
        >
          <ThemedText style={styles.buttonText}>📥 Export Data (CSV)</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.buttonText}>🔄 New Analysis</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
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
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  resultTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  probabilityBox: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  probabilityValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  probabilityDescription: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  stats: {
    marginBottom: 15,
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
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  errorTitle: {
    color: '#e53e3e',
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
});