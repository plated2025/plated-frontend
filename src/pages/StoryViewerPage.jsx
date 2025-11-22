import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Heart, Send, Share2 } from 'lucide-react'
import { mockStories } from '../data/mockData'
import ReshareToStoryModal from '../components/ReshareToStoryModal'

function StoryViewerPage() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [message, setMessage] = useState('')
  const [showReshareModal, setShowReshareModal] = useState(false)

  const userStories = mockStories.find(s => s.user.id === parseInt(userId))
  
  // Handle invalid userId in useEffect to avoid state update during render
  useEffect(() => {
    if (!userStories) {
      navigate('/')
    }
  }, [userStories, navigate])

  if (!userStories) {
    return null
  }

  const currentStory = userStories.stories[currentStoryIndex]
  const totalStories = userStories.stories.length

  const handleNext = () => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(prev => prev + 1)
      setProgress(0)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Check if this is the last story
          if (currentStoryIndex < totalStories - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1)
          } else {
            navigate('/')
          }
          return 0
        }
        return prev + 1
      })
    }, 50) // 5 seconds per story

    return () => clearInterval(interval)
  }, [isPaused, currentStoryIndex, totalStories, navigate])

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1)
      setProgress(0)
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Story Image/Video */}
      <img
        src={currentStory.url}
        alt="Story"
        className="w-full h-full object-contain"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      />

      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
        {userStories.stories.map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index < currentStoryIndex ? '100%' : 
                       index === currentStoryIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Top Bar */}
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img
            src={userStories.user.avatar}
            alt={userStories.user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h3 className="text-white font-semibold text-sm">{userStories.user.name}</h3>
            <p className="text-white/80 text-xs">{currentStory.timestamp}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Areas */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-0 bottom-0 w-1/3"
        disabled={currentStoryIndex === 0}
      />
      <button
        onClick={handleNext}
        className="absolute right-0 top-0 bottom-0 w-1/3"
      />

      {/* Caption */}
      {currentStory.caption && (
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <p className="text-white text-center bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full">
            {currentStory.caption}
          </p>
        </div>
      )}

      {/* Message Input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send message"
            className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white"
          >
            <Send size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
            <Heart size={20} />
          </button>
          <button 
            onClick={() => setShowReshareModal(true)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Reshare Modal */}
      <ReshareToStoryModal
        isOpen={showReshareModal}
        onClose={() => setShowReshareModal(false)}
        content={{
          type: 'story',
          url: currentStory.url,
          user: userStories.user
        }}
      />
    </div>
  )
}

export default StoryViewerPage
