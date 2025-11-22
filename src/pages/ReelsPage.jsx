import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Bookmark, Share2, Music, Volume2, VolumeX, MoreVertical, UserPlus, ChevronUp, ChevronDown, Sparkles, ChefHat } from 'lucide-react'

// Mock reels data with sample video URLs
const mockReels = [
  {
    id: 1,
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    creator: {
      id: 1,
      name: 'Chef Maria Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true
    },
    title: 'Perfect Pasta Carbonara in 60 seconds! 🍝',
    description: 'The secret to authentic carbonara is timing and temperature. Watch till the end! #pasta #italianfood #cooking',
    likes: 45200,
    comments: 892,
    saves: 3400,
    audio: 'Italian Vibes - Chef Maria',
    isLiked: false,
    isSaved: false
  },
  {
    id: 2,
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
    creator: {
      id: 2,
      name: 'Gordon Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      verified: true
    },
    title: 'Searing the perfect steak 🥩',
    description: 'Temperature is everything! Get that beautiful crust while keeping the inside juicy. #steak #cooking #foodtok',
    likes: 67800,
    comments: 1234,
    saves: 5600,
    audio: 'Cooking Beats Vol. 1',
    isLiked: false,
    isSaved: false
  },
  {
    id: 3,
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    creator: {
      id: 3,
      name: 'Emma Chen',
      avatar: 'https://i.pravatar.cc/150?img=3',
      verified: true
    },
    title: 'Homemade Ramen from scratch! 🍜',
    description: '48 hour broth, fresh noodles, perfectly soft boiled eggs. This is the ultimate ramen experience! #ramen #asian #foodie',
    likes: 89400,
    comments: 2156,
    saves: 8900,
    audio: 'Asian Cooking Theme',
    isLiked: false,
    isSaved: false
  },
  {
    id: 4,
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    creator: {
      id: 4,
      name: 'Alex Kumar',
      avatar: 'https://i.pravatar.cc/150?img=4',
      verified: true
    },
    title: 'Best Chocolate Cake Recipe 🍰',
    description: 'Moist, rich, and absolutely decadent! This chocolate cake will blow your mind. #chocolate #cake #baking #dessert',
    likes: 52300,
    comments: 678,
    saves: 4200,
    audio: 'Sweet Treats Mix',
    isLiked: false,
    isSaved: false
  },
  {
    id: 5,
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    creator: {
      id: 5,
      name: 'Sophie Laurent',
      avatar: 'https://i.pravatar.cc/150?img=5',
      verified: true
    },
    title: 'Classic Margherita Pizza 🍕',
    description: 'Traditional Italian pizza made with fresh mozzarella, basil, and homemade tomato sauce. Perfection! #pizza #italian #homemade',
    likes: 73500,
    comments: 1423,
    saves: 6100,
    audio: 'Italian Kitchen Vibes',
    isLiked: false,
    isSaved: false
  }
]

function ReelsPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reels, setReels] = useState(mockReels)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showMore, setShowMore] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const startY = useRef(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  const currentReel = reels[currentIndex]

  // Auto-play video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented'))
    }
  }, [currentIndex])

  // Mouse wheel scroll handler
  useEffect(() => {
    let scrollTimeout
    
    const handleWheel = (e) => {
      if (isScrolling) return
      
      e.preventDefault()
      
      if (Math.abs(e.deltaY) > 30) {
        setIsScrolling(true)
        
        if (e.deltaY > 0) {
          // Scroll down - next reel
          setCurrentIndex(prev => prev < mockReels.length - 1 ? prev + 1 : 0)
        } else {
          // Scroll up - previous reel
          setCurrentIndex(prev => prev > 0 ? prev - 1 : mockReels.length - 1)
        }
        
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false)
        }, 500)
      }
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
      clearTimeout(scrollTimeout)
    }
  }, [isScrolling])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrentIndex(prev => prev > 0 ? prev - 1 : mockReels.length - 1)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCurrentIndex(prev => prev < mockReels.length - 1 ? prev + 1 : 0)
      } else if (e.key === ' ') {
        e.preventDefault()
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play()
            setIsPlaying(true)
          } else {
            videoRef.current.pause()
            setIsPlaying(false)
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNext = () => {
    setShowMore(false)
    setShowComments(false)
    setShowShare(false)
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Loop back to first reel
      setCurrentIndex(0)
    }
  }

  const handlePrevious = () => {
    setShowMore(false)
    setShowComments(false)
    setShowShare(false)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      // Loop to last reel
      setCurrentIndex(reels.length - 1)
    }
  }

  // Touch/Swipe gestures
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY
    const diff = startY.current - endY

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        handleNext()
      } else {
        handlePrevious()
      }
    }
  }

  // Toggle play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Toggle mute
  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleLike = () => {
    setReels(reels.map((reel, idx) => 
      idx === currentIndex 
        ? { 
            ...reel, 
            isLiked: !reel.isLiked,
            likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
          }
        : reel
    ))
  }

  const handleSave = () => {
    setReels(reels.map((reel, idx) => 
      idx === currentIndex 
        ? { 
            ...reel, 
            isSaved: !reel.isSaved,
            saves: reel.isSaved ? reel.saves - 1 : reel.saves + 1
          }
        : reel
    ))
  }

  const handleComment = () => {
    setShowComments(true)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num
  }

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 bg-black overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Status Bar Overlay */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Bottom Safe Area */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

      {/* Video Display */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          key={currentReel.id}
          src={currentReel.video}
          poster={currentReel.thumbnail}
          className="w-full h-full object-cover"
          onClick={handleVideoClick}
          autoPlay
          loop
          playsInline
          muted={isMuted}
        />

        {/* Play/Pause indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
              <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-1"></div>
            </div>
          </div>
        )}

        {/* Swipe Hints - Show on first load */}
        {currentIndex === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-fade-in-out">
            <div className="flex flex-col items-center gap-8">
              <ChevronUp className="text-white/60 animate-bounce" size={40} />
              <p className="text-white/80 text-sm font-semibold">Swipe or Scroll</p>
              <ChevronDown className="text-white/60 animate-bounce animation-delay-500" size={40} />
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
          <button
            onClick={() => navigate(-1)}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronDown size={28} />
          </button>
        </div>

        {/* Creator Info - Left Bottom */}
        <div className="absolute bottom-24 left-4 right-24 text-white z-20 space-y-3">
          {/* Creator Profile */}
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <img 
                src={currentReel.creator.avatar} 
                alt={currentReel.creator.name}
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => navigate(`/profile/${currentReel.creator.id}`)}
              />
              {currentReel.creator.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-base text-white drop-shadow-lg">{currentReel.creator.name}</p>
              <p className="text-xs text-white opacity-90 drop-shadow-lg">@{currentReel.creator.name.toLowerCase().replace(/\s/g, '')}</p>
            </div>
            {!isFollowing && (
              <button
                onClick={() => setIsFollowing(true)}
                className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-full font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                Follow
              </button>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <p className="font-bold text-base text-white drop-shadow-lg leading-tight">{currentReel.title}</p>
            <p className={`text-sm text-white opacity-90 drop-shadow-lg leading-snug ${!showMore && 'line-clamp-2'}`}>
              {currentReel.description}
            </p>
            {currentReel.description.length > 100 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-sm font-semibold text-white opacity-80 drop-shadow-lg"
              >
                {showMore ? 'Show less' : 'more...'}
              </button>
            )}
          </div>

          {/* Audio Info */}
          <div className="flex items-center gap-2 text-xs text-white">
            <Music size={14} className="animate-spin-slow" />
            <p className="text-white opacity-90 drop-shadow-lg truncate">Original Audio - {currentReel.audio}</p>
          </div>

          {/* Recipe Link Button */}
          <button className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-semibold text-sm text-white hover:bg-white/30 transition-all inline-flex w-fit drop-shadow-lg">
            <ChefHat size={16} />
            View Full Recipe
          </button>
        </div>

        {/* Actions - Right Side */}
        <div className="absolute right-3 bottom-24 flex flex-col gap-6 z-20">
          {/* Like Button */}
          <button 
            onClick={handleLike}
            className="flex flex-col items-center group"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full transition-all group-hover:scale-110 ${currentReel.isLiked ? 'bg-red-500/20' : 'bg-white/10'}`} />
              <Heart 
                size={32} 
                className={`relative z-10 transition-all ${currentReel.isLiked ? 'fill-red-500 text-red-500 animate-like-bounce' : 'text-white group-hover:scale-110'}`}
                strokeWidth={2.5}
              />
            </div>
            <span className="text-xs mt-2 font-bold text-white drop-shadow-lg">{formatNumber(currentReel.likes)}</span>
          </button>

          {/* Comment Button */}
          <button 
            onClick={handleComment}
            className="flex flex-col items-center group"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/10 transition-all group-hover:scale-110" />
              <MessageCircle 
                size={32} 
                className="relative z-10 text-white transition-all group-hover:scale-110"
                strokeWidth={2.5}
              />
            </div>
            <span className="text-xs mt-2 font-bold text-white drop-shadow-lg">{formatNumber(currentReel.comments)}</span>
          </button>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            className="flex flex-col items-center group"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full transition-all group-hover:scale-110 ${currentReel.isSaved ? 'bg-yellow-500/20' : 'bg-white/10'}`} />
              <Bookmark 
                size={32} 
                className={`relative z-10 transition-all ${currentReel.isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-white group-hover:scale-110'}`}
                strokeWidth={2.5}
              />
            </div>
            <span className="text-xs mt-2 font-bold text-white drop-shadow-lg">{formatNumber(currentReel.saves)}</span>
          </button>

          {/* Share Button */}
          <button 
            onClick={() => setShowShare(true)}
            className="flex flex-col items-center group"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/10 transition-all group-hover:scale-110" />
              <Share2 
                size={28} 
                className="relative z-10 text-white transition-all group-hover:scale-110"
                strokeWidth={2.5}
              />
            </div>
            <span className="text-xs mt-2 font-bold text-white drop-shadow-lg">Share</span>
          </button>

          {/* More Options */}
          <button 
            className="flex flex-col items-center group"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/10 transition-all group-hover:scale-110" />
              <MoreVertical 
                size={28} 
                className="relative z-10 text-white transition-all group-hover:scale-110"
                strokeWidth={2.5}
              />
            </div>
          </button>

          {/* Creator Avatar (Spinning Record Style) */}
          <div className="relative mt-4">
            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden animate-spin-slow">
              <img 
                src={currentReel.creator.avatar} 
                alt={currentReel.creator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Volume Control */}
        <button
          onClick={handleMuteToggle}
          className="absolute top-20 right-4 text-white p-3 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all z-20"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        {/* Progress Dots */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {mockReels.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-0.5 rounded-full transition-all cursor-pointer hover:bg-white ${
                idx === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end animate-slide-up">
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Share</h3>
              <button
                onClick={() => setShowShare(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-4 gap-6 mb-6">
              {[
                { icon: '📱', label: 'WhatsApp', color: 'bg-green-500' },
                { icon: '💬', label: 'Messages', color: 'bg-blue-500' },
                { icon: '📧', label: 'Email', color: 'bg-red-500' },
                { icon: '🔗', label: 'Copy Link', color: 'bg-gray-500' }
              ].map((option) => (
                <button
                  key={option.label}
                  className="flex flex-col items-center gap-2"
                  onClick={() => {
                    alert(`Sharing via ${option.label}...`)
                    setShowShare(false)
                  }}
                >
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center text-2xl`}>
                    {option.icon}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl w-full max-h-[70vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                {currentReel.comments} Comments
              </h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3">
                <img 
                  src="https://i.pravatar.cc/150?img=10" 
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">@foodlover23</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">This looks amazing! 😍</p>
                  </div>
                  <div className="flex gap-4 mt-1 px-3">
                    <button className="text-xs text-gray-500 dark:text-gray-400">2h ago</button>
                    <button className="text-xs text-gray-500 dark:text-gray-400 font-medium hover:text-primary-600">Reply</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <img 
                  src="https://i.pravatar.cc/150?img=11" 
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">@chefmaster</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Can you share the recipe? 🙏</p>
                  </div>
                  <div className="flex gap-4 mt-1 px-3">
                    <button className="text-xs text-gray-500 dark:text-gray-400">5h ago</button>
                    <button className="text-xs text-gray-500 dark:text-gray-400 font-medium hover:text-primary-600">Reply</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <img 
                  src="https://i.pravatar.cc/150?img=12" 
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">@healthyeats</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Love your content! Keep it up 🔥</p>
                  </div>
                  <div className="flex gap-4 mt-1 px-3">
                    <button className="text-xs text-gray-500 dark:text-gray-400">1d ago</button>
                    <button className="text-xs text-gray-500 dark:text-gray-400 font-medium hover:text-primary-600">Reply</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex gap-3">
                <img 
                  src="https://i.pravatar.cc/150?img=0" 
                  alt="You"
                  className="w-8 h-8 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
                <button className="text-primary-600 font-semibold">Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReelsPage
