import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function PrivacySettingsPage() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    privateAccount: false,
    showActivity: true,
    allowComments: true,
    allowMessages: true,
    allowTagging: true,
    showInSearch: true,
    shareToExternalSites: true
  })

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    // Save settings
    alert('Privacy settings saved!')
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Privacy & Security</h1>
          </div>
          <button
            onClick={handleSave}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Save
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Privacy</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Private Account</h3>
                <p className="text-sm text-gray-600">Only approved followers can see your posts</p>
              </div>
              <button
                onClick={() => handleToggle('privateAccount')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.privateAccount ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.privateAccount ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Show Activity Status</h3>
                <p className="text-sm text-gray-600">Let others see when you're active</p>
              </div>
              <button
                onClick={() => handleToggle('showActivity')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showActivity ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.showActivity ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Interactions</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Allow Comments</h3>
                <p className="text-sm text-gray-600">Let people comment on your posts</p>
              </div>
              <button
                onClick={() => handleToggle('allowComments')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.allowComments ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.allowComments ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Allow Messages</h3>
                <p className="text-sm text-gray-600">Let people send you direct messages</p>
              </div>
              <button
                onClick={() => handleToggle('allowMessages')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.allowMessages ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.allowMessages ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Allow Tagging</h3>
                <p className="text-sm text-gray-600">Let people tag you in posts</p>
              </div>
              <button
                onClick={() => handleToggle('allowTagging')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.allowTagging ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.allowTagging ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Discoverability</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Show in Search</h3>
                <p className="text-sm text-gray-600">Let people find you in search</p>
              </div>
              <button
                onClick={() => handleToggle('showInSearch')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showInSearch ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.showInSearch ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Share to External Sites</h3>
                <p className="text-sm text-gray-600">Allow your content to be shared outside Plated</p>
              </div>
              <button
                onClick={() => handleToggle('shareToExternalSites')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.shareToExternalSites ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.shareToExternalSites ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacySettingsPage
