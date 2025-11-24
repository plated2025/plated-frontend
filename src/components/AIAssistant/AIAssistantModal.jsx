import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, ChefHat } from 'lucide-react'
import { aiAPI } from '../../services/api'

function AIAssistantModal({ isOpen, onClose }) {
  const [inputMessage, setInputMessage] = useState('')
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI food assistant. I can help you with recipes, meal planning, nutrition advice, and more. What would you like to know?"
    }
  ])
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isThinking) return

    const userMessage = inputMessage.trim()
    setInputMessage('')

    // Add user message
    setConversation(prev => [...prev, { role: 'user', content: userMessage }])
    setIsThinking(true)

    try {
      // Call real Gemini AI API
      const response = await aiAPI.chat({
        message: userMessage,
        conversationHistory: conversation
      })

      // Add AI response
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: response.data.response }
      ])
    } catch (error) {
      console.error('AI chat error:', error)
      // Fallback response
      setConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment!"
        }
      ])
    } finally {
      setIsThinking(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100000] bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* Modal Container - ChatGPT Style */}
        <div className="w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header - Clean & Simple */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <ChefHat size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Food Assistant
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Powered by Google Gemini
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Messages Container - ChatGPT Style */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gray-50 dark:bg-gray-950">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ChefHat size={16} className="text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      You
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ChefHat size={16} className="text-white" />
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl px-5 py-3 border border-gray-200 dark:border-gray-800">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Container - ChatGPT Style */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about food, recipes, or nutrition..."
                  rows="1"
                  className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                  }}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isThinking}
                className={`p-3 rounded-xl transition-all ${
                  inputMessage.trim() && !isThinking
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </button>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistantModal
