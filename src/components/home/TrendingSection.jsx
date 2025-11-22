import { useState, useEffect } from 'react'
import { TrendingUp, Clock, Eye, Heart, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function TrendingSection() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('now') // 'now', 'today', 'week'
  const [liveCount, setLiveCount] = useState(1247)

  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 10))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const trendingNow = [
    { 
      name: 'Air Fryer Magic', 
      count: '12.5K posts', 
      growth: '+245%',
      emoji: '✨',
      tag: 'trending'
    },
    { 
      name: 'Sourdough Starters', 
      count: '8.2K posts', 
      growth: '+189%',
      emoji: '🍞',
      tag: 'hot'
    },
    { 
      name: 'Plant-Based Bowls', 
      count: '6.7K posts', 
      growth: '+156%',
      emoji: '🥗',
      tag: 'rising'
    }
  ]

  const liveNow = [
    { chef: 'Gordon', cooking: 'Perfect Steak', viewers: 2341 },
    { chef: 'Jamie', cooking: 'Italian Pasta', viewers: 1876 },
    { chef: 'Yuki', cooking: 'Sushi Masterclass', viewers: 1523 }
  ]

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

        {/* Trending Topics */}
        <div className="space-y-2 mb-4">
          {trendingNow.map((trend, idx) => (
            <button
              key={idx}
              onClick={() => navigate(`/explore?search=${trend.name}`)}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{trend.emoji}</span>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {trend.name}
                    </p>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      trend.tag === 'trending' ? 'bg-red-500 text-white' :
                      trend.tag === 'hot' ? 'bg-orange-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {trend.tag.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {trend.count} • <span className="text-green-600 dark:text-green-400">{trend.growth}</span>
                  </p>
                </div>
              </div>
              <TrendingUp size={20} className="text-orange-500 group-hover:scale-125 transition-transform" />
            </button>
          ))}
        </div>

        {/* Live Sessions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            🔴 Live Cooking Sessions
          </h4>
          <div className="space-y-2">
            {liveNow.map((session, idx) => (
              <button
                key={idx}
                onClick={() => navigate('/live')}
                className="w-full flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.chef} • {session.cooking}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Eye size={12} />
                      {session.viewers.toLocaleString()} watching
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingSection
