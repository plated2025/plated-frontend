import { Camera, User } from 'lucide-react'

function DefaultAvatar({ size = 'md', showCamera = false, onClick, className = '' }) {
  const sizes = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
    '2xl': 'w-40 h-40'
  }

  const iconSizes = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48
  }

  const cameraSizes = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    '2xl': 28
  }

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={onClick}
        className={`
          ${sizes[size]}
          bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500
          rounded-full
          flex items-center justify-center
          ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
          shadow-lg
          border-4 border-white dark:border-gray-900
        `}
      >
        <User size={iconSizes[size]} className="text-white" strokeWidth={2.5} />
      </div>
      
      {showCamera && onClick && (
        <button
          onClick={onClick}
          className="absolute bottom-0 right-0 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 shadow-lg transition-colors border-2 border-white dark:border-gray-900"
          title="Upload profile picture"
        >
          <Camera size={cameraSizes[size]} />
        </button>
      )}
    </div>
  )
}

export default DefaultAvatar
