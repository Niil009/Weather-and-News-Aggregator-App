import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { AppContext } from "../context/AppProvider";
import { fetchWeatherByCoords } from "../api/openWeather";
import { fetchTopHeadlines } from "../api/newsApi";
import { filterArticlesByMode } from "../utils/filterNewsByWeather";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import NewsList from "../components/NewsList";

export default function HomeScreen({ navigation }) {
  const {
    units,
    categories,
    setLocation,
    weather,
    setWeather,
    news,
    setNews,
    loading,
    setLoading,
  } = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const [mode, setMode] = useState("neutral");
  const [gradientColors, setGradientColors] = useState(["#f0f0f0", "#ffffff"]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);

      const weatherData = await fetchWeatherByCoords(
        coords.latitude,
        coords.longitude,
        units
      );
      setWeather(weatherData);

      const temp = weatherData?.current?.temp ?? null;
      let newMode = "neutral";
      let colors = ["#f0f0f0", "#ffffff"];
      if (temp !== null) {
        const coldThreshold = units === "metric" ? 10 : 50;
        const hotThreshold = units === "metric" ? 30 : 86;
        if (temp < coldThreshold) {
          newMode = "cold";
          colors = ["#a8d8ff", "#ffffff"];
        } else if (temp > hotThreshold) {
          newMode = "hot";
          colors = ["#ffcc99", "#ffffff"];
        } else {
          newMode = "cool";
          colors = ["#b3ffb3", "#ffffff"];
        }
      }
      setMode(newMode);
      setGradientColors(colors);

      let allArticles = [];
      for (const cat of categories || ["general"]) {
        const arr = await fetchTopHeadlines({
          category: cat,
          pageSize: 50,
          country: "us",
        });
        allArticles = allArticles.concat(arr);
      }

      const filtered = filterArticlesByMode(allArticles, newMode);
      setNews(
        filtered.length ? filtered.slice(0, 20) : allArticles.slice(0, 20)
      );
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [units, categories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, [fetchData]);

  const moodText =
    mode === "cold"
      ? "Depressing News"
      : mode === "hot"
      ? "Fear-Related News"
      : mode === "cool"
      ? "Happy & Winning News"
      : "Top Headlines";
  const moodColor =
    mode === "cold"
      ? "#007bff"
      : mode === "hot"
      ? "#ff4500"
      : mode === "cool"
      ? "#32cd32"
      : "#000";

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <FlatList
          data={news}
          renderItem={() => null}
          ListHeaderComponent={() => (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>WeatherNews</Text>
                <Button
                  title="Settings"
                  onPress={handleSettingsPress}
                  color="#007bff"
                />
              </View>
              {loading && <ActivityIndicator size="large" color="#0000ff" />}
              {!loading && weather && (
                <>
                  <WeatherCard
                    weather={weather.current}
                    units={units}
                    isRefreshing={refreshing}
                  />
                  <ForecastList
                    daily={weather.daily}
                    units={units}
                    isRefreshing={refreshing}
                  />
                </>
              )}
              <Text style={[styles.sectionTitle, { color: moodColor }]}>
                {moodText}
              </Text>
              {!loading && error && (
                <Text style={styles.error}>
                  {error}. Check API keys or network.
                </Text>
              )}
            </>
          )}
          ListFooterComponent={<NewsList articles={news} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.container}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  gradient: { flex: 1 },
  container: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#333" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  error: { marginTop: 20, textAlign: "center", color: "red" },
});
