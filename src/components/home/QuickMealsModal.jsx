import { useState, useEffect } from 'react'
import { X, Clock, Sunrise, Sun, Sunset, Moon, ChefHat, Zap, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function QuickMealsModal({ onClose }) {
  const navigate = useNavigate()
  const [timeOfDay, setTimeOfDay] = useState('morning')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
    
    setCurrentTime(timeString)
    
    if (hour >= 5 && hour < 11) {
      setTimeOfDay('morning')
    } else if (hour >= 11 && hour < 16) {
      setTimeOfDay('afternoon')
    } else if (hour >= 16 && hour < 20) {
      setTimeOfDay('evening')
    } else {
      setTimeOfDay('night')
    }
  }, [])

  const mealSuggestions = {
    morning: {
      icon: Sunrise,
      color: 'from-orange-400 to-yellow-500',
      greeting: 'Good Morning!',
      tagline: 'Start your day right with a quick breakfast',
      emoji: '☀️',
      meals: [
        { 
          name: 'Avocado Toast', 
          time: '5 min', 
          calories: '320 cal',
          ingredients: '3 ingredients',
          image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Smoothie Bowl', 
          time: '8 min', 
          calories: '280 cal',
          ingredients: '5 ingredients',
          image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Quick Omelette', 
          time: '10 min', 
          calories: '250 cal',
          ingredients: '4 ingredients',
          image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Overnight Oats', 
          time: '5 min', 
          calories: '300 cal',
          ingredients: '6 ingredients',
          image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300',
          difficulty: 'Easy'
        }
      ]
    },
    afternoon: {
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      greeting: 'Good Afternoon!',
      tagline: 'Quick & satisfying lunch ideas',
      emoji: '🌤️',
      meals: [
        { 
          name: 'Quick Pasta Bowl', 
          time: '15 min', 
          calories: '450 cal',
          ingredients: '6 ingredients',
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Chicken Wrap', 
          time: '12 min', 
          calories: '380 cal',
          ingredients: '5 ingredients',
          image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Fresh Salad Bowl', 
          time: '10 min', 
          calories: '320 cal',
          ingredients: '8 ingredients',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Grilled Sandwich', 
          time: '8 min', 
          calories: '400 cal',
          ingredients: '4 ingredients',
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300',
          difficulty: 'Easy'
        }
      ]
    },
    evening: {
      icon: Sunset,
      color: 'from-orange-500 to-red-500',
      greeting: 'Good Evening!',
      tagline: 'Quick dinner recipes under 30 minutes',
      emoji: '🌆',
      meals: [
        { 
          name: 'One-Pan Chicken', 
          time: '25 min', 
          calories: '520 cal',
          ingredients: '7 ingredients',
          image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300',
          difficulty: 'Medium'
        },
        { 
          name: 'Stir-Fry Noodles', 
          time: '18 min', 
          calories: '480 cal',
          ingredients: '8 ingredients',
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Shrimp Tacos', 
          time: '20 min', 
          calories: '420 cal',
          ingredients: '6 ingredients',
          image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Quick Curry', 
          time: '28 min', 
          calories: '500 cal',
          ingredients: '9 ingredients',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300',
          difficulty: 'Medium'
        }
      ]
    },
    night: {
      icon: Moon,
      color: 'from-indigo-500 to-purple-600',
      greeting: 'Late Night?',
      tagline: 'Light & quick snacks for late hours',
      emoji: '🌙',
      meals: [
        { 
          name: 'Quick Quesadilla', 
          time: '8 min', 
          calories: '280 cal',
          ingredients: '3 ingredients',
          image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Cheese Toast', 
          time: '5 min', 
          calories: '220 cal',
          ingredients: '2 ingredients',
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Instant Ramen', 
          time: '10 min', 
          calories: '350 cal',
          ingredients: '5 ingredients',
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300',
          difficulty: 'Easy'
        },
        { 
          name: 'Fruit & Yogurt', 
          time: '3 min', 
          calories: '180 cal',
          ingredients: '3 ingredients',
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300',
          difficulty: 'Easy'
        }
      ]
    }
  }

  const currentMeal = mealSuggestions[timeOfDay]
  const TimeIcon = currentMeal.icon

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-modal rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-r ${currentMeal.color} p-6 text-white`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <TimeIcon size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  {currentMeal.greeting} {currentMeal.emoji}
                </h2>
                <p className="text-sm opacity-90 flex items-center gap-2 mt-1">
                  <Clock size={14} />
                  {currentTime} • {currentMeal.tagline}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap size={20} className="text-orange-500" />
              Quick Meals Under 30 Minutes
            </h3>
            <button
              onClick={() => {
                navigate('/explore')
                onClose()
              }}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentMeal.meals.map((meal, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate('/explore')
                  onClose()
                }}
                className="group text-left"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  {/* Image */}
                  <div className="aspect-video relative">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Time Badge */}
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Clock size={12} />
                      {meal.time}
                    </div>
                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {meal.difficulty}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                      {meal.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        🔥 {meal.calories}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ChefHat size={12} />
                        {meal.ingredients}
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span>View Recipe</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info Box */}
          <div className={`mt-6 p-4 bg-gradient-to-r ${currentMeal.color} bg-opacity-10 border-2 border-current rounded-xl`}>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>💡 Tip:</strong> All recipes are designed for quick preparation. Perfect for busy {timeOfDay === 'morning' ? 'mornings' : timeOfDay === 'afternoon' ? 'lunch breaks' : timeOfDay === 'evening' ? 'weeknight dinners' : 'late-night cravings'}!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickMealsModal
