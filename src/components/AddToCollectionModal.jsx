import { useState } from 'react'
import { X, Plus, Check, Bookmark, Heart, ChefHat, Target, Zap } from 'lucide-react'

function AddToCollectionModal({ isOpen, onClose, recipe, collections = [], onAdd, onCreateNew }) {
  const [selectedCollections, setSelectedCollections] = useState([])
  const [showCreateNew, setShowCreateNew] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')

  if (!isOpen || !recipe) return null

  const defaultCollections = [
    { id: 'favorites', name: 'Favorites', icon: Heart, color: 'from-pink-400 to-purple-500', count: 12 },
    { id: 'try_later', name: 'Try Later', icon: Bookmark, color: 'from-blue-400 to-cyan-500', count: 8 },
    { id: 'quick_meals', name: 'Quick Meals', icon: Zap, color: 'from-yellow-400 to-orange-500', count: 15 },
    { id: 'healthy', name: 'Healthy', icon: Target, color: 'from-green-400 to-emerald-500', count: 10 }
  ]

  const allCollections = [...defaultCollections, ...collections]

  const toggleCollection = (collectionId) => {
    setSelectedCollections(prev => {
      if (prev.includes(collectionId)) {
        return prev.filter(id => id !== collectionId)
      } else {
        return [...prev, collectionId]
      }
    })
  }

  const handleAdd = () => {
    if (selectedCollections.length === 0) {
      alert('Please select at least one collection')
      return
    }

    onAdd({
      recipeId: recipe.id,
      recipeName: recipe.title,
      recipeImage: recipe.image,
      collections: selectedCollections
    })

    onClose()
    setSelectedCollections([])
  }

  const handleCreateNew = () => {
    if (!newCollectionName.trim()) {
      alert('Please enter a collection name')
      return
    }

    onCreateNew({
      name: newCollectionName,
      icon: 'bookmark',
      color: 'from-primary-400 to-purple-500'
    })

    setNewCollectionName('')
    setShowCreateNew(false)
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
              <h2 className="text-xl font-bold mb-1">Add to Collection</h2>
              <p className="text-white/90 text-sm line-clamp-1">{recipe.title}</p>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {!showCreateNew ? (
            <>
              {/* Collections Grid */}
              <div className="space-y-3 mb-4">
                {allCollections.map(collection => {
                  const Icon = collection.icon
                  const isSelected = selectedCollections.includes(collection.id)
                  
                  return (
                    <button
                      key={collection.id}
                      onClick={() => toggleCollection(collection.id)}
                      className={`w-full p-4 rounded-xl transition-all border-2 ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 scale-[0.98]'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${collection.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900 dark:text-white">{collection.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {collection.count} {collection.count === 1 ? 'recipe' : 'recipes'}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Create New Collection Button */}
              <button
                onClick={() => setShowCreateNew(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                <span className="font-semibold">Create New Collection</span>
              </button>
            </>
          ) : (
            <>
              {/* Create New Collection Form */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g., Weeknight Dinners"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 outline-none"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateNew(false)
                    setNewCollectionName('')
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNew}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Create
                </button>
              </div>
            </>
          )}
        </div>

        {!showCreateNew && (
          <div className="p-6 pt-0">
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
                disabled={selectedCollections.length === 0}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                  selectedCollections.length > 0
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <Bookmark size={18} />
                Add to {selectedCollections.length} {selectedCollections.length === 1 ? 'Collection' : 'Collections'}
              </button>
            </div>
          </div>
        )}
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

export default AddToCollectionModal
