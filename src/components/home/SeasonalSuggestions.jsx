import { useState, useEffect } from 'react'
import { Cloud, Sun, Snowflake, Leaf, Calendar, MapPin, Thermometer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function SeasonalSuggestions() {
  const navigate = useNavigate()
  const [season, setSeason] = useState('fall')
  const [weather, setWeather] = useState('cool')
  const [timeOfDay, setTimeOfDay] = useState('evening')

  useEffect(() => {
    // Detect season
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) setSeason('spring')
    else if (month >= 5 && month <= 7) setSeason('summer')
    else if (month >= 8 && month <= 10) setSeason('fall')
    else setSeason('winter')

    // Detect time of day
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay('morning')
    else if (hour < 17) setTimeOfDay('afternoon')
    else setTimeOfDay('evening')
  }, [])

  const seasonalData = {
    spring: {
      icon: Leaf,
      color: 'from-green-400 to-emerald-500',
      emoji: '🌸',
      title: 'Fresh Spring Flavors',
      recipes: [
        { name: 'Spring Salad', time: '15min', emoji: '🥗' },
        { name: 'Lemon Chicken', time: '35min', emoji: '🍋' },
        { name: 'Asparagus Risotto', time: '45min', emoji: '🌿' }
      ]
    },
    summer: {
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      emoji: '☀️',
      title: 'Cool Summer Eats',
      recipes: [
        { name: 'BBQ Skewers', time: '25min', emoji: '🍢' },
        { name: 'Watermelon Salad', time: '10min', emoji: '🍉' },
        { name: 'Grilled Fish', time: '20min', emoji: '🐟' }
      ]
    },
    fall: {
      icon: Leaf,
      color: 'from-orange-400 to-red-500',
      emoji: '🍂',
      title: 'Cozy Fall Comfort',
      recipes: [
        { name: 'Pumpkin Soup', time: '40min', emoji: '🎃' },
        { name: 'Apple Pie', time: '60min', emoji: '🥧' },
        { name: 'Roasted Veggies', time: '35min', emoji: '🥕' }
      ]
    },
    winter: {
      icon: Snowflake,
      color: 'from-blue-400 to-cyan-500',
      emoji: '❄️',
      title: 'Warm Winter Dishes',
      recipes: [
        { name: 'Hot Stew', time: '90min', emoji: '🍲' },
        { name: 'Baked Pasta', time: '45min', emoji: '🍝' },
        { name: 'Hot Chocolate', time: '10min', emoji: '☕' }
      ]
    }
  }

  const currentSeason = seasonalData[season]

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

        {/* Seasonal Banner */}
        <div className={`bg-gradient-to-r ${currentSeason.color} rounded-xl p-4 mb-4 shadow-lg`}>
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-90 flex items-center gap-2">
                <currentSeason.icon size={16} />
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </p>
              <h4 className="text-lg font-bold">{currentSeason.title}</h4>
            </div>
            <span className="text-4xl">{currentSeason.emoji}</span>
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

        {/* Seasonal Recipes */}
        <div className="space-y-2">
          {currentSeason.recipes.map((recipe, idx) => (
            <button
              key={idx}
              onClick={() => navigate('/explore')}
              className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{recipe.emoji}</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {recipe.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {recipe.time} • {season} special
                  </p>
                </div>
              </div>
              <div className="text-primary-600 transform group-hover:translate-x-1 transition-transform">
                →
              </div>
            </button>
          ))}
        </div>

        {/* Weather-Based Tip */}
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <Thermometer size={14} />
            <strong>Today's Tip:</strong> Perfect weather for warm, comforting meals
          </p>
        </div>
      </div>
    </div>
  )
}

export default SeasonalSuggestions
