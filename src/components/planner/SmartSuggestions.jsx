import { useState, useEffect } from 'react'
import { Sparkles, TrendingUp, Clock, ChefHat, Heart } from 'lucide-react'
import { recommendationAPI } from '../../services/api'

function SmartSuggestions({ onSelectRecipe }) {
  const [suggestions, setSuggestions] = useState([])
  const [popularRecipes, setPopularRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSuggestions()
  }, [])

  const loadSuggestions = async () => {
    setLoading(true)
    try {
      // Get personalized recommendations from backend
      const aiResponse = await recommendationAPI.getPersonalized(6)
      setSuggestions(aiResponse.data || [])

      // Get trending recipes
      const trendingResponse = await recommendationAPI.getTrending(6)
      setPopularRecipes(trendingResponse.data || [])
    } catch (error) {
      console.error('Error loading suggestions:', error)
      setSuggestions([])
      setPopularRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const generateSmartSuggestions = () => {
    // Backend handles AI analysis based on:
    // - User's dietary preferences
    // - Past liked recipes
    // - Seasonal ingredients
    // - Nutritional balance
    // - Cooking skill level
    
    return suggestions
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 6)
      .map(recipe => ({
        ...recipe,
        aiReason: getAIReason(recipe)
      }))
  }

  const getAIReason = (recipe) => {
    const reasons = [
      `Perfect for your ${recipe.cuisine} preference`,
      `Quick ${recipe.cookTime}min prep time`,
      `${recipe.difficulty} level matches your skills`,
      `High protein, great for energy`,
      `Trending in your area`,
      `Similar to recipes you loved`
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  const getPopularRecipes = () => {
    // Backend handles sorting by likes
    return popularRecipes
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Analyzing your preferences...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* AI Smart Suggestions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-purple-600 dark:text-purple-300" size={24} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Smart Suggestions for You</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          AI-powered recommendations based on your taste and cooking style
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="group cursor-pointer bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="relative h-40">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} className="text-white" />
                  AI Pick
                </div>
                <div className="absolute top-2 right-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-800 dark:text-gray-100 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock size={12} className="text-gray-600 dark:text-gray-200" />
                  {recipe.cookTime}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                  {recipe.title}
                </h4>
                <p className="text-xs text-purple-600 dark:text-purple-300 mb-2 flex items-center gap-1">
                  <ChefHat size={12} className="text-purple-500 dark:text-purple-300" />
                  {recipe.aiReason}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-300">
                  <span className="flex items-center gap-1">
                    <Heart size={12} className="text-pink-500" />
                    {(recipe.likes / 1000).toFixed(1)}K
                  </span>
                  <span className="capitalize">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular/Trending Recipes */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-red-600 dark:text-red-300" size={24} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Trending Recipes</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Most loved recipes by the foodie community right now
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularRecipes.map((recipe, index) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="group cursor-pointer bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
            >
              <div className="relative h-40">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{index + 1} Trending
                </div>
                <div className="absolute top-2 right-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-800 dark:text-gray-100 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock size={12} className="text-gray-600 dark:text-gray-200" />
                  {recipe.cookTime}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                  {recipe.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  by {recipe.creator.name}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-300">
                  <span className="flex items-center gap-1">
                    <Heart size={12} className="fill-red-500 text-red-500" />
                    {(recipe.likes / 1000).toFixed(1)}K likes
                  </span>
                  <span className="capitalize">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SmartSuggestions
