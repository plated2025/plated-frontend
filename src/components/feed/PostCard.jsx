import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Bookmark, Share2, MoreVertical, Calendar } from 'lucide-react'
import ReshareToStoryModal from '../ReshareToStoryModal'

function PostCard({ recipe }) {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(recipe.isLiked)
  const [isSaved, setIsSaved] = useState(recipe.isSaved)
  const [likes, setLikes] = useState(recipe.likes)
  const [showMenu, setShowMenu] = useState(false)
  const [showReshareModal, setShowReshareModal] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe: ${recipe.title}`,
          url: window.location.origin + `/recipe/${recipe.id}`
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      const url = window.location.origin + `/recipe/${recipe.id}`
      navigator.clipboard.writeText(url)
      alert('Recipe link copied to clipboard!')
    }
  }

  const handleAddToPlanner = () => {
    navigate('/planner')
  }

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num
  }

  return (
    <article className="bg-white shadow-sm mb-2 lg:rounded-lg lg:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 lg:px-5 py-3.5 lg:py-4">
        <div className="flex items-center gap-3">
          <img
            src={recipe.creator.avatar}
            alt={recipe.creator.name}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => navigate(`/profile/${recipe.creator.id}`)}
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 
                className="font-semibold text-sm text-gray-900 cursor-pointer hover:underline"
                onClick={() => navigate(`/profile/${recipe.creator.id}`)}
              >
                {recipe.creator.name}
              </h3>
              {recipe.creator.verified && (
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
            <p className="text-xs text-gray-500">{recipe.creator.specialty}</p>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-600 hover:text-gray-900"
          >
            <MoreVertical size={20} />
          </button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <button
                  onClick={() => {
                    setShowMenu(false)
                    alert('Report post functionality')
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  Report Post
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    navigator.clipboard.writeText(window.location.origin + `/recipe/${recipe.id}`)
                    alert('Link copied!')
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    setShowReshareModal(true)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  Share to Story
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    alert('Not interested')
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 border-t border-gray-200 mt-1 pt-2"
                >
                  Not Interested
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    alert(`Unfollow ${recipe.creator.name}`)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600"
                >
                  Unfollow {recipe.creator.name.split(' ')[0]}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Post Image */}
      <div 
        className="cursor-pointer relative"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        onDoubleClick={handleLike}
      >
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full object-cover aspect-square lg:aspect-[4/3]"
        />
      </div>

      {/* Actions & Info */}
      <div className="px-4 lg:px-5 py-2.5 lg:py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="transition-transform active:scale-110"
            >
              <Heart
                size={24}
                className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}
              />
            </button>
            <button 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="text-gray-700 hover:text-gray-900"
            >
              <MessageCircle size={24} />
            </button>
            <button 
              onClick={handleShare}
              className="text-gray-700 hover:text-gray-900"
            >
              <Share2 size={24} />
            </button>
            <button
              onClick={handleAddToPlanner}
              className="text-gray-700 hover:text-primary-600 transition-colors"
              title="Add to Planner"
            >
              <Calendar size={24} />
            </button>
          </div>
          <button
            onClick={handleSave}
            className="transition-transform active:scale-110"
          >
            <Bookmark
              size={24}
              className={isSaved ? 'fill-gray-900 text-gray-900' : 'text-gray-700'}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">{formatNumber(likes)} likes</p>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{recipe.creator.name}</span>
          <span className="text-gray-900">{recipe.description}</span>
        </div>

        {/* Recipe Meta */}
        <div className="flex gap-3 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            🍳 {recipe.difficulty}
          </span>
          <span className="flex items-center gap-1">
            ⏱️ {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1">
            🍽️ {recipe.servings} servings
          </span>
        </div>

        {/* View Comments */}
        {recipe.comments > 0 && (
          <button 
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="text-sm text-gray-500 mt-2 hover:text-gray-700"
          >
            View all {recipe.comments} comments
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-400 mt-2">
          {new Date(recipe.postedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Reshare Modal */}
      <ReshareToStoryModal
        isOpen={showReshareModal}
        onClose={() => setShowReshareModal(false)}
        content={{
          type: 'post',
          image: recipe.image,
          user: recipe.creator
        }}
      />
    </article>
  )
}

export default PostCard
