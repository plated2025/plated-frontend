import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, Lock, Shield, Download, Trash2, Globe, Users, AlertCircle, Check } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function AccountPrivacyPage() {
  const navigate = useNavigate()
  const { currentUser } = useApp()
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showActivity: true,
    allowMessages: 'everyone',
    showEmail: false,
    showPhone: false,
    allowTagging: true,
    showFollowers: true,
    showFollowing: true,
    allowComments: 'everyone',
    allowDuets: true
  })

  const [dataSettings, setDataSettings] = useState({
    downloadRequested: false,
    deleteRequested: false
  })

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }))
    // In production, save to backend
  }

  const handleDownloadData = () => {
    if (confirm('Request a copy of your data? We\'ll email you a download link within 48 hours.')) {
      setDataSettings(prev => ({ ...prev, downloadRequested: true }))
      alert('Data download requested! Check your email in 24-48 hours.')
    }
  }

  const handleDeleteAccount = () => {
    const confirmation = prompt('Are you sure you want to delete your account? This action cannot be undone. Type "DELETE" to confirm:')
    if (confirmation === 'DELETE') {
      alert('Account deletion initiated. You will receive a confirmation email.')
      // In production: navigate to deletion flow
    }
  }

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: Globe, description: 'Anyone can see your profile' },
    { value: 'friends', label: 'Friends', icon: Users, description: 'Only people you follow' },
    { value: 'private', label: 'Private', icon: Lock, description: 'Only you can see' }
  ]

  const messageOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'following', label: 'People I Follow' },
    { value: 'none', label: 'No One' }
  ]

  const commentOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'following', label: 'People I Follow' },
    { value: 'none', label: 'No One' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <ArrowLeft size={20} className="text-gray-900 dark:text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Account & Privacy</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage your privacy settings</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Profile Visibility */}
        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Eye size={20} className="text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Visibility</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile</p>
            </div>
          </div>

          <div className="space-y-3">
            {privacyOptions.map(option => {
              const Icon = option.icon
              return (
                <button
                  key={option.value}
                  onClick={() => handlePrivacyChange('profileVisibility', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    privacy.profileVisibility === option.value
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={privacy.profileVisibility === option.value ? 'text-primary-600' : 'text-gray-400'} />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">{option.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{option.description}</div>
                    </div>
                    {privacy.profileVisibility === option.value && (
                      <Check size={20} className="text-primary-600" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Privacy Controls</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage what others can see</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Show Activity Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Activity Status</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Let people see when you're active</div>
              </div>
              <button
                onClick={() => handlePrivacyChange('showActivity', !privacy.showActivity)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privacy.showActivity ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  privacy.showActivity ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Show Email */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Show Email</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Display email on your profile</div>
              </div>
              <button
                onClick={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privacy.showEmail ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  privacy.showEmail ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Show Followers */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Show Followers List</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Let others see who follows you</div>
              </div>
              <button
                onClick={() => handlePrivacyChange('showFollowers', !privacy.showFollowers)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privacy.showFollowers ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  privacy.showFollowers ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Allow Tagging */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Allow Tagging</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Let people tag you in posts</div>
              </div>
              <button
                onClick={() => handlePrivacyChange('allowTagging', !privacy.allowTagging)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privacy.allowTagging ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  privacy.allowTagging ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </section>

        {/* Who Can... */}
        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Interactions</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Control who can interact with you</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Messages */}
            <div>
              <label className="block font-semibold text-gray-900 dark:text-white mb-2">Who can message you</label>
              <select
                value={privacy.allowMessages}
                onChange={(e) => handlePrivacyChange('allowMessages', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 outline-none"
              >
                {messageOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Comments */}
            <div>
              <label className="block font-semibold text-gray-900 dark:text-white mb-2">Who can comment on your posts</label>
              <select
                value={privacy.allowComments}
                onChange={(e) => handlePrivacyChange('allowComments', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 outline-none"
              >
                {commentOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Data & Privacy */}
        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Download size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Data</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal data</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownloadData}
              disabled={dataSettings.downloadRequested}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                dataSettings.downloadRequested
                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <Download size={20} className={dataSettings.downloadRequested ? 'text-green-600' : 'text-gray-600'} />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Download Your Data</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {dataSettings.downloadRequested ? 'Request sent! Check your email' : 'Get a copy of your information'}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-red-200 dark:border-red-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Irreversible actions</p>
            </div>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="w-full p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={20} className="text-red-600" />
              <div className="flex-1 text-left">
                <div className="font-semibold text-red-600">Delete Account</div>
                <div className="text-sm text-red-500">Permanently delete your account and all data</div>
              </div>
            </div>
          </button>
        </section>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pb-8">
          <p>Changes are saved automatically</p>
          <p className="mt-2">Need help? <a href="/help" className="text-primary-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  )
}

export default AccountPrivacyPage
