import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import AIAssistantModal from './AIAssistantModal'

function AIFloatingButton() {
  const [showAssistant, setShowAssistant] = useState(false)

  return (
    <>
      {/* Floating Button - Hide when modal is open */}
      {!showAssistant && (
        <button
          onClick={() => setShowAssistant(true)}
          className="fixed left-4 bottom-20 md:bottom-6 z-[9999] group"
          aria-label="Open AI Assistant"
          style={{ width: '56px', height: '56px' }}
        >
        {/* Glowing rings animation - contained */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 animate-ping scale-100"></div>
          <div className="absolute inset-0 rounded-full bg-purple-600 opacity-20 animate-pulse"></div>
        </div>
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-glow transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-500/50">
          <Sparkles size={20} className="text-white" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-xl">
            AI Food Assistant
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
          </div>
        </div>
        
        {/* Badge for new feature */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-[10px] font-bold">AI</span>
        </div>
      </button>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal 
        isOpen={showAssistant} 
        onClose={() => setShowAssistant(false)} 
      />
    </>
  )
}

export default AIFloatingButton
