import { useState, useEffect, useRef } from 'react'
import { X, Mic, MicOff, Video, VideoOff, MessageCircle, MoreVertical, User, Camera, Settings } from 'lucide-react'

function CookingSessionModal({ isOpen, onClose, onEndCall, otherUser }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [duration, setDuration] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Start call timer
      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    } else {
      // Clear timer on close
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setDuration(0)
      setIsMuted(false)
      setIsVideoOff(false)
      setShowChat(false)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    onEndCall(duration)
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="text-white font-bold">{otherUser.name}</h3>
              <p className="text-white/80 text-sm">{formatDuration(duration)}</p>
            </div>
          </div>
          <button
            onClick={handleEndCall}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900">
        {/* Main Video (Other User) */}
        <div className="w-full h-full flex items-center justify-center">
          {!isVideoOff ? (
            <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
              {/* Placeholder for actual video */}
              <div className="text-center">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={64} className="text-white/60" />
                </div>
                <p className="text-white/60 text-lg">Camera is on</p>
                <p className="text-white/40 text-sm">Cooking with {otherUser.name}</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <VideoOff size={64} className="text-gray-400" />
              </div>
              <p className="text-gray-300 text-lg">Camera is off</p>
            </div>
          )}
        </div>

        {/* Self Video (Picture-in-Picture) */}
        <div className="absolute top-20 right-6 w-32 h-40 bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
          <div className="w-full h-full bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center">
            <div className="text-center">
              <User size={32} className="text-white/60 mx-auto" />
              <p className="text-white/60 text-xs mt-1">You</p>
            </div>
          </div>
        </div>

        {/* In-Call Chat */}
        {showChat && (
          <div className="absolute bottom-56 md:bottom-44 right-3 md:right-6 w-full max-w-[calc(100%-1.5rem)] md:w-80 md:max-w-80 h-[300px] md:h-[380px] max-h-[calc(100vh-350px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden z-30">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-purple-600">
              <h3 className="font-bold text-white">Chat</h3>
              <button
                onClick={() => setShowChat(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-8">
                💬 Send text messages during the call...
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      alert(`Message sent: ${chatMessage}`)
                      setChatMessage('')
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-600"
                />
                <button
                  onClick={() => {
                    if (chatMessage.trim()) {
                      alert(`Message sent: ${chatMessage}`)
                      setChatMessage('')
                    }
                  }}
                  className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* More Options Menu */}
        {showMoreOptions && (
          <div className="absolute bottom-56 md:bottom-44 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-1.5rem)] md:w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl py-2 z-20">
            <button
              onClick={() => {
                alert('🎥 Switching camera...')
                setShowMoreOptions(false)
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
            >
              <Video size={18} />
              Switch Camera
            </button>
            <button
              onClick={() => {
                alert('📸 Screenshot saved!')
                setShowMoreOptions(false)
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
            >
              <Camera size={18} />
              Take Screenshot
            </button>
            <button
              onClick={() => {
                alert('⚙️ Opening settings...')
                setShowMoreOptions(false)
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
            >
              <Settings size={18} />
              Call Settings
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pb-24 md:pb-6">
        <div className="flex items-center justify-center gap-4">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${
              isMuted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
          </button>

          {/* Video Toggle */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-full transition-all ${
              isVideoOff
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            {isVideoOff ? <VideoOff size={24} className="text-white" /> : <Video size={24} className="text-white" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="p-5 bg-red-600 hover:bg-red-700 rounded-full transition-all shadow-lg"
          >
            <X size={28} className="text-white" />
          </button>

          {/* Chat Toggle */}
          <button
            onClick={() => {
              setShowChat(!showChat)
              setShowMoreOptions(false)
            }}
            className={`p-4 backdrop-blur-sm rounded-full transition-all ${
              showChat ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <MessageCircle size={24} className="text-white" />
          </button>

          {/* More Options */}
          <button 
            onClick={() => {
              setShowMoreOptions(!showMoreOptions)
              setShowChat(false)
            }}
            className={`p-4 backdrop-blur-sm rounded-full transition-all ${
              showMoreOptions ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <MoreVertical size={24} className="text-white" />
          </button>
        </div>

        {/* Call Info */}
        <div className="text-center mt-4">
          <p className="text-white/80 text-sm">
            🍳 Private Cooking Session • {formatDuration(duration)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CookingSessionModal
