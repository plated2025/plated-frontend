import { useNavigate } from 'react-router-dom'
import { X, ChefHat, Sparkles, TrendingUp, Award, DollarSign, BarChart3 } from 'lucide-react'

function UpgradeToCreatorModal({ isOpen, onClose }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const benefits = [
    {
      icon: ChefHat,
      title: 'Share Your Recipes',
      description: 'Post unlimited recipes, stories, and cooking content'
    },
    {
      icon: TrendingUp,
      title: 'Build Your Audience',
      description: 'Grow your following and connect with food lovers worldwide'
    },
    {
      icon: Award,
      title: 'Unlock Achievements',
      description: 'Earn badges, levels, and recognition for your content'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track views, engagement, and follower growth'
    },
    {
      icon: DollarSign,
      title: 'Monetization',
      description: 'Turn your passion into income with sponsored content'
    },
    {
      icon: Sparkles,
      title: 'Professional Tools',
      description: 'Access creator studio, scheduling, and advanced features'
    }
  ]

  const handleUpgrade = () => {
    onClose()
    navigate('/settings')
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <ChefHat size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Become a Creator</h2>
            <p className="text-white/90 text-lg">
              Share your culinary passion with the world
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Creators</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">1M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Recipes Shared</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Forever</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-semibold transition-all"
            >
              Maybe Later
            </button>
            <button
              onClick={handleUpgrade}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 hover:from-primary-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Upgrade to Creator
            </button>
          </div>

          {/* Note */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Completely free • Switch anytime • No credit card required
          </p>
        </div>
      </div>
    </div>
  )
}

export default UpgradeToCreatorModal
