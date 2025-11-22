import { useState } from 'react'
import { X, Search, ChefHat, Clock, Users, Star } from 'lucide-react'
import { mockRecipes } from '../data/mockData'

function RecipeShareModal({ isOpen, onClose, onShare }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  if (!isOpen) return null

  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleShare = () => {
    if (selectedRecipe) {
      onShare(selectedRecipe)
      setSelectedRecipe(null)
      setSearchQuery('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <ChefHat size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Share Recipe</h2>
              <p className="text-white/90 text-sm">Select a recipe to share with your friend</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your recipes..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Recipes List */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-1 gap-3">
            {filteredRecipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                  selectedRecipe?.id === recipe.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-600 shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {recipe.cookTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {recipe.servings} servings
                    </span>
                    {recipe.rating && (
                      <span className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        {recipe.rating}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <ChefHat size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-600 dark:text-gray-400">No recipes found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              disabled={!selectedRecipe}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Share Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeShareModal
