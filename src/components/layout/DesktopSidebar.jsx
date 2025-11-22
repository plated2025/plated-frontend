import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Compass, PlusSquare, Heart, MessageCircle, User, Settings, Menu, Film, Activity, Bookmark, Moon, AlertCircle, Users, LogOut, Calendar } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function DesktopSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser, notifications, unreadMessages, logout, toggleTheme, theme } = useApp()
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const menuRef = useRef(null)

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Film, label: 'Reels', path: '/reels' },
    { icon: MessageCircle, label: 'Messages', path: '/messages', badge: unreadMessages },
    { icon: Heart, label: 'Notifications', path: '/notifications', badge: notifications.filter(n => !n.read).length },
    { icon: PlusSquare, label: 'Create', path: '/create' },
    { icon: Calendar, label: 'Meal Planner', path: '/planner' },
    { icon: User, label: 'Profile', path: '/profile' }
  ]

  const isActive = (path) => location.pathname === path

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMoreMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const moreMenuItems = [
    { icon: Settings, label: 'Settings', action: () => navigate('/settings') },
    { icon: Activity, label: 'Your activity', action: () => navigate('/activity') },
    { icon: Bookmark, label: 'Saved', action: () => navigate('/saved') },
    { icon: Moon, label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`, action: toggleTheme },
    { icon: AlertCircle, label: 'Report a problem', action: () => navigate('/report') }
  ]

  return (
    <div className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-4">
      {/* Logo */}
      <div className="mb-6 px-3 py-6">
        <img src="/plated-logo.png" alt="Plated" className="h-12 w-full object-contain" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors relative ${
              isActive(item.path)
                ? 'font-bold'
                : 'hover:bg-gray-100'
            }`}
          >
            <item.icon size={26} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            <span className="text-base">{item.label}</span>
            {item.badge > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* More Button */}
      <div className="relative border-t border-gray-200 pt-4 mt-4" ref={menuRef}>
        <button
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu size={26} />
          <span className="text-base">More</span>
        </button>

        {/* More Menu Dropdown */}
        {showMoreMenu && (
          <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
            {moreMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action()
                  setShowMoreMenu(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <item.icon size={20} className="text-gray-700" />
                <span className="text-sm text-gray-900">{item.label}</span>
              </button>
            ))}

            {/* Separator */}
            <div className="h-px bg-gray-200 my-2" />

            {/* Switch accounts */}
            <button
              onClick={() => {
                setShowMoreMenu(false)
                // Add switch accounts logic here
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Users size={20} className="text-gray-700" />
              <span className="text-sm text-gray-900">Switch accounts</span>
            </button>

            {/* Separator */}
            <div className="h-px bg-gray-200 my-2" />

            {/* Log out */}
            <button
              onClick={() => {
                handleLogout()
                setShowMoreMenu(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <LogOut size={20} className="text-gray-700" />
              <span className="text-sm text-gray-900">Log out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DesktopSidebar
