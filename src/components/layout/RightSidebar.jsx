import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { mockUsers } from '../../data/mockData'

function RightSidebar() {
  const navigate = useNavigate()
  const { currentUser } = useApp()

  const suggestedUsers = mockUsers.slice(0, 5)

  return (
    <div className="hidden xl:flex flex-col fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto"
    >
      {/* Current User Profile */}
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

      {/* Suggestions */}
      <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-500 text-sm font-semibold">Suggested for you</h2>
            <button className="text-xs font-semibold hover:text-gray-600">See All</button>
          </div>

          <div className="space-y-4">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={() => navigate(`/profile/${user.id}`)}
                />
                <div className="flex-1 min-w-0">
                  <p 
                    className="font-semibold text-sm truncate cursor-pointer hover:text-gray-600"
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    {user.name}
                  </p>
                  <p className="text-gray-500 text-xs truncate">{user.specialty}</p>
                </div>
                <button className="text-primary-600 text-xs font-semibold hover:text-primary-700">
                  Follow
                </button>
              </div>
            ))}
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
