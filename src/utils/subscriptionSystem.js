// PRO Subscription System

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    badge: '👤',
    badgeColor: 'from-gray-400 to-gray-500',
    features: [
      'Create unlimited recipes',
      'Join the community',
      'Save favorite recipes',
      'Basic meal planner',
      'Standard support'
    ],
    limits: {
      recipesPerDay: 10,
      reelsPerDay: 3,
      mealPlans: 2,
      collections: 3,
      aiGenerations: 5
    }
  },
  PRO: {
    id: 'pro',
    name: 'PRO',
    price: 4.99,
    interval: 'month',
    badge: '⭐',
    badgeColor: 'from-yellow-400 to-orange-500',
    popular: true,
    features: [
      'Everything in Free',
      'Unlimited recipes & reels',
      'Advanced meal planner',
      'Custom profile banner',
      'Premium filters & templates',
      'Unlimited AI generations',
      'Remove watermarks',
      'Analytics dashboard',
      'Priority support',
      'PRO badge'
    ],
    limits: {
      recipesPerDay: Infinity,
      reelsPerDay: Infinity,
      mealPlans: Infinity,
      collections: Infinity,
      aiGenerations: Infinity
    }
  },
  PRO_PLUS: {
    id: 'pro_plus',
    name: 'PRO+',
    price: 9.99,
    interval: 'month',
    badge: '👑',
    badgeColor: 'from-purple-400 to-pink-500',
    features: [
      'Everything in PRO',
      'Exclusive content access',
      'Master Chef badge',
      'Custom URL (plated.com/yourname)',
      'Verified checkmark',
      'Early feature access',
      'Collaboration tools',
      'White-label recipes',
      'Export recipes as PDF',
      'Advanced analytics',
      '1-on-1 creator support',
      'Monetization features'
    ],
    limits: {
      recipesPerDay: Infinity,
      reelsPerDay: Infinity,
      mealPlans: Infinity,
      collections: Infinity,
      aiGenerations: Infinity
    }
  }
}

// PRO Exclusive Features
export const PRO_FEATURES = {
  // Content Creation
  UNLIMITED_RECIPES: {
    id: 'unlimited_recipes',
    name: 'Unlimited Recipes',
    description: 'Create as many recipes as you want',
    tier: 'pro',
    icon: '🍳',
    category: 'creation'
  },
  UNLIMITED_REELS: {
    id: 'unlimited_reels',
    name: 'Unlimited Reels',
    description: 'Post unlimited cooking videos',
    tier: 'pro',
    icon: '📹',
    category: 'creation'
  },
  PREMIUM_TEMPLATES: {
    id: 'premium_templates',
    name: 'Premium Templates',
    description: 'Access exclusive recipe templates',
    tier: 'pro',
    icon: '✨',
    category: 'creation'
  },
  NO_WATERMARKS: {
    id: 'no_watermarks',
    name: 'No Watermarks',
    description: 'Remove watermarks from exports',
    tier: 'pro',
    icon: '🎨',
    category: 'creation'
  },

  // AI Features
  UNLIMITED_AI: {
    id: 'unlimited_ai',
    name: 'Unlimited AI Generations',
    description: 'Generate unlimited AI recipes',
    tier: 'pro',
    icon: '🤖',
    category: 'ai'
  },
  ADVANCED_AI: {
    id: 'advanced_ai',
    name: 'Advanced AI Features',
    description: 'Access premium AI models',
    tier: 'pro_plus',
    icon: '🧠',
    category: 'ai'
  },

  // Customization
  CUSTOM_BANNER: {
    id: 'custom_banner',
    name: 'Custom Profile Banner',
    description: 'Personalize your profile with custom banners',
    tier: 'pro',
    icon: '🎨',
    category: 'customization'
  },
  PREMIUM_FILTERS: {
    id: 'premium_filters',
    name: 'Premium Filters',
    description: '50+ exclusive photo filters',
    tier: 'pro',
    icon: '🌈',
    category: 'customization'
  },
  CUSTOM_URL: {
    id: 'custom_url',
    name: 'Custom URL',
    description: 'Get your own plated.com/username',
    tier: 'pro_plus',
    icon: '🔗',
    category: 'customization'
  },

  // Analytics
  ANALYTICS_DASHBOARD: {
    id: 'analytics_dashboard',
    name: 'Analytics Dashboard',
    description: 'Track views, engagement & growth',
    tier: 'pro',
    icon: '📊',
    category: 'analytics'
  },
  ADVANCED_ANALYTICS: {
    id: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Detailed insights & demographics',
    tier: 'pro_plus',
    icon: '📈',
    category: 'analytics'
  },

  // Badges & Status
  PRO_BADGE: {
    id: 'pro_badge',
    name: 'PRO Badge',
    description: 'Display PRO status on profile',
    tier: 'pro',
    icon: '⭐',
    category: 'status'
  },
  VERIFIED_CHECKMARK: {
    id: 'verified_checkmark',
    name: 'Verified Checkmark',
    description: 'Get verified badge',
    tier: 'pro_plus',
    icon: '✓',
    category: 'status'
  },
  MASTER_CHEF_BADGE: {
    id: 'master_chef_badge',
    name: 'Master Chef Badge',
    description: 'Exclusive golden badge',
    tier: 'pro_plus',
    icon: '👑',
    category: 'status'
  },

  // Collaboration
  COLLABORATION_TOOLS: {
    id: 'collaboration_tools',
    name: 'Collaboration Tools',
    description: 'Work with other creators',
    tier: 'pro_plus',
    icon: '🤝',
    category: 'collaboration'
  },
  MONETIZATION: {
    id: 'monetization',
    name: 'Monetization',
    description: 'Earn from your recipes',
    tier: 'pro_plus',
    icon: '💰',
    category: 'monetization'
  },

  // Export
  PDF_EXPORT: {
    id: 'pdf_export',
    name: 'PDF Export',
    description: 'Export recipes as beautiful PDFs',
    tier: 'pro_plus',
    icon: '📄',
    category: 'export'
  },
  WHITE_LABEL: {
    id: 'white_label',
    name: 'White Label Recipes',
    description: 'Remove Plated branding',
    tier: 'pro_plus',
    icon: '🎯',
    category: 'export'
  },

  // Support
  PRIORITY_SUPPORT: {
    id: 'priority_support',
    name: 'Priority Support',
    description: 'Get help faster',
    tier: 'pro',
    icon: '🚀',
    category: 'support'
  },
  DEDICATED_SUPPORT: {
    id: 'dedicated_support',
    name: '1-on-1 Support',
    description: 'Personal creator support',
    tier: 'pro_plus',
    icon: '👤',
    category: 'support'
  }
}

// Check if user has access to a feature
export const hasAccess = (userTier, featureId) => {
  const feature = Object.values(PRO_FEATURES).find(f => f.id === featureId)
  if (!feature) return false

  const tierHierarchy = ['free', 'pro', 'pro_plus']
  const userTierIndex = tierHierarchy.indexOf(userTier)
  const featureTierIndex = tierHierarchy.indexOf(feature.tier)

  return userTierIndex >= featureTierIndex
}

// Check if user can perform action based on limits
export const canPerformAction = (userTier, action, currentCount) => {
  const tier = SUBSCRIPTION_TIERS[userTier.toUpperCase()] || SUBSCRIPTION_TIERS.FREE
  const limit = tier.limits[action]
  
  if (limit === Infinity) return true
  return currentCount < limit
}

// Get feature category
export const getFeaturesByCategory = (category) => {
  return Object.values(PRO_FEATURES).filter(f => f.category === category)
}

// Get all features for a tier
export const getFeaturesForTier = (tierId) => {
  const tierHierarchy = ['free', 'pro', 'pro_plus']
  const tierIndex = tierHierarchy.indexOf(tierId)
  
  return Object.values(PRO_FEATURES).filter(feature => {
    const featureTierIndex = tierHierarchy.indexOf(feature.tier)
    return featureTierIndex <= tierIndex
  })
}

// Calculate savings for annual plan
export const calculateAnnualSavings = (monthlyPrice) => {
  const annualPrice = monthlyPrice * 10 // 2 months free
  const savings = (monthlyPrice * 12) - annualPrice
  const percentSave = Math.round((savings / (monthlyPrice * 12)) * 100)
  return { annualPrice, savings, percentSave }
}

// Promo codes
export const PROMO_CODES = {
  EARLYBIRD: {
    code: 'EARLYBIRD',
    discount: 50, // percentage
    duration: 3, // months
    description: '50% off for 3 months'
  },
  CHEF2024: {
    code: 'CHEF2024',
    discount: 30,
    duration: 1,
    description: '30% off first month'
  },
  ANNUAL20: {
    code: 'ANNUAL20',
    discount: 20,
    duration: 12,
    description: '20% off annual plan'
  }
}

// Validate promo code
export const validatePromoCode = (code) => {
  const upperCode = code.toUpperCase()
  return PROMO_CODES[upperCode] || null
}

// Apply promo code discount
export const applyPromoCode = (price, promoCode) => {
  if (!promoCode) return price
  const discountAmount = (price * promoCode.discount) / 100
  return price - discountAmount
}
