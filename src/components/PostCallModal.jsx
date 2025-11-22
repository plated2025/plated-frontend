import { useState } from 'react'
import { X, Download, Star, Flag, Heart, Share2, Calendar, MessageCircle, ThumbsUp } from 'lucide-react'

function PostCallModal({ isOpen, onClose, callData }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [saved, setSaved] = useState(false)

  if (!isOpen || !callData) return null

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const handleSaveVideo = () => {
    setSaved(true)
    setTimeout(() => {
      alert('✅ Video saved to your library! You can find it in your profile.')
    }, 500)
  }

  const handleSubmitRating = () => {
    console.log('Rating:', rating, 'Feedback:', feedback)
    // In production, send to backend
    alert(`Thank you for rating ${callData.user.name}! Your ${rating}-star rating has been saved.`)
    onClose()
  }

  const handleReport = () => {
    const reason = prompt('Please tell us what went wrong:')
    if (reason) {
      console.log('Report:', { user: callData.user.name, reason })
      alert('Report submitted. We\'ll review it shortly and take appropriate action.')
    }
  }

  const handleShare = () => {
    alert('📤 Share this cooking session on your profile! (Coming soon)')
  }

  const handleScheduleNext = () => {
    alert(`📅 Schedule another cooking session with ${callData.user.name}! (Calendar picker coming soon)`)
  }

  const handleMessage = () => {
    alert(`💬 Opening chat with ${callData.user.name}...`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Cooking Session Ended</h2>
            <p className="text-white/90 text-sm">
              You cooked with {callData.user.name} for {formatDuration(callData.duration)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSaveVideo}
              className={`p-4 rounded-xl border-2 transition-all ${
                saved
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-600'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-600'
              }`}
            >
              <Download size={24} className={`mx-auto mb-2 ${saved ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'}`} />
              <p className={`text-sm font-semibold ${saved ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                {saved ? 'Saved!' : 'Save Video'}
              </p>
            </button>

            <button 
              onClick={handleShare}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-600 transition-all"
            >
              <Share2 size={24} className="text-gray-600 dark:text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Share</p>
            </button>

            <button 
              onClick={handleScheduleNext}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-600 transition-all"
            >
              <Calendar size={24} className="text-gray-600 dark:text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Schedule Next</p>
            </button>

            <button 
              onClick={handleMessage}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-600 transition-all"
            >
              <MessageCircle size={24} className="text-gray-600 dark:text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Message</p>
            </button>
          </div>

          {/* Rating Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Rate This Session</h3>
            
            {/* Stars */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transform transition-all hover:scale-125"
                >
                  <Star
                    size={36}
                    className={`transition-all ${
                      (hoveredRating || rating) >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Feedback */}
            {rating > 0 && (
              <div className="space-y-3">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience... (optional)"
                  className="w-full h-24 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-600 outline-none"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                  {feedback.length}/200
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleReport}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border border-gray-300 dark:border-gray-700 hover:border-red-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Flag size={18} />
              Report Issue
            </button>
            {rating > 0 && (
              <button
                onClick={handleSubmitRating}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg"
              >
                Submit Rating
              </button>
            )}
          </div>

          {rating === 0 && (
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
            >
              Skip for Now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCallModal
