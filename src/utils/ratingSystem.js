// Rating System Utility

const RATING_KEY = 'app_rating'
const RATING_STATE_KEY = 'rating_state'

// Configuration
const CONFIG = {
  uploadsBeforePrompt: 3,        // Show after 3 uploads
  daysBeforeReprompt: 30,         // Wait 30 days before asking again
  uploadsBeforeReprompt: 10,      // Or after 10 more uploads
}

export const RatingState = {
  NEVER_SHOWN: 'never_shown',
  POSTPONED: 'postponed',
  RATED: 'rated',
  DISMISSED: 'dismissed'
}

// Get rating state
export const getRatingState = () => {
  const stored = localStorage.getItem(RATING_STATE_KEY)
  if (!stored) return null
  
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

// Initialize rating state
const initRatingState = () => {
  return {
    status: RatingState.NEVER_SHOWN,
    uploadCount: 0,
    lastShownDate: null,
    lastPromptDate: null,
    rating: null,
    ratedDate: null
  }
}

// Save rating state
const saveRatingState = (state) => {
  localStorage.setItem(RATING_STATE_KEY, JSON.stringify(state))
}

// Get or initialize state
export const getOrInitRatingState = () => {
  let state = getRatingState()
  if (!state) {
    state = initRatingState()
    saveRatingState(state)
  }
  return state
}

// Increment upload count
export const incrementUploadCount = () => {
  const state = getOrInitRatingState()
  state.uploadCount += 1
  saveRatingState(state)
  return state
}

// Check if should show rating prompt
export const shouldShowRatingPrompt = () => {
  const state = getOrInitRatingState()
  
  // Already rated, don't show
  if (state.status === RatingState.RATED) {
    return false
  }
  
  // Never shown - check upload count
  if (state.status === RatingState.NEVER_SHOWN) {
    return state.uploadCount >= CONFIG.uploadsBeforePrompt
  }
  
  // Postponed or dismissed - check time and uploads
  if (state.status === RatingState.POSTPONED || state.status === RatingState.DISMISSED) {
    const daysSinceLastPrompt = state.lastPromptDate
      ? Math.floor((Date.now() - new Date(state.lastPromptDate).getTime()) / (1000 * 60 * 60 * 24))
      : 999
    
    const uploadsSinceLastPrompt = state.uploadCount - (state.uploadsAtLastPrompt || 0)
    
    return daysSinceLastPrompt >= CONFIG.daysBeforeReprompt || 
           uploadsSinceLastPrompt >= CONFIG.uploadsBeforeReprompt
  }
  
  return false
}

// Mark prompt as shown
export const markPromptShown = () => {
  const state = getOrInitRatingState()
  state.lastPromptDate = new Date().toISOString()
  state.uploadsAtLastPrompt = state.uploadCount
  saveRatingState(state)
}

// Save rating
export const saveRating = (rating, feedback = '') => {
  const state = getOrInitRatingState()
  state.status = RatingState.RATED
  state.rating = rating
  state.ratedDate = new Date().toISOString()
  state.feedback = feedback
  saveRatingState(state)
  
  // In production, send to backend
  console.log('Rating saved:', { rating, feedback })
  
  return state
}

// Postpone rating
export const postponeRating = () => {
  const state = getOrInitRatingState()
  state.status = RatingState.POSTPONED
  state.lastPromptDate = new Date().toISOString()
  state.uploadsAtLastPrompt = state.uploadCount
  saveRatingState(state)
}

// Dismiss rating (don't ask again)
export const dismissRating = () => {
  const state = getOrInitRatingState()
  state.status = RatingState.DISMISSED
  state.lastPromptDate = new Date().toISOString()
  saveRatingState(state)
}

// Reset rating state (for testing)
export const resetRatingState = () => {
  localStorage.removeItem(RATING_STATE_KEY)
  return initRatingState()
}

// Check if already rated
export const hasUserRated = () => {
  const state = getRatingState()
  return state?.status === RatingState.RATED
}

// Get user rating
export const getUserRating = () => {
  const state = getRatingState()
  return state?.rating || null
}

// Get rating statistics (for analytics)
export const getRatingStats = () => {
  const state = getOrInitRatingState()
  return {
    uploadCount: state.uploadCount,
    hasRated: state.status === RatingState.RATED,
    rating: state.rating,
    lastPromptDate: state.lastPromptDate,
    status: state.status
  }
}
