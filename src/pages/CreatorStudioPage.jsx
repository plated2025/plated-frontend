import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, DollarSign, Eye, Users, Heart, Calendar, Clock, Download, Plus, BarChart3, Video, Image, BookOpen, Zap, Award, Target } from 'lucide-react'
import { useApp } from '../context/AppContext'
import UpgradeToCreatorModal from '../components/UpgradeToCreatorModal'

function CreatorStudioPage() {
  const navigate = useNavigate()
  const { userType } = useApp()
  const [timeRange, setTimeRange] = useState('7d')
  const [activeTab, setActiveTab] = useState('overview')
  
  // Block access for non-creators
  if (userType !== 'creator') {
    return <UpgradeToCreatorModal isOpen={true} onClose={() => navigate(-1)} />
  }

  // Mock creator stats
  const stats = {
    totalViews: 1234567,
    totalLikes: 89234,
    totalFollowers: 45678,
    totalRevenue: 3456.78,
    avgEngagementRate: 8.5,
    contentCount: 156,
    viewsGrowth: 23.5,
    followersGrowth: 15.2
  }

  const recentContent = [
    { id: 1, type: 'reel', title: 'Pasta Carbonara Tutorial', views: 45200, likes: 3400, comments: 892, date: '2 days ago', thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300' },
    { id: 2, type: 'recipe', title: 'Perfect Chocolate Cake', views: 32100, likes: 2100, comments: 456, date: '4 days ago', thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300' },
    { id: 3, type: 'reel', title: 'Quick Breakfast Ideas', views: 28900, likes: 1900, comments: 234, date: '6 days ago', thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' }
  ]

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Creator Studio</h1>
                <p className="text-sm opacity-90">Manage your content & grow your audience</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/create')}
              className="px-4 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-md flex items-center gap-2"
            >
              <Plus size={18} />
              Create
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              <Eye className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{formatNumber(stats.totalViews)}</p>
            <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp size={14} />
              +{stats.viewsGrowth}% this week
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-l-4 border-pink-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Likes</p>
              <Heart className="text-pink-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{formatNumber(stats.totalLikes)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stats.avgEngagementRate}% engagement rate
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
              <Users className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{formatNumber(stats.totalFollowers)}</p>
            <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp size={14} />
              +{stats.followersGrowth}% this week
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
              <DollarSign className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This month
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'content', label: 'Content', icon: BookOpen },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'monetization', label: 'Monetization', icon: DollarSign }
            ].map((tab) => {
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-b-4 border-primary-600 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <TabIcon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Time Range Selector */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Performance Overview</h3>
                  <div className="flex gap-2">
                    {['7d', '30d', '90d', 'all'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          timeRange === range
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {range === 'all' ? 'All Time' : `Last ${range}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Views & Engagement</h4>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 78, 82, 88, 95, 85, 92].map((height, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-primary-600 to-purple-600 rounded-t-lg hover:opacity-80 transition-all cursor-pointer"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Content */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Top Performing Content</h4>
                  <div className="space-y-3">
                    {recentContent.map((content) => (
                      <div
                        key={content.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all cursor-pointer"
                      >
                        <img
                          src={content.thumbnail}
                          alt={content.title}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              content.type === 'reel'
                                ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {content.type === 'reel' ? <Video size={10} className="inline" /> : <Image size={10} className="inline" />} {content.type}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{content.date}</span>
                          </div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{content.title}</h5>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {formatNumber(content.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart size={14} />
                              {formatNumber(content.likes)}
                            </span>
                            <span className="flex items-center gap-1">
                              💬 {content.comments}
                            </span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                          View Analytics
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="text-center py-12">
                <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Content Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Manage all your recipes, reels, and posts</p>
                <button
                  onClick={() => navigate('/create')}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg"
                >
                  Create New Content
                </button>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <BarChart3 size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Deep insights into your audience and performance</p>
                <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {[
                    { icon: Target, label: 'Audience Insights', desc: 'Demographics & behavior' },
                    { icon: TrendingUp, label: 'Growth Trends', desc: 'Track your progress' },
                    { icon: Zap, label: 'Performance', desc: 'Content effectiveness' }
                  ].map((item, idx) => {
                    const ItemIcon = item.icon
                    return (
                      <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <ItemIcon className="mx-auto text-primary-600 mb-3" size={32} />
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'monetization' && (
              <div className="text-center py-12">
                <DollarSign size={64} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Monetization Hub</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Earn money from your content</p>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Ad Revenue</h4>
                    <p className="text-3xl font-bold text-green-600 mb-2">${stats.totalRevenue}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Brand Deals</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Partner with brands</p>
                    <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold">
                      View Opportunities
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/advertising/create')}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all text-left group"
          >
            <Zap className="text-orange-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Promote Content</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Boost your reach with ads</p>
          </button>

          <button
            onClick={() => navigate('/achievements')}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all text-left group"
          >
            <Award className="text-yellow-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Achievements</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">View your badges & level</p>
          </button>

          <button
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all text-left group"
          >
            <Download className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Export Data</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Download your analytics</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatorStudioPage
