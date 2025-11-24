import { useState, useRef, useEffect } from 'react'
import { X, Mic, ArrowLeft } from 'lucide-react'
import { aiAPI } from '../../services/api'

function AIAssistantModal({ isOpen, onClose }) {
  const [inputMessage, setInputMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [searchHistory, setSearchHistory] = useState([
    'Find vegan recipes for dinner',
    'What should I eat before workout?',
    'Show me recipes by Chef Maria'
  ])
  const recognitionRef = useRef(null)
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)
  
  // Simulated app database - AI can search through this
  const appDatabase = {
    recipes: [
      { id: 1, title: 'Grilled Salmon with Quinoa', creator: '@ChefMaria', tags: ['healthy', 'protein', 'omega-3'], calories: 450 },
      { id: 2, title: 'Vegan Buddha Bowl', creator: '@HealthyEats', tags: ['vegan', 'fiber', 'colorful'], calories: 380 },
      { id: 3, title: 'Protein Pancakes', creator: '@FitChef_Mike', tags: ['breakfast', 'protein', 'fitness'], calories: 320 },
      { id: 4, title: 'Mediterranean Pasta Salad', creator: '@ChefMaria', tags: ['mediterranean', 'fresh'], calories: 420 },
      { id: 5, title: 'Green Smoothie Bowl', creator: '@HealthyEats', tags: ['smoothie', 'breakfast'], calories: 250 }
    ],
    creators: [
      { username: '@ChefMaria', name: 'Maria Rodriguez', specialty: 'Mediterranean cuisine', followers: 45000, verified: true },
      { username: '@HealthyEats', name: 'Sarah Johnson', specialty: 'Plant-based recipes', followers: 89000, verified: true },
      { username: '@FitChef_Mike', name: 'Mike Thompson', specialty: 'Fitness nutrition', followers: 120000, verified: true },
      { username: '@PrepQueen', name: 'Lisa Chen', specialty: 'Meal prep', followers: 67000, verified: false }
    ],
    reels: [
      { id: 1, title: '5-Minute Breakfast Ideas', creator: '@FitChef_Mike', views: 450000, likes: 34000 },
      { id: 2, title: 'Meal Prep Sunday', creator: '@PrepQueen', views: 890000, likes: 67000 },
      { id: 3, title: 'Healthy Desserts', creator: '@HealthyEats', views: 230000, likes: 18000 }
    ]
  }

  // Smart AI response with app data access
  const generateSmartResponse = (userQuery) => {
    const query = userQuery.toLowerCase()
    
    // Search creators
    if (query.includes('find') && (query.includes('creator') || query.includes('chef') || query.includes('@'))) {
      const searchTerm = query.replace(/find|creator|chef|who|is/g, '').trim()
      const found = appDatabase.creators.filter(c => 
        c.username.toLowerCase().includes(searchTerm) || 
        c.name.toLowerCase().includes(searchTerm) ||
        c.specialty.toLowerCase().includes(searchTerm)
      )
      
      if (found.length > 0) {
        const creator = found[0]
        return `I found ${creator.name} (${creator.username})!\n\nSpecialty: ${creator.specialty}\nFollowers: ${creator.followers.toLocaleString()}\n${creator.verified ? '✓ Verified Creator' : ''}`
      }
      return "I couldn't find that creator. Try @ChefMaria, @HealthyEats, or @FitChef_Mike!"
    }
    
    // Search recipes
    if (query.includes('recipe') || query.includes('food')) {
      const matched = appDatabase.recipes.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.tags.some(tag => query.includes(tag))
      )
      
      if (matched.length > 0) {
        let response = "Here are some recipes:\n\n"
        matched.slice(0, 3).forEach((recipe, i) => {
          response += `${i + 1}. ${recipe.title}\n   By ${recipe.creator} • ${recipe.calories} cal\n\n`
        })
        return response
      }
    }
    
    // Search reels
    if (query.includes('reel') || query.includes('video')) {
      let response = "Popular reels:\n\n"
      appDatabase.reels.forEach((reel, i) => {
        response += `${i + 1}. ${reel.title}\n   By ${reel.creator} • ${(reel.views / 1000).toFixed(0)}K views\n\n`
      })
      return response
    }
    
    // Nutrition
    if (query.includes('nutrition') || query.includes('healthy') || query.includes('diet')) {
      return "Nutrition tips:\n\n✓ Focus on whole foods\n✓ Lean proteins at every meal\n✓ Colorful vegetables daily\n✓ Stay hydrated (8+ glasses)\n✓ Limit processed foods\n\nWhat specific nutrition question do you have?"
    }
    
    // Workout
    if (query.includes('workout') || query.includes('exercise') || query.includes('gym')) {
      return "Fitness nutrition:\n\nPre-Workout (30-60 min before):\n• Banana + almond butter\n• Oatmeal with protein\n\nPost-Workout (within 30 min):\n• Protein shake + fruit\n• Chicken with sweet potato\n\nProtein target: 0.8-1g per lb body weight"
    }
    
    // Meal planning
    if (query.includes('meal plan') || query.includes('planning')) {
      return "I can create a meal plan!\n\nTell me:\n• Your goal (weight loss/gain/maintenance)\n• Dietary restrictions\n• Meals per day\n\nSample day:\n🌅 Breakfast: Protein smoothie\n🌞 Lunch: Grilled chicken salad\n🍽️ Dinner: Salmon with veggies"
    }
    
    // Shopping
    if (query.includes('shopping') || query.includes('grocery')) {
      return "Shopping essentials:\n\nProteins: Chicken, salmon, eggs, Greek yogurt\nVegetables: Spinach, broccoli, peppers\nFruits: Berries, apples, bananas\nGrains: Quinoa, brown rice, oats\nHealthy Fats: Avocado, nuts, olive oil"
    }
    
    // Default
    return "Hi! I'm your AI food assistant.\n\nI can help with:\n• Finding recipes and creators\n• Nutrition and health advice\n• Fitness nutrition\n• Meal planning\n• Shopping lists\n\nI have access to all recipes, reels, and creators in the app!\n\nWhat would you like help with?"
  }

  // Voice input
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'
      
      let finalTranscript = ''
      
      recognition.onstart = () => {
        setIsListening(true)
        finalTranscript = ''
      }
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        
        finalTranscript = transcript
        setInputMessage(transcript)
      }
      
      recognition.onend = () => {
        setIsListening(false)
        // Submit the captured transcript
        if (finalTranscript.trim()) {
          setInputMessage(finalTranscript)
          setTimeout(() => {
            // Manually trigger submit with the final transcript
            const userMessage = {
              role: 'user',
              content: finalTranscript.trim(),
              timestamp: new Date().toISOString()
            }

            // Add to search history
            if (!searchHistory.includes(finalTranscript.trim())) {
              setSearchHistory(prev => [finalTranscript.trim(), ...prev.slice(0, 4)])
            }

            setConversation(prev => [...prev, userMessage])
            setInputMessage('')
            setIsThinking(true)

            // Generate AI response
            setTimeout(async () => {
              try {
                const response = await aiAPI.chat(userMessage.content, conversation)
                
                const aiMessage = {
                  role: 'assistant',
                  content: response.data.response,
                  timestamp: new Date().toISOString()
                }

                setConversation(prev => [...prev, aiMessage])
              } catch (error) {
                console.error('AI Chat Error:', error)
                const fallbackResponse = generateSmartResponse(userMessage.content)
                const aiMessage = {
                  role: 'assistant',
                  content: fallbackResponse,
                  timestamp: new Date().toISOString()
                }
                setConversation(prev => [...prev, aiMessage])
              } finally {
                setIsThinking(false)
              }
            }, 1500)
          }, 100)
        }
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognitionRef.current = recognition
      recognition.start()
    } else {
      alert('Voice recognition not supported. Use Chrome, Edge, or Safari.')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  // Submit message
  const handleSubmit = async () => {
    if (!inputMessage.trim() || isThinking) return

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    // Add to search history
    if (!searchHistory.includes(inputMessage.trim())) {
      setSearchHistory(prev => [inputMessage.trim(), ...prev.slice(0, 4)])
    }

    const newConversation = [...conversation, userMessage]
    setConversation(newConversation)
    setInputMessage('')
    setIsThinking(true)

    try {
      // Call real Gemini AI API with conversation history
      const response = await aiAPI.chat(userMessage.content, conversation)
      
      const aiMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString()
      }

      setConversation(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI Chat Error:', error)
      
      // Fallback to local response if API fails
      const fallbackResponse = generateSmartResponse(userMessage.content)
      const aiMessage = {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date().toISOString()
      }
      
      setConversation(prev => [...prev, aiMessage])
    } finally {
      setIsThinking(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Handle back button - clear conversation
  const handleBack = () => {
    setConversation([])
    setInputMessage('')
    setIsThinking(false)
    setIsListening(false)
  }

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      {/* Dark navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 pt-8">
        {/* Left: Back or Close button */}
        {conversation.length > 0 ? (
          <button
            onClick={handleBack}
            className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10 active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10 active:scale-95"
          >
            <X size={24} />
          </button>
        )}
        
        {/* Center: Title */}
        <h1 className="text-lg font-semibold text-white">
          {conversation.length > 0 ? 'Chatting with AI' : 'AI Food Assistant'}
        </h1>
        
        {/* Right: Close button when in conversation */}
        {conversation.length > 0 ? (
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10 active:scale-95"
          >
            <X size={20} />
          </button>
        ) : (
          <div className="w-10"></div>
        )}
      </div>

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-between p-6 max-w-2xl mx-auto">
        
        {/* Conversation area */}
        <div className="flex-1 w-full overflow-y-auto pt-16 pb-8">
          {conversation.length === 0 ? (
            isListening ? (
              // Listening state with AI-style animated visualization
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-white/60 text-sm mb-8">Go ahead, I'm listening</p>
                
                {/* AI-style animated visualization */}
                <div className="relative w-80 h-80 flex items-center justify-center mb-12">
                  {/* Pulsing outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                  
                  {/* Rotating gradient ring */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 opacity-20 animate-spin-slow"></div>
                  
                  {/* Animated bars (waveform style) */}
                  <div className="relative w-64 h-64 flex items-center justify-center gap-2">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-purple-500 via-cyan-400 to-purple-500 rounded-full"
                        style={{
                          height: '40%',
                          animation: `wave 1s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                          transform: 'scaleY(1)'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Center microphone icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl">
                      <Mic size={32} className="text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Live transcription */}
                <div className="max-w-md px-6">
                  <p className="text-white text-base font-medium">
                    {inputMessage || 'Start speaking...'}
                  </p>
                </div>
              </div>
            ) : (
              // Welcome screen with search history
              <div className="w-full max-w-md mx-auto">
                {/* Greeting */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Hi there 👋
                  </h2>
                  <p className="text-white/60">
                    Let's see what can I do for you?
                  </p>
                </div>

                {/* Voice Recording Card */}
                <button 
                  onClick={startListening}
                  className="w-full mb-6 p-6 rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Mic size={24} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold mb-2">
                        Let's find what you need using voice
                      </p>
                      <div className="inline-flex px-4 py-1.5 bg-white/90 rounded-full text-purple-600 text-sm font-semibold">
                        Start Recording
                      </div>
                    </div>
                  </div>
                </button>

                {/* Recently Searched */}
                {searchHistory.length > 0 && (
                  <div>
                    <h3 className="text-white/60 text-sm font-medium mb-3">Recently Searched</h3>
                    <div className="space-y-2">
                      {searchHistory.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputMessage(search)
                            setTimeout(handleSubmit, 100)
                          }}
                          className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-white/30 text-left group transition-all duration-200 active:scale-[0.98]"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-white/70 text-sm group-hover:text-white transition-colors">
                              {search}
                            </p>
                            <span className="text-white/30 group-hover:text-white/80 transition-colors">→</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          ) : (
            // Conversation messages
            <div className="space-y-4">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-3xl px-6 py-4 ${
                    msg.role === 'user'
                      ? 'bg-purple-600/90 text-white'
                      : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl px-6 py-4 border border-white/20">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom input area */}
        <div className="w-full max-w-md">
          {/* Input bar with mic button */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write anything here..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-6 pr-16 py-4 text-white placeholder-white/40 outline-none focus:border-purple-500/50 transition-colors"
            />
            
            {/* Microphone button */}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-purple-600 text-white scale-110 animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 hover:scale-110 active:scale-95 text-white shadow-lg hover:shadow-purple-500/50'
              }`}
            >
              <Mic size={20} />
            </button>
          </div>

          {/* Hint text */}
          <p className="text-center text-white/40 text-xs mt-3">
            Tap the mic to speak or type your question
          </p>
        </div>
      </div>
    </div>
  )
}

export default AIAssistantModal
