import { useState } from 'react'
import { Lock, Crown } from 'lucide-react'
import { useSubscription } from '../../hooks/useSubscription'
import ProPaywall from './ProPaywall'

/**
 * Button that automatically shows paywall for PRO features
 * 
 * Usage:
 * <ProFeatureButton
 *   feature={PRO_FEATURES.UNLIMITED_AI}
 *   onClick={handleGenerateAI}
 * >
 *   Generate AI Recipe
 * </ProFeatureButton>
 */
function ProFeatureButton({
  feature,
  onClick,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  showLockIcon = true,
  disabled = false
}) {
  const [showPaywall, setShowPaywall] = useState(false)
  const { checkAccess } = useSubscription()

  const hasAccess = checkAccess(feature.id)

  const handleClick = () => {
    if (!hasAccess) {
      setShowPaywall(true)
      return
    }
    onClick?.()
  }

  const variants = {
    primary: hasAccess
      ? 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white'
      : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white',
    secondary: hasAccess
      ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400',
    pro: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white',
    outline: hasAccess
      ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
      : 'border-2 border-gray-400 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative
          ${variants[variant]}
          ${sizes[size]}
          rounded-xl
          font-semibold
          transition-all
          shadow-md
          disabled:opacity-50
          disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${className}
        `}
      >
        {!hasAccess && showLockIcon && <Lock size={16} />}
        {children}
        {!hasAccess && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Crown size={12} className="text-white" />
          </span>
        )}
      </button>

      {showPaywall && (
        <ProPaywall
          feature={feature}
          onClose={() => setShowPaywall(false)}
        />
      )}
    </>
  )
}

export default ProFeatureButton
