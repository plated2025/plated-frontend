import { X, Flame, Star, Eye, Trophy, TrendingUp, Calendar } from 'lucide-react'

function StatsDetailModal({ statType, onClose }) {
  const statsData = {
    streak: {
      icon: Flame,
      title: 'Cooking Streak',
      value: '12 Days',
      color: 'from-orange-500 to-red-500',
      description: 'Keep cooking every day to maintain your streak!',
      milestones: [
        { days: 7, reached: true, reward: '🔥 Week Warrior' },
        { days: 14, reached: false, reward: '⭐ Two Week Star' },
        { days: 30, reached: false, reward: '🏆 Monthly Master' },
        { days: 100, reached: false, reward: '👑 Centurion Chef' }
      ]
    },
    rating: {
      icon: Star,
      title: 'Average Rating',
      value: '4.8 / 5.0',
      color: 'from-yellow-500 to-orange-500',
      description: 'Based on all your recipe ratings',
      breakdown: [
        { stars: 5, count: 145, percentage: 72 },
        { stars: 4, count: 38, percentage: 19 },
        { stars: 3, count: 12, percentage: 6 },
        { stars: 2, count: 4, percentage: 2 },
        { stars: 1, count: 2, percentage: 1 }
      ]
    },
    views: {
      icon: Eye,
      title: 'Total Views',
      value: '2.5M',
      color: 'from-blue-500 to-cyan-500',
      description: 'Cumulative views across all your content',
      stats: [
        { label: 'This Month', value: '320K', change: '+15%' },
        { label: 'Last Month', value: '278K', change: '+8%' },
        { label: 'Average/Recipe', value: '12.5K', change: '+5%' }
      ]
    },
    level: {
      icon: Trophy,
      title: 'Chef Level',
      value: 'Level 8',
      color: 'from-purple-500 to-pink-500',
      description: 'Earn XP by creating recipes and getting engagement',
      progress: {
        current: 7250,
        needed: 10000,
        percentage: 72.5
      },
      nextRewards: [
        '🎖️ Level 9 Badge',
        '⭐ Premium Features',
        '🎁 Exclusive Templates'
      ]
    }
  }

  const stat = statsData[statType]
  if (!stat) return null

  const StatIcon = stat.icon

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${stat.color} p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <StatIcon size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{stat.title}</h2>
                <p className="text-sm opacity-90">{stat.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-1">{stat.value}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {statType === 'streak' && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Milestones</h3>
              {stat.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl ${
                    milestone.reached
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${
                        milestone.reached ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'
                      }`}>
                        {milestone.days} Days
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.reward}</p>
                    </div>
                    {milestone.reached && (
                      <span className="text-green-600 dark:text-green-400 text-2xl">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {statType === 'rating' && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Rating Breakdown</h3>
              {stat.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-6">
                    {item.stars}★
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}

          {statType === 'views' && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">View Statistics</h3>
              {stat.stats.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <TrendingUp size={16} />
                    <span className="text-sm font-semibold">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {statType === 'level' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progress to Level 9</span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    {stat.progress.current} / {stat.progress.needed} XP
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all"
                    style={{ width: `${stat.progress.percentage}%` }}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Next Level Rewards</h3>
                <div className="space-y-2">
                  {stat.nextRewards.map((reward, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{reward}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatsDetailModal
