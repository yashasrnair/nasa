import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address?: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const [region, setRegion] = useState<Region>({
    latitude: initialLocation?.lat || 37.7749,
    longitude: initialLocation?.lng || -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is needed to use your current location');
        return;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
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
    } catch (error) {
      Alert.alert('Error', 'Could not get current location');
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ lat: latitude, lng: longitude });
    onLocationSelect({ lat: latitude, lng: longitude });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Select Location on Map</ThemedText>
        <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
          <ThemedText style={styles.locationButtonText}>📍 Use My Location</ThemedText>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            title="Selected Location"
          />
        )}
      </MapView>

      {selectedLocation && (
        <ThemedView style={styles.coordinates}>
          <ThemedText>Lat: {selectedLocation.lat.toFixed(4)}</ThemedText>
          <ThemedText>Lng: {selectedLocation.lng.toFixed(4)}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  map: {
    width: '100%',
    height: 300,
  },
  locationButton: {
    backgroundColor: '#3182ce',
    padding: 10,
    borderRadius: 8,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 12,
  },
  coordinates: {
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
});