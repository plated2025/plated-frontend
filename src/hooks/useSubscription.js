import { useState, useEffect, useCallback } from 'react'
import { hasAccess, canPerformAction, SUBSCRIPTION_TIERS } from '../utils/subscriptionSystem'

export const useSubscription = () => {
  const [subscriptionTier, setSubscriptionTier] = useState('free')
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null)
  const [isActive, setIsActive] = useState(true)

  // Load subscription data from localStorage
  useEffect(() => {
    const savedTier = localStorage.getItem('subscriptionTier') || 'free'
    const savedExpiry = localStorage.getItem('subscriptionExpiry')
    
    setSubscriptionTier(savedTier)
    if (savedExpiry) {
      const expiryDate = new Date(savedExpiry)
      const now = new Date()
      setIsActive(expiryDate > now)
      setSubscriptionExpiry(expiryDate)
    }
  }, [])

  // Save to localStorage
  const updateSubscription = useCallback((tier, expiryDate = null) => {
    setSubscriptionTier(tier)
    localStorage.setItem('subscriptionTier', tier)
    
    if (expiryDate) {
      setSubscriptionExpiry(expiryDate)
      localStorage.setItem('subscriptionExpiry', expiryDate.toISOString())
    }
    
    setIsActive(true)
  }, [])

  // Cancel subscription
  const cancelSubscription = useCallback(() => {
    setIsActive(false)
    // Keep tier active until expiry
  }, [])

  // Check if user has access to a feature
  const checkAccess = useCallback((featureId) => {
    if (!isActive) return hasAccess('free', featureId)
    return hasAccess(subscriptionTier, featureId)
  }, [subscriptionTier, isActive])

  // Check if user can perform an action
  const checkLimit = useCallback((action, currentCount) => {
    const activeTier = isActive ? subscriptionTier : 'free'
    return canPerformAction(activeTier, action, currentCount)
  }, [subscriptionTier, isActive])

  // Get current tier data
  const getTierData = useCallback(() => {
    const activeTier = isActive ? subscriptionTier : 'free'
    return SUBSCRIPTION_TIERS[activeTier.toUpperCase()] || SUBSCRIPTION_TIERS.FREE
  }, [subscriptionTier, isActive])

  // Check if PRO
  const isPro = subscriptionTier !== 'free' && isActive
  
  // Check if PRO+
  const isProPlus = subscriptionTier === 'pro_plus' && isActive

  // Days until expiry
  const daysUntilExpiry = subscriptionExpiry
    ? Math.ceil((subscriptionExpiry - new Date()) / (1000 * 60 * 60 * 24))
    : null

  return {
    // State
    tier: subscriptionTier,
    isActive,
    isPro,
    isProPlus,
    subscriptionExpiry,
    daysUntilExpiry,
    tierData: getTierData(),
    
    // Methods
    updateSubscription,
    cancelSubscription,
    checkAccess,
    checkLimit,
    getTierData
  }
}
