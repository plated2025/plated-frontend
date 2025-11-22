import { useState, useEffect } from 'react'
import { 
  incrementUploadCount, 
  shouldShowRatingPrompt, 
  markPromptShown 
} from '../utils/ratingSystem'

// Hook to manage rating prompt logic
export const useRatingPrompt = () => {
  const [showRatingPrompt, setShowRatingPrompt] = useState(false)

  const checkAndShowPrompt = () => {
    if (shouldShowRatingPrompt()) {
      setShowRatingPrompt(true)
      markPromptShown()
    }
  }

  const handleUploadComplete = () => {
    incrementUploadCount()
    // Small delay before checking to show prompt
    setTimeout(() => {
      checkAndShowPrompt()
    }, 1000)
  }

  const closeRatingPrompt = () => {
    setShowRatingPrompt(false)
  }

  return {
    showRatingPrompt,
    handleUploadComplete,
    closeRatingPrompt
  }
}
