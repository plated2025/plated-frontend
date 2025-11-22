// Advertising System

// Ad Types
export const AD_TYPES = {
  RECIPE_PROMOTION: {
    id: 'recipe_promotion',
    name: 'Recipe Promotion',
    description: 'Promote a specific recipe to reach more people',
    icon: '🍳',
    minBudget: 5,
    platforms: ['feed', 'explore', 'search'],
    objectives: ['awareness', 'engagement', 'traffic']
  },
  PROFILE_PROMOTION: {
    id: 'profile_promotion',
    name: 'Profile Promotion',
    description: 'Grow your following and reach',
    icon: '👤',
    minBudget: 10,
    platforms: ['feed', 'explore', 'suggestions'],
    objectives: ['followers', 'awareness', 'engagement']
  },
  REEL_PROMOTION: {
    id: 'reel_promotion',
    name: 'Reel Promotion',
    description: 'Boost your cooking videos',
    icon: '📹',
    minBudget: 5,
    platforms: ['reels', 'feed', 'explore'],
    objectives: ['views', 'engagement', 'followers']
  },
  COLLECTION_PROMOTION: {
    id: 'collection_promotion',
    name: 'Collection Promotion',
    description: 'Promote a recipe collection',
    icon: '📚',
    minBudget: 15,
    platforms: ['feed', 'explore'],
    objectives: ['awareness', 'traffic', 'engagement']
  },
  BUSINESS_AD: {
    id: 'business_ad',
    name: 'Business Ad',
    description: 'Promote products, services, or brand',
    icon: '💼',
    minBudget: 20,
    platforms: ['feed', 'explore', 'stories'],
    objectives: ['traffic', 'conversions', 'awareness', 'app_installs']
  }
}

// Campaign Objectives
export const OBJECTIVES = {
  AWARENESS: {
    id: 'awareness',
    name: 'Brand Awareness',
    description: 'Reach the maximum number of people',
    metric: 'Impressions',
    icon: '👁️'
  },
  ENGAGEMENT: {
    id: 'engagement',
    name: 'Engagement',
    description: 'Get more likes, comments, and shares',
    metric: 'Engagements',
    icon: '❤️'
  },
  TRAFFIC: {
    id: 'traffic',
    name: 'Traffic',
    description: 'Drive traffic to your profile or website',
    metric: 'Clicks',
    icon: '🔗'
  },
  FOLLOWERS: {
    id: 'followers',
    name: 'Followers',
    description: 'Grow your follower base',
    metric: 'New Followers',
    icon: '➕'
  },
  VIEWS: {
    id: 'views',
    name: 'Video Views',
    description: 'Get more video views',
    metric: 'Views',
    icon: '▶️'
  },
  CONVERSIONS: {
    id: 'conversions',
    name: 'Conversions',
    description: 'Drive purchases or sign-ups',
    metric: 'Conversions',
    icon: '💰'
  },
  APP_INSTALLS: {
    id: 'app_installs',
    name: 'App Installs',
    description: 'Get more app downloads',
    metric: 'Installs',
    icon: '📱'
  }
}

