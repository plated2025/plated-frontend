import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Star, Flame, Target, Zap, ChefHat, Heart, Gift, ArrowRight, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function AchievementTutorialPage() {
  const navigate = useNavigate()
  const { completeOnboarding } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Welcome to Your Cooking Journey!',
      subtitle: 'Level up as you cook and unlock amazing rewards',
      icon: Trophy,
      gradient: 'from-purple-500 to-pink-500',
      content: (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  Lv.1
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Trophy size={20} className="text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
              You Start at Level 1
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Complete actions to earn XP and level up. Each level unlocks new features and badges!
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Earn XP by Cooking!',
      subtitle: 'Every action you take earns experience points',
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      content: (
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <ChefHat className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">Create a Recipe</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">+100 XP</p>
            </div>
            <span className="text-2xl">+💯</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Flame className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">Daily Cooking Streak</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">+15 XP/day</p>
            </div>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3 shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">Get Followers</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">+20 XP each</p>
            </div>
            <span className="text-2xl">❤️</span>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            ...and many more ways to earn XP!
          </p>
        </div>
      )
    },
    {
      title: 'Unlock Achievements!',
      subtitle: 'Complete challenges to earn special badges',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-500',
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👨‍🍳</span>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">First Recipe</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create your first recipe</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">+50 XP Bonus!</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border-2 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Week Warrior</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cook 7 days in a row</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">+100 XP Bonus!</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Recipe Legend</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create 100 recipes</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">+500 XP Bonus!</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Level Up Rewards!',
      subtitle: 'Unlock exclusive features as you progress',
      icon: Gift,
      gradient: 'from-green-500 to-emerald-500',
      content: (
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                5
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Level 5</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Custom Profile Banner</p>
              </div>
            </div>
            <div className="h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg"></div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                10
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Level 10</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Premium Filters</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg"></div>
              <div className="h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg"></div>
              <div className="h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                20
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Level 20</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Master Chef Badge 👑</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Ready to Start!',
      subtitle: 'Begin your journey to becoming a Master Chef',
      icon: Target,
      gradient: 'from-pink-500 to-purple-500',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center shadow-xl">
            <Trophy size={64} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">You're All Set!</h3>
            <p className="opacity-90 mb-4">Start creating recipes, building streaks, and unlocking achievements!</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm mb-2">Your Starting Bonus:</p>
              <p className="text-3xl font-bold">+100 XP 🎉</p>
              <p className="text-xs opacity-75 mt-1">Early Bird Achievement Unlocked!</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <ChefHat className="mx-auto mb-1 text-blue-600" size={24} />
              <p className="text-xs text-gray-600 dark:text-gray-400">Create</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <Flame className="mx-auto mb-1 text-orange-600" size={24} />
              <p className="text-xs text-gray-600 dark:text-gray-400">Streak</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <Star className="mx-auto mb-1 text-yellow-600" size={24} />
              <p className="text-xs text-gray-600 dark:text-gray-400">Achieve</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  const currentSlideData = slides[currentSlide]
  const SlideIcon = currentSlideData.icon

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    // Award early bird achievement and starting bonus
    const existingXP = parseInt(localStorage.getItem('userXP') || '0')
    localStorage.setItem('userXP', (existingXP + 100).toString())
    localStorage.setItem('achievements', JSON.stringify(['EARLY_BIRD']))
    
    completeOnboarding()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="ml-auto mb-4 flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">Skip Tutorial</span>
          <X size={16} />
        </button>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${currentSlideData.gradient} p-8 text-white text-center`}>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <SlideIcon size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">{currentSlideData.title}</h1>
            <p className="text-lg opacity-90">{currentSlideData.subtitle}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {currentSlideData.content}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-gradient-to-r ' + currentSlideData.gradient
                      : 'w-2 bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {currentSlide > 0 && (
                <button
                  onClick={() => setCurrentSlide(currentSlide - 1)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className={`flex-1 px-6 py-4 bg-gradient-to-r ${currentSlideData.gradient} hover:opacity-90 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                  currentSlide === 0 ? 'w-full' : ''
                }`}
              >
                {currentSlide === slides.length - 1 ? "Let's Start Cooking!" : 'Next'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AchievementTutorialPage
