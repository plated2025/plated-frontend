import { useState, useEffect } from 'react'
import { Flame, Award, Trophy, Star, Zap, Target } from 'lucide-react'

function AchievementStreak() {
  const [streak, setStreak] = useState(7)
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    // Load streak from localStorage
    const savedStreak = localStorage.getItem('cookingStreak')
    if (savedStreak) {
      setStreak(parseInt(savedStreak))
    }
  }, [])

  const achievements = [
    { icon: Flame, label: 'Cooking Streak', value: `${streak} days`, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { icon: Trophy, label: 'Recipes Tried', value: '23', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { icon: Star, label: 'Level', value: 'Chef', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { icon: Zap, label: 'Points', value: '1,247', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' }
  ]

  const weeklyGoal = {
    current: 3,
    target: 5,
    label: 'Cook 5 new recipes this week'
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award size={18} className="text-yellow-500" />
            Your Progress
          </h3>
          <button
            onClick={() => setShowAchievement(!showAchievement)}
            className="text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            {showAchievement ? 'Hide' : 'View All'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className={`${achievement.bg} rounded-xl p-3 text-center`}
            >
              <achievement.icon size={20} className={`${achievement.color} mx-auto mb-1`} />
              <p className="text-xs font-bold text-gray-900 dark:text-white">{achievement.value}</p>
              <p className="text-[9px] text-gray-600 dark:text-gray-400 leading-tight">{achievement.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Goal Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-primary-600" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Weekly Challenge</p>
            </div>
            <p className="text-xs font-bold text-primary-600">
              {weeklyGoal.current}/{weeklyGoal.target}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(weeklyGoal.current / weeklyGoal.target) * 100}%` }}
            />
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {weeklyGoal.label}
          </p>
        </div>

        {/* Streak Fire Animation */}
        {streak >= 7 && (
          <div className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={24} className="animate-bounce" />
                <div>
                  <p className="font-bold">🔥 On Fire!</p>
                  <p className="text-xs opacity-90">You're crushing it this week!</p>
                </div>
              </div>
              <div className="text-2xl font-bold">{streak}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AchievementStreak
