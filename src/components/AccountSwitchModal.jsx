import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Plus, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

function AccountSwitchModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { currentUser } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Mock saved accounts
  const savedAccounts = [
    currentUser,
  ].filter(Boolean)

  const handleSwitchAccount = (account) => {
    alert(`Switching to ${account.name}'s account`)
    onClose()
  }

  const handleAddAccount = () => {
    navigate('/switch-accounts')
    onClose()
  }

  const handleCreateNew = () => {
    navigate('/signup')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 animate-slide-up pb-safe">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Switch accounts</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {/* Current Account */}
          <div className="px-6 py-4 bg-gray-50">
            <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Current Account
            </p>
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=0'}
                alt={currentUser?.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{currentUser?.name || 'User'}</p>
                <p className="text-sm text-gray-600">{currentUser?.specialty || 'Food Enthusiast'}</p>
              </div>
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Other Accounts */}
          {savedAccounts.filter(acc => acc.id !== currentUser?.id).length > 0 && (
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                Switch to
              </p>
              <div className="space-y-2">
                {savedAccounts
                  .filter(acc => acc.id !== currentUser?.id)
                  .map((account) => (
                    <button
                      key={account.id}
                      onClick={() => handleSwitchAccount(account)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={account.avatar}
                        alt={account.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left flex-1">
                        <p className="font-semibold text-gray-900">{account.name}</p>
                        <p className="text-sm text-gray-600">{account.specialty}</p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 py-4 space-y-3 border-t border-gray-200">
            <button
              onClick={handleAddAccount}
              className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Plus size={24} className="text-primary-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Add existing account</p>
                <p className="text-sm text-gray-600">Log in with another account</p>
              </div>
            </button>

            <button
              onClick={handleCreateNew}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Plus size={24} className="text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-white">Create new account</p>
                <p className="text-sm text-white/90">Join Plated today</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountSwitchModal
