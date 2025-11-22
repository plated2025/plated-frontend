import { Trophy, Sparkles, Star, Gift, X } from 'lucide-react'
import { getLevelRewards } from '../../utils/achievementSystem'

function LevelUpModal({ level, onClose }) {
  const rewards = getLevelRewards(level)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Celebration Background */}
        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-8 text-white text-center overflow-hidden">
          {/* Animated sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            <Sparkles className="absolute top-4 left-4 animate-pulse" size={20} />
            <Sparkles className="absolute top-8 right-8 animate-pulse animation-delay-200" size={16} />
            <Star className="absolute bottom-6 left-8 animate-pulse animation-delay-400" size={18} />
            <Star className="absolute bottom-4 right-4 animate-pulse animation-delay-600" size={14} />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          {/* Trophy Icon */}
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
              <Trophy size={48} className="text-white" />
            </div>
          </div>

          {/* Level Up Text */}
          <h2 className="text-4xl font-bold mb-2">Level Up!</h2>
          <p className="text-xl opacity-90">You reached Level {level}</p>
        </div>

        {/* Rewards Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Gift size={20} className="text-pink-600" />
            Your Rewards
          </h3>

          <div className="space-y-3">
            {/* Badge Reward */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {level}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{rewards.badge}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">New profile badge unlocked!</p>
                </div>
              </div>
            </div>

            {/* Feature Rewards */}
            {rewards.features.length > 0 && (
              <div className="space-y-2">
                {rewards.features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{feature}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Next Level Preview */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Level</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Level {level + 1}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Keep cooking to unlock more rewards!</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:opacity-90 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
          >
            Continue Cooking! 🎉
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

export default LevelUpModal
