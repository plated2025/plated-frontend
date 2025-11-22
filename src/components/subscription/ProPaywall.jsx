import { X, Crown, Sparkles, Star, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ProPaywall({ feature, onClose }) {
  const navigate = useNavigate()

  const handleUpgrade = () => {
    navigate('/subscription')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-8 text-white text-center overflow-hidden">
          {/* Sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            <Sparkles className="absolute top-4 left-4 animate-pulse" size={20} />
            <Sparkles className="absolute top-8 right-8 animate-pulse animation-delay-200" size={16} />
            <Star className="absolute bottom-6 left-8 animate-pulse animation-delay-400" size={18} />
            <Star className="absolute bottom-4 right-4 animate-pulse animation-delay-600" size={14} />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <div className="relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Upgrade to PRO</h2>
            <p className="text-lg opacity-90">Unlock this feature and more!</p>
          </div>
        </div>

        {/* Feature Info */}
        {feature && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-5xl">{feature.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-3 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">This feature requires</span>{' '}
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  {feature.tier === 'pro' ? 'PRO' : 'PRO+'} membership
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">PRO Benefits Include:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Unlimited recipes & reels</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Unlimited AI generations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Crown size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Exclusive PRO badge</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Star size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Premium filters & templates</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Starting at</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">$4.99<span className="text-lg text-gray-600 dark:text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">7-day free trial • Cancel anytime</p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleUpgrade}
            className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:opacity-90 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 mb-3"
          >
            <Crown size={20} />
            Start Free Trial
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
          >
            Maybe Later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  )
}

export default ProPaywall
