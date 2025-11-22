// Achievement & Leveling System

// XP Sources - How users earn XP
export const XP_SOURCES = {
  RECIPE_CREATED: { xp: 100, name: 'Recipe Created' },
  RECIPE_LIKED: { xp: 5, name: 'Recipe Liked' },
  RECIPE_SHARED: { xp: 15, name: 'Recipe Shared' },
  RECIPE_SAVED: { xp: 10, name: 'Recipe Saved' },
  COMMENT_RECEIVED: { xp: 3, name: 'Comment Received' },
  FOLLOWER_GAINED: { xp: 20, name: 'Follower Gained' },
  REEL_CREATED: { xp: 75, name: 'Reel Created' },
  MEAL_PLAN_CREATED: { xp: 50, name: 'Meal Plan Created' },
  DAILY_LOGIN: { xp: 10, name: 'Daily Login' },
  STREAK_DAY: { xp: 15, name: 'Cooking Streak Day' },
  COOKING_COMPLETED: { xp: 25, name: 'Cooked a Recipe' },
  PRODUCT_SCANNED: { xp: 5, name: 'Product Scanned' },
  AI_RECIPE_GENERATED: { xp: 10, name: 'AI Recipe Generated' }
}

// Level Thresholds - XP needed for each level
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  2000,   // Level 6
  3500,   // Level 7
  5500,   // Level 8
  8000,   // Level 9
  11000,  // Level 10
  15000,  // Level 11
  20000,  // Level 12
  26000,  // Level 13
  33000,  // Level 14
  41000,  // Level 15
  50000,  // Level 16
  60000,  // Level 17
  72000,  // Level 18
  85000,  // Level 19
  100000  // Level 20 (Max)
]

// Calculate current level from total XP
export const calculateLevel = (totalXP) => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

// Get XP needed for next level
export const getNextLevelXP = (currentLevel) => {
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  }
  return LEVEL_THRESHOLDS[currentLevel]
}

// Calculate progress percentage to next level
export const getLevelProgress = (totalXP) => {
  const currentLevel = calculateLevel(totalXP)
  const currentLevelXP = LEVEL_THRESHOLDS[currentLevel - 1]
  const nextLevelXP = getNextLevelXP(currentLevel)
  const progress = totalXP - currentLevelXP
  const needed = nextLevelXP - currentLevelXP
  return Math.min((progress / needed) * 100, 100)
}

// Achievement Definitions
export const ACHIEVEMENTS = {
  // Recipe Achievements
  FIRST_RECIPE: {
    id: 'first_recipe',
    name: 'First Recipe',
    description: 'Create your first recipe',
    icon: '👨‍🍳',
    type: 'recipe',
    requirement: 1,
    xpReward: 50,
    gradient: 'from-blue-400 to-cyan-500'
  },
  RECIPE_MASTER_10: {
    id: 'recipe_master_10',
    name: '10 Recipes',
    description: 'Create 10 recipes',
    icon: '📚',
    type: 'recipe',
    requirement: 10,
    xpReward: 100,
    gradient: 'from-green-400 to-emerald-500'
  },
  RECIPE_MASTER_50: {
    id: 'recipe_master_50',
    name: '50 Recipes',
    description: 'Create 50 recipes',
    icon: '⭐',
    type: 'recipe',
    requirement: 50,
    xpReward: 250,
    gradient: 'from-yellow-400 to-orange-500'
  },
  RECIPE_MASTER_100: {
    id: 'recipe_master_100',
    name: 'Recipe Legend',
    description: 'Create 100 recipes',
    icon: '🏆',
    type: 'recipe',
    requirement: 100,
    xpReward: 500,
    gradient: 'from-purple-400 to-pink-500'
  },

  // Engagement Achievements
  POPULAR_CHEF: {
    id: 'popular_chef',
    name: 'Popular Chef',
    description: 'Get 100 followers',
    icon: '❤️',
    type: 'followers',
    requirement: 100,
    xpReward: 150,
    gradient: 'from-pink-400 to-red-500'
  },
  INFLUENCER: {
    id: 'influencer',
    name: 'Influencer',
    description: 'Get 1000 followers',
    icon: '🌟',
    type: 'followers',
    requirement: 1000,
    xpReward: 500,
    gradient: 'from-yellow-400 to-orange-500'
  },
  LOVED: {
    id: 'loved',
    name: 'Loved',
    description: 'Receive 500 likes total',
    icon: '💖',
    type: 'likes',
    requirement: 500,
    xpReward: 200,
    gradient: 'from-pink-400 to-purple-500'
  },

  // Streak Achievements
  WEEK_WARRIOR: {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Cook for 7 days in a row',
    icon: '🔥',
    type: 'streak',
    requirement: 7,
    xpReward: 100,
    gradient: 'from-orange-400 to-red-500'
  },
  MONTH_MASTER: {
    id: 'month_master',
    name: 'Monthly Master',
    description: 'Cook for 30 days in a row',
    icon: '🎯',
    type: 'streak',
    requirement: 30,
    xpReward: 300,
    gradient: 'from-green-400 to-emerald-500'
  },
  DEDICATION: {
    id: 'dedication',
    name: 'Dedication',
    description: 'Cook for 100 days in a row',
    icon: '👑',
    type: 'streak',
    requirement: 100,
    xpReward: 1000,
    gradient: 'from-purple-400 to-pink-500'
  },

  // Special Achievements
  EARLY_BIRD: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Join during beta',
    icon: '🐦',
    type: 'special',
    requirement: 1,
    xpReward: 100,
    gradient: 'from-blue-400 to-cyan-500'
  },
  TOP_CHEF: {
    id: 'top_chef',
    name: 'Top Chef',
    description: 'Reach level 10',
    icon: '🏆',
    type: 'level',
    requirement: 10,
    xpReward: 250,
    gradient: 'from-yellow-400 to-orange-500'
  },
  EXPLORER: {
    id: 'explorer',
    name: 'Explorer',
    description: 'Try all features',
    icon: '🗺️',
    type: 'special',
    requirement: 1,
    xpReward: 200,
    gradient: 'from-green-400 to-teal-500'
  }
}

