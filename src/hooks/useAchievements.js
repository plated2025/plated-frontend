import { useState, useEffect, useCallback } from 'react'
import {
  awardXP,
  calculateLevel,
  getNextLevelXP,
  getLevelProgress,
  getNewAchievements,
  XP_SOURCES
} from '../utils/achievementSystem'

export const useAchievements = () => {
  const [totalXP, setTotalXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [showLevelUpModal, setShowLevelUpModal] = useState(false)
  const [newLevel, setNewLevel] = useState(null)
  const [showAchievementModal, setShowAchievementModal] = useState(false)
  const [newAchievement, setNewAchievement] = useState(null)
  const [userStats, setUserStats] = useState({
    recipesCreated: 0,
    followers: 0,
    totalLikes: 0,
    currentStreak: 0,
    level: 1,
    specialUnlocks: []
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedXP = parseInt(localStorage.getItem('userXP') || '0')
    const savedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]')
    const savedStats = JSON.parse(localStorage.getItem('userStats') || '{}')

    setTotalXP(savedXP)
    setLevel(calculateLevel(savedXP))
    setUnlockedAchievements(savedAchievements)
    setUserStats({
      recipesCreated: savedStats.recipesCreated || 0,
      followers: savedStats.followers || 0,
      totalLikes: savedStats.totalLikes || 0,
      currentStreak: savedStats.currentStreak || 0,
      level: calculateLevel(savedXP),
      specialUnlocks: savedStats.specialUnlocks || []
    })
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('userXP', totalXP.toString())
    localStorage.setItem('achievements', JSON.stringify(unlockedAchievements))
    localStorage.setItem('userStats', JSON.stringify(userStats))
  }, [totalXP, unlockedAchievements, userStats])

  // Award XP and check for level up
  const addXP = useCallback((xpSource) => {
    const xpData = XP_SOURCES[xpSource]
    if (!xpData) return

    const result = awardXP(totalXP, xpData.xp)
    
    setTotalXP(result.newXP)
    setLevel(result.newLevel)

    // Check for level up
    if (result.leveledUp) {
      setNewLevel(result.newLevel)
      setShowLevelUpModal(true)
    }

    // Check for new achievements
    const updatedStats = { ...userStats, level: result.newLevel }
    checkForNewAchievements(updatedStats)

    return result
  }, [totalXP, userStats])

  // Update user stats (e.g., when creating recipe, getting follower, etc.)
  const updateStats = useCallback((statType, value) => {
    const updatedStats = {
      ...userStats,
      [statType]: typeof value === 'function' ? value(userStats[statType]) : value
    }
    
    setUserStats(updatedStats)
    checkForNewAchievements(updatedStats)
  }, [userStats])

  // Increment a stat by 1
  const incrementStat = useCallback((statType) => {
    updateStats(statType, (current) => (current || 0) + 1)
  }, [updateStats])

  // Check for newly unlocked achievements
  const checkForNewAchievements = useCallback((stats) => {
    const newAchievements = getNewAchievements(stats, unlockedAchievements)
    
    if (newAchievements.length > 0) {
      // Show first achievement modal
      const firstAchievement = newAchievements[0]
      setNewAchievement(firstAchievement)
      setShowAchievementModal(true)
      
      // Award XP for achievement
      const result = awardXP(totalXP, firstAchievement.xpReward)
      setTotalXP(result.newXP)
      
      // Add to unlocked achievements
      const updatedUnlocked = [...unlockedAchievements, firstAchievement.id]
      setUnlockedAchievements(updatedUnlocked)

      // Check for level up from achievement XP
      if (result.leveledUp) {
        setNewLevel(result.newLevel)
        // Show level up modal after achievement modal
        setTimeout(() => {
          setShowLevelUpModal(true)
        }, 2000)
      }
    }
  }, [unlockedAchievements, totalXP])

  // Add special unlock (for unique achievements)
  const addSpecialUnlock = useCallback((unlockId) => {
    const updatedStats = {
      ...userStats,
      specialUnlocks: [...(userStats.specialUnlocks || []), unlockId]
    }
    setUserStats(updatedStats)
    checkForNewAchievements(updatedStats)
  }, [userStats, checkForNewAchievements])

  // Close modals
  const closeLevelUpModal = useCallback(() => {
    setShowLevelUpModal(false)
    setNewLevel(null)
  }, [])

  const closeAchievementModal = useCallback(() => {
    setShowAchievementModal(false)
    setNewAchievement(null)
  }, [])

  return {
    // Data
    totalXP,
    level,
    currentLevelXP: getNextLevelXP(level - 1),
    nextLevelXP: getNextLevelXP(level),
    progressPercentage: getLevelProgress(totalXP),
    unlockedAchievements,
    userStats,
    
    // Modals
    showLevelUpModal,
    newLevel,
    showAchievementModal,
    newAchievement,
    
    // Actions
    addXP,
    updateStats,
    incrementStat,
    addSpecialUnlock,
    closeLevelUpModal,
    closeAchievementModal
  }
}
