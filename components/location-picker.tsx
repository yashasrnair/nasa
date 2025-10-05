import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  TextInput,
  ActivityIndicator 
} from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors, Shadows } from '@/constants/theme';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address?: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const { currentTheme } = useTheme();
  const mapRef = useRef<MapView>(null);
  
  const [region, setRegion] = useState<Region>({
    latitude: initialLocation?.lat || 37.7749,
    longitude: initialLocation?.lng || -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Enable location access to use your current location and improve search accuracy.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const geocode = await Location.geocodeAsync(searchQuery);
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        
        setRegion(newRegion);
        setSelectedLocation({ lat: latitude, lng: longitude });
        onLocationSelect({ lat: latitude, lng: longitude, address: searchQuery });
        
        // Animate map to new location
        mapRef.current?.animateToRegion(newRegion, 1000);
      } else {
        Alert.alert('Location Not Found', 'Please try a different location name or coordinates.');
      }
    } catch (error) {
      Alert.alert('Search Error', 'Unable to search for location. Please try again.');
      console.error('Geocoding error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const getCurrentLocation = async () => {
    if (!hasLocationPermission) {
      Alert.alert('Location Access Required', 'Please enable location permissions in settings.');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;
      
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      
      setRegion(newRegion);
      setSelectedLocation({ lat: latitude, lng: longitude });
      onLocationSelect({ lat: latitude, lng: longitude, address: 'Current Location' });
      
      // Animate map to current location
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      Alert.alert('Location Error', 'Could not get current location. Please try again.');
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ lat: latitude, lng: longitude });
    onLocationSelect({ lat: latitude, lng: longitude });
    setSearchQuery(''); // Clear search when manually selecting on map
  };

  const handleSearchSubmit = () => {
    searchLocation();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Select Location</ThemedText>
        <TouchableOpacity 
          style={[
            styles.locationButton,
            { backgroundColor: Colors[currentTheme].primary }
          ]} 
          onPress={getCurrentLocation}
        >
          <ThemedText style={styles.locationButtonText}>📍 My Location</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[
        styles.searchContainer,
        { backgroundColor: Colors[currentTheme].inputBackground }
      ]}>
        <TextInput
          style={[
            styles.searchInput,
            { 
              color: Colors[currentTheme].text,
              borderColor: Colors[currentTheme].inputBorder
            }
          ]}
          placeholder="Search for a location..."
          placeholderTextColor={Colors[currentTheme].secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity 
          style={[
            styles.searchButton,
            { backgroundColor: Colors[currentTheme].primary }
          ]}
          onPress={handleSearchSubmit}
          disabled={isSearching}
        >
          {isSearching ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <ThemedText style={styles.searchButtonText}>Search</ThemedText>
          )}
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onPress={handleMapPress}
          provider={PROVIDER_GOOGLE}
          customMapStyle={currentTheme === 'dark' ? darkMapStyle : []}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
              title="Selected Location"
              pinColor={Colors[currentTheme].primary}
            />
          )}
        </MapView>
      </View>

      {/* Coordinates Display */}
      {selectedLocation && (
        <ThemedView style={[
          styles.coordinates,
          { backgroundColor: Colors[currentTheme].card }
        ]}>
          <ThemedText style={styles.coordinateText}>
            📍 Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
          </ThemedText>
          {searchQuery ? (
            <ThemedText style={styles.addressText}>📍 {searchQuery}</ThemedText>
          ) : null}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  locationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    ...Shadows.medium,
  },
  map: {
    width: '100%',
    height: 300,
  },
  coordinates: {
    padding: 16,
    margin: 16,
    marginTop: 12,
    borderRadius: 8,
    ...Shadows.small,
  },
  coordinateText: {
    fontSize: 12,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  addressText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});