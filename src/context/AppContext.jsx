import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, userAPI } from '../services/api'

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
      const savedUser = localStorage.getItem('currentUser')
      const savedOnboardingComplete = localStorage.getItem('hasCompletedOnboarding')
      const savedUserType = localStorage.getItem('userType')
      const savedUserTypeSelected = localStorage.getItem('hasSelectedUserType')
      
      if (savedTheme) setTheme(savedTheme)
      
      if (token) {
        // Load saved values immediately (for instant UI)
        if (savedUser) {
          try {
            const user = JSON.parse(savedUser)
            setCurrentUser(user)
            setIsAuthenticated(true)
          } catch (e) {
            console.error('Failed to parse saved user:', e)
          }
        }
        
        if (savedOnboardingComplete === 'true') {
          setHasCompletedOnboarding(true)
        }
        
        if (savedUserType) {
          setUserType(savedUserType)
        }
        
        if (savedUserTypeSelected === 'true') {
          setHasSelectedUserType(true)
        }
        
        // Then verify with backend (silently update if needed)
        try {
          const response = await authAPI.getMe()
          const user = response.data
          
          setIsAuthenticated(true)
          setCurrentUser(user)
          setUserType(user.userType)
          setHasCompletedOnboarding(user.hasCompletedOnboarding)
          setHasSelectedUserType(user.hasSelectedUserType)
          
          // Update localStorage with fresh data
          localStorage.setItem('currentUser', JSON.stringify(user))
          if (user.hasCompletedOnboarding) {
            localStorage.setItem('hasCompletedOnboarding', 'true')
          }
          if (user.userType) {
            localStorage.setItem('userType', user.userType)
            localStorage.setItem('hasSelectedUserType', 'true')
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          // Only clear if it's an auth error (401), not network issues
          if (error?.response?.status === 401 || error?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('currentUser')
            localStorage.removeItem('hasCompletedOnboarding')
            localStorage.removeItem('userType')
            localStorage.removeItem('hasSelectedUserType')
            setIsAuthenticated(false)
            setCurrentUser(null)
            setHasCompletedOnboarding(false)
            setHasSelectedUserType(false)
            setUserType(null)
          }
          // Otherwise keep the cached values and let user continue
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
    
    // For existing users, set onboarding status from user data
    if (skipOnboarding || user.hasCompletedOnboarding) {
      setHasCompletedOnboarding(true)
      localStorage.setItem('hasCompletedOnboarding', 'true')
      
      // Also set user type if available
      if (user.userType) {
        setUserType(user.userType)
        setHasSelectedUserType(true)
        localStorage.setItem('userType', user.userType)
        localStorage.setItem('hasSelectedUserType', 'true')
      }
    } else {
      // For new signups, ensure onboarding starts fresh
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

  const updateUserType = async (type) => {
    setUserType(type)
    setHasSelectedUserType(true)
    localStorage.setItem('userType', type)
    localStorage.setItem('hasSelectedUserType', 'true')
    
    // Also update currentUser object
    if (currentUser) {
      const updatedUser = { ...currentUser, userType: type }
      setCurrentUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      
      // Save to backend
      try {
        await userAPI.updateProfile({ userType: type })
      } catch (error) {
        console.error('Error updating user type:', error)
      }
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
