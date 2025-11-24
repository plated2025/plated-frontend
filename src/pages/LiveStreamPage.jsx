import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Users, Heart, MessageCircle, Send, Camera, CameraOff } from 'lucide-react'
import { useApp } from '../context/AppContext'

function LiveStreamPage() {
  const navigate = useNavigate()
  const { currentUser } = useApp()
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 500) + 50)
  const [likes, setLikes] = useState(0)
  const [comment, setComment] = useState('')
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [comments, setComments] = useState([
    { id: 1, user: 'FoodLover23', text: 'This looks amazing! 😍', time: Date.now() - 5000 },
    { id: 2, user: 'ChefMike', text: 'What temperature?', time: Date.now() - 3000 },
    { id: 3, user: 'CookingQueen', text: 'Following along!', time: Date.now() - 1000 }
  ])

  // Start camera on mount
  useEffect(() => {
    startCamera()
    
    return () => {
      stopCamera()
    }
  }, [])

  // Simulate viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.max(1, prev + Math.floor(Math.random() * 10) - 4))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }, 
        audio: true 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraOn(true)
        setCameraError(null)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      setCameraError('Could not access camera. Please check permissions.')
      setIsCameraOn(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setIsCameraOn(false)
    }
  }

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera()
    } else {
      startCamera()
    }
  }

  const handleSendComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: currentUser?.name || 'You',
        text: comment,
        time: Date.now()
      }
      setComments([...comments, newComment])
      setComment('')
    }
  }

  const handleLike = () => {
    setLikes(prev => prev + 1)
  }

  const handleEndStream = () => {
    if (confirm('Are you sure you want to end the live stream?')) {
      stopCamera()
      navigate('/')
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Video Area */}
      <div className="relative h-full">
        {/* Real Video Feed */}
        {isCameraOn ? (
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-white text-center px-4">
              <div className="w-32 h-32 mx-auto mb-4 bg-primary-600 rounded-full flex items-center justify-center">
                <Camera size={64} />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {cameraError ? 'Camera Unavailable' : 'Starting Camera...'}
              </h2>
              {cameraError ? (
                <div>
                  <p className="text-gray-300 mb-4">{cameraError}</p>
                  <button 
                    onClick={startCamera}
                    className="btn-primary"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <p className="text-gray-300">Please allow camera access</p>
              )}
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-red-600 rounded-full text-white text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
              <div className="px-3 py-1 bg-black/50 rounded-full text-white text-sm flex items-center gap-1">
                <Users size={16} />
                {viewers}
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="absolute top-20 left-4 right-4">
          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <img
              src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=0'}
              alt={currentUser?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{currentUser?.name || 'Live Cook'}</h3>
              <p className="text-gray-300 text-sm">Cooking French Croissants</p>
            </div>
          </div>
        </div>

        {/* Comments Feed */}
        <div className="absolute bottom-32 left-4 right-4 max-h-64 overflow-hidden">
          <div className="space-y-2">
            {comments.slice(-5).map(c => (
              <div
                key={c.id}
                className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 max-w-xs animate-fade-in"
              >
                <p className="text-white text-sm">
                  <span className="font-semibold">{c.user}: </span>
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          {/* Like Button */}
          <div className="flex justify-end mb-3">
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                <Heart size={24} className="fill-white" />
              </div>
              <span className="text-white text-xs font-semibold">{likes}</span>
            </button>
          </div>

          {/* Camera Toggle */}
          <div className="flex justify-center mb-3">
            <button
              onClick={toggleCamera}
              className={`px-4 py-2 rounded-full flex items-center gap-2 font-semibold transition-colors ${
                isCameraOn 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isCameraOn ? <Camera size={20} /> : <CameraOff size={20} />}
              {isCameraOn ? 'Camera On' : 'Camera Off'}
            </button>
          </div>

          {/* Comment Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              onClick={handleSendComment}
              disabled={!comment.trim()}
              className="w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>

          {/* End Stream Button */}
          <button
            onClick={handleEndStream}
            className="w-full mt-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            End Live Stream
          </button>
        </div>
      </div>
    </div>
  )
}

export default LiveStreamPage
