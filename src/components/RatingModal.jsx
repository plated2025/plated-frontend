import { useState } from 'react'
import { X, Star, Heart, ThumbsUp, Send } from 'lucide-react'
import { saveRating, postponeRating, dismissRating } from '../utils/ratingSystem'

function RatingModal({ isOpen, onClose, onRated }) {
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [step, setStep] = useState('rating') // 'rating' or 'feedback' or 'thanks'

  if (!isOpen) return null

  const handleRatingClick = (rating) => {
    setSelectedRating(rating)
    
    // If 4-5 stars, go to thanks screen
    if (rating >= 4) {
      saveRating(rating, '')
      setStep('thanks')
      setTimeout(() => {
        if (onRated) onRated(rating)
        onClose()
      }, 2000)
    } else {
      // If 1-3 stars, ask for feedback
      setStep('feedback')
    }
  }

  const handleSubmitFeedback = () => {
    saveRating(selectedRating, feedback)
    setStep('thanks')
    setTimeout(() => {
      if (onRated) onRated(selectedRating)
      onClose()
    }, 2000)
  }

  const handlePostpone = () => {
    postponeRating()
    onClose()
  }

  const handleDismiss = () => {
    dismissRating()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
        {step === 'rating' && (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-8 text-white text-center relative">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white">
                <Heart size={36} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Enjoying Plated?</h2>
              <p className="text-white/90 text-sm">
                Your feedback helps us create a better experience for food lovers everywhere!
              </p>
            </div>

            {/* Rating Stars */}
            <div className="p-8">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-6 font-semibold">
                How would you rate your experience?
              </p>
              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="group transform transition-all hover:scale-125 focus:scale-125"
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

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handlePostpone}
                  className="w-full px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleDismiss}
                  className="w-full px-4 py-3 text-sm text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all"
                >
                  Don't ask again
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'feedback' && (
          <>
            {/* Feedback Header */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Help Us Improve!</h2>
              <p className="text-white/90 text-sm">
                We'd love to know how we can make your experience better
              </p>
            </div>

            {/* Feedback Form */}
            <div className="p-8">
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    size={24}
                    className={`${
                      selectedRating >= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what could be better... (optional)"
                className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-600 outline-none mb-4"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                {feedback.length}/500 characters
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('rating')}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'thanks' && (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
              <Heart size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Thank You! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your feedback means the world to us!
            </p>
            {selectedRating >= 4 && (
              <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                We're so glad you're enjoying Plated! ❤️
              </p>
            )}
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

export default RatingModal
