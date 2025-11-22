import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, PlusSquare, User, Film, Calendar } from 'lucide-react'
import AccountSwitchModal from '../AccountSwitchModal'
import { useApp } from '../../context/AppContext'

function BottomNav() {
  const { unreadMessages, userType } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [showSwitchModal, setShowSwitchModal] = useState(false)
  const longPressTimer = useRef(null)
  const longPressTriggered = useRef(false)
  
  const isCreator = userType === 'creator'

  const handleProfileLongPress = () => {
    longPressTriggered.current = true
    setShowSwitchModal(true)
  }

  const handleTouchStart = (path) => {
    if (path === '/profile') {
      longPressTriggered.current = false
      longPressTimer.current = setTimeout(() => {
        handleProfileLongPress()
      }, 500) // 500ms long press
    }
  }

  const handleTouchEnd = (path) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    // Only navigate if it wasn't a long press
    if (path === '/profile' && !longPressTriggered.current) {
      navigate(path)
    }
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/planner', icon: Calendar, label: 'Planner' },
    { path: '/profile', icon: User, label: 'Profile' }
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-nav shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-around items-center h-16 relative">
          {/* Show all nav items for regular users, split for creators */}
          {!isCreator ? (
            // Regular users: 4 items evenly spaced
            navItems.map(({ path, icon: Icon, label }) => (
              <button
                key={path}
                onClick={() => path !== '/profile' && navigate(path)}
                onTouchStart={() => handleTouchStart(path)}
                onTouchEnd={() => handleTouchEnd(path)}
                onMouseDown={() => path === '/profile' && handleTouchStart(path)}
                onMouseUp={() => path === '/profile' && handleTouchEnd(path)}
                onMouseLeave={() => {
                  if (longPressTimer.current) {
                    clearTimeout(longPressTimer.current)
                  }
                }}
                className={`flex flex-col items-center gap-1 ${
                  location.pathname === path ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs">{label}</span>
              </button>
            ))
          ) : (
            // Creators: First 2 items, Create button, Last 2 items
            <>
              {navItems.slice(0, 2).map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => path !== '/profile' && navigate(path)}
                  onTouchStart={() => handleTouchStart(path)}
                  onTouchEnd={() => handleTouchEnd(path)}
                  onMouseDown={() => path === '/profile' && handleTouchStart(path)}
                  onMouseUp={() => path === '/profile' && handleTouchEnd(path)}
                  onMouseLeave={() => {
                    if (longPressTimer.current) {
                      clearTimeout(longPressTimer.current)
                    }
                  }}
                  className={`flex flex-col items-center gap-1 ${
                    location.pathname === path ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
              
              {/* Center Create Button - Creators Only */}
              <button
                onClick={() => navigate('/create')}
                className="flex flex-col items-center justify-center gap-1 -mt-6"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  location.pathname === '/create' ? 'bg-primary-600' : 'bg-gradient-to-br from-primary-500 to-primary-600'
                } shadow-lg`}>
                  <PlusSquare size={28} className="text-white" />
                </div>
                <span className="text-xs text-gray-600 mt-0.5">Create</span>
              </button>

              {navItems.slice(2).map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => path !== '/profile' && navigate(path)}
                  onTouchStart={() => handleTouchStart(path)}
                  onTouchEnd={() => handleTouchEnd(path)}
                  onMouseDown={() => path === '/profile' && handleTouchStart(path)}
                  onMouseUp={() => path === '/profile' && handleTouchEnd(path)}
                  onMouseLeave={() => {
                    if (longPressTimer.current) {
                      clearTimeout(longPressTimer.current)
                    }
                  }}
                  className={`flex flex-col items-center gap-1 ${
                    location.pathname === path ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Account Switch Modal */}
      <AccountSwitchModal 
        isOpen={showSwitchModal} 
        onClose={() => setShowSwitchModal(false)} 
      />
    </nav>
  )
}

export default BottomNav
