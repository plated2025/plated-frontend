import { useState } from 'react'
import { Filter, X, Sparkles, Clock, Users, Heart, TrendingUp, Salad } from 'lucide-react'

function SmartFeedFilter({ onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])

  const filterOptions = [
    { id: 'for-you', label: 'For You', icon: Sparkles, color: 'purple' },
    { id: 'quick', label: 'Quick (<30min)', icon: Clock, color: 'orange' },
    { id: 'popular', label: 'Most Popular', icon: TrendingUp, color: 'red' },
    { id: 'healthy', label: 'Healthy', icon: Salad, color: 'green' },
    { id: 'saved', label: 'Saved', icon: Heart, color: 'pink' },
    { id: 'friends', label: 'Friends', icon: Users, color: 'blue' }
  ]

  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      const newFilters = activeFilters.filter(f => f !== filterId)
      setActiveFilters(newFilters)
      onFilterChange(newFilters)
    } else {
      const newFilters = [...activeFilters, filterId]
      setActiveFilters(newFilters)
      onFilterChange(newFilters)
    }
  }

  const clearFilters = () => {
    setActiveFilters([])
    onFilterChange([])
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 lg:top-auto z-30">
      <div className="px-4 py-3">
        {/* Filter Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              activeFilters.length > 0
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Filter size={16} />
            <span className="text-sm">
              {activeFilters.length > 0 ? `${activeFilters.length} Active` : 'Filter Feed'}
            </span>
          </button>

          {activeFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filterOptions.map(filter => {
              const isActive = activeFilters.includes(filter.id)
              const colorClasses = {
                purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
                orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
                red: isActive ? 'bg-red-600 text-white' : 'bg-red-100 dark:bg-red-900/30 text-red-600',
                green: isActive ? 'bg-green-600 text-white' : 'bg-green-100 dark:bg-green-900/30 text-green-600',
                pink: isActive ? 'bg-pink-600 text-white' : 'bg-pink-100 dark:bg-pink-900/30 text-pink-600',
                blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
              }

              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${colorClasses[filter.color]} ${
                    isActive ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  <filter.icon size={14} />
                  {filter.label}
                  {isActive && <X size={14} />}
                </button>
              )
            })}
          </div>
        )}

        {/* Active Filter Tags */}
        {!showFilters && activeFilters.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {activeFilters.map(filterId => {
              const filter = filterOptions.find(f => f.id === filterId)
              return (
                <div
                  key={filterId}
                  className="flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                >
                  <filter.icon size={12} />
                  {filter.label}
                  <button
                    onClick={() => toggleFilter(filterId)}
                    className="hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SmartFeedFilter
