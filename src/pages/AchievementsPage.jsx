import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Lock, Check, Flame, Star, Heart, ChefHat, Target } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useAchievements } from '../hooks/useAchievements'
import { ACHIEVEMENTS, getCategoryProgress } from '../utils/achievementSystem'
import LevelUpModal from '../components/achievements/LevelUpModal'
import AchievementUnlockedModal from '../components/achievements/AchievementUnlockedModal'
import UpgradeToCreatorModal from '../components/UpgradeToCreatorModal'

function AchievementsPage() {
  const navigate = useNavigate()
  const { userType } = useApp()
  
  // Block access for non-creators
  if (userType !== 'creator') {
    return <UpgradeToCreatorModal isOpen={true} onClose={() => navigate(-1)} />
  }
  const {
    level,
    totalXP,
    currentLevelXP,
    nextLevelXP,
    progressPercentage,
    unlockedAchievements,
    userStats,
    showLevelUpModal,
    newLevel,
    showAchievementModal,
    newAchievement,
    closeLevelUpModal,
    closeAchievementModal
  } = useAchievements()

  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'recipe', name: 'Recipes', icon: ChefHat },
    { id: 'followers', name: 'Social', icon: Heart },
    { id: 'streak', name: 'Streaks', icon: Flame },
    { id: 'special', name: 'Special', icon: Star }
  ]

  const categoryProgress = getCategoryProgress(userStats)

  const achievements = Object.values(ACHIEVEMENTS).filter(achievement =>
    activeCategory === 'all' || achievement.type === activeCategory
  )

  const isUnlocked = (achievementId) => unlockedAchievements.includes(achievementId)

  const getProgress = (achievement) => {
    switch (achievement.type) {
      case 'recipe':
        return Math.min((userStats.recipesCreated / achievement.requirement) * 100, 100)
      case 'followers':
        return Math.min((userStats.followers / achievement.requirement) * 100, 100)
      case 'likes':
        return Math.min((userStats.totalLikes / achievement.requirement) * 100, 100)
      case 'streak':
        return Math.min((userStats.currentStreak / achievement.requirement) * 100, 100)
      case 'level':
        return Math.min((level / achievement.requirement) * 100, 100)
      default:
        return 0
    }
  }

  const getCurrent = (achievement) => {
    switch (achievement.type) {
      case 'recipe':
        return userStats.recipesCreated
      case 'followers':
        return userStats.followers
      case 'likes':
        return userStats.totalLikes
      case 'streak':
        return userStats.currentStreak
      case 'level':
        return level
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
              Level {level}
            </div>
          </div>
        </div>
      </header>

      {/* Level Progress */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {level}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Level {level}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {totalXP} / {nextLevelXP} XP
                </p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {Math.round(progressPercentage)}% to Level {level + 1}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex gap-2 p-4 max-w-4xl mx-auto">
          {categories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <CategoryIcon size={18} />
                {category.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="p-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const unlocked = isUnlocked(achievement.id)
            const progress = getProgress(achievement)
            const current = getCurrent(achievement)

            return (
              <div
                key={achievement.id}
                className={`rounded-2xl overflow-hidden shadow-md transition-all ${
                  unlocked
                    ? 'bg-white dark:bg-gray-800 border-2 border-transparent hover:shadow-xl'
                    : 'bg-gray-100 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700'
                }`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${achievement.gradient} p-4 text-white relative overflow-hidden`}>
                  {!unlocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                      <Lock size={32} className="text-white/80" />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{achievement.name}</h3>
                      <p className="text-sm opacity-90">{achievement.description}</p>
                    </div>
                    {unlocked && (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Check size={18} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  {!unlocked ? (
                    <>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {current} / {achievement.requirement}
                          </span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${achievement.gradient} h-full transition-all`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Reward: <span className="font-bold text-gray-900 dark:text-white">+{achievement.xpReward} XP</span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">✓ Unlocked!</p>
                      <p className="text-xs text-green-600 dark:text-green-500">+{achievement.xpReward} XP Earned</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modals */}
      {showLevelUpModal && newLevel && (
        <LevelUpModal level={newLevel} onClose={closeLevelUpModal} />
      )}
      {showAchievementModal && newAchievement && (
        <AchievementUnlockedModal achievement={newAchievement} onClose={closeAchievementModal} />
      )}
    </div>
  )
}

export default AchievementsPage
