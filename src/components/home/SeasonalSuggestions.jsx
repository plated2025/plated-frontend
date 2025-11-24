import { useState, useEffect } from 'react'
import { Cloud, Sun, Snowflake, Leaf, Calendar, MapPin, Thermometer, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getCurrentWeather, getWeatherBasedRecipeSuggestions, getCurrentSeason, getTimeOfDay, getMealTypeByTime } from '../../services/weatherService'
import { recommendationAPI } from '../../services/api'

function SeasonalSuggestions() {
  const navigate = useNavigate()
  const [season, setSeason] = useState(getCurrentSeason())
  const [weather, setWeather] = useState(null)
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay())
  const [mealType, setMealType] = useState(getMealTypeByTime())
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadWeatherAndRecommendations()
  }, [])

  const loadWeatherAndRecommendations = async () => {
    setIsLoading(true)
    try {
      // Get current weather
      const currentWeather = await getCurrentWeather()
      setWeather(currentWeather)

      // Get weather-based recipe suggestions
      if (currentWeather) {
        const suggestions = await recommendationAPI.getWeatherBased(currentWeather, 5)
        setRecipes(suggestions.data || [])
      } else {
        // Fallback to time-based recommendations
        const suggestions = await recommendationAPI.getNowSuggestions(5)
        setRecipes(suggestions.data || [])
      }
    } catch (error) {
      console.error('Error loading weather and recommendations:', error)
      setRecipes([])
    } finally {
      setIsLoading(false)
    }
  }

  const seasonalData = {
    spring: {
      icon: Leaf,
      color: 'from-green-400 to-emerald-500',
      emoji: '🌸',
      title: 'Fresh Spring Flavors'
    },
    summer: {
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      emoji: '☀️',
      title: 'Cool Summer Eats'
    },
    fall: {
      icon: Leaf,
      color: 'from-orange-400 to-red-500',
      emoji: '🍂',
      title: 'Cozy Fall Comfort'
    },
    winter: {
      icon: Snowflake,
      color: 'from-blue-400 to-cyan-500',
      emoji: '❄️',
      title: 'Warm Winter Dishes'
    }
  }
  
  const currentSeason = seasonalData[season]
  
  // Get weather suggestion
  const weatherSuggestion = weather ? getWeatherBasedRecipeSuggestions(weather) : null
  
  // Don't render if loading and no recipes
  if (!isLoading && recipes.length === 0) {
    return null
  }

  const timeBasedSuggestions = {
    morning: { emoji: '🌅', suggestion: 'Energizing breakfast ideas', icon: '☕' },
    afternoon: { emoji: '☀️', suggestion: 'Light lunch recipes', icon: '🥙' },
    evening: { emoji: '🌙', suggestion: 'Cozy dinner ideas', icon: '🍽️' }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar size={18} className="text-primary-600" />
            Perfect for Today
          </h3>
        </div>

        {/* Weather & Season Banner */}
        <div className={`bg-gradient-to-r ${currentSeason.color} rounded-xl p-4 mb-4 shadow-lg`}>
          <div className="flex items-center justify-between text-white">
            <div className="flex-1">
              <p className="text-sm opacity-90 flex items-center gap-2">
                <currentSeason.icon size={16} />
                {season.charAt(0).toUpperCase() + season.slice(1)}
                {weather && (
                  <>
                    <span>•</span>
                    <Thermometer size={14} />
                    {weather.temp}°C
                  </>
                )}
              </p>
              <h4 className="text-lg font-bold">
                {weatherSuggestion ? weatherSuggestion.description : currentSeason.title}
              </h4>
              {weather && (
                <p className="text-xs opacity-75 mt-1">
                  {weather.description} in {weather.city}
                </p>
              )}
            </div>
            <span className="text-4xl">{weatherSuggestion?.emoji || currentSeason.emoji}</span>
          </div>
        </div>

        {/* Time-Based Suggestion */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 mb-3 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{timeBasedSuggestions[timeOfDay].emoji}</span>
            <div className="flex-1">
              <p className="text-xs text-gray-600 dark:text-gray-400">Good {timeOfDay}!</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {timeBasedSuggestions[timeOfDay].suggestion}
              </p>
            </div>
            <button
              onClick={() => navigate('/explore?filter=time')}
              className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:shadow-md transition-all"
            >
              Explore
            </button>
          </div>
        </div>

        {/* Weather-Based Recipe Recommendations */}
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader size={20} className="animate-spin text-primary-600" />
            </div>
          ) : recipes.length > 0 ? (
            recipes.map((recipe, idx) => (
              <button
                key={recipe._id || idx}
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">
                      {recipe.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {recipe.cookTime || '30'} min • {recipe.difficulty || 'Easy'}
                    </p>
                  </div>
                </div>
                <div className="text-primary-600 transform group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500 py-4">
              No recommendations available
            </p>
          )}
        </div>

        {/* Weather-Based Tip */}
        {weatherSuggestion && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Thermometer size={14} />
              <strong>Today's Tip:</strong> {weatherSuggestion.description}
            </p>
            {weatherSuggestion.suggestions && (
              <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                Try: {weatherSuggestion.suggestions.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeasonalSuggestions
