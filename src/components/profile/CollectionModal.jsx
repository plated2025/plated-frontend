import { useState } from 'react'
import { X, Grid, Video, Heart, Clock, Eye, ChefHat } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function CollectionModal({ collection, onClose }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('recipes')

  if (!collection) return null

  // Mock recipes for the collection
  const collectionRecipes = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', 
      title: 'Creamy Pasta Carbonara',
      cookTime: '25 min',
      likes: 1234,
      views: 12500
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', 
      title: 'Classic Bolognese',
      cookTime: '45 min',
      likes: 892,
      views: 8900
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', 
      title: 'Pesto Penne',
      cookTime: '15 min',
      likes: 2341,
      views: 15600
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400', 
      title: 'Alfredo Fettuccine',
      cookTime: '20 min',
      likes: 1567,
      views: 10200
    },
    { 
      id: 5, 
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400', 
      title: 'Lasagna',
      cookTime: '60 min',
      likes: 3421,
      views: 23400
    },
    { 
      id: 6, 
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400', 
      title: 'Mac & Cheese',
      cookTime: '30 min',
      likes: 1876,
      views: 14500
    },
  ]

  // Mock reels for the collection
  const collectionReels = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      title: 'Quick Pasta Tutorial',
      views: 45200,
      duration: '0:45'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
      title: 'Perfect Steak Tips',
      views: 67800,
      duration: '1:20'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
      title: 'Ramen Secrets',
      views: 89400,
      duration: '2:15'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      title: 'Chocolate Cake',
      views: 52300,
      duration: '1:50'
    }
  ]

  const totalLikes = collectionRecipes.reduce((sum, recipe) => sum + recipe.likes, 0)
  const totalViews = collectionRecipes.reduce((sum, recipe) => sum + recipe.views, 0)

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header with Collection Info */}
        <div className={`bg-gradient-to-r ${collection.gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {collection.coverImage ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-200">
                    <img 
                      src={collection.coverImage} 
                      alt={collection.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-white/20 backdrop-blur-sm"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                    <collection.icon size={36} />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold mb-1">{collection.name}</h2>
                  <p className="text-sm opacity-90">
                    {collectionRecipes.length} recipes • {collectionReels.length} reels
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Heart size={18} />
                <span className="font-semibold">{formatNumber(totalLikes)} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span className="font-semibold">{formatNumber(totalViews)} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'recipes'
                  ? 'border-b-4 border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid size={18} />
              Recipes ({collectionRecipes.length})
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'reels'
                  ? 'border-b-4 border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Video size={18} />
              Reels ({collectionReels.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {activeTab === 'recipes' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {collectionRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => {
                    navigate(`/recipe/${recipe.id}`)
                    onClose()
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white font-bold text-sm mb-2 line-clamp-2">{recipe.title}</p>
                        <div className="flex items-center justify-between text-xs text-white/90">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {recipe.cookTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart size={12} />
                            {formatNumber(recipe.likes)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {collectionReels.map((reel) => (
                <div
                  key={reel.id}
                  onClick={() => {
                    navigate('/reels')
                    onClose()
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400'
                      }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white font-bold text-sm mb-2 line-clamp-2">{reel.title}</p>
                        <div className="flex items-center justify-between text-xs text-white/90">
                          <span className="flex items-center gap-1">
                            <Video size={12} />
                            {reel.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {formatNumber(reel.views)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {reel.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollectionModal
