import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Video, MoreVertical, Send, Image, Smile, ChefHat, Plus, Clock, Users, Heart, Paperclip, Gift, Calendar, User, Search, Bell, Pin, Trash2, Download, Ban, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import RecipeShareModal from '../components/RecipeShareModal'
import CookingSessionModal from '../components/CookingSessionModal'
import PostCallModal from '../components/PostCallModal'

function ChatPage() {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useApp()
  const [message, setMessage] = useState('')
  const [showRecipeShare, setShowRecipeShare] = useState(false)
  const [showCookingSession, setShowCookingSession] = useState(false)
  const [showPostCall, setShowPostCall] = useState(false)
  const [callData, setCallData] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)

  // Common food emojis
  const emojis = [
    '😊', '😄', '😍', '🥰', '😘', '😋', '😁', '👍',
    '👏', '🙏', '❤️', '💯', '🔥', '✨', '🎉', '👌',
    '🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🥚', '🍳',
    '🥞', '🧇', '🧈', '🍞', '🥐', '🥖', '🥨', '🥯',
    '🧀', '🍖', '🍗', '🥩', '🍠', '🥟', '🥠', '🥡',
    '🍱', '🍲', '🍛', '🍜', '🍝', '🍣', '🍤', '🍥',
    '🥮', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰',
    '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪',
    '🌶️', '🥕', '🌽', '🥒', '🥬', '🥦', '🧄', '🧅',
    '🍅', '🥑', '🍆', '🥔', '🍠', '🥗', '🍇', '🍈',
    '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏',
    '🍐', '🍑', '🍒', '🍓', '🥝', '☕', '🍵', '🧃',
    '🥤', '🧋', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺',
    '🍻', '🥂', '🥃', '🧊', '🥄', '🍴', '🍽️', '🔪'
  ]
  
  const [messages, setMessages] = useState([
    { id: 1, type: 'text', text: 'Hey! I loved your latest recipe!', sender: 'other', timestamp: '10:30 AM' },
    { id: 2, type: 'text', text: 'Thanks! Glad you enjoyed it 😊', sender: 'me', timestamp: '10:32 AM' },
    { 
      id: 3, 
      type: 'recipe', 
      recipe: {
        id: 1,
        title: 'Creamy Pasta Carbonara',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
        cookTime: '25 min',
        servings: 4
      },
      sender: 'me', 
      timestamp: '10:33 AM' 
    },
    { id: 4, type: 'text', text: 'This looks amazing! Can\'t wait to try it 🍝', sender: 'other', timestamp: '10:35 AM' },
  ])

  // TODO: Fetch from API
  const chat = null
  const otherUser = { name: 'User', avatar: 'https://i.pravatar.cc/150' }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Close menus when clicking on messages area
  const handleMessagesAreaClick = () => {
    setShowOptions(false)
    setShowEmojiPicker(false)
    setShowMoreMenu(false)
  }

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        type: 'text',
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
      setMessage('')
    }
  }

  const handleRecipeShare = (recipe) => {
    setMessages([...messages, {
      id: messages.length + 1,
      type: 'recipe',
      recipe: recipe,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }])
    setShowRecipeShare(false)
  }

  const handleStartCookingSession = () => {
    setShowCookingSession(true)
    setShowOptions(false)
  }

  const handleEndCall = (duration) => {
    setShowCookingSession(false)
    setCallData({ duration, user: otherUser })
    setShowPostCall(true)
  }

  const handleImageUpload = () => {
    setShowOptions(false)
    setShowEmojiPicker(false)
    imageInputRef.current?.click()
  }

  const handleFileUpload = () => {
    setShowOptions(false)
    setShowEmojiPicker(false)
    fileInputRef.current?.click()
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // In production, upload the image and get URL
      const imageUrl = URL.createObjectURL(file)
      setMessages([...messages, {
        id: messages.length + 1,
        type: 'image',
        imageUrl: imageUrl,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      alert(`File "${file.name}" ready to send! (In production, this would upload the file)`)
    }
  }

  const handleSendGift = () => {
    alert('🎁 Gift sending feature coming soon! Send virtual gifts to your friends.')
    setShowOptions(false)
  }

  const handleScheduleMeet = () => {
    alert('📅 Schedule a cooking session for later! This will open a calendar picker.')
    setShowOptions(false)
  }

  const handleMoreOptions = () => {
    setShowMoreMenu(!showMoreMenu)
  }

  const handleBlockUser = () => {
    if (confirm(`Are you sure you want to block ${otherUser.name}?`)) {
      alert('User blocked successfully')
      setShowMoreMenu(false)
    }
  }

  const handleMuteConversation = () => {
    alert('Conversation muted. You won\'t receive notifications.')
    setShowMoreMenu(false)
  }

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear this chat? This cannot be undone.')) {
      setMessages([])
      setShowMoreMenu(false)
    }
  }

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
    setShowOptions(false)
    setShowMoreMenu(false)
  }

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji)
    setShowEmojiPicker(false)
  }

  const handlePlusClick = () => {
    setShowOptions(!showOptions)
    setShowEmojiPicker(false)
    setShowMoreMenu(false)
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
            <div className="relative">
              <img
                src={otherUser.avatar}
                alt={otherUser.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
              />
              {otherUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 dark:text-white truncate">{otherUser.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{otherUser.isOnline ? 'Active now' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleStartCookingSession}
              className="p-2.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-all group"
              title="Start Cooking Session"
            >
              <Video size={22} className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
            </button>
            <div className="relative">
              <button 
                onClick={handleMoreOptions}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <MoreVertical size={22} className="text-gray-600 dark:text-gray-400" />
              </button>
              
              {/* More Options Menu */}
              {showMoreMenu && (
                <div className="absolute right-0 bottom-full mb-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-scale-in">
                  <button
                    onClick={() => { navigate(`/profile/${otherUser.id}`); setShowMoreMenu(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
                  >
                    <User size={18} />
                    View Profile
                  </button>
                  <button
                    onClick={() => { alert('🔍 Search in conversation...'); setShowMoreMenu(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
                  >
                    <Search size={18} />
                    Search Messages
                  </button>
                  <button
                    onClick={handleMuteConversation}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
                  >
                    <Bell size={18} />
                    Mute Notifications
                  </button>
                  <button
                    onClick={() => { alert('📱 Creating group chat...'); setShowMoreMenu(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
                  >
                    <Users size={18} />
                    Create Group
                  </button>
                  <button
                    onClick={() => { alert('📌 Pin conversation to top'); setShowMoreMenu(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
                  >
                    <Pin size={18} />
                    Pin Conversation
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleClearChat}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
                  >
                    <Trash2 size={18} />
                    Clear Chat History
                  </button>
                  <button
                    onClick={() => { alert('📥 Exporting chat...'); setShowMoreMenu(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm flex items-center gap-3"
                  >
                    <Download size={18} />
                    Export Chat
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleBlockUser}
                    className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 text-sm flex items-center gap-3"
                  >
                    <Ban size={18} />
                    Block User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onClick={handleMessagesAreaClick}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {msg.type === 'text' ? (
              <div className={`max-w-[75%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-br from-primary-600 to-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">{msg.timestamp}</p>
              </div>
            ) : msg.type === 'recipe' ? (
              <div className={`max-w-[85%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-2xl overflow-hidden shadow-lg ${
                  msg.sender === 'me' ? 'bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20' : 'bg-white dark:bg-gray-800'
                } border border-gray-200 dark:border-gray-700`}>
                  <div className="flex items-start gap-3 p-3">
                    <img src={msg.recipe.image} alt={msg.recipe.title} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <ChefHat size={16} className="text-primary-600 dark:text-primary-400" />
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">Recipe Shared</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{msg.recipe.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {msg.recipe.cookTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {msg.recipe.servings} servings
                        </span>
                      </div>
                      <button 
                        onClick={() => navigate(`/recipe/${msg.recipe.id}`)}
                        className="mt-3 w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">{msg.timestamp}</p>
              </div>
            ) : null}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
        {/* Quick Actions */}
        {showOptions && (
          <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => { setShowRecipeShare(true); setShowOptions(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all shadow-md"
            >
              <ChefHat size={18} />
              Share Recipe
            </button>
            <button
              onClick={() => { setShowCookingSession(true); setShowOptions(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all shadow-md"
            >
              <Video size={18} />
              Cooking Session
            </button>
            <button 
              onClick={handleSendGift}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all shadow-md"
            >
              <Gift size={18} />
              Send Gift
            </button>
            <button 
              onClick={handleScheduleMeet}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold text-sm whitespace-nowrap transition-all shadow-md"
            >
              <Calendar size={18} />
              Schedule Meet
            </button>
          </div>
        )}
        
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="mb-3 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 animate-scale-in">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Pick an Emoji</h4>
              <button 
                onClick={() => setShowEmojiPicker(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-all hover:scale-125"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button 
            onClick={handlePlusClick}
            className={`p-2.5 rounded-full transition-all ${showOptions ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <Plus size={20} className={showOptions ? 'rotate-45 transition-transform' : ''} />
          </button>
          <button 
            onClick={handleImageUpload}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 transition-colors"
            title="Send Image"
          >
            <Image size={20} />
          </button>
          <button 
            onClick={handleFileUpload}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 transition-colors"
            title="Attach File"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 dark:text-white"
          />
          <button 
            onClick={handleEmojiPicker}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 transition-colors"
            title="Add Emoji"
          >
            <Smile size={20} />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2.5 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Recipe Share Modal */}
      <RecipeShareModal
        isOpen={showRecipeShare}
        onClose={() => setShowRecipeShare(false)}
        onShare={handleRecipeShare}
      />

      {/* Cooking Session Modal */}
      <CookingSessionModal
        isOpen={showCookingSession}
        onClose={() => setShowCookingSession(false)}
        onEndCall={handleEndCall}
        otherUser={otherUser}
      />

      {/* Post Call Modal */}
      <PostCallModal
        isOpen={showPostCall}
        onClose={() => setShowPostCall(false)}
        callData={callData}
      />
    </div>
  )
}

export default ChatPage
