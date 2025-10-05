import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>🌤️ Weather Probability</Text>
      <Text style={globalStyles.subtitle}>
        Discover historical weather patterns for any location and time using
        NASA data
      </Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("QueryBuilder")}
      >
        <Ionicons name="search" size={20} color="white" />
        <Text style={globalStyles.buttonText}> Start New Query</Text>
      </TouchableOpacity>

      <View style={globalStyles.card}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          What You Can Discover:
        </Text>
        <Text>• Probability of extreme temperatures</Text>
        <Text>• Historical rainfall patterns</Text>
        <Text>• Wind speed probabilities</Text>
        <Text>• Best times for outdoor activities</Text>
        <Text>• Climate trends over time</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          How It Works:
        </Text>
        <Text>1. Choose your location</Text>
        <Text>2. Select date and weather parameters</Text>
        <Text>3. Get probability analysis</Text>
        <Text>4. View charts and download data</Text>
      </View>
    </ScrollView>
  );
}
