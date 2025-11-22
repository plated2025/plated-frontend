import { X, Sparkles } from 'lucide-react'

function AchievementUnlockedModal({ achievement, onClose }) {
  if (!achievement) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className={`bg-gradient-to-r ${achievement.gradient} p-6 text-white text-center relative overflow-hidden`}>
          {/* Sparkle effects */}
          <div className="absolute inset-0 overflow-hidden">
            <Sparkles className="absolute top-4 left-4 animate-pulse" size={16} />
            <Sparkles className="absolute top-8 right-8 animate-pulse animation-delay-200" size={14} />
            <Sparkles className="absolute bottom-6 left-8 animate-pulse animation-delay-400" size={18} />
            <Sparkles className="absolute bottom-4 right-4 animate-pulse animation-delay-600" size={12} />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <div className="relative">
            <div className="text-6xl mb-3 animate-bounce-slow">{achievement.icon}</div>
            <h2 className="text-2xl font-bold mb-1">Achievement Unlocked!</h2>
            <p className="opacity-90">{achievement.name}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
            {achievement.description}
          </p>

          {/* XP Reward */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bonus Reward</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                +{achievement.xpReward} XP
              </p>
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Type</p>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">{achievement.type}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Rarity</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {achievement.xpReward >= 500 ? 'Legendary' : 
                 achievement.xpReward >= 200 ? 'Epic' :
                 achievement.xpReward >= 100 ? 'Rare' : 'Common'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className={`w-full px-6 py-3 bg-gradient-to-r ${achievement.gradient} hover:opacity-90 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2`}
          >
            <Sparkles size={18} />
            Awesome!
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
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
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

export default AchievementUnlockedModal
