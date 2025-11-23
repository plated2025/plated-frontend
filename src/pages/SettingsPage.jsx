import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, User, Bell, Lock, Globe, Database, CreditCard, Info, LogOut, Moon, Sun, Calendar, Heart, Utensils, Star, ChefHat, Award, BarChart3, Sparkles, MessageCircle, Volume2, Shield } from 'lucide-react'
import { useApp } from '../context/AppContext'
import RatingModal from '../components/RatingModal'
import AIAssistantModal from '../components/AIAssistant/AIAssistantModal'
import AccountTypeChangeModal from '../components/AccountTypeChangeModal'
import { hasUserRated, getUserRating } from '../utils/ratingSystem'

function SettingsPage() {
  const navigate = useNavigate()
  const { logout, theme, toggleTheme, userType, updateUserType } = useApp()
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    likes: true,
    comments: true,
    follows: true
  })

  const userRating = getUserRating()
  const hasRated = hasUserRated()
  const isCreator = userType === 'creator'

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout()
      navigate('/login')
    }
  }

  const handleSwitchAccountType = () => {
    setShowAccountTypeModal(true)
  }

  const handleConfirmAccountTypeChange = (newType) => {
    updateUserType(newType)
    alert(`Successfully switched to ${newType === 'creator' ? 'Creator' : 'Regular User'} account!`)
    window.location.reload() // Refresh to update UI
  }

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: () => navigate('/edit-profile') },
        { 
          icon: ChefHat, 
          label: 'Account Type', 
          value: isCreator ? 'Creator' : 'Regular User',
          action: handleSwitchAccountType,
          highlight: true
        },
        { icon: Shield, label: 'Security', action: () => navigate('/settings/security'), highlight: true },
        { icon: Lock, label: 'Account & Privacy', action: () => navigate('/settings/account-privacy') }
      ]
    },
    {
      title: 'AI Assistant',
      items: [
        { 
          icon: Sparkles, 
          label: 'Chat with AI Assistant', 
          action: () => setShowAIAssistant(true),
          highlight: true
        }
      ]
    },
    // Creator-only section
    ...(isCreator ? [{
      title: 'Creator Tools',
      items: [
        { icon: BarChart3, label: 'Creator Studio', action: () => navigate('/creator-studio') },
        { icon: Award, label: 'Achievements', action: () => navigate('/achievements') }
      ]
    }] : []),
    {
      title: 'Health & Nutrition',
      items: [
        { icon: Heart, label: 'Health Profile', action: () => navigate('/settings/health') },
        { icon: Heart, label: 'Sync Health Data', action: () => navigate('/health-sync') }
      ]
    },
    {
      title: 'Meal Planning',
      items: [
        { icon: Calendar, label: 'Meal Plan Settings', action: () => navigate('/settings/meal-plan') },
        { icon: Utensils, label: 'Dietary Preferences', action: () => navigate('/settings/dietary') }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: theme === 'light' ? Moon : Sun, 
          label: 'Dark Mode', 
          action: toggleTheme,
          toggle: true,
          value: theme === 'dark'
        },
        { icon: Bell, label: 'Notifications', action: () => navigate('/settings/notifications') },
        { icon: Globe, label: 'Language', value: 'English', action: () => navigate('/settings/language') }
      ]
    },
    {
      title: 'Content',
      items: [
        { icon: Database, label: 'Data & Storage', action: () => navigate('/settings/data-storage') },
        { icon: Database, label: 'Clear Cache', action: () => alert('Cache cleared!') }
      ]
    },
    {
      title: 'Subscription',
      items: [
        { icon: CreditCard, label: 'Payment Methods', action: () => navigate('/settings/payment-methods') },
        { icon: CreditCard, label: 'Subscription Status', value: 'Free', action: () => navigate('/settings/subscription') }
      ]
    },
    {
      title: 'Support',
      items: [
        { 
          icon: Star, 
          label: 'Rate App', 
          value: hasRated ? `${userRating} ⭐` : null,
          action: () => setShowRatingModal(true) 
        },
        { icon: Info, label: 'Help Center', action: () => navigate('/help') },
        { icon: Info, label: 'Report a Problem', action: () => navigate('/report') },
        { icon: Info, label: 'Terms of Service', action: () => navigate('/terms') },
        { icon: Info, label: 'Privacy Policy', action: () => navigate('/terms') }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 pt-safe">
        <div className="flex items-center gap-2 sm:gap-3 px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      {/* Settings List */}
      <div className="py-4">
        {settingsSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
              {section.title}
            </h2>
            <div className="bg-white border-y border-gray-200 divide-y divide-gray-100">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={item.action}
                  className={`w-full px-4 py-4 flex items-center justify-between transition-colors ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-primary-50 to-purple-50 hover:from-primary-100 hover:to-purple-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={item.highlight ? 'text-primary-600' : 'text-gray-600'} />
                    <span className={`font-medium ${item.highlight ? 'text-primary-700' : 'text-gray-900'}`}>
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className={`text-sm font-medium ${
                        item.highlight ? 'text-primary-600' : 'text-gray-500'
                      }`}>
                        {item.value}
                      </span>
                    )}
                    {item.toggle ? (
                      <div className={`w-12 h-6 rounded-full transition-colors ${item.value ? 'bg-primary-600' : 'bg-gray-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${item.value ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    ) : (
                      <ChevronRight size={20} className={item.highlight ? 'text-primary-400' : 'text-gray-400'} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="px-4 mt-8">
          <button
            onClick={handleLogout}
            className="w-full btn-secondary flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 border-red-300"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>

        {/* App Version */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Plated v1.0.0
        </p>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onRated={(rating) => {
          // Rating submitted successfully
        }}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
      />

      {/* Account Type Change Modal */}
      <AccountTypeChangeModal
        isOpen={showAccountTypeModal}
        onClose={() => setShowAccountTypeModal(false)}
        currentType={userType}
        onConfirm={handleConfirmAccountTypeChange}
      />
    </div>
  )
}

export default SettingsPage
