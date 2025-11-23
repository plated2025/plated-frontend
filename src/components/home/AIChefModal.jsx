import { useState } from 'react'
import { X, Plus, Sparkles, ChefHat, Loader2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AIChefModal({ onClose }) {
  const navigate = useNavigate()
  const [ingredients, setIngredients] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const commonIngredients = [
    '🍗 Chicken', '🥩 Beef', '🐟 Fish', '🥚 Eggs', '🍅 Tomatoes',
    '🧅 Onions', '🧄 Garlic', '🥔 Potatoes', '🥕 Carrots', '🌶️ Peppers',
    '🧀 Cheese', '🥛 Milk', '🍚 Rice', '🍝 Pasta', '🥖 Bread'
  ]

  const addIngredient = (ingredient) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient])
      setInputValue('')
    }
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(i => i !== ingredient))
  }

  const generateRecipes = () => {
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient')
      return
    }

    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      setSuggestions([
        { name: 'AI-Generated Fusion Bowl', time: '25min', difficulty: 'Easy' },
        { name: 'Creative Stir-Fry', time: '20min', difficulty: 'Medium' },
        { name: 'Gourmet Comfort Food', time: '35min', difficulty: 'Easy' }
      ])
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="glass-modal rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Chef Assistant</h2>
                <p className="text-sm opacity-90">Tell me what you have, I'll suggest recipes!</p>
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

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Add Ingredient */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              What ingredients do you have?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient(inputValue)}
                placeholder="Type an ingredient..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                onClick={() => addIngredient(inputValue)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Quick Add Suggestions */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Add:</p>
            <div className="flex flex-wrap gap-2">
              {commonIngredients.map((ingredient, idx) => (
                <button
                  key={idx}
                  onClick={() => addIngredient(ingredient)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-900 dark:text-white rounded-full text-sm font-medium transition-colors"
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Ingredients */}
          {ingredients.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Selected Ingredients ({ingredients.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-100 rounded-full font-medium flex items-center gap-2"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <ChefHat size={16} className="text-purple-600" />
                AI Suggested Recipes:
              </p>
              <div className="space-y-2">
                {suggestions.map((recipe, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate('/explore')
                      onClose()
                    }}
                    className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          {recipe.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {recipe.time} • {recipe.difficulty}
                        </p>
                      </div>
                      <ArrowRight className="text-purple-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={generateRecipes}
            disabled={ingredients.length === 0 || isGenerating}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating Magic...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate AI Recipes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChefModal
