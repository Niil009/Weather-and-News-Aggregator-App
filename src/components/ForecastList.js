import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

function dayFromUnix(unix) {
  return new Date(unix * 1000).toLocaleDateString(undefined, {
    weekday: "short",
  });
}

export default function ForecastList({ daily = [], units = "metric" }) {
  if (!daily.length)
    return <Text style={styles.noData}>No forecast available</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={daily.slice(0, 5)}
        keyExtractor={(item) => String(item.dt)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.day}>{dayFromUnix(item.dt)}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`,
              }}
              style={styles.icon}
            />
            <Text style={styles.condition}>
              {item.weather[0]?.main || "N/A"}
            </Text>
            <Text style={styles.temp}>
              {Math.round(item.temp.day)}°{units === "metric" ? "C" : "F"}
            </Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  item: {
    padding: 12,
    backgroundColor: "#fff",
    marginRight: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  day: { fontSize: 16, fontWeight: "600", color: "#333" },
  icon: { width: 40, height: 40, marginVertical: 4 },
  condition: { fontSize: 14, color: "#333" },
  temp: { fontSize: 16, color: "#333" },
  noData: { textAlign: "center", color: "#888", marginVertical: 12 },
});
