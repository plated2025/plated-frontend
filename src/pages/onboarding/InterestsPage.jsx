import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight, Salad, Dumbbell, Pizza, Flame, Heart, Leaf, Coffee, Cake, Fish, ChefHat, Clock, TrendingUp } from 'lucide-react'

function InterestsPage() {
  const navigate = useNavigate()
  const [selectedInterests, setSelectedInterests] = useState([])

  const interestCategories = [
    {
      title: 'Dietary Preferences',
      icon: Salad,
      interests: [
        { id: 'vegan', name: 'Vegan', icon: '🌱' },
        { id: 'vegetarian', name: 'Vegetarian', icon: '🥗' },
        { id: 'keto', name: 'Keto', icon: '🥑' },
        { id: 'paleo', name: 'Paleo', icon: '🥩' },
        { id: 'gluten-free', name: 'Gluten Free', icon: '🌾' },
        { id: 'dairy-free', name: 'Dairy Free', icon: '🥛' },
      ]
    },
    {
      title: 'Fitness Goals',
      icon: Dumbbell,
      interests: [
        { id: 'weight-loss', name: 'Weight Loss', icon: '⚖️' },
        { id: 'muscle-gain', name: 'Muscle Gain', icon: '💪' },
        { id: 'athletic', name: 'Athletic Performance', icon: '🏃' },
        { id: 'wellness', name: 'General Wellness', icon: '🧘' },
        { id: 'bodybuilding', name: 'Bodybuilding', icon: '🏋️' },
        { id: 'endurance', name: 'Endurance', icon: '🚴' },
      ]
    },
    {
      title: 'Cuisine Types',
      icon: Pizza,
      interests: [
        { id: 'italian', name: 'Italian', icon: '🍝' },
        { id: 'asian', name: 'Asian', icon: '🍜' },
        { id: 'mexican', name: 'Mexican', icon: '🌮' },
        { id: 'mediterranean', name: 'Mediterranean', icon: '🫒' },
        { id: 'american', name: 'American', icon: '🍔' },
        { id: 'french', name: 'French', icon: '🥐' },
        { id: 'indian', name: 'Indian', icon: '🍛' },
        { id: 'japanese', name: 'Japanese', icon: '🍣' },
      ]
    },
    {
      title: 'Meal Types',
      icon: Coffee,
      interests: [
        { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
        { id: 'lunch', name: 'Lunch', icon: '🥙' },
        { id: 'dinner', name: 'Dinner', icon: '🍽️' },
        { id: 'desserts', name: 'Desserts', icon: '🍰' },
        { id: 'snacks', name: 'Snacks', icon: '🍿' },
        { id: 'beverages', name: 'Beverages', icon: '☕' },
      ]
    },
    {
      title: 'Cooking Level',
      icon: ChefHat,
      interests: [
        { id: 'beginner', name: 'Beginner Friendly', icon: '👶' },
        { id: 'quick-meals', name: 'Quick Meals', icon: '⚡' },
        { id: 'meal-prep', name: 'Meal Prep', icon: '📦' },
        { id: 'advanced', name: 'Advanced Cooking', icon: '👨‍🍳' },
        { id: 'baking', name: 'Baking', icon: '🥖' },
        { id: 'grilling', name: 'Grilling', icon: '🔥' },
      ]
    },
    {
      title: 'Health Focus',
      icon: Heart,
      interests: [
        { id: 'low-calorie', name: 'Low Calorie', icon: '📉' },
        { id: 'high-protein', name: 'High Protein', icon: '🥚' },
        { id: 'low-carb', name: 'Low Carb', icon: '🥬' },
        { id: 'heart-healthy', name: 'Heart Healthy', icon: '❤️' },
        { id: 'immune-boost', name: 'Immune Boosting', icon: '🛡️' },
        { id: 'anti-inflammatory', name: 'Anti-Inflammatory', icon: '🌿' },
      ]
    },
  ]

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleContinue = () => {
    // Save interests to localStorage or context
    localStorage.setItem('userInterests', JSON.stringify(selectedInterests))
    
    // Navigate to suggested creators page or home
    navigate('/onboarding/creators')
  }

  const handleSkip = () => {
    navigate('/onboarding/creators')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Interests</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Select at least 3 to personalize your experience
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
            >
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 pb-24">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp size={20} className="text-primary-600" />
            <span className="font-medium">
              {selectedInterests.length} {selectedInterests.length === 1 ? 'interest' : 'interests'} selected
            </span>
            {selectedInterests.length >= 3 && (
              <span className="ml-2 text-green-600 dark:text-green-400 flex items-center gap-1">
                <Check size={16} />
                Ready to continue
              </span>
            )}
          </div>
        </div>

        {/* Interest Categories */}
        <div className="space-y-8">
          {interestCategories.map((category) => (
            <div key={category.title} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <category.icon size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{category.title}</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.interests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id)
                  return (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-gray-900'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">{interest.icon}</span>
                        <span className={`text-sm font-medium ${
                          isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {interest.name}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={handleContinue}
            disabled={selectedInterests.length < 3}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedInterests.length >= 3
                ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/30'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowRight size={20} />
          </button>
          {selectedInterests.length < 3 && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Select at least {3 - selectedInterests.length} more {3 - selectedInterests.length === 1 ? 'interest' : 'interests'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InterestsPage
