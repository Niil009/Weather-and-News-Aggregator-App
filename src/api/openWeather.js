import axios from "axios";
import { OPENWEATHER_API_KEY } from "../config";

export async function fetchWeatherByCoords(lat, lon, units = "metric") {
  try {
    const weatherRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: { lat, lon, units, appid: OPENWEATHER_API_KEY },
      }
    );

    const forecastRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: { lat, lon, units, appid: OPENWEATHER_API_KEY },
      }
    );

    const daily = processForecast(forecastRes.data.list);

    return {
      current: {
        temp: weatherRes.data.main.temp,
        feels_like: weatherRes.data.main.feels_like,
        weather: weatherRes.data.weather,
      },
      daily,
    };
  } catch (err) {
    throw new Error("Failed to fetch weather data. Check API key or network.");
  }
}

function processForecast(list) {
  const daily = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date]) {
      daily[date] = {
        dt: item.dt,
        temp: { day: item.main.temp },
        weather: item.weather,
      };
    }
  });
  return Object.values(daily).slice(1, 6);
}
