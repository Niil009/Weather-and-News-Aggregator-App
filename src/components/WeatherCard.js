import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function WeatherCard({ weather, units }) {
  if (!weather) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.temp}>
        {Math.round(weather.temp)}°{units === "metric" ? "C" : "F"}
      </Text>
      <Text style={styles.condition}>
        {weather.weather[0]?.description || "N/A"}
      </Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`,
        }}
        style={styles.icon}
      />
      <Text style={styles.feelsLike}>
        Feels like: {Math.round(weather.feels_like)}°
        {units === "metric" ? "C" : "F"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  temp: { fontSize: 32, fontWeight: "700", color: "#333" },
  condition: { fontSize: 18, textTransform: "capitalize", color: "#333" },
  icon: { width: 60, height: 60, marginVertical: 8 },
  feelsLike: { fontSize: 16, color: "#666" },
});
