import { useState } from 'react'
import { X, Sparkles, Calendar, Users, DollarSign, Target, TrendingUp, Save, Download, Upload } from 'lucide-react'

function AdvancedMealPlanModal({ isOpen, onClose, onGenerate }) {
  const [planConfig, setPlanConfig] = useState({
    duration: '7', // days
    servings: '2',
    budget: 'moderate',
    dietaryGoals: [],
    calorieTarget: '2000',
    proteinTarget: '150',
    skipBreakfast: false,
    mealPrepMode: false,
    excludeIngredients: ''
  })

  if (!isOpen) return null

  const budgetOptions = [
    { value: 'budget', label: 'Budget-Friendly', icon: '💰', desc: 'Under $50/week' },
    { value: 'moderate', label: 'Moderate', icon: '💵', desc: '$50-100/week' },
    { value: 'premium', label: 'Premium', icon: '💎', desc: '$100+/week' }
  ]

  const dietaryGoals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: '⚖️' },
    { id: 'muscle-gain', label: 'Muscle Gain', icon: '💪' },
    { id: 'maintenance', label: 'Maintenance', icon: '⚡' },
    { id: 'high-protein', label: 'High Protein', icon: '🥚' },
    { id: 'low-carb', label: 'Low Carb', icon: '🥬' },
    { id: 'balanced', label: 'Balanced', icon: '⚖️' }
  ]

  const toggleGoal = (goalId) => {
    setPlanConfig(prev => ({
      ...prev,
      dietaryGoals: prev.dietaryGoals.includes(goalId)
        ? prev.dietaryGoals.filter(id => id !== goalId)
        : [...prev.dietaryGoals, goalId]
    }))
  }

  const handleGenerate = () => {
    onGenerate(planConfig)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-primary-600" />
              AI Meal Plan Generator
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create a personalized meal plan based on your goals
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Duration & Servings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Plan Duration
              </label>
              <select
                value={planConfig.duration}
                onChange={(e) => setPlanConfig({ ...planConfig, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
              >
                <option value="3">3 Days</option>
                <option value="7">1 Week</option>
                <option value="14">2 Weeks</option>
                <option value="30">1 Month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Users size={16} className="inline mr-2" />
                Servings Per Meal
              </label>
              <select
                value={planConfig.servings}
                onChange={(e) => setPlanConfig({ ...planConfig, servings: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="4">4 People (Family)</option>
                <option value="6">6+ People</option>
              </select>
            </div>
          </div>

          {/* Budget Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <DollarSign size={16} className="inline mr-2" />
              Budget Range
            </label>
            <div className="grid grid-cols-3 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPlanConfig({ ...planConfig, budget: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    planConfig.budget === option.value
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{option.label}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Target size={16} className="inline mr-2" />
              Dietary Goals
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dietaryGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    planConfig.dietaryGoals.includes(goal.id)
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <span className="text-lg mr-2">{goal.icon}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{goal.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nutrition Targets */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Daily Calorie Target
              </label>
              <input
                type="number"
                value={planConfig.calorieTarget}
                onChange={(e) => setPlanConfig({ ...planConfig, calorieTarget: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
                placeholder="2000"
              />
              <p className="text-xs text-gray-500 mt-1">Calories per day</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Protein Target
              </label>
              <input
                type="number"
                value={planConfig.proteinTarget}
                onChange={(e) => setPlanConfig({ ...planConfig, proteinTarget: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
                placeholder="150"
              />
              <p className="text-xs text-gray-500 mt-1">Grams per day</p>
            </div>
          </div>

          {/* Meal Preferences */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Meal Preferences
            </label>
            
            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={planConfig.skipBreakfast}
                onChange={(e) => setPlanConfig({ ...planConfig, skipBreakfast: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-600"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Skip Breakfast</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Plan only lunch and dinner</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={planConfig.mealPrepMode}
                onChange={(e) => setPlanConfig({ ...planConfig, mealPrepMode: e.target.checked })}
                className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-600"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Meal Prep Mode</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Optimize for batch cooking and leftovers</div>
              </div>
            </label>
          </div>

          {/* Exclude Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Exclude Ingredients (Optional)
            </label>
            <input
              type="text"
              value={planConfig.excludeIngredients}
              onChange={(e) => setPlanConfig({ ...planConfig, excludeIngredients: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
              placeholder="e.g., nuts, shellfish, dairy"
            />
            <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl font-semibold text-white hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Generate Plan
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdvancedMealPlanModal
