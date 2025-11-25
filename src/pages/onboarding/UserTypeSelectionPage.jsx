import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Sparkles, TrendingUp, Heart, Camera, Award, ChefHat } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function UserTypeSelectionPage() {
  const navigate = useNavigate()
  const { updateUserType } = useApp()
  const [selectedType, setSelectedType] = useState(null)

  const userTypes = [
    {
      id: 'creator',
      title: 'Creator',
      icon: ChefHat,
      description: 'Share recipes, build audience, earn achievements',
      features: [
        { icon: Camera, text: 'Share recipes & content' },
        { icon: TrendingUp, text: 'Build your audience' },
        { icon: Award, text: 'Unlock achievements & badges' },
        { icon: Sparkles, text: 'Achievement system included' },
        { icon: Heart, text: 'Monetization opportunities' }
      ],
      gradient: 'from-primary-500 via-purple-500 to-pink-500',
      bgGradient: 'from-primary-50 via-purple-50 to-pink-50',
      darkBgGradient: 'dark:from-primary-900/20 dark:via-purple-900/20 dark:to-pink-900/20'
    },
    {
      id: 'regular',
      title: 'Food Lover',
      icon: User,
      description: 'Discover recipes, save favorites, plan meals',
      features: [
        { icon: Heart, text: 'Save & organize recipes' },
        { icon: ChefHat, text: 'Meal planning tools' },
        { icon: User, text: 'Follow your favorite creators' },
        { icon: Sparkles, text: 'Personalized recommendations' }
      ],
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
      darkBgGradient: 'dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20'
    }
  ]

  const handleContinue = () => {
    if (selectedType) {
      updateUserType(selectedType)
      // Mark onboarding as complete and go to home
      localStorage.setItem('hasCompletedOnboarding', 'true')
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Skip Button - Top Right */}
      <button
        onClick={() => {
          updateUserType('regular')
          // Mark onboarding as complete and go to home
          localStorage.setItem('hasCompletedOnboarding', 'true')
          navigate('/home')
        }}
        className="absolute top-6 right-6 px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        Skip
      </button>

      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Welcome to Plated!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Select your account type to get started
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 text-left ${
                  isSelected
                    ? 'scale-105 shadow-2xl'
                    : 'hover:scale-102 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.bgGradient} ${type.darkBgGradient} opacity-50`}></div>
                
                {/* Border */}
                <div className={`absolute inset-0 border-4 rounded-3xl transition-colors ${
                  isSelected
                    ? 'border-transparent'
                    : 'border-gray-200 dark:border-gray-700'
                }`}></div>
                
                {/* Selected Border Gradient */}
                {isSelected && (
                  <div className={`absolute inset-0 rounded-3xl p-1 bg-gradient-to-br ${type.gradient}`}>
                    <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-3xl"></div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon size={24} className="text-white sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {type.title}
                      </h3>
                      {isSelected && (
                        <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                          ✓ Selected
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 sm:space-y-3">
                    {type.features.map((feature, index) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div key={index} className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0`}>
                            <FeatureIcon size={14} className="text-white sm:w-4 sm:h-4" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {feature.text}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                </div>
              </button>
            )
          })}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-900 dark:text-blue-200 font-medium mb-1">
                You can always switch later
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Don't worry! You can change your account type anytime in settings.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all ${
            selectedType
              ? 'bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 hover:from-primary-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
        >
          {selectedType ? 'Continue' : 'Select an option to continue'}
        </button>
      </div>
    </div>
  )
}

export default UserTypeSelectionPage
