import { useState } from 'react'
import { X, Heart, Send } from 'lucide-react'

function CommentsModal({ isOpen, onClose, reel }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5',
        verified: false
      },
      text: 'This looks absolutely delicious! 😍',
      likes: 24,
      isLiked: false,
      timestamp: '2h ago'
    },
    {
      id: 2,
      user: {
        name: 'Chef Marcus',
        avatar: 'https://i.pravatar.cc/150?img=12',
        verified: true
      },
      text: 'Pro tip: Use cold butter for the best results! 👨‍🍳',
      likes: 89,
      isLiked: true,
      timestamp: '5h ago'
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=9',
        verified: false
      },
      text: 'Can you share the full recipe?',
      likes: 12,
      isLiked: false,
      timestamp: '8h ago'
    },
    {
      id: 4,
      user: {
        name: 'David Lee',
        avatar: 'https://i.pravatar.cc/150?img=14',
        verified: false
      },
      text: 'Made this last night, turned out amazing! Thanks for sharing 🙌',
      likes: 45,
      isLiked: false,
      timestamp: '12h ago'
    }
  ])

  const handleLikeComment = (commentId) => {
    setComments(comments.map(c => 
      c.id === commentId 
        ? { 
            ...c, 
            isLiked: !c.isLiked,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1
          }
        : c
    ))
  }

  const handleSendComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: {
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=10',
          verified: false
        },
        text: comment,
        likes: 0,
        isLiked: false,
        timestamp: 'Just now'
      }
      setComments([newComment, ...comments])
      setComment('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendComment()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-3xl max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              Comments ({comments.length})
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                {/* Avatar */}
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
                
                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {comment.user.name}
                        </span>
                        {comment.user.verified && (
                          <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        )}
                        <span className="text-xs text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 break-words">
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-xs text-gray-600 font-semibold hover:text-gray-900">
                          Reply
                        </button>
                        {comment.likes > 0 && (
                          <span className="text-xs text-gray-500">
                            {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Like Button */}
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex-shrink-0 p-1"
                    >
                      <Heart
                        size={16}
                        className={comment.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/150?img=10"
                alt="Your avatar"
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={handleSendComment}
                  disabled={!comment.trim()}
                  className={`p-1 ${
                    comment.trim() 
                      ? 'text-primary-600' 
                      : 'text-gray-400'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentsModal
