import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppContext } from "../context/AppProvider";

const ALL_CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

export default function SettingsScreen({ navigation }) {
  const { units, setUnits, categories, setCategories } = useContext(AppContext);
  const [localUnits, setLocalUnits] = useState(units);
  const [localCats, setLocalCats] = useState([...categories]);

  const toggleCategory = (cat) => {
    setLocalCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const saveSettings = () => {
    setUnits(localUnits);
    setCategories(localCats.length ? localCats : ["general"]);
    alert("Settings saved!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#e6f0ff", "#ffffff"]} style={styles.gradient}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.heading}>Temperature Units</Text>
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Celsius</Text>
              <Switch
                value={localUnits === "metric"}
                onValueChange={(v) => setLocalUnits(v ? "metric" : "imperial")}
                trackColor={{ false: "#767577", true: "#007bff" }}
                thumbColor={localUnits === "metric" ? "#ffffff" : "#f4f3f4"}
              />
              <Text style={styles.switchLabel}>Fahrenheit</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="newspaper" size={24} color="#007bff" />
              <Text style={styles.heading}>News Categories</Text>
            </View>
            <FlatList
              data={ALL_CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.catRow}
                  onPress={() => toggleCategory(item)}
                >
                  <View style={styles.catInner}>
                    <Text style={styles.catText}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                    <Text style={styles.checkmark}>
                      {localCats.includes(item) ? "✓" : ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={saveSettings}>
            <Text style={styles.buttonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  gradient: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  catRow: {
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    paddingVertical: 4,
  },
  catInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  catText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textTransform: "capitalize",
  },
  checkmark: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "700",
  },
  button: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  },
});
