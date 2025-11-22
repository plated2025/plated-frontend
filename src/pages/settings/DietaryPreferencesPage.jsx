import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X, Plus, Save, AlertCircle } from 'lucide-react'

function DietaryPreferencesPage() {
  const navigate = useNavigate()
  const [preferences, setPreferences] = useState({
    dietType: [],
    allergies: [],
    intolerances: [],
    dislikes: [],
    cuisinePreferences: [],
    avoidIngredients: []
  })

  const [customIngredient, setCustomIngredient] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const savedPreferences = localStorage.getItem('dietaryPreferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    } else {
      // Try to load from interests page
      const userInterests = localStorage.getItem('userInterests')
      if (userInterests) {
        const interests = JSON.parse(userInterests)
        const dietTypes = interests.filter(i => 
          ['vegan', 'vegetarian', 'keto', 'paleo', 'gluten-free', 'dairy-free'].includes(i)
        )
        if (dietTypes.length > 0) {
          setPreferences(prev => ({ ...prev, dietType: dietTypes }))
        }
      }
    }
  }, [])

  const toggleItem = (category, item) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }))
    setSaved(false)
  }

  const addCustomIngredient = () => {
    if (customIngredient.trim()) {
      setPreferences(prev => ({
        ...prev,
        avoidIngredients: [...prev.avoidIngredients, customIngredient.trim()]
      }))
      setCustomIngredient('')
      setSaved(false)
    }
  }

  const removeCustomIngredient = (ingredient) => {
    setPreferences(prev => ({
      ...prev,
      avoidIngredients: prev.avoidIngredients.filter(i => i !== ingredient)
    }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem('dietaryPreferences', JSON.stringify(preferences))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const dietTypes = [
    { value: 'vegan', label: 'Vegan', emoji: '🌱', desc: 'No animal products' },
    { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗', desc: 'No meat or fish' },
    { value: 'pescatarian', label: 'Pescatarian', emoji: '🐟', desc: 'Fish but no meat' },
    { value: 'keto', label: 'Keto', emoji: '🥑', desc: 'Low carb, high fat' },
    { value: 'paleo', label: 'Paleo', emoji: '🥩', desc: 'Whole foods, no grains' },
    { value: 'gluten-free', label: 'Gluten-Free', emoji: '🌾', desc: 'No gluten' },
    { value: 'dairy-free', label: 'Dairy-Free', emoji: '🥛', desc: 'No dairy products' },
    { value: 'halal', label: 'Halal', emoji: '🕌', desc: 'Islamic dietary laws' }
  ]

  const commonAllergies = [
    { value: 'peanuts', label: 'Peanuts', emoji: '🥜' },
    { value: 'tree-nuts', label: 'Tree Nuts', emoji: '🌰' },
    { value: 'shellfish', label: 'Shellfish', emoji: '🦐' },
    { value: 'fish', label: 'Fish', emoji: '🐟' },
    { value: 'eggs', label: 'Eggs', emoji: '🥚' },
    { value: 'milk', label: 'Milk', emoji: '🥛' },
    { value: 'soy', label: 'Soy', emoji: '🫘' },
    { value: 'wheat', label: 'Wheat', emoji: '🌾' },
    { value: 'sesame', label: 'Sesame', emoji: '🌻' }
  ]

  const commonIntolerances = [
    { value: 'lactose', label: 'Lactose', emoji: '🥛' },
    { value: 'gluten', label: 'Gluten', emoji: '🍞' },
    { value: 'fructose', label: 'Fructose', emoji: '🍎' },
    { value: 'fodmap', label: 'FODMAP', emoji: '🥦' }
  ]

  const cuisinePreferences = [
    { value: 'italian', label: 'Italian', emoji: '🍝' },
    { value: 'asian', label: 'Asian', emoji: '🍜' },
    { value: 'mexican', label: 'Mexican', emoji: '🌮' },
    { value: 'mediterranean', label: 'Mediterranean', emoji: '🫒' },
    { value: 'american', label: 'American', emoji: '🍔' },
    { value: 'french', label: 'French', emoji: '🥐' },
    { value: 'indian', label: 'Indian', emoji: '🍛' },
    { value: 'japanese', label: 'Japanese', emoji: '🍣' },
    { value: 'thai', label: 'Thai', emoji: '🍲' },
    { value: 'middle-eastern', label: 'Middle Eastern', emoji: '🥙' }
  ]

  const commonDislikes = [
    'Mushrooms', 'Olives', 'Onions', 'Garlic', 'Cilantro', 'Blue Cheese',
    'Anchovies', 'Brussels Sprouts', 'Liver', 'Cottage Cheese', 'Eggplant', 'Tofu'
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dietary Preferences</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Set your dietary restrictions and preferences
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Important Notice */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                Important
              </h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                These preferences help filter recipes. Always verify ingredients if you have severe allergies.
              </p>
            </div>
          </div>
        </div>

        {/* Diet Type */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Diet Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dietTypes.map((diet) => (
              <label
                key={diet.value}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  preferences.dietType.includes(diet.value)
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={preferences.dietType.includes(diet.value)}
                  onChange={() => toggleItem('dietType', diet.value)}
                  className="sr-only"
                />
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{diet.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{diet.label}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{diet.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Allergies
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select any foods you're allergic to
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {commonAllergies.map((allergy) => (
              <button
                key={allergy.value}
                onClick={() => toggleItem('allergies', allergy.value)}
                className={`p-3 border-2 rounded-lg transition-all text-center ${
                  preferences.allergies.includes(allergy.value)
                    ? 'border-red-600 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
                }`}
              >
                <div className="text-2xl mb-1">{allergy.emoji}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{allergy.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Intolerances */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Food Intolerances
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Foods that cause digestive issues
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {commonIntolerances.map((intolerance) => (
              <button
                key={intolerance.value}
                onClick={() => toggleItem('intolerances', intolerance.value)}
                className={`p-3 border-2 rounded-lg transition-all text-center ${
                  preferences.intolerances.includes(intolerance.value)
                    ? 'border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300'
                }`}
              >
                <div className="text-2xl mb-1">{intolerance.emoji}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{intolerance.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Favorite Cuisines
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select cuisines you enjoy (optional)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {cuisinePreferences.map((cuisine) => (
              <button
                key={cuisine.value}
                onClick={() => toggleItem('cuisinePreferences', cuisine.value)}
                className={`p-3 border-2 rounded-lg transition-all text-center ${
                  preferences.cuisinePreferences.includes(cuisine.value)
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <div className="text-2xl mb-1">{cuisine.emoji}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{cuisine.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dislikes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Foods I Dislike
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Foods you'd prefer to avoid
          </p>
          <div className="flex flex-wrap gap-2">
            {commonDislikes.map((food) => (
              <button
                key={food}
                onClick={() => toggleItem('dislikes', food)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  preferences.dislikes.includes(food)
                    ? 'border-gray-600 bg-gray-100 dark:bg-gray-700'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">{food}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Ingredients to Avoid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Additional Ingredients to Avoid
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Add any other ingredients you want to avoid
          </p>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={customIngredient}
              onChange={(e) => setCustomIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
              placeholder="e.g., coconut, bell peppers..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
            />
            <button
              onClick={addCustomIngredient}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {preferences.avoidIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {preferences.avoidIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-center gap-2"
                >
                  <span className="text-sm font-medium text-red-900 dark:text-red-100">{ingredient}</span>
                  <button
                    onClick={() => removeCustomIngredient(ingredient)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Preferences
          </button>
          {saved && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 px-4">
              <Save size={20} />
              <span className="font-medium">Saved!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DietaryPreferencesPage
