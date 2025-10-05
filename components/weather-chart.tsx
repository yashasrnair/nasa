import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { StyleSheet } from 'react-native';

interface WeatherChartProps {
  data: number[];
  labels: string[];
  title: string;
  color: string;
  unit: string;
}

export default function WeatherChart({ data, labels, title, color, unit }: WeatherChartProps) {
  const screenWidth = Dimensions.get('window').width - 40;

  const chartData = {
    labels,
    datasets: [
      {
        data,
        color: () => color,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: () => color,
    labelColor: () => '#666',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: color,
    },
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {title} ({unit})
      </ThemedText>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});