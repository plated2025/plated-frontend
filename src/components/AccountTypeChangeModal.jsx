import { X, ChefHat, User, Check, Star, Trophy, BarChart3, DollarSign, Sparkles } from 'lucide-react'

function AccountTypeChangeModal({ isOpen, onClose, currentType, onConfirm }) {
  if (!isOpen) return null

  const isUpgrade = currentType === 'regular'
  const targetType = isUpgrade ? 'creator' : 'regular'

  const creatorFeatures = [
    { icon: Trophy, title: 'Achievement System', description: 'Earn badges and level up your profile' },
    { icon: BarChart3, title: 'Creator Analytics', description: 'Track views, engagement, and growth' },
    { icon: DollarSign, title: 'Monetization', description: 'Earn from premium content and tips' },
    { icon: Star, title: 'Creator Studio', description: 'Advanced content creation tools' },
    { icon: Sparkles, title: 'Priority Support', description: 'Get help from our creator success team' }
  ]

  const regularFeatures = [
    { icon: User, title: 'Simple Profile', description: 'Clean, distraction-free experience' },
    { icon: ChefHat, title: 'Save Recipes', description: 'Bookmark and organize your favorites' },
    { icon: Check, title: 'No Commitments', description: 'Upgrade back to Creator anytime' }
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className={`${
          isUpgrade 
            ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500' 
            : 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500'
        } p-8 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            {isUpgrade ? (
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <ChefHat size={32} />
              </div>
            ) : (
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <User size={32} />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {isUpgrade ? 'Upgrade to Creator' : 'Switch to Regular User'}
              </h2>
              <p className="text-white/90">
                {isUpgrade 
                  ? 'Unlock powerful tools to grow your food community' 
                  : 'Simplify your Plated experience'}
              </p>
            </div>
          </div>

          {isUpgrade && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Sparkles size={24} />
                <div>
                  <div className="font-semibold">Limited Time: Free Forever</div>
                  <div className="text-sm text-white/80">Creator features at no cost during beta</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {isUpgrade ? 'What You Get as a Creator:' : 'Regular User Features:'}
            </h3>
            <div className="space-y-3">
              {(isUpgrade ? creatorFeatures : regularFeatures).map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isUpgrade 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    }`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{feature.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* What You'll Lose (if downgrading) */}
          {!isUpgrade && (
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">!</span>
                </div>
                <div>
                  <div className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                    You'll Lose Access To:
                  </div>
                  <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                    <li>• Achievement badges and level progression</li>
                    <li>• Creator analytics and insights</li>
                    <li>• Monetization features</li>
                    <li>• Creator Studio tools</li>
                    <li>• Priority support</li>
                  </ul>
                  <div className="mt-3 text-sm text-yellow-700 dark:text-yellow-300">
                    <strong>Good news:</strong> You can upgrade back to Creator anytime!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
            <div className="flex items-start gap-3">
              <Check size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="text-primary-600 dark:text-primary-400">
                  {isUpgrade ? 'No commitment required.' : 'Your content stays safe.'}
                </strong>
                {' '}
                {isUpgrade 
                  ? 'You can switch back to Regular User anytime if Creator features aren\'t for you.'
                  : 'All your recipes, followers, and saved content will remain intact.'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(targetType)
                onClose()
              }}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                isUpgrade
                  ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600'
                  : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600'
              } text-white`}
            >
              {isUpgrade ? 'Upgrade to Creator' : 'Switch to Regular'}
            </button>
          </div>
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
      `}</style>
    </div>
  )
}

export default AccountTypeChangeModal
