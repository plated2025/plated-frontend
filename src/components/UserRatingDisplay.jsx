import { useState } from 'react'
import { Star, ChevronDown, ChevronUp } from 'lucide-react'
import { getRatingStats, getRatingPercentages } from '../utils/userRatingSystem'

function UserRatingDisplay({ userId, onRateClick }) {
  const [expanded, setExpanded] = useState(false)
  const stats = getRatingStats(userId)
  const percentages = getRatingPercentages(userId)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
      {/* Rating Summary */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Ratings & Reviews</h3>
          {stats.total > 0 ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{stats.average}</span>
                <Star size={32} className="text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold">{stats.total} {stats.total === 1 ? 'rating' : 'ratings'}</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={`${
                        star <= Math.round(stats.average)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No ratings yet</p>
          )}
        </div>
        
        <button
          onClick={onRateClick}
          className="px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all shadow-md text-sm flex items-center gap-2"
        >
          <Star size={16} />
          Rate
        </button>
      </div>

      {/* Rating Breakdown */}
      {stats.total > 0 && (
        <div className="mb-6">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
                    style={{ width: `${percentages[rating]}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                  {stats.breakdown[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews List */}
      {stats.ratings.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full py-3 border-t border-gray-200 dark:border-gray-700"
          >
            <span className="font-semibold text-gray-900 dark:text-white">
              Recent Reviews ({stats.ratings.length})
            </span>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {expanded && (
            <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
              {stats.ratings.map((rating, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={rating.raterAvatar}
                      alt={rating.raterName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {rating.raterName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(rating.date)}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={`${
                              star <= rating.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {rating.review && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {rating.review}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserRatingDisplay
