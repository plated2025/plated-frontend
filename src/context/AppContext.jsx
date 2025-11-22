import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [hasSelectedUserType, setHasSelectedUserType] = useState(false)
  const [userType, setUserType] = useState(null) // 'creator' or 'regular'
  const [currentUser, setCurrentUser] = useState(null)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState([])
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [loading, setLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const savedTheme = localStorage.getItem('theme')
      
      if (savedTheme) setTheme(savedTheme)
      
      if (token) {
        try {
          // Fetch user from backend
          const response = await authAPI.getMe()
          const user = response.data
          
          setIsAuthenticated(true)
          setCurrentUser(user)
          setUserType(user.userType)
          setHasCompletedOnboarding(user.hasCompletedOnboarding)
          setHasSelectedUserType(user.hasSelectedUserType)
        } catch (error) {
          console.error('Auth check failed:', error)
          // Clear invalid token
          localStorage.removeItem('token')
          setIsAuthenticated(false)
        }
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = (user, skipOnboarding = false) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', JSON.stringify(user))
    
    // For new signups, ensure onboarding starts fresh
    if (!skipOnboarding) {
      setHasCompletedOnboarding(false)
      localStorage.removeItem('hasCompletedOnboarding')
    }
  }

  const logout = () => {
    authAPI.logout()
    setIsAuthenticated(false)
    setCurrentUser(null)
    setHasCompletedOnboarding(false)
    setHasSelectedUserType(false)
    setUserType(null)
    localStorage.clear() // Clear all localStorage data
  }

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true)
    localStorage.setItem('hasCompletedOnboarding', 'true')
  }

  const updateUserType = (type) => {
    setUserType(type)
    setHasSelectedUserType(true)
    localStorage.setItem('userType', type)
    localStorage.setItem('hasSelectedUserType', 'true')
    
    // Also update currentUser object
    if (currentUser) {
      const updatedUser = { ...currentUser, userType: type }
      setCurrentUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    }
  }

  const updateUser = (updates) => {
    const updatedUser = { ...currentUser, ...updates }
    setCurrentUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev])
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const value = {
    isAuthenticated,
    hasCompletedOnboarding,
    hasSelectedUserType,
    userType,
    currentUser,
    theme,
    notifications,
    unreadMessages,
    loading,
    login,
    logout,
    completeOnboarding,
    updateUserType,
    updateUser,
    toggleTheme,
    addNotification,
    clearNotifications,
    setUnreadMessages
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
