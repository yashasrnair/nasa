import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";

export default function QueryBuilder({ navigation }) {
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [parameters, setParameters] = useState({
    temperature: true,
    precipitation: false,
    wind: false,
    humidity: false,
  });

  const toggleParameter = (param) => {
    setParameters((prev) => ({
      ...prev,
      [param]: !prev[param],
    }));
  };

  const getCurrentLocation = () => {
    // This will be implemented later with GPS
    setLocation("Current Location");
  };

  const runQuery = () => {
    navigation.navigate("Results", {
      location,
      parameters,
      date: selectedDate,
    });
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Build Your Query</Text>

      {/* Location Input */}
      <View style={globalStyles.card}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          📍 Location
        </Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter city, address, or coordinates"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: "#48bb78" }]}
          onPress={getCurrentLocation}
        >
          <Ionicons name="locate" size={20} color="white" />
          <Text style={globalStyles.buttonText}> Use Current Location</Text>
        </TouchableOpacity>
      </View>

      {/* Date Selection */}
      <View style={globalStyles.card}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          📅 Date
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Selected: {selectedDate.toDateString()}
        </Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            /* Date picker will be implemented */
          }}
        >
          <Text style={globalStyles.buttonText}>Choose Date</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Parameters */}
      <View style={globalStyles.card}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          🌡️ Weather Parameters
        </Text>

        {Object.entries(parameters).map(([key, value]) => (
          <View
            key={key}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#f0f0f0",
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {key === "temperature" && "🌡️ Temperature"}
              {key === "precipitation" && "💧 Precipitation"}
              {key === "wind" && "💨 Wind Speed"}
              {key === "humidity" && "💦 Humidity"}
            </Text>
            <Switch value={value} onValueChange={() => toggleParameter(key)} />
          </View>
        ))}
      </View>

      {/* Run Query Button */}
      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: "#ed8936" }]}
        onPress={runQuery}
      >
        <Ionicons name="analytics" size={20} color="white" />
        <Text style={globalStyles.buttonText}>
          {" "}
          Analyze Weather Probability
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
