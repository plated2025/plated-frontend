import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { mockUsers, cuisineFilters } from '../../data/mockData'

function SuggestedCreatorsPage() {
  const navigate = useNavigate()
  const [selectedCreators, setSelectedCreators] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  const creators = mockUsers.filter(u => u.isCreator)

  const toggleCreator = (creatorId) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    )
  }

  const handleFollowAll = () => {
    setSelectedCreators(creators.map(c => c.id))
  }

  const handleSkip = () => {
    navigate('/onboarding/tutorial')
  }

  const handleContinue = () => {
    navigate('/onboarding/tutorial')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      {/* Skip Button - Top Right */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors hover:bg-white rounded-lg"
      >
        Skip
      </button>

      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow Top Creators</h1>
          <p className="text-gray-600">Discover amazing recipes from talented chefs</p>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 pb-2">
          {cuisineFilters.slice(0, 8).map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter.emoji} {filter.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-start items-center mb-6">
          <button onClick={handleFollowAll} className="text-primary-600 hover:text-primary-700 font-medium">
            Follow All
          </button>
        </div>

        {/* Creator Grid */}
        {creators.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">👨‍🍳</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Creators Yet</h3>
            <p className="text-gray-600 mb-6">Creators will appear here once they join the platform</p>
            <button
              onClick={handleSkip}
              className="btn-primary"
            >
              Continue to App
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {creators.map(creator => (
            <div key={creator.id} className="card p-4">
              <div className="flex gap-4">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{creator.name}</h3>
                    {creator.verified && (
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{creator.specialty}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{creator.bio}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs text-gray-500">
                      <strong className="text-gray-900">{(creator.followers / 1000).toFixed(0)}K</strong> followers
                    </span>
                    <span className="text-xs text-gray-500">
                      <strong className="text-gray-900">{creator.recipes}</strong> recipes
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleCreator(creator.id)}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    selectedCreators.includes(creator.id)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {selectedCreators.includes(creator.id) ? (
                    <Check size={20} />
                  ) : (
                    <span className="text-xl">+</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedCreators.length === 0}
          className="btn-primary w-full"
        >
          Continue ({selectedCreators.length} selected)
        </button>
      </div>
    </div>
  )
}

export default SuggestedCreatorsPage
