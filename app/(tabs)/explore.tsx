import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  StyleSheet 
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import LocationPicker from '@/components/location-picker';
import DatePicker from '@/components/date-picker';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors, Shadows } from '@/constants/theme';

export default function QueryBuilder() {
  const { currentTheme } = useTheme();
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const weatherConditions = [
    { id: 'veryHot', icon: '🔥', title: 'Very Hot', description: 'Extreme heat above 35°C' },
    { id: 'veryCold', icon: '❄️', title: 'Very Cold', description: 'Extreme cold below 0°C' },
    { id: 'veryWindy', icon: '💨', title: 'Very Windy', description: 'High winds above 25 km/h' },
    { id: 'veryWet', icon: '💧', title: 'Very Wet', description: 'Heavy precipitation' },
    { id: 'veryUncomfortable', icon: '😓', title: 'Uncomfortable', description: 'Poor comfort conditions' },
  ];

  const handleLocationSelect = (locationData: { lat: number; lng: number; address?: string }) => {
    setCoordinates({ lat: locationData.lat, lng: locationData.lng });
    if (locationData.address) {
      setLocation(locationData.address);
    } else {
      setLocation(`Lat: ${locationData.lat.toFixed(4)}, Lng: ${locationData.lng.toFixed(4)}`);
    }
  };

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions(prev => 
      prev.includes(conditionId) 
        ? prev.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const canAnalyze = () => {
    if (!coordinates) {
      Alert.alert('Location Required', 'Please select a location on the map');
      return false;
    }
    
    if (selectedConditions.length === 0) {
      Alert.alert('Conditions Required', 'Please select at least one weather condition to analyze');
      return false;
    }

    return true;
  };

  const getAnalysisParameters = () => {
    const params: any = {};
    selectedConditions.forEach(condition => {
      params[condition] = true;
    });
    return params;
  };

  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: Colors[currentTheme].background }
    ]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Weather Analysis</ThemedText>
        <ThemedText style={styles.subtitle}>
          Configure your weather probability analysis
        </ThemedText>
      </View>

      {/* Location Section */}
      <ThemedView style={[
        styles.section,
        { backgroundColor: Colors[currentTheme].card }
      ]}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionIcon}>📍</ThemedText>
          <View>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Location</ThemedText>
            <ThemedText style={styles.sectionDescription}>Select where to analyze weather</ThemedText>
          </View>
        </View>
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </ThemedView>

      {/* Date & Time Section */}
      <ThemedView style={[
        styles.section,
        { backgroundColor: Colors[currentTheme].card }
      ]}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionIcon}>📅</ThemedText>
          <View>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Date & Time</ThemedText>
            <ThemedText style={styles.sectionDescription}>When to analyze conditions</ThemedText>
          </View>
        </View>
        <DatePicker 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </ThemedView>

      {/* Weather Conditions Section */}
      <ThemedView style={[
        styles.section,
        { backgroundColor: Colors[currentTheme].card }
      ]}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionIcon}>🌡️</ThemedText>
          <View>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Weather Conditions</ThemedText>
            <ThemedText style={styles.sectionDescription}>Select conditions to analyze</ThemedText>
          </View>
        </View>
        
        <View style={styles.conditionsGrid}>
          {weatherConditions.map((condition) => {
            const isSelected = selectedConditions.includes(condition.id);
            return (
              <TouchableOpacity
                key={condition.id}
                style={[
                  styles.conditionCard,
                  { 
                    backgroundColor: isSelected 
                      ? Colors[currentTheme].primary + '20'
                      : Colors[currentTheme].card,
                    borderColor: isSelected 
                      ? Colors[currentTheme].primary 
                      : Colors[currentTheme].cardBorder
                  }
                ]}
                onPress={() => toggleCondition(condition.id)}
              >
                <ThemedText style={styles.conditionIcon}>
                  {condition.icon}
                </ThemedText>
                <ThemedText style={[
                  styles.conditionTitle,
                  { color: isSelected ? Colors[currentTheme].primary : Colors[currentTheme].text }
                ]}>
                  {condition.title}
                </ThemedText>
                <ThemedText style={styles.conditionDescription}>
                  {condition.description}
                </ThemedText>
                <View style={[
                  styles.checkbox,
                  { 
                    backgroundColor: isSelected 
                      ? Colors[currentTheme].primary 
                      : 'transparent',
                    borderColor: isSelected 
                      ? Colors[currentTheme].primary 
                      : Colors[currentTheme].secondary
                  }
                ]}>
                  {isSelected && (
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ThemedView>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {coordinates && (
          <Link 
            href={{ 
              pathname: "/results", 
              params: { 
                latitude: coordinates.lat.toString(),
                longitude: coordinates.lng.toString(),
                location: location,
                parameters: JSON.stringify(getAnalysisParameters()),
                date: selectedDate.toISOString()
              }
            }} 
            asChild
          >
            <TouchableOpacity 
              style={[
                styles.analyzeButton,
                { 
                  backgroundColor: Colors[currentTheme].buttonPrimary,
                  opacity: selectedConditions.length === 0 ? 0.6 : 1
                }
              ]}
              onPress={(e) => {
                if (!canAnalyze()) {
                  e.preventDefault();
                }
              }}
              disabled={selectedConditions.length === 0}
            >
              <ThemedText style={styles.analyzeButtonText}>
                📊 Analyze Weather Probabilities
              </ThemedText>
              <ThemedText style={styles.analyzeButtonSubtext}>
                {selectedConditions.length} condition(s) selected
              </ThemedText>
            </TouchableOpacity>
          </Link>
        )}

        <Link href="/modal" asChild>
          <TouchableOpacity style={[
            styles.infoButton,
            { backgroundColor: Colors[currentTheme].buttonSecondary }
          ]}>
            <ThemedText style={styles.infoButtonText}>
              ℹ️ About NASA Data Sources
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    borderRadius: 16,
    ...Shadows.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionIcon: {
    fontSize: 28,
    minWidth: 32,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  conditionsGrid: {
    gap: 12,
  },
  conditionCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    ...Shadows.small,
  },
  conditionIcon: {
    fontSize: 32,
    marginBottom: 8,
    minWidth: 40,
    textAlign: 'center',
  },
  conditionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  conditionDescription: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    position: 'absolute',
    top: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actions: {
    padding: 24,
    gap: 12,
  },
  analyzeButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    ...Shadows.medium,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  analyzeButtonSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  infoButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});