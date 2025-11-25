import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, UserPlus, Bookmark, Clock, ArrowLeft, Video, Share2, Star, ChefHat, CheckCheck, Settings, Trash2, X, AlertCircle } from 'lucide-react'
import { notificationAPI } from '../services/api'

function NotificationsPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  // Load notifications from backend
  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    setIsLoading(true)
    try {
      const response = await notificationAPI.getNotifications()
      setNotifications(response.data || [])
    } catch (error) {
      console.error('Error loading notifications:', error)
      setNotifications([])
    } finally {
      setIsLoading(false)
    }
  }
  
  const filters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'likes', label: 'Likes', icon: Heart },
    { id: 'comments', label: 'Comments', icon: MessageCircle },
    { id: 'follows', label: 'Follows', icon: UserPlus },
    { id: 'mentions', label: 'Mentions', icon: AlertCircle },
    { id: 'other', label: 'Other', icon: Clock }
  ]
  
  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={20} className="text-red-500 fill-red-500" />
      case 'comment':
        return <MessageCircle size={20} className="text-blue-500" />
      case 'follow':
        return <UserPlus size={20} className="text-green-500" />
      case 'save':
        return <Bookmark size={20} className="text-purple-500" />
      case 'mention':
        return <AlertCircle size={20} className="text-orange-500" />
      case 'cooking_session':
        return <Video size={20} className="text-pink-500" />
      case 'share':
        return <Share2 size={20} className="text-cyan-500" />
      case 'rating':
        return <Star size={20} className="text-yellow-500 fill-yellow-500" />
      case 'collection':
        return <ChefHat size={20} className="text-indigo-500" />
      default:
        return <Clock size={20} className="text-gray-500" />
    }
  }
  
  const getFilteredNotifications = () => {
    if (activeFilter === 'all') return notifications
    if (activeFilter === 'likes') return notifications.filter(n => n.type === 'like')
    if (activeFilter === 'comments') return notifications.filter(n => n.type === 'comment')
    if (activeFilter === 'follows') return notifications.filter(n => n.type === 'follow')
    if (activeFilter === 'mentions') return notifications.filter(n => n.type === 'mention')
    return notifications.filter(n => !['like', 'comment', 'follow', 'mention'].includes(n.type))
  }
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    alert('All notifications marked as read')
  }
  
  const deleteNotification = (id, e) => {
    e.stopPropagation()
    setNotifications(notifications.filter(n => n.id !== id))
  }
  
  const groupNotificationsByDate = (notifs) => {
    const today = []
    const thisWeek = []
    const earlier = []
    
    notifs.forEach(notif => {
      if (notif.timestamp.includes('m ago') || notif.timestamp.includes('h ago')) {
        today.push(notif)
      } else if (notif.timestamp.includes('d ago') && parseInt(notif.timestamp) <= 7) {
        thisWeek.push(notif)
      } else {
        earlier.push(notif)
      }
    })
    
    return { today, thisWeek, earlier }
  }
  
  const filteredNotifications = getFilteredNotifications()
  const groupedNotifications = groupNotificationsByDate(filteredNotifications)

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)
    if (notification.recipe) {
      navigate(`/recipe/${notification.recipe.id}`)
    } else if (notification.type === 'follow') {
      navigate(`/profile/${notification.user.id}`)
    } else if (notification.type === 'cooking_session') {
      navigate(`/chat/${notification.user.id}`)
    }
  }

  return (
    <div className="min-h-screen pb-safe">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-10 pt-safe">
        <div className="px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between mb-2.5 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-xs text-gray-500">{unreadCount} unread</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-primary-600"
                  title="Mark all as read"
                >
                  <CheckCheck size={20} />
                </button>
              )}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Notification settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {filters.map(filter => {
              const Icon = filter.icon
              const count = filter.id === 'all' 
                ? notifications.length 
                : filter.id === 'likes'
                ? notifications.filter(n => n.type === 'like').length
                : filter.id === 'comments'
                ? notifications.filter(n => n.type === 'comment').length
                : filter.id === 'follows'
                ? notifications.filter(n => n.type === 'follow').length
                : filter.id === 'mentions'
                ? notifications.filter(n => n.type === 'mention').length
                : notifications.filter(n => !['like', 'comment', 'follow', 'mention'].includes(n.type)).length
              
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                    activeFilter === filter.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {filter.label}
                  {count > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                      activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </header>
      
      {/* Settings Dropdown */}
      {showSettings && (
        <div className="absolute top-16 right-4 w-64 glass-dropdown py-2 z-20 animate-scale-in">
          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm">
            Push Notifications
          </button>
          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm">
            Email Notifications
          </button>
          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm">
            Pause All Notifications
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm text-red-600">
            Clear All Notifications
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div>
        {/* Today */}
        {groupedNotifications.today.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-gray-100">
              <h3 className="text-xs font-semibold text-gray-600 uppercase">Today</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {groupedNotifications.today.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`relative w-full px-4 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer group ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                  {/* User Avatar */}
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-start gap-2 mb-1">
                      <p className="text-sm flex-1">
                        <span className="font-semibold text-gray-900">{notification.user.name}</span>{' '}
                        <span className="text-gray-700">{notification.content}</span>
                      </p>
                      {getIcon(notification.type)}
                    </div>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>

                  {/* Recipe Thumbnail */}
                  {notification.recipe && (
                    <img
                      src={notification.recipe.image}
                      alt={notification.recipe.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}

                  {/* Follow Button */}
                  {notification.type === 'follow' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        alert('Followed back!')
                      }}
                      className="btn-primary text-sm px-4 py-1.5 flex-shrink-0"
                    >
                      Follow
                    </button>
                  )}
                  
                  {/* Cooking Session Button */}
                  {notification.type === 'cooking_session' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/chat/${notification.user.id}`)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg font-semibold flex-shrink-0 transition-colors"
                    >
                      Join
                    </button>
                  )}
                  
                  {/* Delete Button - Always Visible */}
                  <button
                    onClick={(e) => deleteNotification(notification.id, e)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <X size={16} className="text-gray-400 hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* This Week */}
        {groupedNotifications.thisWeek.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-gray-100">
              <h3 className="text-xs font-semibold text-gray-600 uppercase">This Week</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {groupedNotifications.thisWeek.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`relative w-full px-4 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer group ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  {!notification.read && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-start gap-2 mb-1">
                      <p className="text-sm flex-1">
                        <span className="font-semibold text-gray-900">{notification.user.name}</span>{' '}
                        <span className="text-gray-700">{notification.content}</span>
                      </p>
                      {getIcon(notification.type)}
                    </div>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                  {notification.recipe && (
                    <img
                      src={notification.recipe.image}
                      alt={notification.recipe.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  {notification.type === 'follow' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        alert('Followed back!')
                      }}
                      className="btn-primary text-sm px-4 py-1.5 flex-shrink-0"
                    >
                      Follow
                    </button>
                  )}
                  {/* Delete Button - Always Visible */}
                  <button
                    onClick={(e) => deleteNotification(notification.id, e)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <X size={16} className="text-gray-400 hover:text-red-600" />
                  </button>
                  {notification.type === 'cooking_session' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/chat/${notification.user.id}`)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg font-semibold flex-shrink-0 transition-colors"
                    >
                      Join
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Earlier */}
        {groupedNotifications.earlier.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-gray-100">
              <h3 className="text-xs font-semibold text-gray-600 uppercase">Earlier</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {groupedNotifications.earlier.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`relative w-full px-4 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer group ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  {!notification.read && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-start gap-2 mb-1">
                      <p className="text-sm flex-1">
                        <span className="font-semibold text-gray-900">{notification.user.name}</span>{' '}
                        <span className="text-gray-700">{notification.content}</span>
                      </p>
                      {getIcon(notification.type)}
                    </div>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                  {notification.recipe && (
                    <img
                      src={notification.recipe.image}
                      alt={notification.recipe.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  {notification.type === 'follow' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        alert('Followed back!')
                      }}
                      className="btn-primary text-sm px-4 py-1.5 flex-shrink-0"
                    >
                      Follow
                    </button>
                  )}
                  {/* Delete Button - Always Visible */}
                  <button
                    onClick={(e) => deleteNotification(notification.id, e)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete notification"
                  >
                    <X size={16} className="text-gray-400 hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
          <p className="text-gray-600">You're all caught up!</p>
        </div>
      )}
    </div>
  )
}

export default NotificationsPage
