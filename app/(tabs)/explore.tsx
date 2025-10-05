import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Switch,
  Alert,
  StyleSheet
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import LocationPicker from '../../components/location-picker';

export default function QueryBuilder() {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [parameters, setParameters] = useState({
    temperature: true,
    precipitation: false,
    wind: false,
    humidity: false,
  });

  const toggleParameter = (param: keyof typeof parameters) => {
    setParameters(prev => ({
      ...prev,
      [param]: !prev[param]
    }));
  };

  const handleLocationSelect = (locationData: { lat: number; lng: number; address?: string }) => {
    setCoordinates({ lat: locationData.lat, lng: locationData.lng });
    if (locationData.address) {
      setLocation(locationData.address);
    }
  };

  const canProceed = () => {
    if (!coordinates) {
      Alert.alert('Location Required', 'Please select a location on the map');
      return false;
    }
    
    const selectedParams = Object.values(parameters).filter(Boolean);
    if (selectedParams.length === 0) {
      Alert.alert('Parameters Required', 'Please select at least one weather parameter');
      return false;
    }

    return true;
  };

  const getSelectedParameters = () => {
    return Object.entries(parameters)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Build Your Query</ThemedText>

      {/* Location Picker */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          📍 Select Location
        </ThemedText>
        <LocationPicker onLocationSelect={handleLocationSelect} />
        
        <TextInput
          style={styles.input}
          placeholder="Or enter location manually..."
          value={location}
          onChangeText={setLocation}
        />
      </ThemedView>

      {/* Date Selection */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          📅 Date Range
        </ThemedText>
        <ThemedText style={{ marginBottom: 10 }}>
          Analyzing historical data for: {selectedDate.toDateString()}
        </ThemedText>
        <ThemedText style={styles.note}>
          Note: We analyze 10 years of historical data around your selected date
        </ThemedText>
      </ThemedView>

      {/* Weather Parameters */}
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          🌡️ Weather Parameters
        </ThemedText>
        <ThemedText style={styles.note}>
          Select the weather conditions you want to analyze
        </ThemedText>
        
        {Object.entries(parameters).map(([key, value]) => (
          <View key={key} style={styles.parameterRow}>
            <View>
              <ThemedText style={styles.parameterText}>
                {key === 'temperature' && '🌡️ Temperature'}
                {key === 'precipitation' && '💧 Precipitation'}
                {key === 'wind' && '💨 Wind Speed'}
                {key === 'humidity' && '💦 Humidity'}
              </ThemedText>
              <ThemedText style={styles.parameterDescription}>
                {key === 'temperature' && 'Heat and cold probabilities'}
                {key === 'precipitation' && 'Rain and snow likelihood'}
                {key === 'wind' && 'Wind speed analysis'}
                {key === 'humidity' && 'Humidity and comfort levels'}
              </ThemedText>
            </View>
            <Switch
              value={value}
              onValueChange={() => toggleParameter(key as keyof typeof parameters)}
            />
          </View>
        ))}
      </ThemedView>

      {/* Run Query Button */}
      {coordinates && (
        <Link 
          href={{ 
            pathname: "/results", 
            params: { 
              latitude: coordinates.lat.toString(),
              longitude: coordinates.lng.toString(),
              location: location || `Lat: ${coordinates.lat.toFixed(4)}, Lng: ${coordinates.lng.toFixed(4)}`,
              parameters: JSON.stringify(parameters),
              date: selectedDate.toISOString()
            }
          }} 
          asChild
        >
          <TouchableOpacity 
            style={[
              styles.button, 
              { backgroundColor: '#ed8936' }
            ]}
            onPress={(e) => {
              if (!canProceed()) {
                e.preventDefault();
              }
            }}
          >
            <ThemedText style={styles.buttonText}>
              📊 Analyze Weather Probability
            </ThemedText>
          </TouchableOpacity>
        </Link>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
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
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 10,
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
  parameterRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  parameterText: {
    fontSize: 16,
    fontWeight: '600',
  },
  parameterDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});