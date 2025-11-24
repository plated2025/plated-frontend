import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Plus, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

function AccountSwitchPage() {
  const navigate = useNavigate()
  const { currentUser, logout } = useApp()
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [addAccountForm, setAddAccountForm] = useState({
    email: '',
    password: ''
  })

  // Mock existing accounts (in real app, this would come from localStorage or backend)
  const savedAccounts = [
    currentUser,
  ].filter(Boolean)

  const handleSwitchAccount = (account) => {
    // In real app, this would switch to the selected account
    alert(`Switching to ${account.name}'s account`)
    navigate('/')
  }

  const handleAddAccount = (e) => {
    e.preventDefault()
    // In real app, this would authenticate and add the account
    alert('Account added successfully!')
    setShowAddAccount(false)
    setAddAccountForm({ email: '', password: '' })
  }

  const handleLogout = (account) => {
    // In real app, this would remove the account from saved accounts
    alert(`Logged out from ${account.name}'s account`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Switch accounts</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto p-6">
        {/* Current Account */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Current Account
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=0'}
                  alt={currentUser?.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{currentUser?.name || 'User'}</p>
                  <p className="text-sm text-gray-600">{currentUser?.specialty || 'Food Enthusiast'}</p>
                </div>
              </div>
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Saved Accounts */}
        {savedAccounts.length > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Switch to
              </h2>
              <div className="space-y-3">
                {savedAccounts
                  .filter(account => account.id !== currentUser?.id)
                  .map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <button
                        onClick={() => handleSwitchAccount(account)}
                        className="flex items-center gap-3 flex-1"
                      >
                        <img
                          src={account.avatar}
                          alt={account.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">{account.name}</p>
                          <p className="text-sm text-gray-600">{account.specialty}</p>
                        </div>
                      </button>
                      <button
                        onClick={() => handleLogout(account)}
                        className="ml-2 p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Account Section */}
        {!showAddAccount ? (
          <button
            onClick={() => setShowAddAccount(true)}
            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Plus size={24} className="text-primary-600" />
              </div>
              <span className="font-semibold text-gray-900">Add Account</span>
            </div>
          </button>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Add Existing Account</h2>
              <button
                onClick={() => setShowAddAccount(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={addAccountForm.email}
                  onChange={(e) => setAddAccountForm({ ...addAccountForm, email: e.target.value })}
                  placeholder="Enter email or username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={addAccountForm.password}
                  onChange={(e) => setAddAccountForm({ ...addAccountForm, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Log In
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/signup')}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg transition-colors"
            >
              Create New Account
            </button>
          </div>
        )}

        {/* Info Text */}
        <p className="text-center text-sm text-gray-600 mt-6">
          You can switch between accounts without logging out
        </p>
      </div>
    </div>
  )
}

export default AccountSwitchPage
