import { useState } from 'react'
import { X, Type, Send } from 'lucide-react'

function ReshareToStoryModal({ isOpen, onClose, content }) {
  const [caption, setCaption] = useState('')
  const [isSharing, setIsSharing] = useState(false)

  if (!isOpen) return null

  const handleShare = async () => {
    setIsSharing(true)
    // Simulate sharing
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSharing(false)
    onClose()
    // Show success message (you can add a toast notification here)
    alert('Shared to your story!')
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      {/* Preview */}
      <div className="relative max-w-md w-full aspect-[9/16] bg-black rounded-xl overflow-hidden">
        {/* Content Preview */}
        <div className="absolute inset-0">
          {content.type === 'story' && (
            <img
              src={content.url}
              alt="Story"
              className="w-full h-full object-cover"
            />
          )}
          {content.type === 'post' && (
            <img
              src={content.image}
              alt="Post"
              className="w-full h-full object-cover"
            />
          )}
          {content.type === 'reel' && (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">Reel Preview</p>
            </div>
          )}
        </div>

        {/* Attribution */}
        <div className="absolute top-4 left-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2">
          <img
            src={content.user.avatar}
            alt={content.user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white text-sm font-medium flex-1">
            {content.user.name}
          </span>
        </div>

        {/* Caption Input */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-3 flex items-center gap-2 border border-white/20">
            <Type size={18} className="text-white/60" />
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add to your story"
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-sm"
              maxLength={100}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white border border-white/20"
        >
          <X size={20} />
        </button>
      </div>

      {/* Share Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-full transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Send size={18} />
          {isSharing ? 'Sharing...' : 'Share to Your Story'}
        </button>
      </div>
    </div>
  )
}

export default ReshareToStoryModal
