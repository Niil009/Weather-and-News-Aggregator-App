Features
Weather Data:
Fetches current weather (temperature, conditions) and 5-day forecast based on user location using the OpenWeatherMap API.
Displays data in a clean card layout with icons.
Supports Celsius and Fahrenheit units (configurable in Settings).

News Headlines:
Retrieves latest news headlines, descriptions, and links using the NewsAPI.
Displays news in a scrollable list with clickable links to full articles.

Weather-Based News Filtering:
Filters news dynamically based on current temperature:
Cold (<10°C or <50°F): Depressing news (e.g., tragedy, disaster).
Hot (>30°C or >86°F): Fear-related news (e.g., attack, threat).
Cool (otherwise): Happy/winning news (e.g., success, victory).

Settings:
Allows users to toggle temperature units (Celsius/Fahrenheit).
Enables selection of news categories (e.g., business, sports, technology).
Features a modern UI with gradient backgrounds, custom buttons, and polished cards.

UI/UX:
Vibrant gradient backgrounds (blue/orange/green for weather, blue-to-white for Settings).
Custom buttons with shadows and optional icons (e.g., back, save).
Responsive design with SafeAreaView for cross-device compatibility.



No navigation headers for a clean look.
Screenshots
Home Screen
Displays current weather, 5-day forecast, and filtered news based on weather conditions.
Settings Screen
Allows users to configure temperature units and news categories with an attractive UI.
Note: Screenshots will be added to the screenshots/ folder in this repository.

Installation

Prerequisites
Node.js (v16 or higher)
Expo CLI: npm install -g expo-cli
Expo Go app (for testing on a physical device)
OpenWeatherMap API key (sign up)
NewsAPI key (provided: 416cadd363b24a4a8ed9e12f15451043)


Setup
Clone the Repository:
git clone https://github.com/YOUR_USERNAME/WeatherNews.git
cd WeatherNews

Install Dependencies:
npm install
npx expo install expo-linear-gradient @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context expo-location @react-native-async-storage/async-storage axios react-native-vector-icons

Configure API Keys:
Open src/config.js and add your OpenWeatherMap API key:
export const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
export const NEWSAPI_KEY = '416cadd363b24a4a8ed9e12f15451043';

Test OpenWeatherMap key:
curl "https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&units=metric&appid=YOUR_OPENWEATHERMAP_API_KEY"
Run the App:
npx expo start -c --tunnel
Scan the QR code with Expo Go on your phone or use an emulator (a for Android, i for iOS on macOS).

Build APK
Install EAS CLI:
npm install -g eas-cli
Login to Expo:
eas login
Configure app.json:

{
  "expo": {
    "name": "WeatherNews",
    "slug": "weathernews",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": { "supportsTablet": true },
    "android": {
      "package": "com.yourusername.weathernews",
      "versionCode": 1
    }
  }
}


Project Structure

WeatherNews/
├── src/
│   ├── api/
│   │   ├── openWeather.js        # Weather API calls
│   │   ├── newsApi.js            # News API calls
│   ├── components/
│   │   ├── WeatherCard.js        # Displays current weather
│   │   ├── ForecastList.js       # Displays 5-day forecast
│   │   ├── NewsList.js           # Displays news headlines
│   ├── context/
│   │   ├── AppProvider.js        # Global state management
│   ├── screens/
│   │   ├── HomeScreen.js         # Main screen with weather and news
│   │   ├── SettingsScreen.js     # Settings for units and categories
│   ├── utils/
│   │   ├── filterNewsByWeather.js # Weather-based news filtering
│   ├── config.js                 # API keys
├── App.js                        # Entry point with navigation
├── README.md                     # Project documentation
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
└── screenshots/                  # Folder for screenshots

Usage
Home Screen: Displays current weather (temperature, conditions, icon), 5-day forecast, and news filtered by weather (e.g., depressing news for cold weather).
Settings Screen: Toggle between Celsius/Fahrenheit, select news categories (e.g., business, sports), save settings to update the Home screen.
Navigation: Tap "Settings" on Home screen to configure options; use "Back to Home" to return.
Refresh: Pull down on Home screen to refresh weather and news data.

Requirements Met
Weather (2a): Fetches and displays current weather and 5-day forecast using OpenWeatherMap API.
News (2b): Fetches and displays headlines, descriptions, and links using NewsAPI.
Weather-Based Filtering (2c): Filters news based on temperature:
Cold (<10°C/<50°F): Depressing news.
Hot (>30°C/>86°F): Fear-related news.
Cool: Happy/winning news.
Settings (2d): Configurable units and categories with an attractive UI.
UI: Gradient backgrounds, custom buttons, polished cards, responsive design.
