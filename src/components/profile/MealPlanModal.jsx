import { useState } from 'react'
import { X, Calendar, Clock, ChefHat, Users as UsersIcon, Share2, Edit, Trash2, Download, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function MealPlanModal({ mealPlan, onClose }) {
  const navigate = useNavigate()
  const [activeDay, setActiveDay] = useState(0)

  if (!mealPlan) return null

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleAddToShoppingList = () => {
    alert('All ingredients added to your shopping list!')
    navigate('/shopping-list')
    onClose()
  }

  const handleEditPlan = () => {
    navigate('/planner')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-r ${mealPlan.gradient} p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{mealPlan.name}</h2>
                <p className="text-sm opacity-90">{mealPlan.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <Clock className="mx-auto mb-1" size={20} />
              <p className="text-2xl font-bold">{mealPlan.totalMeals}</p>
              <p className="text-xs opacity-80">Total Meals</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <ChefHat className="mx-auto mb-1" size={20} />
              <p className="text-2xl font-bold">{mealPlan.totalRecipes}</p>
              <p className="text-xs opacity-80">Recipes</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <UsersIcon className="mx-auto mb-1" size={20} />
              <p className="text-2xl font-bold">{mealPlan.avgServings}</p>
              <p className="text-xs opacity-80">Avg Servings</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <Calendar className="mx-auto mb-1" size={20} />
              <p className="text-2xl font-bold">{mealPlan.days}</p>
              <p className="text-xs opacity-80">Days</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Day Selector */}
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
            {daysOfWeek.slice(0, mealPlan.days).map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeDay === idx
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Meals for Selected Day */}
          <div className="space-y-4">
            {mealPlan.schedule[activeDay].meals.map((meal, idx) => (
              <div
                key={idx}
                className="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  if (meal.recipeId) {
                    navigate(`/recipe/${meal.recipeId}`)
                    onClose()
                  }
                }}
              >
                <div className="flex gap-4">
                  {/* Meal Image */}
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  {/* Meal Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          meal.type === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
                          meal.type === 'Lunch' ? 'bg-blue-100 text-blue-800' :
                          meal.type === 'Dinner' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {meal.type}
                        </span>
                        <h3 className="font-bold text-gray-900 dark:text-white mt-1">
                          {meal.name}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{meal.time}</span>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {meal.cookTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersIcon size={14} />
                        {meal.servings} servings
                      </span>
                      <span className="flex items-center gap-1">
                        🔥 {meal.calories} cal
                      </span>
                    </div>

                    {/* Macros */}
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        P: {meal.macros.protein}g
                      </span>
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                        C: {meal.macros.carbs}g
                      </span>
                      <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                        F: {meal.macros.fat}g
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Daily Summary */}
            <div className="card p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Daily Summary - {daysOfWeek[activeDay]}
              </h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mealPlan.schedule[activeDay].totalCalories}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Calories</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{mealPlan.schedule[activeDay].totalProtein}g</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Protein</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{mealPlan.schedule[activeDay].totalCarbs}g</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Carbs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{mealPlan.schedule[activeDay].totalFat}g</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Fat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={handleAddToShoppingList}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Shopping List
            </button>
            <button
              onClick={handleEditPlan}
              className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              Edit Plan
            </button>
            <button
              onClick={() => alert('Share functionality coming soon!')}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlanModal
