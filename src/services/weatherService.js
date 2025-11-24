/**
 * Weather Service
 * Fetches weather data for location-based recipe recommendations
 */

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// Cache weather data for 30 minutes
let weatherCache = {
  data: null,
  timestamp: null,
  ttl: 30 * 60 * 1000 // 30 minutes
};

/**
 * Get user's current location
 */
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        // Fallback to IP-based location or default city
        console.warn('Location access denied, using default');
        resolve(null); // Will use default city
      }
    );
  });
};

/**
 * Get weather data by coordinates
 */
export const getWeatherByLocation = async (lat, lon) => {
  try {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_openweather_api_key_here') {
      console.warn('Weather API key not configured');
      return null;
    }

    const response = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Weather API error');
    }

    const data = await response.json();
    return parseWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

/**
 * Get current weather with caching
 */
export const getCurrentWeather = async () => {
  try {
    // Check cache
    if (weatherCache.data && 
        weatherCache.timestamp && 
        Date.now() - weatherCache.timestamp < weatherCache.ttl) {
      return weatherCache.data;
    }

    // Get user location
    const location = await getUserLocation();
    
    let weather;
    if (location) {
      weather = await getWeatherByLocation(location.lat, location.lon);
    } else {
      // Use default city (e.g., New York) if location not available
      weather = await getWeatherByLocation(40.7128, -74.0060);
    }

    // Cache the result
    if (weather) {
      weatherCache.data = weather;
      weatherCache.timestamp = Date.now();
    }

    return weather;
  } catch (error) {
    console.error('Error getting current weather:', error);
    return null;
  }
};

/**
 * Parse weather data into usable format
 */
const parseWeatherData = (data) => {
  const temp = Math.round(data.main.temp);
  const condition = data.weather[0].main.toLowerCase();
  const description = data.weather[0].description;

  return {
    temp,
    tempF: Math.round((temp * 9/5) + 32),
    condition,
    description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    city: data.name,
    // Derived data for recommendations
    isCold: temp < 10,
    isCool: temp >= 10 && temp < 20,
    isMild: temp >= 20 && temp < 25,
    isWarm: temp >= 25 && temp < 30,
    isHot: temp >= 30,
    isRainy: condition.includes('rain'),
    isSnowy: condition.includes('snow'),
    isCloudy: condition.includes('cloud'),
    isSunny: condition.includes('clear'),
    timestamp: Date.now()
  };
};

/**
 * Get recipe suggestions based on weather
 */
export const getWeatherBasedRecipeSuggestions = (weather) => {
  if (!weather) return { category: 'comfort', description: 'Comfort food' };

  const { temp, condition, isCold, isHot, isRainy } = weather;

  // Cold weather (< 10°C)
  if (isCold) {
    return {
      category: 'warm comfort',
      tags: ['soup', 'stew', 'hot', 'comfort'],
      description: `${temp}°C - Perfect for warm, comforting meals`,
      emoji: '🥘',
      suggestions: ['Hot soup', 'Stew', 'Baked pasta', 'Hot chocolate']
    };
  }

  // Cool weather (10-20°C)
  if (weather.isCool) {
    return {
      category: 'hearty',
      tags: ['casserole', 'roasted', 'baked'],
      description: `${temp}°C - Great for hearty, satisfying dishes`,
      emoji: '🍲',
      suggestions: ['Roasted chicken', 'Casserole', 'Warm salads', 'Baked goods']
    };
  }

  // Warm/Hot weather (> 25°C)
  if (isHot) {
    return {
      category: 'light refreshing',
      tags: ['salad', 'cold', 'fresh', 'light'],
      description: `${temp}°C - Perfect for light, refreshing meals`,
      emoji: '🥗',
      suggestions: ['Fresh salads', 'Cold soups', 'Smoothies', 'Grilled veggies']
    };
  }

  // Rainy weather
  if (isRainy) {
    return {
      category: 'cozy comfort',
      tags: ['comfort', 'warm', 'hearty'],
      description: `Rainy day - Cozy comfort food weather`,
      emoji: '☕',
      suggestions: ['Hot soup', 'Mac and cheese', 'Grilled cheese', 'Hot cocoa']
    };
  }

  // Mild weather (20-25°C) - default
  return {
    category: 'versatile',
    tags: ['balanced', 'moderate'],
    description: `${temp}°C - Perfect weather for any meal`,
    emoji: '🍽️',
    suggestions: ['Grilled dishes', 'Pasta', 'Stir-fry', 'Tacos']
  };
};

/**
 * Get season based on month
 */
export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
};

/**
 * Get time of day
 */
export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

/**
 * Get meal type by time
 */
export const getMealTypeByTime = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 15) return 'lunch';
  if (hour >= 15 && hour < 18) return 'snack';
  if (hour >= 18 || hour < 5) return 'dinner';
  
  return 'any';
};

export default {
  getCurrentWeather,
  getWeatherByLocation,
  getWeatherBasedRecipeSuggestions,
  getCurrentSeason,
  getTimeOfDay,
  getMealTypeByTime
};
