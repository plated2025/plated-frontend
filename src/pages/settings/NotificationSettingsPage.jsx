import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function NotificationSettingsPage() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    messages: true,
    recipeUpdates: true,
    liveStreams: true,
    weeklyDigest: false
  })

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    alert('Notification settings saved!')
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
            <h1 className="text-xl font-bold">Notifications</h1>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-600">Receive notifications on your device</p>
              </div>
              <button
                onClick={() => handleToggle('pushEnabled')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.pushEnabled ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.pushEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <button
                onClick={() => handleToggle('emailEnabled')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.emailEnabled ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.emailEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity</h2>
          
          <div className="space-y-4">
            {[
              { key: 'likes', label: 'Likes', desc: 'Someone likes your post or recipe' },
              { key: 'comments', label: 'Comments', desc: 'Someone comments on your post' },
              { key: 'follows', label: 'Follows', desc: 'Someone follows you' },
              { key: 'mentions', label: 'Mentions', desc: 'Someone mentions you' },
              { key: 'messages', label: 'Messages', desc: 'New direct messages' }
            ].map((item, index) => (
              <div key={item.key} className={index > 0 ? 'pt-4 border-t' : ''}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings[item.key] ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                      settings[item.key] ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Updates</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Recipe Updates</h3>
                <p className="text-sm text-gray-600">New recipes from people you follow</p>
              </div>
              <button
                onClick={() => handleToggle('recipeUpdates')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.recipeUpdates ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.recipeUpdates ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Live Streams</h3>
                <p className="text-sm text-gray-600">When someone you follow goes live</p>
              </div>
              <button
                onClick={() => handleToggle('liveStreams')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.liveStreams ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.liveStreams ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Weekly Digest</h3>
                <p className="text-sm text-gray-600">Summary of top recipes and activity</p>
              </div>
              <button
                onClick={() => handleToggle('weeklyDigest')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.weeklyDigest ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${
                  settings.weeklyDigest ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettingsPage
