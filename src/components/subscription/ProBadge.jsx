import { Crown, Star, Sparkles } from 'lucide-react'

function ProBadge({ tier = 'pro', size = 'sm', showIcon = true, className = '' }) {
  const configs = {
    free: {
      display: false
    },
    pro: {
      text: 'PRO',
      icon: Star,
      gradient: 'from-yellow-400 to-orange-500',
      textColor: 'text-white'
    },
    pro_plus: {
      text: 'PRO+',
      icon: Crown,
      gradient: 'from-purple-400 to-pink-500',
      textColor: 'text-white'
    }
  }

  const config = configs[tier]
  if (!config || !config.display && tier === 'free') return null

  const Icon = config.icon

  const sizes = {
    xs: {
      container: 'px-1.5 py-0.5 text-[10px] gap-0.5',
      icon: 10
    },
    sm: {
      container: 'px-2 py-0.5 text-xs gap-1',
      icon: 12
    },
    md: {
      container: 'px-3 py-1 text-sm gap-1.5',
      icon: 14
    },
    lg: {
      container: 'px-4 py-1.5 text-base gap-2',
      icon: 16
    }
  }

  const sizeConfig = sizes[size]

  return (
    <div
      className={`inline-flex items-center ${sizeConfig.container} bg-gradient-to-r ${config.gradient} ${config.textColor} rounded-full font-bold shadow-md ${className}`}
    >
      {showIcon && <Icon size={sizeConfig.icon} />}
      <span>{config.text}</span>
    </div>
  )
}

export default ProBadge
