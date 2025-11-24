// Avatar utility functions with error handling

/**
 * Get avatar URL with fallback
 * @param {string} avatarUrl - The avatar URL from user profile
 * @param {string} fallbackText - Text to generate initials (name or username)
 * @returns {string} Avatar URL or data URL for placeholder
 */
export const getAvatarUrl = (avatarUrl, fallbackText = '') => {
  if (avatarUrl && avatarUrl.trim()) {
    return avatarUrl
  }
  
  // Return null to use component's fallback rendering
  return null
}

/**
 * Get user initials for avatar placeholder
 * @param {object} user - User object with name, fullName, or username
 * @returns {string} User initials (1-2 characters)
 */
export const getUserInitials = (user) => {
  if (!user) return '?'
  
  const name = user.fullName || user.name || user.username || ''
  
  if (!name) return '?'
  
  const parts = name.trim().split(' ')
  
  if (parts.length >= 2) {
    // First and last name initials
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  
  // Single name - first two characters or just first
  return name.substring(0, 2).toUpperCase()
}

/**
 * Generate gradient color based on user ID or name
 * @param {string} identifier - User ID, name, or username
 * @returns {string} Tailwind gradient class
 */
export const getUserGradient = (identifier = '') => {
  const gradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-blue-500',
    'from-rose-500 to-pink-500',
    'from-amber-500 to-orange-500',
  ]
  
  // Simple hash function to get consistent gradient for same user
  let hash = 0
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const index = Math.abs(hash) % gradients.length
  return gradients[index]
}

/**
 * Handle image load error - replace with fallback
 * @param {Event} e - Image error event
 * @param {string} fallbackText - Text for initials
 */
export const handleAvatarError = (e, fallbackText = '') => {
  // Remove src to prevent infinite error loop
  e.target.src = ''
  e.target.style.display = 'none'
  
  // Trigger parent component to show fallback
  const event = new CustomEvent('avatarLoadError', { 
    detail: { fallbackText } 
  })
  e.target.dispatchEvent(event)
}

/**
 * Avatar component wrapper with error handling
 */
export const AvatarImage = ({ src, alt, className, fallbackText, children }) => {
  const [hasError, setHasError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  
  const initials = getUserInitials({ name: fallbackText })
  const gradient = getUserGradient(fallbackText)
  
  if (!src || hasError) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <span className="text-white font-bold text-lg">
          {initials}
        </span>
        {children}
      </div>
    )
  }
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoading(false)}
    >
      {children}
    </img>
  )
}
