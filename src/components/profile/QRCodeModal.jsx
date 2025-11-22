import { X, Download, Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

function QRCodeModal({ profile, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const profileUrl = `${window.location.origin}/profile/${profile.id}`
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    // In production, this would download the actual QR code
    alert('QR Code downloaded!')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} on Plated`,
          text: `Check out ${profile.name}'s profile!`,
          url: `${window.location.origin}/profile/${profile.id}`
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* QR Code */}
          <div className="bg-white rounded-2xl p-8 mb-6 inline-block shadow-lg">
            <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
              {/* Mock QR Code Pattern */}
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="mb-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-200 dark:border-gray-700"
            />
            <h3 className="font-bold text-gray-900 dark:text-white">{profile.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{profile.username}</p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleShare}
              className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Share2 size={18} />
              Share Profile
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Scan this code to follow {profile.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default QRCodeModal
