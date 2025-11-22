import { useState, useEffect } from 'react'
import { Flame, Drumstick, Wheat, Droplet, TrendingUp, Target, Award, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function NutritionDashboard({ weeklyData = {} }) {
  const navigate = useNavigate()
  const [dailyTargets, setDailyTargets] = useState({
    calories: 2000,
    protein: 150,
    carbs: 225,
    fat: 67,
    water: 2.5
  })

  const [healthDataAvailable, setHealthDataAvailable] = useState(false)

  useEffect(() => {
    // Load calculated targets from health data
    const savedTargets = localStorage.getItem('nutritionTargets')
    if (savedTargets) {
      const targets = JSON.parse(savedTargets)
      setDailyTargets({
        calories: targets.calories || 2000,
        protein: targets.protein || 150,
        carbs: targets.carbs || 225,
        fat: targets.fat || 67,
        water: targets.water || 2.5
      })
      setHealthDataAvailable(true)
    }
  }, [])

  // Mock current intake - in real app, calculate from logged meals
  const currentIntake = {
    calories: 1650,
    protein: 125,
    carbs: 180,
    fat: 55,
    water: 1.8
  }

  const calculatePercentage = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const nutrients = [
    {
      name: 'Calories',
      icon: Flame,
      current: currentIntake.calories,
      target: dailyTargets.calories,
      unit: 'kcal',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      name: 'Protein',
      icon: Drumstick,
      current: currentIntake.protein,
      target: dailyTargets.protein,
      unit: 'g',
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    },
    {
      name: 'Carbs',
      icon: Wheat,
      current: currentIntake.carbs,
      target: dailyTargets.carbs,
      unit: 'g',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      name: 'Fat',
      icon: Droplet,
      current: currentIntake.fat,
      target: dailyTargets.fat,
      unit: 'g',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    }
  ]

  const weeklyStats = {
    planCompletion: 85, // percentage
    avgCalories: 1850,
    streak: 5, // days
    mealsLogged: 18
  }

  return (
    <div className="space-y-4">
      {/* Health Data Sync Banner */}
      {!healthDataAvailable && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                Sync Your Health Data
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect your smartwatch for personalized nutrition targets based on your activity
              </p>
            </div>
            <button
              onClick={() => navigate('/health-sync')}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw size={16} />
              Sync Now
            </button>
          </div>
        </div>
      )}

      {healthDataAvailable && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              Targets personalized from your health data
            </span>
          </div>
          <button
            onClick={() => navigate('/health-sync')}
            className="text-sm text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 font-medium"
          >
            Update →
          </button>
        </div>
      )}

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-primary-600" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Plan Completion</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyStats.planCompletion}%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-orange-600" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Avg Calories</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyStats.avgCalories}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-green-600" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Day Streak</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyStats.streak}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-purple-600" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Meals Logged</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyStats.mealsLogged}</p>
        </div>
      </div>

      {/* Daily Nutrition Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Nutrition</h3>
        
        <div className="space-y-4">
          {nutrients.map((nutrient) => {
            const percentage = calculatePercentage(nutrient.current, nutrient.target)
            const Icon = nutrient.icon
            
            return (
              <div key={nutrient.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${nutrient.bgColor} flex items-center justify-center`}>
                      <Icon size={16} className={nutrient.color} />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{nutrient.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 dark:text-white">{nutrient.current}</span>
                    <span className="text-gray-500 dark:text-gray-400">/{nutrient.target} {nutrient.unit}</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  {nutrient.target - nutrient.current > 0 
                    ? `${nutrient.target - nutrient.current} ${nutrient.unit} remaining`
                    : 'Target reached!'
                  }
                </div>
              </div>
            )
          })}
        </div>

        {/* Macro Distribution Pie Chart Visual */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Macro Distribution</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
              <div 
                className="bg-red-500 h-full"
                style={{ width: `${(currentIntake.protein * 4 / currentIntake.calories) * 100}%` }}
                title="Protein"
              />
              <div 
                className="bg-yellow-500 h-full"
                style={{ width: `${(currentIntake.carbs * 4 / currentIntake.calories) * 100}%` }}
                title="Carbs"
              />
              <div 
                className="bg-blue-500 h-full"
                style={{ width: `${(currentIntake.fat * 9 / currentIntake.calories) * 100}%` }}
                title="Fat"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Protein {Math.round((currentIntake.protein * 4 / currentIntake.calories) * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Carbs {Math.round((currentIntake.carbs * 4 / currentIntake.calories) * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Fat {Math.round((currentIntake.fat * 9 / currentIntake.calories) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionDashboard
