import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { discoveryAPI } from '../../services/api'

function RightSidebar() {
  const navigate = useNavigate()
  const { currentUser, isAuthenticated } = useApp()
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load suggested users from backend
  useEffect(() => {
    loadSuggestedUsers()
  }, [])

  const loadSuggestedUsers = async () => {
    setIsLoading(true)
    try {
      const response = await discoveryAPI.getSuggestedUsers(5)
      setSuggestedUsers(response.data || [])
    } catch (error) {
      console.error('Error loading suggested users:', error)
      setSuggestedUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="hidden xl:flex flex-col fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto"
    >
      {/* Current User Profile or Sign In Prompt */}
      {isAuthenticated ? (
        <div className="flex items-center gap-3 mb-6">
          <img
            src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=0'}
            alt={currentUser?.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{currentUser?.name || 'User'}</p>
            <p className="text-gray-500 text-xs truncate">{currentUser?.specialty || 'Food Enthusiast'}</p>
          </div>
          <button
            onClick={() => navigate('/switch-accounts')}
            className="text-primary-600 text-xs font-semibold hover:text-primary-700"
          >
            Switch
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Join Plated Today!
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            Create recipes, save favorites, and connect with food lovers
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/signup')}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-900 text-xs font-semibold py-2 px-3 rounded-lg border border-gray-300 transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-500 text-sm font-semibold">Suggested for you</h2>
            <button className="text-xs font-semibold hover:text-gray-600">See All</button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              </div>
            ) : suggestedUsers.length > 0 ? (
              suggestedUsers.map((user) => (
                <div key={user._id || user.id} className="flex items-center gap-3">
                  <img
                    src={user.avatar || 'https://i.pravatar.cc/150'}
                    alt={user.name || user.username}
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    onClick={() => navigate(`/profile/${user._id || user.id}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <p 
                      className="font-semibold text-sm truncate cursor-pointer hover:text-gray-600"
                      onClick={() => navigate(`/profile/${user._id || user.id}`)}
                    >
                      {user.name || user.username}
                    </p>
                    <p className="text-gray-500 text-xs truncate">
                      {user.bio || user.specialty || 'Food Enthusiast'}
                    </p>
                  </div>
                  <button className="text-primary-600 text-xs font-semibold hover:text-primary-700">
                    Follow
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs text-center py-4">
                No suggestions yet
              </p>
            )}
          </div>
      </div>

      {/* Footer Links */}
      <div className="mt-auto pt-6 text-xs text-gray-400 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button className="hover:underline">About</button>
            <span>·</span>
            <button className="hover:underline">Help</button>
            <span>·</span>
            <button className="hover:underline">Press</button>
            <span>·</span>
            <button className="hover:underline">API</button>
            <span>·</span>
            <button className="hover:underline">Jobs</button>
            <span>·</span>
            <button className="hover:underline">Privacy</button>
            <span>·</span>
            <button className="hover:underline">Terms</button>
          </div>
          <p className="text-gray-400">© 2025 Plated. All rights reserved.</p>
      </div>
    </div>
  )
}

export default RightSidebar
