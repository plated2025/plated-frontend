import { useState } from 'react'
import { X, Calendar, Clock, Plus, Check } from 'lucide-react'

function AddToMealPlanModal({ isOpen, onClose, recipe, onAdd }) {
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedMealType, setSelectedMealType] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')

  if (!isOpen || !recipe) return null

  const daysOfWeek = [
    { id: 'monday', label: 'Monday', short: 'Mon' },
    { id: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { id: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { id: 'thursday', label: 'Thursday', short: 'Thu' },
    { id: 'friday', label: 'Friday', short: 'Fri' },
    { id: 'saturday', label: 'Saturday', short: 'Sat' },
    { id: 'sunday', label: 'Sunday', short: 'Sun' }
  ]

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', emoji: '🍳', defaultTime: '08:00' },
    { id: 'lunch', label: 'Lunch', emoji: '🥗', defaultTime: '12:30' },
    { id: 'dinner', label: 'Dinner', emoji: '🍽️', defaultTime: '19:00' },
    { id: 'snack', label: 'Snack', emoji: '🍎', defaultTime: '15:00' }
  ]

  const handleAdd = () => {
    if (!selectedDay || !selectedMealType) {
      alert('Please select a day and meal type')
      return
    }

    const mealData = {
      recipeId: recipe.id,
      recipeName: recipe.title,
      recipeImage: recipe.image,
      day: selectedDay,
      mealType: selectedMealType,
      time: selectedTime || mealTypes.find(m => m.id === selectedMealType)?.defaultTime || '12:00',
      cookTime: recipe.cookTime || '30 min',
      servings: recipe.servings || 4,
      calories: recipe.calories || 0
    }

    onAdd(mealData)
    onClose()
    
    // Reset selections
    setSelectedDay(null)
    setSelectedMealType(null)
    setSelectedTime('')
  }

  const handleMealTypeSelect = (mealType) => {
    setSelectedMealType(mealType.id)
    // Auto-set default time if no custom time is set
    if (!selectedTime) {
      setSelectedTime(mealType.defaultTime)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg">
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Add to Meal Plan</h2>
              <p className="text-white/90 text-sm">{recipe.title}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Select Day */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <Calendar size={16} />
              Select Day
            </label>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map(day => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    selectedDay === day.id
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="text-xs font-bold">{day.short}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Meal Type */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <Clock size={16} />
              Meal Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {mealTypes.map(meal => (
                <button
                  key={meal.id}
                  onClick={() => handleMealTypeSelect(meal)}
                  className={`p-4 rounded-xl text-left transition-all border-2 ${
                    selectedMealType === meal.id
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{meal.emoji}</span>
                    {selectedMealType === meal.id && (
                      <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">{meal.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{meal.defaultTime}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Time (Optional) */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Clock size={16} />
              Time (Optional)
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>

          {/* Recipe Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cook Time</div>
                <div className="font-semibold text-gray-900 dark:text-white">{recipe.cookTime || '30 min'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Servings</div>
                <div className="font-semibold text-gray-900 dark:text-white">{recipe.servings || 4}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Calories</div>
                <div className="font-semibold text-gray-900 dark:text-white">{recipe.calories || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!selectedDay || !selectedMealType}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                selectedDay && selectedMealType
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus size={18} />
              Add to Plan
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default AddToMealPlanModal
