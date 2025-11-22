import { useState } from 'react'
import { 
  Sparkles, Camera, Scan, Zap, Clock, Users, 
  TrendingUp, Calendar, Award, Heart
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AIChefModal from './AIChefModal'
import FoodScannerModal from './FoodScannerModal'
import QuickMealsModal from './QuickMealsModal'
import ProductAnalyzerModal from './ProductAnalyzerModal'

function QuickActionsBar() {
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)
  const [showAIChef, setShowAIChef] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [showQuickMeals, setShowQuickMeals] = useState(false)
  const [showProductAnalyzer, setShowProductAnalyzer] = useState(false)

  const quickActions = [
    { 
      icon: Sparkles, 
      label: 'AI Chef', 
      color: 'from-purple-500 to-pink-500',
      action: () => setShowAIChef(true),
      badge: 'New'
    },
    { 
      icon: Camera, 
      label: 'Scan Food', 
      color: 'from-blue-500 to-cyan-500',
      action: () => setShowScanner(true),
      badge: null
    },
    { 
      icon: Scan, 
      label: 'Product Check', 
      color: 'from-teal-500 to-green-500',
      action: () => setShowProductAnalyzer(true),
      badge: '🏥'
    },
    { 
      icon: Clock, 
      label: 'Quick Meals', 
      color: 'from-orange-500 to-red-500',
      action: () => setShowQuickMeals(true),
      badge: '< 30min'
    },
    { 
      icon: Users, 
      label: 'Cook Together', 
      color: 'from-pink-500 to-rose-500',
      action: () => navigate('/live'),
      badge: 'Live'
    },
    { 
      icon: TrendingUp, 
      label: 'Trending', 
      color: 'from-yellow-500 to-orange-500',
      action: () => navigate('/explore'),
      badge: '🔥'
    }
  ]

  return (
    <div className="bg-gradient-to-r from-primary-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap size={18} className="text-primary-600" />
            Quick Actions
          </h3>
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            {showMore ? 'Show Less' : 'Show All'}
          </button>
        </div>

        <div className={`grid grid-cols-3 gap-2`}>
          {quickActions.slice(0, showMore ? quickActions.length : 3).map((action, idx) => (
            <button
              key={idx}
              onClick={action.action}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${action.color} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95`}>
                <div className="flex flex-col items-center gap-2">
                  <action.icon size={24} className="text-white" />
                  <span className="text-xs font-semibold text-white text-center leading-tight">
                    {action.label}
                  </span>
                </div>
                {action.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                    {action.badge}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showAIChef && <AIChefModal onClose={() => setShowAIChef(false)} />}
      {showScanner && <FoodScannerModal onClose={() => setShowScanner(false)} />}
      {showProductAnalyzer && <ProductAnalyzerModal onClose={() => setShowProductAnalyzer(false)} />}
      {showQuickMeals && <QuickMealsModal onClose={() => setShowQuickMeals(false)} />}
    </div>
  )
}

export default QuickActionsBar
