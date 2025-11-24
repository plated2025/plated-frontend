import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Bookmark, Share2, Calendar, Clock, Users, ChefHat, Send } from 'lucide-react'
// Recipe details fetched from backend API

function RecipeDetailPage() {
  const { recipeId } = useParams()
  const navigate = useNavigate()
  
  // TODO: Fetch recipe from backend API using recipeId
  const recipe = null
  
  // If recipe doesn't exist or is still loading
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900 dark:text-gray-100 mb-4">Recipe not found or loading...</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }
  
  const [isLiked, setIsLiked] = useState(recipe.isLiked || false)
  const [isSaved, setIsSaved] = useState(recipe.isSaved || false)
  const [activeTab, setActiveTab] = useState('ingredients')
  const [comment, setComment] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [comments, setComments] = useState([
    { id: 1, user: mockUsers[0], text: 'This looks absolutely delicious! Can\'t wait to try it!', time: '2h ago', likes: 0, isLiked: false, replies: [] },
    { id: 2, user: mockUsers[1], text: 'I made this yesterday and my family loved it!', time: '5h ago', likes: 0, isLiked: false, replies: [] },
    { id: 3, user: mockUsers[2], text: 'What can I use instead of butter?', time: '1d ago', likes: 0, isLiked: false, replies: [] }
  ])

  const handleAddToPlanner = () => {
    navigate('/planner')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href
      })
    }
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        user: { name: 'You', avatar: 'https://i.pravatar.cc/150?img=0' },
        text: comment,
        time: 'Just now',
        likes: 0,
        isLiked: false,
        replies: []
      }
      setComments([newComment, ...comments])
      setComment('')
    }
  }

  const handleLikeComment = (commentId) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1
        }
      }
      return c
    }))
  }

  const handleReply = (commentId) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        user: { name: 'You', avatar: 'https://i.pravatar.cc/150?img=0' },
        text: replyText,
        time: 'Just now',
        likes: 0,
        isLiked: false
      }
      setComments(comments.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReply]
          }
        }
        return c
      }))
      setReplyText('')
      setReplyingTo(null)
    }
  }

  const handleLikeReply = (commentId, replyId) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: c.replies.map(r => {
            if (r.id === replyId) {
              return {
                ...r,
                isLiked: !r.isLiked,
                likes: r.isLiked ? r.likes - 1 : r.likes + 1
              }
            }
            return r
          })
        }
      }
      return c
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header Image */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-cover"
        />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center shadow-lg text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center shadow-lg text-white"
            >
              <Heart size={20} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center shadow-lg text-white"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 rounded-t-3xl -mt-6 relative z-10">
        <div className="px-6 py-6">
          {/* Title & Creator */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{recipe.title}</h1>
          
          <div className="flex items-center justify-between mb-6">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/profile/${recipe.creator.id}`)}
            >
              <img
                src={recipe.creator.avatar}
                alt={recipe.creator.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{recipe.creator.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{recipe.creator.specialty}</p>
              </div>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">Follow</button>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-center">
              <Clock size={20} className="mx-auto text-primary-600 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Prep Time</p>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{recipe.cookTime}</p>
            </div>
            <div className="text-center">
              <Users size={20} className="mx-auto text-primary-600 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Servings</p>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{recipe.servings}</p>
            </div>
            <div className="text-center">
              <ChefHat size={20} className="mx-auto text-primary-600 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Difficulty</p>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{recipe.difficulty}</p>
            </div>
          </div>

          {/* Add to Planner Button */}
          <button
            onClick={handleAddToPlanner}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <Calendar size={20} />
            Add to Meal Planner
          </button>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === 'ingredients'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === 'instructions'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Instructions
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === 'comments'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Comments ({comments.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-900 dark:text-gray-100">{ingredient.item}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{ingredient.amount}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4">
              {recipe.steps?.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'comments' && (
            <div>
              {/* Comment Input */}
              <div className="mb-6 flex gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=0"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id}>
                    <div className="flex gap-3">
                      <img
                        src={c.user.avatar}
                        alt={c.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">{c.user.name}</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{c.text}</p>
                        </div>
                        <div className="flex gap-4 mt-1 px-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{c.time}</span>
                          <button 
                            onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 font-medium"
                          >
                            Reply
                          </button>
                          <button 
                            onClick={() => handleLikeComment(c.id)}
                            className={`text-xs font-medium transition-colors ${
                              c.isLiked 
                                ? 'text-red-600 dark:text-red-400' 
                                : 'text-gray-500 dark:text-gray-400 hover:text-red-600'
                            }`}
                          >
                            Like {c.likes > 0 && `(${c.likes})`}
                          </button>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === c.id && (
                          <div className="mt-3 flex gap-2 pl-3">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleReply(c.id)}
                              placeholder={`Reply to ${c.user.name}...`}
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                              autoFocus
                            />
                            <button
                              onClick={() => handleReply(c.id)}
                              disabled={!replyText.trim()}
                              className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                            >
                              Send
                            </button>
                            <button
                              onClick={() => {
                                setReplyingTo(null)
                                setReplyText('')
                              }}
                              className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        {/* Replies */}
                        {c.replies && c.replies.length > 0 && (
                          <div className="mt-3 pl-6 space-y-3">
                            {c.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-2">
                                <img
                                  src={reply.user.avatar}
                                  alt={reply.user.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                                    <p className="font-semibold text-xs text-gray-900 dark:text-gray-100 mb-1">{reply.user.name}</p>
                                    <p className="text-gray-700 dark:text-gray-300 text-xs">{reply.text}</p>
                                  </div>
                                  <div className="flex gap-3 mt-1 px-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{reply.time}</span>
                                    <button 
                                      onClick={() => handleLikeReply(c.id, reply.id)}
                                      className={`text-xs font-medium transition-colors ${
                                        reply.isLiked 
                                          ? 'text-red-600 dark:text-red-400' 
                                          : 'text-gray-500 dark:text-gray-400 hover:text-red-600'
                                      }`}
                                    >
                                      Like {reply.likes > 0 && `(${reply.likes})`}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailPage
