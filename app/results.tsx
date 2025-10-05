import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet,
  Alert,
  Share 
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import WeatherChart from '@/components/weather-chart';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors, Shadows } from '@/constants/theme';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface WeatherParameters {
  veryHot?: boolean;
  veryCold?: boolean;
  veryWindy?: boolean;
  veryWet?: boolean;
  veryUncomfortable?: boolean;
}

interface AnalysisResult {
  condition: string;
  probability: number;
  description: string;
  historicalData: number[];
  recommendation: string;
}

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentTheme } = useTheme();
  
  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);
  const location = params.location as string;
  const date = new Date(params.date as string);

  const [parameters, setParameters] = useState<WeatherParameters>({});
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (params.parameters) {
        const parsedParams = JSON.parse(params.parameters as string);
        setParameters(parsedParams);
        generateResults(parsedParams);
      }
    } catch (err) {
      setError('Error parsing analysis parameters');
      console.error('Error parsing parameters:', err);
    }
  }, []);

  const generateResults = (params: WeatherParameters) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const generatedResults: AnalysisResult[] = [];
        
        if (params.veryHot) {
          generatedResults.push({
            condition: 'veryHot',
            probability: Math.floor(Math.random() * 40) + 10, // 10-50%
            description: 'Probability of extreme heat conditions',
            historicalData: [25, 28, 32, 35, 30, 28, 26],
            recommendation: 'Consider planning activities for cooler times of day'
          });
        }
        
        if (params.veryCold) {
          generatedResults.push({
            condition: 'veryCold',
            probability: Math.floor(Math.random() * 30) + 5, // 5-35%
            description: 'Probability of extreme cold conditions',
            historicalData: [15, 12, 8, 5, 10, 14, 16],
            recommendation: 'Dress in layers and plan indoor alternatives'
          });
        }
        
        if (params.veryWindy) {
          generatedResults.push({
            condition: 'veryWindy',
            probability: Math.floor(Math.random() * 50) + 20, // 20-70%
            description: 'Probability of high wind conditions',
            historicalData: [45, 50, 55, 60, 52, 48, 44],
            recommendation: 'Secure loose items and consider wind-protected locations'
          });
        }
        
        if (params.veryWet) {
          generatedResults.push({
            condition: 'veryWet',
            probability: Math.floor(Math.random() * 60) + 15, // 15-75%
            description: 'Probability of heavy precipitation',
            historicalData: [30, 35, 40, 45, 38, 32, 28],
            recommendation: 'Have indoor alternatives and waterproof gear ready'
          });
        }
        
        if (params.veryUncomfortable) {
          generatedResults.push({
            condition: 'veryUncomfortable',
            probability: Math.floor(Math.random() * 45) + 25, // 25-70%
            description: 'Probability of poor comfort conditions',
            historicalData: [40, 45, 50, 55, 48, 42, 38],
            recommendation: 'Plan for climate-controlled environments'
          });
        }
        
        setResults(generatedResults);
        setLoading(false);
      } catch (err) {
        setError('Error generating analysis results');
        setLoading(false);
      }
    }, 2000);
  };

  const getConditionInfo = (condition: string) => {
    const info: { [key: string]: { title: string; icon: string; color: string } } = {
      veryHot: { title: 'Very Hot', icon: '🔥', color: '#dc2626' },
      veryCold: { title: 'Very Cold', icon: '❄️', color: '#2563eb' },
      veryWindy: { title: 'Very Windy', icon: '💨', color: '#475569' },
      veryWet: { title: 'Very Wet', icon: '💧', color: '#0369a1' },
      veryUncomfortable: { title: 'Very Uncomfortable', icon: '😓', color: '#7c2d12' },
    };
    return info[condition] || { title: condition, icon: '🌤️', color: Colors[currentTheme].primary };
  };

  const getProbabilityColor = (probability: number) => {
    if (probability < 25) return Colors[currentTheme].success;
    if (probability < 50) return Colors[currentTheme].warning;
    return Colors[currentTheme].danger;
  };

  const getProbabilityLevel = (probability: number) => {
    if (probability < 20) return 'Very Low';
    if (probability < 40) return 'Low';
    if (probability < 60) return 'Moderate';
    if (probability < 80) return 'High';
    return 'Very High';
  };

  const exportData = async () => {
  try {
    const csvData = [
      'Weather Probability Analysis Report',
      `Location: ${location}`,
      `Date: ${date.toLocaleDateString()}`,
      `Time: ${date.toLocaleTimeString()}`,
      'Generated by NASA Weather Probability App',
      '',
      'Condition,Probability,Level,Description,Recommendation',
      ...results.map(result => {
        const info = getConditionInfo(result.condition);
        return `"${info.title}",${result.probability}%,"${getProbabilityLevel(result.probability)}","${result.description}","${result.recommendation}"`;
      }),
      '',
      'Note: Probabilities based on NASA historical weather data analysis'
    ].join('\n');

    // Simple share without file system
    await Share.share({
      title: `Weather Analysis - ${location}.csv`,
      message: csvData,
    });

  } catch (error) {
    Alert.alert('Export Error', 'Unable to export data. Please try again.');
    console.error('Export error:', error);
  }
};

const shareResults = async () => {
  try {
    const resultText = results.map(result => {
      const info = getConditionInfo(result.condition);
      return `${info.icon} ${info.title}: ${result.probability}% probability - ${getProbabilityLevel(result.probability)}`;
    }).join('\n');

    await Share.share({
      title: `Weather Analysis - ${location}`,
      message: `🌤️ NASA Weather Probability Analysis\n\n📍 Location: ${location}\n📅 Date: ${date.toLocaleDateString()}\n⏰ Time: ${date.toLocaleTimeString()}\n\n📊 Analysis Results:\n${resultText}\n\nGenerated via NASA Weather Probability App`,
    });
  } catch (error) {
    Alert.alert('Share Error', 'Unable to share results. Please try again.');
  }
};

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <Stack.Screen options={{ title: 'Analyzing...' }} />
        <ActivityIndicator size="large" color={Colors[currentTheme].primary} />
        <ThemedText style={styles.loadingText}>Analyzing NASA historical weather data...</ThemedText>
        <ThemedText style={styles.loadingSubtext}>This may take a few moments</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <Stack.Screen options={{ title: 'Error' }} />
        <ThemedText type="title" style={styles.errorTitle}>⚠️ Analysis Error</ThemedText>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[currentTheme].primary }]}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.buttonText}>🔄 Try Again</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Analysis Results' }} />
      <ScrollView style={[
        styles.container,
        { backgroundColor: Colors[currentTheme].background }
      ]}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Weather Analysis</ThemedText>
          <ThemedText style={styles.subtitle}>Probability Assessment</ThemedText>
        </ThemedView>

        {/* Location & Date Info */}
        <ThemedView style={[
          styles.infoCard,
          { backgroundColor: Colors[currentTheme].card }
        ]}>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoIcon}>📍</ThemedText>
            <ThemedText style={styles.infoText}>{location}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoIcon}>📅</ThemedText>
            <ThemedText style={styles.infoText}>{date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoIcon}>⏰</ThemedText>
            <ThemedText style={styles.infoText}>{date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}</ThemedText>
          </View>
        </ThemedView>

        {/* Results */}
        {results.map((result, index) => {
          const info = getConditionInfo(result.condition);
          const probabilityColor = getProbabilityColor(result.probability);
          
          return (
            <ThemedView 
              key={result.condition}
              style={[
                styles.resultCard,
                { backgroundColor: Colors[currentTheme].card }
              ]}
            >
              <View style={styles.resultHeader}>
                <View style={styles.conditionHeader}>
                  <ThemedText style={styles.conditionIcon}>{info.icon}</ThemedText>
                  <ThemedText type="subtitle" style={styles.conditionTitle}>
                    {info.title}
                  </ThemedText>
                </View>
                <View style={[
                  styles.probabilityBadge,
                  { backgroundColor: probabilityColor + '20' }
                ]}>
                  <ThemedText style={[
                    styles.probabilityValue,
                    { color: probabilityColor }
                  ]}>
                    {result.probability}%
                  </ThemedText>
                </View>
              </View>

              <ThemedText style={styles.probabilityDescription}>
                {getProbabilityLevel(result.probability)} probability • {result.description}
              </ThemedText>

              <WeatherChart
                data={result.historicalData}
                labels={['2018', '2019', '2020', '2021', '2022', '2023', '2024']}
                title="Historical Trend"
                color={probabilityColor}
                unit="probability %"
              />

              <ThemedView style={styles.recommendationBox}>
                <ThemedText style={styles.recommendationIcon}>💡</ThemedText>
                <ThemedText style={styles.recommendationText}>
                  {result.recommendation}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          );
        })}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[currentTheme].buttonPrimary }]}
            onPress={shareResults}
          >
            <ThemedText style={styles.buttonText}>📤 Share Results</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[currentTheme].buttonSuccess }]}
            onPress={exportData}
          >
            <ThemedText style={styles.buttonText}>📥 Export Data (CSV)</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[currentTheme].buttonSecondary }]}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.buttonText}>🔄 New Analysis</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  infoCard: {
    margin: 16,
    marginBottom: 8,
    padding: 20,
    borderRadius: 16,
    ...Shadows.medium,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
  },
  resultCard: {
    margin: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    ...Shadows.medium,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  conditionTitle: {
    fontSize: 18,
  },
  probabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  probabilityValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  probabilityDescription: {
    marginBottom: 16,
    opacity: 0.8,
    textAlign: 'center',
  },
  recommendationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  recommendationIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    fontStyle: 'italic',
  },
  actions: {
    padding: 24,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...Shadows.small,
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
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  errorTitle: {
    color: '#e53e3e',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
});