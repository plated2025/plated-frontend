import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, Clock, X, Film, Play, Eye, Users, Flame } from 'lucide-react'
import { mockRecipes, cuisineFilters } from '../data/mockData'
import DesktopSidebar from '../components/layout/DesktopSidebar'

function ExplorePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState(['all'])
  const [searchResults, setSearchResults] = useState(mockRecipes)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [difficulty, setDifficulty] = useState('all')
  const [cookTime, setCookTime] = useState('all')
  const [displayCount, setDisplayCount] = useState(20)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Live cooking sessions
  const liveSessions = [
    { 
      id: 1, 
      chef: 'Gordon Ramsay', 
      username: '@gordonramsay',
      cooking: 'Perfect Steak Masterclass', 
      viewers: 2341,
      avatar: 'https://i.pravatar.cc/150?img=1',
      thumbnail: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=500',
      duration: '45 min'
    },
    { 
      id: 2, 
      chef: 'Jamie Oliver', 
      username: '@jamieoliver',
      cooking: 'Quick Italian Pasta', 
      viewers: 1876,
      avatar: 'https://i.pravatar.cc/150?img=2',
      thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
      duration: '30 min'
    },
    { 
      id: 3, 
      chef: 'Yuki Tanaka', 
      username: '@yukicooks',
      cooking: 'Traditional Sushi Art', 
      viewers: 1523,
      avatar: 'https://i.pravatar.cc/150?img=3',
      thumbnail: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500',
      duration: '60 min'
    },
    { 
      id: 4, 
      chef: 'Maria Garcia', 
      username: '@mariaskitchen',
      cooking: 'Authentic Mexican Tacos', 
      viewers: 1289,
      avatar: 'https://i.pravatar.cc/150?img=4',
      thumbnail: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
      duration: '25 min'
    }
  ]

  const toggleFilter = (filterId) => {
    if (filterId === 'all') {
      setActiveFilters(['all'])
      // Reset to all recipes when 'all' is selected
      if (searchQuery.trim()) {
        handleSearch(searchQuery)
      } else {
        setSearchResults(mockRecipes)
      }
    } else {
      setActiveFilters(prev => {
        const newFilters = prev.filter(f => f !== 'all')
        if (prev.includes(filterId)) {
          const filtered = newFilters.filter(f => f !== filterId)
          return filtered.length === 0 ? ['all'] : filtered
        } else {
          return [...newFilters, filterId]
        }
      })
      // Apply filter
      applyFilters(filterId, searchQuery)
    }
  }

  const applyFilters = (filterId, query = '') => {
    let filtered = mockRecipes

    // Filter by cuisine
    if (filterId && filterId !== 'all') {
      filtered = filtered.filter(recipe => {
        const cuisineLower = recipe.cuisine?.toLowerCase() || ''
        const categoryLower = recipe.category?.toLowerCase() || ''
        const tagsLower = recipe.tags?.map(t => t.toLowerCase()).join(' ') || ''
        const filterLower = filterId.toLowerCase()
        
        // Check if recipe matches the filter
        return cuisineLower.includes(filterLower) || 
               categoryLower.includes(filterLower) ||
               tagsLower.includes(filterLower) ||
               (filterId === 'asian' && (cuisineLower.includes('japanese') || cuisineLower.includes('chinese') || cuisineLower.includes('thai'))) ||
               (filterId === 'quick' && recipe.cookTime && recipe.cookTime.includes('min') && parseInt(recipe.cookTime) <= 30) ||
               (filterId === 'healthy' && (tagsLower.includes('healthy') || tagsLower.includes('vegan') || tagsLower.includes('salad'))) ||
               (filterId === 'dessert' && (categoryLower.includes('dessert') || tagsLower.includes('dessert') || tagsLower.includes('sweet')))
      })
    }

    // Then apply search query if exists
    if (query.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase())
      )
    }

    setSearchResults(filtered)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    
    // Get currently active filter (not 'all')
    const activeFilter = activeFilters.find(f => f !== 'all')
    
    if (activeFilter) {
      // Apply both filter and search
      applyFilters(activeFilter, query)
    } else {
      // Just search
      if (query.trim()) {
        const filtered = mockRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(query.toLowerCase()) ||
          recipe.description.toLowerCase().includes(query.toLowerCase())
        )
        setSearchResults(filtered)
      } else {
        setSearchResults(mockRecipes)
      }
    }
  }

  return (
    <div className="lg:flex min-h-screen pb-safe">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="w-full lg:flex-1 lg:ml-64 pb-20 lg:pb-0">
        {/* Header with Search */}
        <header className="glass-nav sticky top-0 z-40 pt-safe">
        <div className="px-4 py-2.5 sm:py-3">
          {/* Logo */}
          <div className="flex justify-center mb-2.5 sm:mb-3 lg:hidden">
            <img src="/plated-logo.png" alt="Plated" className="h-8 sm:h-10" />
          </div>
          
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search recipes, chefs, cuisines..."
              className="glass-input w-full pl-10 pr-12 py-2.5"
            />
            <button 
              onClick={() => setShowFilterModal(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="glass-card px-4 py-3 mb-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {cuisineFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeFilters.includes(filter.id)
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'glass-btn hover:scale-105'
              }`}
            >
              <span className="text-base">{filter.emoji}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reels Section */}
      <div className="glass-card px-4 py-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Film size={20} className="text-primary-600" />
            Food Reels
          </h2>
          <button
            onClick={() => navigate('/reels')}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            View All
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {mockRecipes.slice(0, 6).map((recipe, index) => (
            <button
              key={recipe.id}
              onClick={() => navigate('/reels')}
              className="relative flex-shrink-0 w-32 h-48 rounded-xl overflow-hidden group"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Play Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <Play size={24} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
              
              {/* Reel Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="text-xs font-medium line-clamp-2 mb-1">{recipe.title}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {Math.floor(recipe.likes / 1000)}K
                  </span>
                </div>
              </div>
              
              {/* Reels Badge */}
              <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                <Film size={12} className="text-white" />
                <span className="text-xs text-white font-medium">Reel</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Cooking Section */}
      <div className="glass-card px-4 py-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Flame size={20} className="text-red-500 animate-pulse" />
            Live Cooking Now
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">• {liveSessions.reduce((sum, s) => sum + s.viewers, 0).toLocaleString()} watching</span>
          </h2>
          <button
            onClick={() => navigate('/live')}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {liveSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => navigate('/live')}
              className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              {/* Thumbnail */}
              <div className="aspect-video relative">
                <img
                  src={session.thumbnail}
                  alt={session.cooking}
                  className="w-full h-full object-cover"
                />
                {/* Live Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
                {/* Viewer Count */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <Eye size={12} />
                  {session.viewers.toLocaleString()}
                </div>
                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <Clock size={12} className="inline mr-1" />
                  {session.duration}
                </div>
              </div>
              
              {/* Creator Info */}
              <div className="p-3 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={session.avatar}
                    alt={session.chef}
                    className="w-8 h-8 rounded-full border-2 border-red-500"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {session.chef}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session.username}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-900 dark:text-white font-medium line-clamp-2">
                  {session.cooking}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid - Optimized Masonry Style */}
      <main className="p-3 lg:p-6">
        <div className="max-w-7xl mx-auto">
        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 lg:gap-3 space-y-2 lg:space-y-3">
            {searchResults.slice(0, displayCount).map((recipe, index) => (
              <div
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="cursor-pointer group break-inside-avoid mb-2 lg:mb-3"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Always visible info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={recipe.creator.avatar}
                        alt={recipe.creator.name}
                        className="w-6 h-6 rounded-full border border-white"
                      />
                      <span className="text-xs font-medium truncate">{recipe.creator.name}</span>
                    </div>
                    <h3 className="text-sm font-bold mb-1 line-clamp-2">{recipe.title}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {recipe.cookTime}
                      </span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        ❤️ {(recipe.likes / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover overlay for additional info */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white bg-primary-600 px-2 py-1 rounded-full">
                        {recipe.category}
                      </span>
                      {recipe.verified && (
                        <span className="text-xs text-white">✓ Verified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {searchResults.length > displayCount && (
          <div className="text-center mt-6">
            <button 
              onClick={() => {
                setIsLoadingMore(true)
                setTimeout(() => {
                  setDisplayCount(prev => prev + 20)
                  setIsLoadingMore(false)
                }, 500)
              }}
              disabled={isLoadingMore}
              className="glass-btn px-6 py-3"
            >
              {isLoadingMore ? 'Loading...' : 'Load More Recipes'}
            </button>
          </div>
        )}
        </div>
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-3xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Options */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Sort By */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { value: 'recent', label: 'Most Recent' },
                    { value: 'popular', label: 'Most Popular' },
                    { value: 'trending', label: 'Trending' },
                    { value: 'saved', label: 'Most Saved' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Difficulty</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Levels' },
                    { value: 'easy', label: 'Easy' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'hard', label: 'Hard' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setDifficulty(option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        difficulty === option.value
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cook Time */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Cook Time</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Any Time' },
                    { value: 'quick', label: 'Under 30 min' },
                    { value: 'medium', label: '30-60 min' },
                    { value: 'long', label: 'Over 1 hour' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setCookTime(option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        cookTime === option.value
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  // Apply filters logic here
                  setShowFilterModal(false)
                }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default ExplorePage
