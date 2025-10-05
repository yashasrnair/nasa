import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";

export default function ResultsScreen({ route, navigation }) {
  const { location, parameters, date } = route.params;

  // Mock data - we'll replace with real NASA data later
  const mockResults = {
    temperature: {
      probability: 65,
      description: "High chance of hot weather",
      average: "28°C",
      range: "22°C - 35°C",
    },
    precipitation: {
      probability: 20,
      description: "Low chance of rain",
      average: "15mm",
      range: "0mm - 45mm",
    },
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Analysis Results</Text>

      <View style={globalStyles.card}>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          📍 Location: {location}
        </Text>
        <Text style={{ fontSize: 16 }}>📅 Date: {date.toDateString()}</Text>
      </View>

      {/* Results Cards */}
      {Object.entries(parameters).map(([key, enabled]) => {
        if (!enabled) return null;

        const result = mockResults[key];
        if (!result) return null;

        return (
          <View key={key} style={globalStyles.card}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              {key === "temperature" && "🌡️ Temperature Analysis"}
              {key === "precipitation" && "💧 Precipitation Analysis"}
              {key === "wind" && "💨 Wind Analysis"}
              {key === "humidity" && "💦 Humidity Analysis"}
            </Text>

            <View
              style={{
                backgroundColor: "#e6fffa",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "#234e52" }}
              >
                {result.probability}% Probability
              </Text>
              <Text style={{ fontSize: 16, color: "#234e52" }}>
                {result.description}
              </Text>
            </View>

            <Text>📊 Average: {result.average}</Text>
            <Text>📈 Typical Range: {result.range}</Text>
          </View>
        );
      })}

      {/* Action Buttons */}
      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: "#38a169" }]}
        onPress={() => {
          /* Save to dashboard */
        }}
      >
        <Ionicons name="save" size={20} color="white" />
        <Text style={globalStyles.buttonText}> Save to Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: "#4c51bf" }]}
        onPress={() => {
          /* Export data */
        }}
      >
        <Ionicons name="download" size={20} color="white" />
        <Text style={globalStyles.buttonText}> Export Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("QueryBuilder")}
      >
        <Text style={globalStyles.buttonText}> New Query</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