// Audience Targeting Options
export const TARGETING_OPTIONS = {
  location: {
    name: 'Location',
    description: 'Target by country, state, or city',
    icon: '📍',
    options: [
      { id: 'worldwide', name: 'Worldwide' },
      { id: 'country', name: 'By Country' },
      { id: 'state', name: 'By State/Region' },
      { id: 'city', name: 'By City' },
      { id: 'radius', name: 'Radius (Local)' }
    ]
  },
  demographics: {
    name: 'Demographics',
    description: 'Target by age, gender, and language',
    icon: '👥',
    fields: {
      ageRange: { min: 13, max: 65, default: [18, 65] },
      gender: ['all', 'male', 'female', 'non-binary'],
      languages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh']
    }
  },
  interests: {
    name: 'Interests',
    description: 'Target by cooking interests and preferences',
    icon: '🎯',
    categories: [
      { id: 'baking', name: 'Baking', subcategories: ['bread', 'cakes', 'pastries', 'cookies'] },
      { id: 'healthy', name: 'Healthy Eating', subcategories: ['vegan', 'keto', 'paleo', 'gluten-free'] },
      { id: 'cuisines', name: 'World Cuisines', subcategories: ['italian', 'asian', 'mexican', 'french', 'indian'] },
      { id: 'cooking_level', name: 'Cooking Level', subcategories: ['beginner', 'intermediate', 'advanced'] },
      { id: 'meal_types', name: 'Meal Types', subcategories: ['breakfast', 'lunch', 'dinner', 'dessert', 'snacks'] },
      { id: 'dietary', name: 'Dietary Preferences', subcategories: ['vegetarian', 'vegan', 'pescatarian', 'halal', 'kosher'] }
    ]
  },
  behaviors: {
    name: 'Behaviors',
    description: 'Target by user activity and engagement',
    icon: '📊',
    options: [
      { id: 'active_cooks', name: 'Active Cooks', description: 'Users who cook regularly' },
      { id: 'recipe_savers', name: 'Recipe Savers', description: 'Users who save lots of recipes' },
      { id: 'meal_planners', name: 'Meal Planners', description: 'Users who use meal planning' },
      { id: 'content_creators', name: 'Content Creators', description: 'Users who post recipes' },
      { id: 'shoppers', name: 'Online Shoppers', description: 'Users who shop for ingredients' },
      { id: 'engaged_users', name: 'Highly Engaged', description: 'Users who interact frequently' }
    ]
  },
  custom: {
    name: 'Custom Audiences',
    description: 'Upload your own audience list',
    icon: '📋',
    types: [
      { id: 'followers', name: 'Your Followers', description: 'Target people who follow you' },
      { id: 'engaged', name: 'Engaged with Content', description: 'People who liked/commented' },
      { id: 'lookalike', name: 'Lookalike Audience', description: 'Similar to your followers' },
      { id: 'upload', name: 'Upload List', description: 'Upload email or phone list' }
    ]
  }
}

// Ad Placements
export const PLACEMENTS = {
  FEED: {
    id: 'feed',
    name: 'Feed',
    description: 'Show in main feed',
    cost: 1.0, // Cost multiplier
    format: ['image', 'video', 'carousel']
  },
  EXPLORE: {
    id: 'explore',
    name: 'Explore',
    description: 'Show in explore page',
    cost: 1.2,
    format: ['image', 'video', 'carousel']
  },
  STORIES: {
    id: 'stories',
    name: 'Stories',
    description: 'Show in stories',
    cost: 1.5,
    format: ['image', 'video']
  },
  REELS: {
    id: 'reels',
    name: 'Reels',
    description: 'Show in reels feed',
    cost: 1.3,
    format: ['video']
  },
  SEARCH: {
    id: 'search',
    name: 'Search Results',
    description: 'Show in search results',
    cost: 1.4,
    format: ['image', 'carousel']
  },
  SUGGESTIONS: {
    id: 'suggestions',
    name: 'Suggestions',
    description: 'Show in who to follow',
    cost: 1.1,
    format: ['profile']
  }
}

// Budget Options
export const BUDGET_OPTIONS = {
  DAILY: {
    id: 'daily',
    name: 'Daily Budget',
    description: 'Set a daily spending limit',
    min: 5,
    recommended: 20
  },
  LIFETIME: {
    id: 'lifetime',
    name: 'Lifetime Budget',
    description: 'Set total campaign budget',
    min: 50,
    recommended: 200
  }
}

// Bidding Strategies
export const BIDDING_STRATEGIES = {
  LOWEST_COST: {
    id: 'lowest_cost',
    name: 'Lowest Cost',
    description: 'Get the most results for your budget',
    recommended: true
  },
  COST_CAP: {
    id: 'cost_cap',
    name: 'Cost Cap',
    description: 'Control cost per result'
  },
  BID_CAP: {
    id: 'bid_cap',
    name: 'Bid Cap',
    description: 'Set maximum bid amount'
  }
}

