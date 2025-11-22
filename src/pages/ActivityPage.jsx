import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, MessageCircle, Image, Calendar, TrendingUp, MoreVertical } from 'lucide-react'
import { mockRecipes } from '../data/mockData'

function ActivityPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('likes') // likes, comments, reviews
  const [activeSidebar, setActiveSidebar] = useState('interactions')
  const [sortOrder, setSortOrder] = useState('newest') // newest, oldest

  // Mock liked posts (using mockRecipes)
  const likedPosts = mockRecipes.slice(0, 12)
  const commentedPosts = mockRecipes.slice(2, 10)
  const reviewedPosts = mockRecipes.slice(5, 13)

  const sidebarItems = [
    {
      id: 'interactions',
      icon: Heart,
      title: 'Interactions',
      description: 'Review and delete likes, comments and your other interactions.'
    },
    {
      id: 'photos',
      icon: Image,
      title: 'Photos and videos',
      description: "View, archive or delete photos and videos you've shared."
    },
    {
      id: 'history',
      icon: Calendar,
      title: 'Account history',
      description: "Review changes you've made to your account since you created it."
    },
    {
      id: 'ads',
      icon: TrendingUp,
      title: 'Ad activity',
      description: "See which ads you've interacted with recently."
    }
  ]

  const getCurrentPosts = () => {
    switch (activeTab) {
      case 'likes':
        return likedPosts
      case 'comments':
        return commentedPosts
      case 'reviews':
        return reviewedPosts
      default:
        return likedPosts
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Your activity</h1>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-80 border-r border-gray-200 bg-white p-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSidebar(item.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-lg text-left transition-colors ${
                activeSidebar === item.id
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <item.icon size={24} className="flex-shrink-0 mt-1 text-gray-700" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-white lg:bg-gray-50">
          {/* Only show content when Interactions is selected */}
          {activeSidebar === 'interactions' ? (
            <>
              {/* Tabs */}
              <div className="flex items-center gap-4 lg:gap-8 px-4 lg:px-8 py-3 lg:py-4 border-b border-gray-200 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTab('likes')}
                  className={`flex items-center gap-2 pb-2 lg:pb-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'likes'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Heart size={16} className="flex-shrink-0" />
                  <span className="font-medium text-xs lg:text-sm">LIKES</span>
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`flex items-center gap-2 pb-2 lg:pb-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'comments'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <MessageCircle size={16} className="flex-shrink-0" />
                  <span className="font-medium text-xs lg:text-sm">COMMENTS</span>
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex items-center gap-2 pb-2 lg:pb-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <span className="font-medium text-xs lg:text-sm">REVIEWS</span>
                </button>
              </div>

              {/* Sort & Filter Bar */}
              <div className="flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4 border-b border-gray-200">
                <div className="flex items-center gap-3 lg:gap-4">
                  <button
                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                    className="text-xs lg:text-sm text-gray-600 hover:text-gray-900"
                  >
                    {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                    <span className="hidden sm:inline"> to {sortOrder === 'newest' ? 'oldest' : 'newest'}</span>
                  </button>
                  <button className="text-xs lg:text-sm text-gray-600 hover:text-gray-900">
                    Sort & filter
                  </button>
                </div>
                <button className="text-primary-600 text-xs lg:text-sm font-semibold hover:text-primary-700">
                  Select
                </button>
              </div>

              {/* Grid of Posts */}
              <div className="p-2 lg:p-8 pb-20 lg:pb-8">
                <div className="grid grid-cols-3 gap-0.5 lg:gap-1">
                  {getCurrentPosts().map((post) => (
                    <div
                      key={post.id}
                      onClick={() => navigate(`/recipe/${post.id}`)}
                      className="relative aspect-square cursor-pointer group overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Remove from activity
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/90 rounded-full shadow-lg"
                        >
                          <MoreVertical size={20} className="text-gray-700" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Coming Soon for other sections */
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {sidebarItems.find(item => item.id === activeSidebar)?.title}
                </h2>
                <p className="text-gray-600">Coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivityPage
