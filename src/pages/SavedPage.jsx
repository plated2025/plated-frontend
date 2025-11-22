import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Grid, List, Bookmark } from 'lucide-react'
import { mockRecipes } from '../data/mockData'

function SavedPage() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [savedRecipes, setSavedRecipes] = useState(mockRecipes.slice(0, 8))

  const handleRemoveSaved = (recipeId, e) => {
    e.stopPropagation()
    setSavedRecipes(savedRecipes.filter(r => r.id !== recipeId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Saved</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {savedRecipes.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bookmark size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved recipes yet</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Save recipes you want to cook later by tapping the bookmark icon on any post
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Explore Recipes
            </button>
          </div>
        ) : (
          <>
            {/* Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                {savedRecipes.length} {savedRecipes.length === 1 ? 'recipe' : 'recipes'} saved
              </p>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
                  >
                    <div 
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      className="relative aspect-square"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <button
                      onClick={(e) => handleRemoveSaved(recipe.id, e)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-600 hover:bg-white hover:scale-110 transition-all shadow-lg"
                      title="Remove from saved"
                    >
                      <Bookmark size={16} fill="currentColor" />
                    </button>
                    <div 
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      className="p-3"
                    >
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                        {recipe.title}
                      </h3>
                      <p className="text-xs text-gray-600">{recipe.creator.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-3">
                {savedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{recipe.creator.name}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>⏱️ {recipe.cookTime}</span>
                        <span>👥 {recipe.servings} servings</span>
                        <span>❤️ {recipe.likes} likes</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveSaved(recipe.id, e)}
                      className="text-primary-600 hover:text-primary-700 flex-shrink-0"
                      title="Remove from saved"
                    >
                      <Bookmark size={20} fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SavedPage
