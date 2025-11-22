import { useState } from 'react'
import { X, Star, User, Send } from 'lucide-react'
import { rateUser, getCurrentUserRating } from '../utils/userRatingSystem'

function RateUserModal({ isOpen, onClose, targetUser, currentUser, onRated }) {
  const existingRating = getCurrentUserRating(targetUser?.id, currentUser?.id)
  
  const [selectedRating, setSelectedRating] = useState(existingRating?.rating || 0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState(existingRating?.review || '')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !targetUser) return null

  const handleSubmit = () => {
    if (selectedRating === 0) {
      alert('Please select a rating')
      return
    }

    const raterInfo = {
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar
    }

    rateUser(targetUser.id, raterInfo, selectedRating, review)
    
    setSubmitted(true)
    setTimeout(() => {
      if (onRated) onRated(selectedRating)
      onClose()
      setSubmitted(false)
    }, 1500)
  }

  const getRatingLabel = (rating) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    }
    return labels[rating] || 'Select Rating'
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-scale-in">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={targetUser.avatar}
                  alt={targetUser.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold">Rate {targetUser.name}</h2>
                  <p className="text-white/90 text-sm">Share your experience</p>
                </div>
              </div>
            </div>

            {/* Rating Content */}
            <div className="p-6">
              {/* Star Rating */}
              <div className="mb-6">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  How would you rate this creator?
                </p>
                <div className="flex justify-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transform transition-all hover:scale-125 focus:scale-125"
                    >
                      <Star
                        size={48}
                        className={`transition-all ${
                          (hoveredRating || selectedRating) >= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center font-bold text-lg text-primary-600 dark:text-primary-400">
                  {selectedRating > 0 ? getRatingLabel(selectedRating) : 'No rating selected'}
                </p>
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Write a Review (Optional)
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your thoughts about their recipes, cooking style, or overall content quality..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-600 outline-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {review.length}/500 characters
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {existingRating ? 'Updating your rating' : 'Your rating will be public'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedRating === 0}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {existingRating ? 'Update Rating' : 'Submit Rating'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <Star size={48} className="text-white fill-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Rating Submitted! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your feedback!
            </p>
          </div>
        )}
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
      `}</style>
    </div>
  )
}

export default RateUserModal
