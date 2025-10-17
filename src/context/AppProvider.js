import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [units, setUnits] = useState("metric");
  const [categories, setCategories] = useState(["general"]);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedUnits = await AsyncStorage.getItem("units");
        const storedCategories = await AsyncStorage.getItem("categories");
        if (storedUnits) setUnits(storedUnits);
        if (storedCategories) setCategories(JSON.parse(storedCategories));
      } catch (err) {}
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem("units", units);
        await AsyncStorage.setItem("categories", JSON.stringify(categories));
      } catch (err) {
        console.error("Error saving settings:", err);
      }
    };
    saveSettings();
  }, [units, categories]);

  return (
    <AppContext.Provider
      value={{
        location,
        setLocation,
        units,
        setUnits,
        categories,
        setCategories,
        weather,
        setWeather,
        news,
        setNews,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
