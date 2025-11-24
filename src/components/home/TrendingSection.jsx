import { useState, useEffect } from 'react'
import { TrendingUp, Clock, Eye, Heart, Flame, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { recommendationAPI } from '../../services/api'

function TrendingSection() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('now') // 'now', 'today', 'week'
  const [liveCount, setLiveCount] = useState(1247)
  const [trendingNow, setTrendingNow] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 10))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Load trending recipes from API
  useEffect(() => {
    loadTrending()
  }, [activeTab])

  const loadTrending = async () => {
    setIsLoading(true)
    try {
      const timeWindow = activeTab === 'now' ? 1 : activeTab === 'today' ? 1 : 7
      const response = await recommendationAPI.getTrending(5, timeWindow)
      setTrendingNow(response.data || [])
    } catch (error) {
      console.error('Error loading trending:', error)
      setTrendingNow([])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Don't render if no trending data
  if (!isLoading && trendingNow.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Flame size={18} className="text-orange-500" />
            Trending
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              • {liveCount.toLocaleString()} cooking now
            </span>
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'now', label: 'Right Now', icon: Flame },
            { id: 'today', label: 'Today', icon: TrendingUp },
            { id: 'week', label: 'This Week', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon size={14} className="inline mr-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trending Recipes */}
        <div className="space-y-2 mb-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader size={20} className="animate-spin text-primary-600" />
            </div>
          ) : (
            trendingNow.map((recipe, idx) => (
              <button
                key={recipe._id || idx}
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {recipe.title}
                      </p>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                        TRENDING
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <Heart size={12} className="inline" />
                      {recipe.likes?.length || 0} likes
                      {recipe.views && (
                        <>
                          <span>•</span>
                          <Eye size={12} className="inline" />
                          {recipe.views} views
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <TrendingUp size={20} className="text-orange-500 group-hover:scale-125 transition-transform" />
              </button>
            ))
          )}
        </div>

        {/* Live Sessions - Future feature */}
        {/* Uncomment when live sessions API is ready */}
      </div>
    </div>
  )
}

export default TrendingSection
