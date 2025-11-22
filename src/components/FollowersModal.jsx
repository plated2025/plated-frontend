import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { mockUsers } from '../data/mockData'

function FollowersModal({ isOpen, onClose, type = 'followers', userId }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(type)
  const [following, setFollowing] = useState({})

  if (!isOpen) return null

  // Mock data - in real app, fetch based on userId
  const followers = mockUsers.slice(0, 8)
  const followingList = mockUsers.slice(2, 10)

  const users = activeTab === 'followers' ? followers : followingList

  const toggleFollow = (userId) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  const handleUserClick = (userId) => {
    onClose()
    navigate(`/profile/${userId}`)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('followers')}
              className={`font-semibold pb-2 border-b-2 transition-colors ${
                activeTab === 'followers'
                  ? 'text-gray-900 dark:text-gray-100 border-primary-600'
                  : 'text-gray-500 dark:text-gray-400 border-transparent'
              }`}
            >
              Followers
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`font-semibold pb-2 border-b-2 transition-colors ${
                activeTab === 'following'
                  ? 'text-gray-900 dark:text-gray-100 border-primary-600'
                  : 'text-gray-500 dark:text-gray-400 border-transparent'
              }`}
            >
              Following
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4">
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No {activeTab} yet
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                    onClick={() => handleUserClick(user.id)}
                  />
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => handleUserClick(user.id)}
                  >
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                      {user.verified && (
                        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.username || `@${user.name.toLowerCase().replace(' ', '')}`}
                    </p>
                    {user.specialty && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">{user.specialty}</p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`px-4 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                      following[user.id]
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {following[user.id] ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FollowersModal