// Campaign Status
export const CAMPAIGN_STATUS = {
  DRAFT: { id: 'draft', name: 'Draft', color: 'gray' },
  PENDING: { id: 'pending', name: 'Pending Review', color: 'yellow' },
  ACTIVE: { id: 'active', name: 'Active', color: 'green' },
  PAUSED: { id: 'paused', name: 'Paused', color: 'blue' },
  COMPLETED: { id: 'completed', name: 'Completed', color: 'gray' },
  REJECTED: { id: 'rejected', name: 'Rejected', color: 'red' }
}

// Calculate estimated reach
export const calculateEstimatedReach = (budget, duration, targeting) => {
  const baseCPM = 5 // Cost per 1000 impressions
  const totalBudget = budget * duration
  
  // Adjust CPM based on targeting specificity
  let cpmMultiplier = 1
  if (targeting.interests?.length > 3) cpmMultiplier *= 1.2
  if (targeting.ageRange && (targeting.ageRange[1] - targeting.ageRange[0] < 20)) cpmMultiplier *= 1.15
  if (targeting.location !== 'worldwide') cpmMultiplier *= 1.1
  
  const adjustedCPM = baseCPM * cpmMultiplier
  const estimatedImpressions = (totalBudget / adjustedCPM) * 1000
  
  return {
    minReach: Math.floor(estimatedImpressions * 0.8),
    maxReach: Math.floor(estimatedImpressions * 1.2),
    estimatedImpressions: Math.floor(estimatedImpressions),
    cpm: adjustedCPM.toFixed(2)
  }
}

// Calculate estimated engagement
export const calculateEstimatedEngagement = (reach, objective, adType) => {
  // Base engagement rates by objective
  const engagementRates = {
    awareness: 0.02, // 2% engagement rate
    engagement: 0.05, // 5% engagement rate
    traffic: 0.03, // 3% click rate
    followers: 0.04, // 4% follow rate
    views: 0.70, // 70% view rate for videos
    conversions: 0.01 // 1% conversion rate
  }
  
  const baseRate = engagementRates[objective] || 0.02
  const estimatedActions = Math.floor(reach * baseRate)
  
  return {
    estimatedActions,
    rate: (baseRate * 100).toFixed(1) + '%',
    costPerAction: ((reach * 5 / 1000) / estimatedActions).toFixed(2)
  }
}

// Ad performance metrics
export const calculateMetrics = (campaign) => {
  const { impressions = 0, clicks = 0, engagements = 0, spent = 0, conversions = 0 } = campaign
  
  return {
    ctr: impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : 0, // Click-through rate
    cpm: impressions > 0 ? ((spent / impressions) * 1000).toFixed(2) : 0, // Cost per mille
    cpc: clicks > 0 ? (spent / clicks).toFixed(2) : 0, // Cost per click
    cpe: engagements > 0 ? (spent / engagements).toFixed(2) : 0, // Cost per engagement
    cvr: clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : 0, // Conversion rate
    cpa: conversions > 0 ? (spent / conversions).toFixed(2) : 0, // Cost per acquisition
    roi: conversions > 0 ? (((conversions * 10 - spent) / spent) * 100).toFixed(2) : 0 // ROI estimate
  }
}

// Validate campaign
export const validateCampaign = (campaign) => {
  const errors = []
  
  if (!campaign.name) errors.push('Campaign name is required')
  if (!campaign.objective) errors.push('Campaign objective is required')
  if (!campaign.adType) errors.push('Ad type is required')
  if (!campaign.budget || campaign.budget < 5) errors.push('Minimum budget is $5')
  if (!campaign.content) errors.push('Ad content is required')
  if (!campaign.placements || campaign.placements.length === 0) errors.push('Select at least one placement')
  if (campaign.startDate && new Date(campaign.startDate) < new Date()) errors.push('Start date must be in the future')
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Generate campaign ID
export const generateCampaignId = () => {
  return `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: { id: 'credit_card', name: 'Credit Card', icon: '💳' },
  DEBIT_CARD: { id: 'debit_card', name: 'Debit Card', icon: '💳' },
  PAYPAL: { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  ACCOUNT_BALANCE: { id: 'balance', name: 'Account Balance', icon: '💰' }
}
