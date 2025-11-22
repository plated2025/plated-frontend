// User-to-User Rating System

const USER_RATINGS_KEY = 'user_ratings'

// Get all user ratings
export const getAllUserRatings = () => {
  const stored = localStorage.getItem(USER_RATINGS_KEY)
  if (!stored) return {}
  
  try {
    return JSON.parse(stored)
  } catch {
    return {}
  }
}

// Save all user ratings
const saveAllUserRatings = (ratings) => {
  localStorage.setItem(USER_RATINGS_KEY, JSON.stringify(ratings))
}

// Get ratings for a specific user
export const getUserRatings = (userId) => {
  const allRatings = getAllUserRatings()
  return allRatings[userId] || {
    ratings: [],
    averageRating: 0,
    totalRatings: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  }
}

// Check if current user has rated target user
export const hasRatedUser = (targetUserId, currentUserId) => {
  const userRatings = getUserRatings(targetUserId)
  return userRatings.ratings.some(r => r.raterId === currentUserId)
}

// Get current user's rating for target user
export const getCurrentUserRating = (targetUserId, currentUserId) => {
  const userRatings = getUserRatings(targetUserId)
  const rating = userRatings.ratings.find(r => r.raterId === currentUserId)
  return rating || null
}

// Calculate average rating
const calculateAverage = (ratings) => {
  if (ratings.length === 0) return 0
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0)
  return (sum / ratings.length).toFixed(1)
}

// Calculate rating breakdown
const calculateBreakdown = (ratings) => {
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  ratings.forEach(r => {
    breakdown[r.rating] = (breakdown[r.rating] || 0) + 1
  })
  return breakdown
}

// Add or update a user rating
export const rateUser = (targetUserId, raterInfo, rating, review = '') => {
  const allRatings = getAllUserRatings()
  const userRatings = getUserRatings(targetUserId)
  
  // Remove existing rating from this user if any
  userRatings.ratings = userRatings.ratings.filter(r => r.raterId !== raterInfo.id)
  
  // Add new rating
  const newRating = {
    raterId: raterInfo.id,
    raterName: raterInfo.name,
    raterAvatar: raterInfo.avatar,
    rating: rating,
    review: review,
    date: new Date().toISOString()
  }
  
  userRatings.ratings.push(newRating)
  
  // Recalculate stats
  userRatings.totalRatings = userRatings.ratings.length
  userRatings.averageRating = parseFloat(calculateAverage(userRatings.ratings))
  userRatings.breakdown = calculateBreakdown(userRatings.ratings)
  
  // Save
  allRatings[targetUserId] = userRatings
  saveAllUserRatings(allRatings)
  
  return userRatings
}

// Delete a rating
export const deleteRating = (targetUserId, raterId) => {
  const allRatings = getAllUserRatings()
  const userRatings = getUserRatings(targetUserId)
  
  userRatings.ratings = userRatings.ratings.filter(r => r.raterId !== raterId)
  
  // Recalculate stats
  userRatings.totalRatings = userRatings.ratings.length
  userRatings.averageRating = parseFloat(calculateAverage(userRatings.ratings))
  userRatings.breakdown = calculateBreakdown(userRatings.ratings)
  
  allRatings[targetUserId] = userRatings
  saveAllUserRatings(allRatings)
  
  return userRatings
}

// Get rating statistics
export const getRatingStats = (userId) => {
  const ratings = getUserRatings(userId)
  
  return {
    average: ratings.averageRating,
    total: ratings.totalRatings,
    breakdown: ratings.breakdown,
    ratings: ratings.ratings.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}

// Get percentage for each star level
export const getRatingPercentages = (userId) => {
  const stats = getRatingStats(userId)
  const total = stats.total
  
  if (total === 0) {
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  }
  
  return {
    5: Math.round((stats.breakdown[5] / total) * 100),
    4: Math.round((stats.breakdown[4] / total) * 100),
    3: Math.round((stats.breakdown[3] / total) * 100),
    2: Math.round((stats.breakdown[2] / total) * 100),
    1: Math.round((stats.breakdown[1] / total) * 100)
  }
}

// Reset all ratings (for testing)
export const resetAllUserRatings = () => {
  localStorage.removeItem(USER_RATINGS_KEY)
}