// Check if user unlocked an achievement
export const checkAchievement = (achievementId, userStats) => {
  const achievement = ACHIEVEMENTS[achievementId]
  if (!achievement) return false

  switch (achievement.type) {
    case 'recipe':
      return userStats.recipesCreated >= achievement.requirement
    case 'followers':
      return userStats.followers >= achievement.requirement
    case 'likes':
      return userStats.totalLikes >= achievement.requirement
    case 'streak':
      return userStats.currentStreak >= achievement.requirement
    case 'level':
      return userStats.level >= achievement.requirement
    case 'special':
      return userStats.specialUnlocks?.includes(achievementId)
    default:
      return false
  }
}

// Get newly unlocked achievements
export const getNewAchievements = (userStats, unlockedAchievements = []) => {
  const newAchievements = []
  
  Object.keys(ACHIEVEMENTS).forEach(key => {
    if (!unlockedAchievements.includes(key)) {
      if (checkAchievement(key, userStats)) {
        newAchievements.push({ ...ACHIEVEMENTS[key], id: key })
      }
    }
  })
  
  return newAchievements
}

// Award XP and check for level up
export const awardXP = (currentXP, xpAmount) => {
  const oldLevel = calculateLevel(currentXP)
  const newXP = currentXP + xpAmount
  const newLevel = calculateLevel(newXP)
  
  return {
    newXP,
    newLevel,
    leveledUp: newLevel > oldLevel,
    xpGained: xpAmount
  }
}

// Get level rewards
export const getLevelRewards = (level) => {
  const rewards = {
    badge: `Level ${level} Badge`,
    features: []
  }

  if (level >= 5) rewards.features.push('Custom Profile Banner')
  if (level >= 10) rewards.features.push('Premium Filters')
  if (level >= 15) rewards.features.push('Analytics Dashboard')
  if (level >= 20) rewards.features.push('Master Chef Badge')

  return rewards
}

// Get achievement category progress
export const getCategoryProgress = (userStats) => {
  return {
    recipes: {
      current: userStats.recipesCreated || 0,
      milestones: [1, 10, 50, 100],
      achievements: ['FIRST_RECIPE', 'RECIPE_MASTER_10', 'RECIPE_MASTER_50', 'RECIPE_MASTER_100']
    },
    social: {
      current: userStats.followers || 0,
      milestones: [100, 1000],
      achievements: ['POPULAR_CHEF', 'INFLUENCER']
    },
    streak: {
      current: userStats.currentStreak || 0,
      milestones: [7, 30, 100],
      achievements: ['WEEK_WARRIOR', 'MONTH_MASTER', 'DEDICATION']
    }
  }
}
