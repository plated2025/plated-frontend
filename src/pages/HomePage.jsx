import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, MessageCircle, Sparkles } from 'lucide-react'
import StoryBar from '../components/feed/StoryBar'
import PostCard from '../components/feed/PostCard'
import DesktopSidebar from '../components/layout/DesktopSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import QuickActionsBar from '../components/home/QuickActionsBar'
import TrendingSection from '../components/home/TrendingSection'
import AchievementStreak from '../components/home/AchievementStreak'
import SmartFeedFilter from '../components/home/SmartFeedFilter'
import SeasonalSuggestions from '../components/home/SeasonalSuggestions'
import { useApp } from '../context/AppContext'
import { recipeAPI } from '../services/api'

function HomePage() {
  const navigate = useNavigate()
  const { notifications, unreadMessages } = useApp()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState([])
  const [showAIFeed, setShowAIFeed] = useState(true)

  // Load recipes from API
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setIsLoading(true)
    try {
      const response = await recipeAPI.getRecipes({ limit: 20 })
      setPosts(response.data || [])
    } catch (error) {
      console.error('Error loading posts:', error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    loadPosts()
  }

  const handleFilterChange = (filters) => {
    setActiveFilters(filters)
    // In production, this would fetch filtered posts from API
  }

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen pb-safe">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Main Content */}
      <div className="lg:ml-64 xl:mr-80">
        {/* Mobile Top Bar */}
        <header className="lg:hidden glass-nav sticky top-0 z-40 pt-safe">
          <div className="flex items-center justify-between px-4 py-2.5 sm:py-3">
            {/* Logo */}
            <img src="/plated-logo.png" alt="Plated" className="h-8 sm:h-10" />
            
            <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/notifications')}
              className="relative text-gray-700 hover:text-gray-900"
            >
              <Bell size={24} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="relative text-gray-700 hover:text-gray-900"
            >
              <MessageCircle size={24} />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

        {/* Mobile Stories */}
        <div className="lg:hidden">
          <StoryBar />
        </div>

        {/* Desktop Stories */}
        <div className="hidden lg:block">
          <div className="max-w-[680px] xl:max-w-[780px] mx-auto pt-6">
            <div className="glass-card overflow-hidden">
              <StoryBar />
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="lg:max-w-[680px] xl:max-w-[780px] lg:mx-auto lg:mt-4">
          {/* Quick Actions */}
          <div className="lg:rounded-lg lg:overflow-hidden glass-card">
            <QuickActionsBar />
          </div>

          {/* Achievement Streak */}
          <div className="lg:mt-4 lg:rounded-lg lg:overflow-hidden glass-card">
            <AchievementStreak />
          </div>

          {/* Trending Section */}
          <div className="lg:mt-4 lg:rounded-lg lg:overflow-hidden glass-card">
            <TrendingSection />
          </div>

          {/* Seasonal Suggestions */}
          <div className="lg:mt-4 lg:rounded-lg lg:overflow-hidden glass-card">
            <SeasonalSuggestions />
          </div>

          {/* Smart Feed Filter */}
          <div className="lg:mt-4 lg:rounded-lg lg:overflow-hidden glass-card">
            <SmartFeedFilter onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Feed */}
        <main className="pb-20 lg:pb-8 min-h-screen lg:bg-transparent">
          <div className="lg:max-w-[680px] xl:max-w-[780px] lg:mx-auto lg:pt-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : posts.length > 0 ? (
              <>
                <div className="glass-card lg:overflow-hidden">
                  {posts.map(recipe => (
                    <PostCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
                {/* Pull to Refresh Text */}
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">You're all caught up! 🎉</p>
                  <button
                    onClick={handleRefresh}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
                  >
                    Refresh Feed
                  </button>
                </div>
              </>
            ) : (
              <div className="glass-card p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                  <Sparkles size={48} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Your Feed is Ready!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Start exploring delicious recipes or create your own. Follow creators to see their content here.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate('/explore')}
                    className="btn-primary"
                  >
                    Explore Recipes
                  </button>
                  <button
                    onClick={() => navigate('/create')}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                  >
                    Create Recipe
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  )
}

export default HomePage
