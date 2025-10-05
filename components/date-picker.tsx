import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors, Shadows } from '@/constants/theme';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DatePicker({ 
  selectedDate, 
  onDateChange, 
  minimumDate, 
  maximumDate 
}: DatePickerProps) {
  const { currentTheme } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const onDateChangeInternal = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const onTimeChangeInternal = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(selectedDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      onDateChange(newDate);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Select Date & Time
      </ThemedText>
      
      <View style={styles.pickerContainer}>
        {/* Date Picker */}
        <TouchableOpacity
          style={[
            styles.pickerButton,
            { backgroundColor: Colors[currentTheme].card }
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={styles.pickerContent}>
            <ThemedText style={styles.pickerIcon}>📅</ThemedText>
            <View style={styles.pickerTextContainer}>
              <ThemedText style={styles.pickerLabel}>Date</ThemedText>
              <ThemedText style={styles.pickerValue}>{formatDate(selectedDate)}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.pickerArrow}>⌄</ThemedText>
        </TouchableOpacity>

        {/* Time Picker */}
        <TouchableOpacity
          style={[
            styles.pickerButton,
            { backgroundColor: Colors[currentTheme].card }
          ]}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={styles.pickerContent}>
            <ThemedText style={styles.pickerIcon}>⏰</ThemedText>
            <View style={styles.pickerTextContainer}>
              <ThemedText style={styles.pickerLabel}>Time</ThemedText>
              <ThemedText style={styles.pickerValue}>{formatTime(selectedDate)}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.pickerArrow}>⌄</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChangeInternal}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChangeInternal}
        />
      )}

      {Platform.OS === 'android' && (showDatePicker || showTimePicker) && (
        <TouchableOpacity
          style={styles.androidOverlay}
          onPress={() => {
            setShowDatePicker(false);
            setShowTimePicker(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerContainer: {
    gap: 12,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    ...Shadows.small,
  },
  pickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pickerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  pickerTextContainer: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  pickerValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickerArrow: {
    fontSize: 18,
    opacity: 0.5,
  },
  androidOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});