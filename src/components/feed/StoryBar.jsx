import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { mockStories } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

function StoryBar() {
  const navigate = useNavigate()
  const { currentUser } = useApp()

  const handleStoryClick = (userId) => {
    navigate(`/story/${userId}`)
  }

  // Don't render if no stories to show
  if (!mockStories || mockStories.length === 0) {
    return null
  }

  return (
    <div className="glass-card shadow-sm lg:shadow-none px-4 py-4 lg:px-6 lg:py-6">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {/* Add Your Story */}
        <button 
          onClick={() => navigate('/create')}
          className="flex flex-col items-center gap-2 flex-shrink-0"
        >
          <div className="relative">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt="Your story"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center border-2 border-gray-300">
                <span className="text-white text-xl font-bold">
                  {currentUser?.name?.charAt(0).toUpperCase() || currentUser?.username?.charAt(0).toUpperCase() || '?'}
                </span>
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <Plus size={14} className="text-white" />
            </div>
          </div>
          <span className="text-xs text-gray-900 dark:text-white font-medium max-w-[64px] truncate">Your Story</span>
        </button>

        {/* Creator Stories */}
        {mockStories.map(({ id, user, hasNew }) => (
          <button
            key={id}
            onClick={() => handleStoryClick(user.id)}
            className="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <div className={hasNew ? 'story-ring p-[2px]' : 'p-[2px]'}>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
            </div>
            <span className="text-xs text-gray-900 dark:text-white font-medium max-w-[64px] truncate">
              {user.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StoryBar
